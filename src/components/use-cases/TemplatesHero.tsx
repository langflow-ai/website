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
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { trackPage } from "@/lib/utils/tracking";
import CategoryBar from "../common/CategoryBar";
import SearchWithSuggest from "../common/SearchWithSuggest";
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
  const pathname = usePathname();
  const [filters, setFilters] = useState<FilterState>(() => ({
    ...initialFilters,
    categories: initialFilters.categories || new Set()
  }));
  const [searchValue, setSearchValue] = useState(initialFilters.q);
  const isMounted = useRef(false);

  // Track page view whenever pathname changes (including initial load and client-side navigation)
  useEffect(() => {
    // Only track for the main use-cases page (not template detail pages)
    if (pathname === '/use-cases') {
      // Track page view with friendly name after IBM common.js loads Segment
      const trackPageView = () => {
        if (window.analytics) {
          trackPage('Use Cases');
        } else {
          // Wait for Segment to load
          setTimeout(trackPageView, 100);
        }
      };

      // Start trying to track page view
      trackPageView();
    }
  }, [pathname]);
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

  // Helper function to scroll to Browse Templates section
  const scrollToBrowseTemplates = () => {
    // Wait for DOM to update and layout to stabilize
    setTimeout(() => {
      const browseSection = document.getElementById('browse-templates-section');
      if (browseSection) {
        const yOffset = 40; // Offset to scroll down a bit into the section
        const y = browseSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 400);
  };

  // Update URL when filters change
  useEffect(() => {
    writeFiltersToURL(router, filters);
    
    // Mark as mounted after first render
    if (!isMounted.current) {
      isMounted.current = true;
      return; // Don't scroll on initial mount
    }
    
    // Scroll to Browse Templates section when filters are applied (after mount)
    if (filters.q || filters.segments.size > 0 || filters.methodologies.size > 0 || (filters.categories?.size || 0) > 0) {
      scrollToBrowseTemplates();
    }
  }, [filters, router]);

  // Sync local state if the initialFilters change (e.g., via navigation)
  useEffect(() => {
    setFilters(initialFilters);
    setSearchValue(initialFilters.q);
    // Reset mounted state when initialFilters change to prevent unwanted scrolling
    isMounted.current = false;
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

  const toggleCategory = (category: string) => {
    // Single-select behavior: clicking a category selects it exclusively;
    // clicking again clears the selection.
    setFilters((prev) => {
      const current = prev.categories || new Set<string>();
      const isSelected = current.has(category);
      const newCategories = new Set<string>();
      if (!isSelected) {
        newCategories.add(category);
      }
      return { ...prev, categories: newCategories };
    });
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
          {/* First row: Title and Subtitle */}
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Templates</h1>
            <p className={styles.subtitle}>
              Kickstart your build using Langflow&apos;s ready-made templates
            </p>
          </div>

          {/* Second row: Input and Buttons */}
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
                showSuggestions={false}
              />
            </div>

            {/* Filters Right Side */}
            <div className={styles.filtersRight}>
              <div className={styles.segmentBarContainer}>
                <CategoryBar
                  selectedCategories={filters.categories || new Set()}
                  onCategoryToggle={toggleCategory}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
