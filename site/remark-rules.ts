type Node = {
  type: string;
  value?: string;
  depth?: number;
  meta?: string | null | undefined;
  children?: Node[];
};

type VFile = {
  path?: string;
  data: { astro?: { frontmatter?: Record<string, unknown> } };
};

const EXAMPLE_LABELS: Record<string, string> = {
  incorrect: "Incorrect",
  correct: "Correct",
  "near-miss": "Near miss (looks wrong, but follows the rule)",
};

const MARKER = /^<!-- example:([a-z-]+)(?: case="[^"]*")? -->$/;

function text(node: Node): string {
  return node.value ?? (node.children ?? []).map(text).join("");
}

export function remarkRules() {
  return (root: unknown, vfile: unknown) => {
    const tree = root as Node;
    const file = vfile as VFile;
    if (!/\/packs\/[^/]+\/rules\/[^/]+\.md$/.test(file.path ?? "")) return;

    const children = tree.children ?? [];
    const title = file.data.astro?.frontmatter?.["title"];
    const h1 = children.findIndex((node) => node.type === "heading" && node.depth === 1);
    if (h1 !== -1 && text(children[h1]!) === title) children.splice(h1, 1);

    for (const node of children) {
      const label = EXAMPLE_LABELS[MARKER.exec(node.value?.trim() ?? "")?.[1] ?? ""];
      if (node.type === "html" && label) node.value = `<p><strong>${label}</strong></p>`;
      if (node.type === "code" && node.meta) {
        node.meta = node.meta.replace(/\bfile="([^"]+)"/, 'title="$1"');
      }
    }
  };
}
