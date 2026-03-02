#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DEFAULT_CATALOG_PATH = path.resolve(
  ROOT,
  "src/lib/audiobooks/public-domain-catalog.json",
);
const DEFAULT_CHECKLIST_PATH = path.resolve(
  ROOT,
  "PUBLIC-DOMAIN-REVIEW-CHECKLIST.md",
);
const PENDING_STATUS = "pending_verification";
const NOTE_MARKER = "[evidence-placeholder-generated]";

function parseArgs(argv) {
  const options = {
    apply: false,
    catalogPath: DEFAULT_CATALOG_PATH,
    checklistPath: DEFAULT_CHECKLIST_PATH,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--apply") {
      options.apply = true;
    } else if (arg === "--catalog" && argv[index + 1]) {
      options.catalogPath = path.resolve(ROOT, String(argv[index + 1]));
      index += 1;
    } else if (arg === "--checklist" && argv[index + 1]) {
      options.checklistPath = path.resolve(ROOT, String(argv[index + 1]));
      index += 1;
    }
  }

  return options;
}

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function loadCatalog(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Catalog file not found: ${path.relative(ROOT, filePath)}`);
  }

  const raw = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new Error("Catalog JSON must be an object with an entries array.");
  }

  const entries = Array.isArray(raw.entries) ? raw.entries : [];
  return {
    updatedAt: normalizeString(raw.updatedAt),
    entries,
  };
}

function buildGutenbergSearchPlaceholder(entry) {
  const title = normalizeString(entry.title);
  const moduleId = normalizeString(entry.moduleId);
  const querySource = title || moduleId.replace(/-/g, " ");
  const query = encodeURIComponent(querySource);
  return `https://www.gutenberg.org/ebooks/search/?query=${query}`;
}

function appendPlaceholderNote(existingNotes, generatedOn) {
  const notes = normalizeString(existingNotes);
  if (notes.includes(NOTE_MARKER)) {
    return notes;
  }

  const placeholderNote = `${NOTE_MARKER} Auto-generated placeholder on ${generatedOn}. Replace with a primary-source public-domain proof URL before flipping status.`;
  if (!notes) return placeholderNote;
  return `${notes} ${placeholderNote}`.trim();
}

function asPendingEntry(entry) {
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) return null;
  const record = entry;
  const moduleId = normalizeString(record.moduleId);
  const title = normalizeString(record.title);
  const rightsStatus = normalizeString(record.rightsStatus);
  if (!moduleId || !title || rightsStatus !== PENDING_STATUS) return null;
  return record;
}

function generateChecklistMarkdown(input) {
  const {
    generatedOn,
    catalogPathRelative,
    entries,
  } = input;

  const lines = [];
  lines.push("# Public-Domain Ready-to-Flip Checklist");
  lines.push("");
  lines.push(`Generated: ${generatedOn}`);
  lines.push(`Catalog: \`${catalogPathRelative}\``);
  lines.push("");
  lines.push("## Flip Rules");
  lines.push("");
  lines.push("- Keep `rightsStatus` as `pending_verification` until all checks are complete.");
  lines.push("- Replace placeholder `rightsEvidenceUrl` with a primary-source evidence URL.");
  lines.push("- Set `rightsStatus` to `public_domain_verified` only after legal review.");
  lines.push("- Keep or set `enabled: true` only when verified content is ready for queueing.");
  lines.push("");
  lines.push("## Pending Entries");
  lines.push("");

  if (entries.length === 0) {
    lines.push("_No pending entries found._");
    lines.push("");
    return lines.join("\n");
  }

  for (const [index, entry] of entries.entries()) {
    lines.push(`### ${index + 1}. ${entry.title}`);
    lines.push("");
    lines.push(`- Module ID: \`${entry.moduleId}\``);
    lines.push(`- Placeholder evidence URL: ${entry.rightsEvidenceUrl}`);
    lines.push(`- Reviewer: ${entry.reviewer || "unassigned"}`);
    lines.push(`- Reviewed at: ${entry.reviewedAt || "not set"}`);
    lines.push("- [ ] Confirm public-domain status in target territories.");
    lines.push("- [ ] Replace placeholder with final rights evidence URL.");
    lines.push("- [ ] Update catalog `rightsStatus` to `public_domain_verified`.");
    lines.push("- [ ] Run `npm run audiobooks:queue:public-domain -- --max-books 5` dry run.");
    lines.push("");
  }

  return lines.join("\n");
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const catalog = loadCatalog(options.catalogPath);
  const generatedOn = new Date().toISOString().slice(0, 10);

  const pendingEntries = catalog.entries
    .map(asPendingEntry)
    .filter((entry) => Boolean(entry));

  let placeholdersAdded = 0;
  let notesUpdated = 0;

  for (const entry of pendingEntries) {
    const existingEvidence = normalizeString(entry.rightsEvidenceUrl);
    if (!existingEvidence) {
      entry.rightsEvidenceUrl = buildGutenbergSearchPlaceholder(entry);
      placeholdersAdded += 1;
    }

    const nextNotes = appendPlaceholderNote(entry.notes, generatedOn);
    if (nextNotes !== normalizeString(entry.notes)) {
      entry.notes = nextNotes;
      notesUpdated += 1;
    }

    if (!normalizeString(entry.reviewer)) {
      entry.reviewer = "koydo-rights-queue";
    }
    if (!normalizeString(entry.reviewedAt)) {
      entry.reviewedAt = generatedOn;
    }
  }

  const checklist = generateChecklistMarkdown({
    generatedOn,
    catalogPathRelative: path.relative(ROOT, options.catalogPath).replace(/\\/g, "/"),
    entries: pendingEntries,
  });

  const previewSummary = {
    pendingEntries: pendingEntries.length,
    placeholdersAdded,
    notesUpdated,
    apply: options.apply,
    checklistPath: path.relative(ROOT, options.checklistPath).replace(/\\/g, "/"),
    catalogPath: path.relative(ROOT, options.catalogPath).replace(/\\/g, "/"),
  };

  if (options.apply) {
    const nextCatalog = {
      updatedAt: generatedOn,
      entries: catalog.entries,
    };
    fs.writeFileSync(options.catalogPath, `${JSON.stringify(nextCatalog, null, 2)}\n`, "utf8");
    fs.writeFileSync(options.checklistPath, checklist, "utf8");
  }

  process.stdout.write("Public-domain placeholder generation\n");
  process.stdout.write(`${JSON.stringify(previewSummary, null, 2)}\n`);
  if (!options.apply) {
    process.stdout.write("Dry-run only. Re-run with --apply to write catalog + checklist.\n");
  }
}

main();
