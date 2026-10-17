import starlight from "@astrojs/starlight";
import { unified } from "@astrojs/markdown-remark";
import { readFileSync } from "node:fs";

import { defineConfig } from "astro/config";
import starlightThemeBlack from "starlight-theme-black";

import { loadPacks } from "./site/packs.ts";
import { remarkRules } from "./site/remark-rules.ts";

const base = process.env["SITE_BASE"] ?? "/";

const packs = loadPacks();

export default defineConfig({
  base,
  srcDir: "./site",
  markdown: {
    processor: unified({ remarkPlugins: [remarkRules] }),
  },
  integrations: [
    starlight({
      title: "Coding guidelines",
      plugins: [starlightThemeBlack({ sidebar: { useDropdowns: true } })],
      customCss: ["./site/styles.css"],
      head: [
        {
          tag: "script",
          attrs: { type: "module" },
          content: readFileSync("./site/sidebar-scroll.js", "utf8"),
        },
      ],
      components: { MarkdownContent: "./site/components/MarkdownContent.astro" },
      markdown: { processedDirs: ["./packs/", "./site/content/"] },
      sidebar: packs.map((pack) => ({
        label: pack.title,
        collapsed: true,
        items: [
          { label: "Overview", slug: `packs/${pack.id}` },
          { autogenerate: { directory: `packs/${pack.id}/rules` } },
        ],
      })),
    }),
  ],
});
