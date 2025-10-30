// URL Query Management Utilities

import { FilterState, Methodology, Segment } from "@/lib/types/templates";
import { useRouter } from "next/navigation";

export const readFiltersFromURL = (search: string): FilterState => {
  const p = new URLSearchParams(search);
  const q = p.get("q") ?? "";
  const segments = new Set((p.get("segments") ?? "").split(",").filter(Boolean)) as Set<Segment>;
  const methodologies = new Set((p.get("methods") ?? "").split(",").filter(Boolean)) as Set<Methodology>;
  const categories = new Set((p.get("categories") ?? "").split(",").filter(Boolean));
  return { q, segments, methodologies, categories };
};

export const writeFiltersToURL = (router: ReturnType<typeof useRouter>, state: FilterState) => {
  const p = new URLSearchParams();
  if (state.q) p.set("q", state.q);
  if (state.segments.size) p.set("segments", [...state.segments].join(","));
  if (state.methodologies.size) p.set("methods", [...state.methodologies].join(","));
  if (state.categories && state.categories.size) {
    // Enforce single-select for categories in URL
    const first = [...state.categories][0];
    if (first) p.set("categories", first);
  }
  router.replace(`?${p.toString()}`, { scroll: false });
};

export const hasActiveFilter = (state: FilterState): boolean => {
  return !!(state.q.trim().length > 0 || state.segments.size > 0 || state.methodologies.size > 0 || (state.categories?.size || 0) > 0);
};

export const clearFilters = (): FilterState => ({
  q: "",
  segments: new Set(),
  methodologies: new Set(),
  categories: new Set()
});
