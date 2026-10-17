import { docsSchema } from "@astrojs/starlight/schema";
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

import { packSchema, ruleSchema } from "./schema.ts";

export const collections = {
  docs: defineCollection({
    loader: glob({
      base: ".",
      pattern: ["packs/*/pack.md", "packs/*/rules/*.md", "site/content/index.md"],
      generateId: ({ entry }) => {
        if (entry === "site/content/index.md") return "index";
        return entry.replace(/\/pack\.md$/, "").replace(/\.md$/, "");
      },
    }),
    schema: docsSchema({
      extend: ruleSchema.partial().extend({ signals: packSchema.shape.signals.optional() }),
    }),
  }),
};
