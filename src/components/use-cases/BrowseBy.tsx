// BrowseBy Organism Component

"use client";

import {
    FilterState,
    Methodology,
    METHODOLOGY_LABELS,
    Segment,
    SEGMENT_LABELS,
} from "@/lib/types/templates";
import { readFiltersFromURL, writeFiltersToURL } from "@/utils/query";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import FilterPill from "../common/FilterPill";
import styles from "./BrowseBy.module.scss";

interface BrowseByProps {
  className?: string;
}

type ActiveGroup = "use-case" | "methodology";

const SEGMENTS: Segment[] = [
  "assistants",
  "classification",
  "coding",
  "content-generation",
  "qna",
];

const METHODOLOGIES: Methodology[] = [
  "rag",
  "agents",
  "prompting-basics",
  "evaluation",
  "etl",
  "integrations",
];

export default function BrowseBy({ className = "" }: BrowseByProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeGroup, setActiveGroup] = useState<ActiveGroup>("use-case");

  const filters = useMemo<FilterState>(() => {
    return readFiltersFromURL(searchParams?.toString() ?? "");
  }, [searchParams]);

  const updateFilters = (nextFilters: FilterState) => {
    writeFiltersToURL(router, nextFilters);
  };

  const handleSegmentToggle = (segment: Segment) => {
    const nextSegments = new Set(filters.segments);
    if (nextSegments.has(segment)) {
      nextSegments.delete(segment);
    } else {
      nextSegments.add(segment);
    }

    updateFilters({
      q: filters.q,
      segments: nextSegments,
      methodologies: new Set(filters.methodologies),
    });
  };

  const handleMethodologyToggle = (methodology: Methodology) => {
    const nextMethodologies = new Set(filters.methodologies);
    if (nextMethodologies.has(methodology)) {
      nextMethodologies.delete(methodology);
    } else {
      nextMethodologies.add(methodology);
    }

    updateFilters({
      q: filters.q,
      segments: new Set(filters.segments),
      methodologies: nextMethodologies,
    });
  };

  return (
    <section className={`${styles.browseBy} ${className}`}>
      <div className="container">
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <h2 className={styles.title}>
              Browse by{" "}
              <span className={styles.filterToggle}>
                <button
                  type="button"
                  onClick={() => setActiveGroup("use-case")}
                  className={`${styles.filterButton} ${activeGroup === "use-case" ? styles.active : ""}`}
                  aria-pressed={activeGroup === "use-case"}
                >
                  use case
                </button>
                or{" "}
                <button
                  type="button"
                  onClick={() => setActiveGroup("methodology")}
                  className={`${styles.filterButton} ${activeGroup === "methodology" ? styles.active : ""}`}
                  aria-pressed={activeGroup === "methodology"}
                >
                  methodology
                </button>
              </span>
            </h2>
          </div>

          {/* Filters */}
          <div className={styles.pills}>
            {activeGroup === "use-case"
              ? SEGMENTS.map((segment) => (
                  <FilterPill
                    key={segment}
                    label={SEGMENT_LABELS[segment]}
                    value={segment}
                    selected={filters.segments.has(segment)}
                    onToggle={() => handleSegmentToggle(segment)}
                  />
                ))
              : METHODOLOGIES.map((methodology) => (
                  <FilterPill
                    key={methodology}
                    label={METHODOLOGY_LABELS[methodology]}
                    value={methodology}
                    selected={filters.methodologies.has(methodology)}
                    onToggle={() => handleMethodologyToggle(methodology)}
                  />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
