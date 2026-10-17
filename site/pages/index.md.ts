import { markdown, topIndex } from "../agent-index.ts";
import { loadPacks } from "../packs.ts";

export function GET(): Response {
  return markdown(topIndex(loadPacks()));
}
