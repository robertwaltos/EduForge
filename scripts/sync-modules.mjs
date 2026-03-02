import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { z } from "zod";

const projectRoot = process.cwd();
const catalogDir = path.join(projectRoot, "src", "lib", "modules", "catalog");
const outputDir = path.join(projectRoot, "src", "lib", "modules", "generated");
const outputFile = path.join(outputDir, "registry.ts");

const lessonValidationSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  type: z.string().min(1),
  duration: z.number().finite().nonnegative(),
});

const learningModuleValidationSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  subject: z.string().min(1),
  lessons: z.array(lessonValidationSchema).min(1),
});

const moduleRegistryValidationSchema = z.array(learningModuleValidationSchema);

function toImportPath(relativePath) {
  // relativePath is relative to catalogDir, e.g. "math-101.ts" or "epub-generated/some-book.ts"
  return `@/lib/modules/catalog/${relativePath.replace(/\.ts$/, "").replace(/\\/g, "/")}`;
}

/** Recursively collect all .ts module files under catalogDir. */
async function collectTsFiles(dir, base = dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = await collectTsFiles(fullPath, base);
      results.push(...nested);
    } else if (
      entry.isFile() &&
      entry.name.endsWith(".ts") &&
      !entry.name.includes(".example.")
    ) {
      results.push(path.relative(base, fullPath));
    }
  }
  return results;
}

async function readCatalogEntries() {
  const relPaths = (await collectTsFiles(catalogDir)).sort();

  const parsed = [];

  for (const relPath of relPaths) {
    const filePath = path.join(catalogDir, relPath);
    const source = await fs.readFile(filePath, "utf8");
    const match = source.match(/export const\s+([A-Za-z0-9_]+)\s*:\s*LearningModule\s*=/);
    if (!match) {
      throw new Error(`Could not find "export const ...: LearningModule =" in ${relPath}`);
    }

    const exportName = match[1];
    const transformed = source
      .replace(/^import\s+type\s+\{[^}]+\}\s+from\s+"[^"]+";\s*$/gm, "")
      .replace(/\s+as\s+const\b/g, "")
      .replace(
        new RegExp(`export const\\s+${exportName}\\s*:\\s*LearningModule\\s*=`, "m"),
        `const ${exportName} =`,
      )
      .concat(`\nmodule.exports = ${exportName};\n`);

    let evaluatedModule;
    try {
      const context = vm.createContext({ module: { exports: {} }, exports: {} });
      const script = new vm.Script(transformed, { filename: relPath });
      script.runInContext(context);
      evaluatedModule = context.module.exports;
    } catch (error) {
      throw new Error(
        `Unable to evaluate module payload in ${relPath}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    parsed.push({
      fileName:   relPath,
      exportName,
      importPath: toImportPath(relPath),
      payload: evaluatedModule,
    });
  }

  return parsed;
}

function formatIssuePath(issuePath) {
  if (!Array.isArray(issuePath) || issuePath.length === 0) {
    return "module";
  }
  return issuePath
    .map((segment) => (typeof segment === "number" ? `[${segment}]` : String(segment)))
    .join(".");
}

function validateCatalogPayloads(modules) {
  const payloads = modules.map((moduleEntry) => moduleEntry.payload);
  const validation = moduleRegistryValidationSchema.safeParse(payloads);

  if (!validation.success) {
    const issues = validation.error.issues.map((issue) => {
      const [moduleIndex, ...pathSegments] = issue.path;
      const fileName =
        typeof moduleIndex === "number"
          ? modules[moduleIndex]?.fileName ?? "<unknown-file>"
          : "<unknown-file>";
      const pathLabel = formatIssuePath(pathSegments);
      return `- ${fileName} (${pathLabel}): ${issue.message}`;
    });

    throw new Error(
      `Module registry validation failed (${issues.length} issue(s)).\n${issues.join("\n")}`,
    );
  }

  const duplicateIds = [];
  const seen = new Map();
  for (const [index, moduleEntry] of validation.data.entries()) {
    const owner = seen.get(moduleEntry.id);
    if (owner) {
      duplicateIds.push(`${moduleEntry.id} (${owner} and ${modules[index]?.fileName ?? "<unknown-file>"})`);
      continue;
    }
    seen.set(moduleEntry.id, modules[index]?.fileName ?? "<unknown-file>");
  }

  if (duplicateIds.length > 0) {
    throw new Error(
      `Duplicate module id(s) detected during sync:\n- ${duplicateIds.join("\n- ")}`,
    );
  }
}

function buildRegistrySource(modules) {
  const importLines = modules.map((mod) => `import { ${mod.exportName} } from "${mod.importPath}";`).join("\n");
  const listItems = modules.map((mod) => `  ${mod.exportName},`).join("\n");

  return `${importLines}
import type { LearningModule } from "@/lib/modules/types";

export const generatedModuleRegistry: LearningModule[] = [
${listItems}
];
`;
}


async function main() {
  const modules = await readCatalogEntries();
  validateCatalogPayloads(modules);
  await fs.mkdir(outputDir, { recursive: true });
  const source = buildRegistrySource(modules);
  await fs.writeFile(outputFile, source, "utf8");
  console.log(`Synced ${modules.length} module(s) to ${path.relative(projectRoot, outputFile)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
