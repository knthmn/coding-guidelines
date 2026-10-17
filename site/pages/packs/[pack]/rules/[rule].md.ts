import { readFileSync } from "node:fs";

import type { GetStaticPaths } from "astro";

import { markdown } from "../../../../agent-index.ts";
import { loadPacks, type Rule } from "../../../../packs.ts";

export const getStaticPaths = (() =>
  loadPacks().flatMap((pack) =>
    pack.rules.map((rule) => ({ params: { pack: pack.id, rule: rule.id }, props: { rule } })),
  )) satisfies GetStaticPaths;

export function GET({ props }: { props: { rule: Rule } }): Response {
  return markdown(readFileSync(props.rule.path, "utf8"));
}
