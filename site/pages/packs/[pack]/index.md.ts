import type { GetStaticPaths } from "astro";

import { markdown, packIndex } from "../../../agent-index.ts";
import { loadPacks, type Pack } from "../../../packs.ts";

export const getStaticPaths = (() =>
  loadPacks().map((pack) => ({
    params: { pack: pack.id },
    props: { pack },
  }))) satisfies GetStaticPaths;

export function GET({ props }: { props: { pack: Pack } }): Response {
  return markdown(packIndex(props.pack));
}
