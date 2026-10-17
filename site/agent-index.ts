import type { Pack, Rule } from "./packs.ts";

function packLine(pack: Pack): string {
  const lines = [`- \`${pack.id}\`: ${pack.title}. Applies when: ${pack.applies_when}`];
  if (pack.signals.length > 0) {
    lines.push(`  Signals: ${pack.signals.join("; ")}.`);
  }
  lines.push(`  Rules: ${pack.rules.length}`);
  return lines.join("\n");
}

function ruleLine(rule: Rule): string {
  return `- \`${rule.id}\` [${rule.severity}] ${rule.summary} When: ${rule.applies_when}`;
}

export function topIndex(packs: Pack[]): string {
  return [
    "# Coding guidelines",
    "",
    "Each pack applies only when its condition holds. Use the signals to judge the condition.",
    "Read a pack index only when the pack applies. The index of pack `<pack-id>` is `packs/<pack-id>/index.md`.",
    "",
    ...packs.map(packLine),
    "",
  ].join("\n");
}

export function packIndex(pack: Pack): string {
  return [
    `# ${pack.title}`,
    "",
    `Applies when: ${pack.applies_when}`,
    "",
    "Read a rule file only when the rule may apply. The file of rule `<rule-id>` is `rules/<rule-id>.md`.",
    "",
    ...[...pack.rules].sort((a, b) => a.id.localeCompare(b.id)).map(ruleLine),
    "",
  ].join("\n");
}

export function markdown(text: string): Response {
  return new Response(text, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
