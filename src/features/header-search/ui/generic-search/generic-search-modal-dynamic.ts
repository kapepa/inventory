import dynamic from "next/dynamic";

export const GenericSearchModalDynamic = dynamic(
  () => import("./generic-search-modal").then(m => ({ default: m.GenericSearchModal })),
  { ssr: false }
);