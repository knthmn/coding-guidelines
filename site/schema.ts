import { z } from "astro/zod";

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const sourceSchema = z.object({ title: z.string(), url: z.url().optional() });

export const ruleSchema = z.strictObject({
  id: slug,
  title: z.string(),
  summary: z.string().max(200),
  applies_when: z.string(),
  severity: z.enum(["critical", "high", "medium", "low"]),
  source: z.array(sourceSchema).min(1).nullable(),
});

export const packSchema = z.strictObject({
  id: slug,
  title: z.string(),
  applies_when: z.string(),
  signals: z.array(z.string()).default([]),
});

export type Source = z.infer<typeof sourceSchema>;
export type RuleData = z.infer<typeof ruleSchema>;
export type PackData = z.infer<typeof packSchema>;
