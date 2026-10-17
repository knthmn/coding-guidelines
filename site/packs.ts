import { readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";

import { z } from "astro/zod";
import { parse as parseYaml } from "yaml";

import { type PackData, packSchema, type RuleData, ruleSchema } from "./schema.ts";

export const ROOT = process.cwd();
const PACKS_DIR = join(ROOT, "packs");

export type Rule = RuleData & { path: string };
export type Pack = PackData & { dir: string; rules: Rule[] };

function frontmatter<T extends z.ZodType>(path: string, schema: T): z.infer<T> {
  const match = /^---\n([\s\S]*?)\n---/.exec(readFileSync(path, "utf8"));
  const result = schema.safeParse(match ? parseYaml(match[1] ?? "") : undefined);
  if (!result.success) {
    throw new Error(`${path.replace(ROOT + "/", "")}\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

export function loadPacks(): Pack[] {
  const ids = new Set<string>();
  return readdirSync(PACKS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
    .map((dir) => {
      const rulesDir = join(PACKS_DIR, dir, "rules");
      const rules = readdirSync(rulesDir)
        .filter((file) => file.endsWith(".md"))
        .sort()
        .map((file) => {
          const path = join(rulesDir, file);
          const rule = frontmatter(path, ruleSchema);
          if (rule.id !== basename(file, ".md") || ids.has(rule.id)) {
            throw new Error(`${path}: id must equal the file name and be unique`);
          }
          ids.add(rule.id);
          return { ...rule, path };
        });
      return { ...frontmatter(join(PACKS_DIR, dir, "pack.md"), packSchema), dir, rules };
    });
}
