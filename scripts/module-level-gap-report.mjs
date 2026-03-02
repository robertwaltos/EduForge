import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(".");
const catalogDir = path.join(projectRoot, "src", "lib", "modules", "catalog");
const outDir = path.join(projectRoot, "public");
const outJson = path.join(outDir, "MODULE-LEVEL-GAP-REPORT.json");
const outMd = path.join(outDir, "MODULE-LEVEL-GAP-REPORT.md");

const LEVELS = ["101", "201", "301", "401"];

function walk(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(full));
    } else if (entry.isFile() && entry.name.endsWith(".ts") && !entry.name.endsWith(".example.ts")) {
      results.push(full);
    }
  }
  return results;
}

function slugToTitle(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function parseModuleId(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const match = raw.match(/\bid\s*:\s*"([^"]+)"/);
  if (match) return match[1];
  return path.basename(filePath, ".ts");
}

function includeTrack(moduleId, filePath) {
  if (filePath.includes(`${path.sep}epub-generated${path.sep}`)) return false;
  if (moduleId.includes("-prep-")) return false;
  if (moduleId.includes("-u1-external")) return false;
  if (moduleId.startsWith("pre-k-")) return false;
  if (moduleId.startsWith("audiobook:")) return false;
  return true;
}

function buildReport() {
  const files = walk(catalogDir);
  const tracks = new Map();

  for (const filePath of files) {
    const moduleId = parseModuleId(filePath);
    if (!includeTrack(moduleId, filePath)) continue;

    const m = moduleId.match(/^(.*)-(101|201|301|401)$/);
    if (!m) continue;

    const base = m[1];
    const level = m[2];
    const entry = tracks.get(base) ?? {
      trackId: base,
      trackTitle: slugToTitle(base),
      levelsPresent: new Set(),
      moduleIds: [],
      files: [],
    };
    entry.levelsPresent.add(level);
    entry.moduleIds.push(moduleId);
    entry.files.push(path.relative(projectRoot, filePath).replace(/\\/g, "/"));
    tracks.set(base, entry);
  }

  const allTracks = Array.from(tracks.values()).map((track) => {
    const levelsPresent = LEVELS.filter((lvl) => track.levelsPresent.has(lvl));
    const missingLevels = LEVELS.filter((lvl) => !track.levelsPresent.has(lvl));
    return {
      trackId: track.trackId,
      trackTitle: track.trackTitle,
      levelsPresent,
      missingLevels,
      completionPercent: Math.round((levelsPresent.length / LEVELS.length) * 100),
      moduleIds: [...track.moduleIds].sort(),
      files: [...track.files].sort(),
    };
  });

  allTracks.sort((a, b) => a.trackId.localeCompare(b.trackId));

  const completeTracks = allTracks.filter((track) => track.missingLevels.length === 0);
  const partialTracks = allTracks.filter((track) => track.missingLevels.length > 0);
  const startedTracks = partialTracks.filter((track) => track.levelsPresent.length >= 2);
  const singleLevelTracks = partialTracks.filter((track) => track.levelsPresent.length === 1);

  const proposalCandidates = [
    ...startedTracks
      .sort((a, b) => a.missingLevels.length - b.missingLevels.length || a.trackId.localeCompare(b.trackId))
      .slice(0, 20)
      .map((track) => ({
        priority: "high",
        kind: "complete_existing_track",
        trackId: track.trackId,
        trackTitle: track.trackTitle,
        suggestedModules: track.missingLevels.map((lvl) => `${track.trackId}-${lvl}`),
        rationale: "Track already has multiple levels; completing it improves learner progression and sequencing.",
      })),
    ...singleLevelTracks
      .sort((a, b) => a.trackId.localeCompare(b.trackId))
      .slice(0, 25)
      .map((track) => ({
        priority: "medium",
        kind: "expand_single_level_track",
        trackId: track.trackId,
        trackTitle: track.trackTitle,
        suggestedModules: track.missingLevels.map((lvl) => `${track.trackId}-${lvl}`),
        rationale: "Single-level track exists; adding upper levels enables long-term curriculum depth.",
      })),
  ];

  return {
    generatedAt: new Date().toISOString(),
    totals: {
      tracksAnalyzed: allTracks.length,
      completeTracks: completeTracks.length,
      partialTracks: partialTracks.length,
      startedTracks: startedTracks.length,
      singleLevelTracks: singleLevelTracks.length,
    },
    tracks: allTracks,
    proposals: proposalCandidates,
  };
}

function renderMarkdown(report) {
  const lines = [];
  lines.push("# Module Level Gap Report");
  lines.push("");
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- Tracks analyzed: ${report.totals.tracksAnalyzed}`);
  lines.push(`- Complete 101-401 tracks: ${report.totals.completeTracks}`);
  lines.push(`- Partial tracks: ${report.totals.partialTracks}`);
  lines.push(`- Multi-level but incomplete tracks: ${report.totals.startedTracks}`);
  lines.push(`- Single-level tracks: ${report.totals.singleLevelTracks}`);
  lines.push("");

  lines.push("## High Priority Completions");
  lines.push("");
  const high = report.proposals.filter((row) => row.priority === "high");
  if (high.length === 0) {
    lines.push("- None");
  } else {
    for (const row of high) {
      lines.push(`- ${row.trackId}: add ${row.suggestedModules.join(", ")}`);
    }
  }
  lines.push("");

  lines.push("## Medium Priority Expansions");
  lines.push("");
  const medium = report.proposals.filter((row) => row.priority === "medium");
  if (medium.length === 0) {
    lines.push("- None");
  } else {
    for (const row of medium) {
      lines.push(`- ${row.trackId}: add ${row.suggestedModules.join(", ")}`);
    }
  }
  lines.push("");

  lines.push("## Track Matrix");
  lines.push("");
  lines.push("| Track | Present | Missing | Completion |\n|---|---|---|---|");
  for (const track of report.tracks) {
    lines.push(
      `| ${track.trackId} | ${track.levelsPresent.join(", ")} | ${track.missingLevels.join(", ") || "-"} | ${track.completionPercent}% |`,
    );
  }

  return lines.join("\n");
}

function main() {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const report = buildReport();
  fs.writeFileSync(outJson, JSON.stringify(report, null, 2));
  fs.writeFileSync(outMd, renderMarkdown(report));
  console.log(`Wrote ${path.relative(projectRoot, outJson)}`);
  console.log(`Wrote ${path.relative(projectRoot, outMd)}`);
}

main();
