// TemplatesHero Organism Component

"use client";

import { suggestionGroups } from "@/data/templates";
import {
  FilterState,
  Methodology,
  METHODOLOGY_LABELS,
  Segment,
  SEGMENT_LABELS,
} from "@/lib/types/templates";
import { writeFiltersToURL } from "@/utils/query";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import SearchWithSuggest from "../common/SearchWithSuggest";
import SegmentBar from "../common/SegmentBar";
import styles from "./TemplatesHero.module.scss";

interface TemplatesHeroProps {
  initialFilters: FilterState;
}

type FilterSequenceItem = {
  type: "segment" | "methodology";
  value: Segment | Methodology;
};

export default function TemplatesHero({ initialFilters }: TemplatesHeroProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [searchValue, setSearchValue] = useState(initialFilters.q);
  const [_filterSequence, setFilterSequence] = useState<FilterSequenceItem[]>(() => {
    const sequence: FilterSequenceItem[] = [];
    initialFilters.segments.forEach((segment) =>
      sequence.push({ type: "segment", value: segment })
    );
    initialFilters.methodologies.forEach((methodology) =>
      sequence.push({ type: "methodology", value: methodology })
    );
    return sequence;
  });

  // Update URL when filters change
  useEffect(() => {
    writeFiltersToURL(router, filters);
  }, [filters, router]);

  // Sync local state if the initialFilters change (e.g., via navigation)
  useEffect(() => {
    setFilters(initialFilters);
    setSearchValue(initialFilters.q);
    const sequence: FilterSequenceItem[] = [];
    initialFilters.segments.forEach((segment) =>
      sequence.push({ type: "segment", value: segment })
    );
    initialFilters.methodologies.forEach((methodology) =>
      sequence.push({ type: "methodology", value: methodology })
    );
    setFilterSequence(sequence);
  }, [initialFilters]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSearchSubmit = (value: string) => {
    setFilters((prev) => ({ ...prev, q: value.trim() }));
  };

  const toggleSegment = (segment: Segment) => {
    setFilters((prev) => {
      const newSegments = new Set(prev.segments);
      const isSelected = newSegments.has(segment);

      if (isSelected) {
        newSegments.delete(segment);
        setFilterSequence((prevSequence) =>
          prevSequence.filter(
            (item) => !(item.type === "segment" && item.value === segment)
          )
        );
      } else {
        newSegments.add(segment);
        setFilterSequence((prevSequence) => [
          ...prevSequence,
          { type: "segment", value: segment },
        ]);
      }

      return { ...prev, segments: newSegments };
    });
  };

  const ensureSegmentSelected = (segment: Segment) => {
    setFilters((prev) => {
      if (prev.segments.has(segment)) {
        return prev;
      }

      const newSegments = new Set(prev.segments);
      newSegments.add(segment);
      setFilterSequence((prevSequence) => [
        ...prevSequence,
        { type: "segment", value: segment },
      ]);

      return { ...prev, segments: newSegments };
    });
  };

  const toggleMethodology = (methodology: Methodology) => {
    setFilters((prev) => {
      const newMethodologies = new Set(prev.methodologies);
      const isSelected = newMethodologies.has(methodology);

      if (isSelected) {
        newMethodologies.delete(methodology);
        setFilterSequence((prevSequence) =>
          prevSequence.filter(
            (item) =>
              !(
                item.type === "methodology" && item.value === methodology
              )
          )
        );
      } else {
        newMethodologies.add(methodology);
        setFilterSequence((prevSequence) => [
          ...prevSequence,
          { type: "methodology", value: methodology },
        ]);
      }

      return { ...prev, methodologies: newMethodologies };
    });
  };

  const ensureMethodologySelected = (methodology: Methodology) => {
    setFilters((prev) => {
      if (prev.methodologies.has(methodology)) {
        return prev;
      }

      const newMethodologies = new Set(prev.methodologies);
      newMethodologies.add(methodology);
      setFilterSequence((prevSequence) => [
        ...prevSequence,
        { type: "methodology", value: methodology },
      ]);

      return { ...prev, methodologies: newMethodologies };
    });
  };

  const handleSuggestionSelect = (item: {
    label: string;
    value: string;
    type: "segment" | "methodology";
  }) => {
    if (item.type === "segment") {
      ensureSegmentSelected(item.value as Segment);
    } else {
      ensureMethodologySelected(item.value as Methodology);
    }
    setSearchValue("");
  };

  const handleBackspaceAtEmpty = () => {
    setFilterSequence((prevSequence) => {
      if (prevSequence.length === 0) {
        return prevSequence;
      }

      const updatedSequence = prevSequence.slice(0, -1);
      const lastItem = prevSequence[prevSequence.length - 1];

      setFilters((prevFilters) => {
        if (lastItem.type === "segment") {
          const newSegments = new Set(prevFilters.segments);
          newSegments.delete(lastItem.value as Segment);
          return { ...prevFilters, segments: newSegments };
        }

        const newMethodologies = new Set(prevFilters.methodologies);
        newMethodologies.delete(lastItem.value as Methodology);
        return { ...prevFilters, methodologies: newMethodologies };
      });

      return updatedSequence;
    });
  };

  const activeFilters = useMemo(() => {
    const segmentFilters = Array.from(filters.segments).map((segment) => ({
      type: "segment" as const,
      value: segment,
      label: SEGMENT_LABELS[segment],
    }));

    const methodologyFilters = Array.from(filters.methodologies).map(
      (methodology) => ({
        type: "methodology" as const,
        value: methodology,
        label: METHODOLOGY_LABELS[methodology],
      })
    );

    return [...segmentFilters, ...methodologyFilters];
  }, [filters.segments, filters.methodologies]);

  return (
    <section className={styles.templatesHero}>
      {/* Background SVG */}
      <div className={styles.backgroundSvg} />
      
      {/* Background Noise */}
      <div className={styles.backgroundNoise} />
      
      {/* Background Gradient */}
      <div className={styles.backgroundGradient} />

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Primeira linha: Título e Subtítulo */}
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Templates</h1>
            <p className={styles.subtitle}>
              Kickstart your build using Langflow&apos;s ready-made templates
            </p>
          </div>

          {/* Segunda linha: Input e Botões */}
          <div className={styles.searchAndFiltersRow}>
            {/* Search Bar */}
            <div className={styles.searchContainer}>
              <SearchWithSuggest
                value={searchValue}
                onChange={handleSearchChange}
                onSubmit={handleSearchSubmit}
                suggestions={suggestionGroups}
                onSuggestionSelect={handleSuggestionSelect}
                onBackspaceAtEmpty={handleBackspaceAtEmpty}
              />
            </div>

            {/* Filters Right Side */}
            <div className={styles.filtersRight}>
              <div className={styles.segmentBarContainer}>
                <SegmentBar
                  selectedSegments={filters.segments}
                  onSegmentToggle={toggleSegment}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
