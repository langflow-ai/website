"use client";

import TemplateCard from "@/components/common/TemplateCard";
import { FLOWS, Flow, getCategoriesFromFlows, getTopLevelCategories, getTypesFromFlows } from "@/data/flows";
import { FilterState, Template } from "@/lib/types/templates";
import { readFiltersFromURL, writeFiltersToURL } from "@/utils/query";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineChevronDown,
  HiOutlineCommandLine,
  HiOutlineMagnifyingGlass,
  HiOutlineSparkles,
  HiOutlineSquares2X2
} from "react-icons/hi2";
import DownArrow from "../icons/downArrow/DownArrow";
import styles from "./BrowseTemplates.module.scss";

interface BrowseTemplatesProps {
  className?: string;
  initialFilters?: FilterState;
}

// Get real categories and types from flows
const FILTER_TYPES = getTypesFromFlows();
const CATEGORIES = getCategoriesFromFlows().map((cat, index) => ({
  name: cat.name,
  expanded: index === 0, // First category expanded by default
  subcategories: cat.subcategories,
}));

// Get top-level categories dynamically from flows to ensure consistency with Hero
const TOP_LEVEL_CATEGORIES = getTopLevelCategories();

// Dynamic FilterType based on actual categories from flows
type FilterType = "all-types" | (typeof TOP_LEVEL_CATEGORIES[number]);

// Icon mapping for category filter buttons
const CATEGORY_ICON_MAP: Record<string, typeof HiOutlineSquares2X2> = {
  "Getting Started": HiOutlineSparkles,
  "Development": HiOutlineCommandLine,
  "Research": HiOutlineMagnifyingGlass,
  "Customer Support": HiOutlineChatBubbleLeftRight,
};

// Create category filter buttons with icons - dynamically from flows data
const CATEGORY_FILTERS = [
  { value: "all-types", label: "All Types", icon: HiOutlineSquares2X2 },
  ...TOP_LEVEL_CATEGORIES.map(category => ({
    value: category,
    label: category,
    icon: CATEGORY_ICON_MAP[category] || HiOutlineSquares2X2,
  })),
];

const BrowseTemplates: React.FC<BrowseTemplatesProps> = ({ className = "", initialFilters }) => {
  // Helper function to convert category to subcategory format
  // If it's a top-level category, find its first subcategory
  // If it's already a subcategory (format: "Category-Subcategory"), return it as is
  const convertToSubcategory = useCallback((category: string): string => {
    // If it's already in subcategory format (contains "-"), return as is
    if (category.includes("-")) {
      return category;
    }
    
    // If it's a top-level category, find the first subcategory
    const categoryData = CATEGORIES.find(cat => cat.name === category);
    if (categoryData && categoryData.subcategories.length > 0) {
      // Return in format "Category-Subcategory"
      return `${categoryData.name}-${categoryData.subcategories[0]}`;
    }
    
    // Fallback: return as is
    return category;
  }, []);

  // Initialize states with values from initialFilters (from URL/hero)
  const getInitialCategory = () => {
    if (initialFilters?.categories && initialFilters.categories.size > 0) {
      const categoryFromURL = Array.from(initialFilters.categories)[0];
      // Check if it's a top-level category (not in subcategory format)
      if (!categoryFromURL.includes("-") && TOP_LEVEL_CATEGORIES.includes(categoryFromURL)) {
        return categoryFromURL as FilterType;
      }
      // If it's a subcategory, extract the top-level category
      if (categoryFromURL.includes("-")) {
        const [parentCategory] = categoryFromURL.split("-");
        if (TOP_LEVEL_CATEGORIES.includes(parentCategory)) {
          return parentCategory as FilterType;
        }
      }
      return "all-types";
    }
    return "all-types";
  };

  const getInitialSelectedCategory = () => {
    if (initialFilters?.categories && initialFilters.categories.size > 0) {
      const categoryFromURL = Array.from(initialFilters.categories)[0];
      // Convert to subcategory format if needed
      return convertToSubcategory(categoryFromURL);
    }
    return "all-categories";
  };

  const [activeFilter, setActiveFilter] = useState<FilterType>(() => getInitialCategory());
  const [searchQuery, setSearchQuery] = useState(() => initialFilters?.q || "");
  const [sortBy, setSortBy] = useState("most-recent");
  // Expanded state for sidebar categories. Default: all expanded
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(CATEGORIES.map((c) => c.name))
  );
  const [isMobile, setIsMobile] = useState(false);
  const [selectedType, setSelectedType] = useState("all-types");
  const [selectedCategory, setSelectedCategory] = useState(() => getInitialSelectedCategory());
  const [templates, setTemplates] = useState<Flow[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Flow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(6); // Start with 6 templates
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read filters from URL in real-time to detect changes
  const urlFilters = useMemo(() => {
    return readFiltersFromURL(searchParams?.toString() ?? "");
  }, [searchParams]);

  const scrollToBrowseTemplates = () => {
    if (typeof window === 'undefined') return;
    const el = document.getElementById('browse-templates-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Check if mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load flows on component mount
  useEffect(() => {
    setTemplates(FLOWS);
  }, []);

  // Sync search query from URL when it changes
  useEffect(() => {
    const queryFromURL = urlFilters.q || "";
    setSearchQuery(queryFromURL);
  }, [urlFilters.q]);

  // Sync category filters from URL when it changes
  // Serialize Set to detect changes properly
  const categoriesKey = useMemo(() => {
    if (!urlFilters.categories || urlFilters.categories.size === 0) {
      return "";
    }
    return Array.from(urlFilters.categories).sort().join(",");
  }, [urlFilters.categories]);
    
  useEffect(() => {
    const categoriesFromURL = urlFilters.categories;
    
    if (categoriesFromURL && categoriesFromURL.size > 0) {
      const categoryFromURL = Array.from(categoriesFromURL)[0];
      
      // Convert to subcategory format for the selector
      const subcategoryValue = convertToSubcategory(categoryFromURL);
      
      // Determine the activeFilter (top-level category)
      let topLevelCategory: FilterType;
      if (categoryFromURL.includes("-")) {
        // If it's already a subcategory, extract parent category
        const [parentCategory] = categoryFromURL.split("-");
        if (TOP_LEVEL_CATEGORIES.includes(parentCategory)) {
          topLevelCategory = parentCategory as FilterType;
        } else {
          topLevelCategory = "all-types";
        }
      } else if (TOP_LEVEL_CATEGORIES.includes(categoryFromURL)) {
        // If it's a top-level category, use it directly
        topLevelCategory = categoryFromURL as FilterType;
      } else {
        topLevelCategory = "all-types";
      }
      
      // Always update to ensure selectors reflect the current URL state
      // This ensures the mobile selector shows the correct value when URL changes
      setActiveFilter(topLevelCategory);
      setSelectedCategory(subcategoryValue);
      setSelectedType("all-types");
    } else {
      // Clear category filters when URL doesn't have categories
      // Force update to ensure selectors reflect cleared state
      setActiveFilter("all-types");
      setSelectedCategory("all-categories");
    }
  }, [categoriesKey, convertToSubcategory]);

  const handleFilterChange = (filter: FilterType) => {
    // If clicking on "All Types" when already selected, do nothing
    if (filter === "all-types" && activeFilter === "all-types") {
      return;
    }
    // Update activeFilter
    setActiveFilter(filter);
    // Sync selectedCategory to match (for mobile selectors)
    if (filter !== "all-types") {
      setSelectedCategory(filter);
    } else {
      setSelectedCategory("all-categories");
    }
    // Keep user focus on browse section
    scrollToBrowseTemplates();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedType(value);
    // Reset other filters when type changes on mobile
    setActiveFilter("all-types");
    setSelectedCategory("all-categories");
    scrollToBrowseTemplates();
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    
    // Sync activeFilter if it's a top-level category that matches button filters
    if (value !== "all-categories") {
      const isTopLevelCategory = TOP_LEVEL_CATEGORIES.includes(value);
      if (isTopLevelCategory) {
        setActiveFilter(value as FilterType);
      } else if (value.includes("-")) {
        // If subcategory, set activeFilter to parent category
        const [parentCategory] = value.split("-");
        if (TOP_LEVEL_CATEGORIES.includes(parentCategory)) {
          setActiveFilter(parentCategory as FilterType);
        } else {
          setActiveFilter("all-types");
        }
      } else {
        setActiveFilter("all-types");
      }
    } else {
      setActiveFilter("all-types");
    }
    
    // Reset type filter when category changes
    setSelectedType("all-types");
    
    // Update URL to reflect category selection
    const categoriesSet = value !== "all-categories" ? new Set([value]) : new Set<string>();
    writeFiltersToURL(router, {
      q: searchQuery || "",
      segments: new Set(),
      methodologies: new Set(),
      categories: categoriesSet
    });
    
    scrollToBrowseTemplates();
  };

  const getTypeDisplayValue = () => {
    if (selectedType === "all-types") {
      return "Type: All Types";
    }
    return `Type: ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}`;
  };

  const getCategoryDisplayValue = () => {
    if (selectedCategory === "all-categories") {
      return "Categories: All Categories";
    }
    
    if (selectedCategory.includes("-")) {
      const [category, subcategory] = selectedCategory.split("-");
      return `Category: ${category}, ${subcategory}`;
    }
    
    return `Categories: ${selectedCategory}`;
  };

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    // Sync activeFilter if it's a top-level category that matches button filters
    const isTopLevelCategory = CATEGORY_FILTERS.some(f => f.value === categoryName);
    if (isTopLevelCategory) {
      setActiveFilter(categoryName as FilterType);
    } else {
      setActiveFilter("all-types");
    }
    scrollToBrowseTemplates();
  };

  const handleSubcategoryClick = (categoryName: string, subcategoryName: string) => {
    const fullCategory = `${categoryName}-${subcategoryName}`;
    setSelectedCategory(fullCategory);
    // Sync activeFilter if parent category matches button filters
    const isTopLevelCategory = CATEGORY_FILTERS.some(f => f.value === categoryName);
    if (isTopLevelCategory) {
      setActiveFilter(categoryName as FilterType);
    } else {
      setActiveFilter("all-types");
    }
    scrollToBrowseTemplates();
  };

  const clearFilters = () => {
    setSelectedCategory("all-categories");
    setSelectedType("all-types");
    setSearchQuery("");
    setActiveFilter("all-types");
    // Update URL to remove filters
    writeFiltersToURL(router, {
      q: "",
      segments: new Set(),
      methodologies: new Set(),
      categories: new Set()
    });
    // After resetting, ensure the user remains focused on the browse section
    // even when other sections (Trending/Beginner) render above.
    setTimeout(scrollToBrowseTemplates, 0);
  };

  const handleViewMore = () => {
    // Load 6 more templates
    setDisplayedCount(prev => prev + 6);
  };

  // Apply additional filtering and sorting based on active filter, search query and sort selection
  useEffect(() => {
    // Don't filter if templates haven't loaded yet
    if (templates.length === 0) {
      return;
    }

    let filtered = [...templates];
    
    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(flow =>
        flow.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flow.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flow.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flow.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flow.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply type filter
    if (selectedType !== "all-types") {
      filtered = filtered.filter(flow => flow.type === selectedType);
    }
    
    // Apply category filters - prioritize sidebar selection over button selection
    if (selectedCategory !== "all-categories") {
      // If sidebar has a specific selection, use that
      if (selectedCategory.includes("-")) {
        const [category, subcategory] = selectedCategory.split("-");
        filtered = filtered.filter(flow => 
          flow.category.toLowerCase() === category.toLowerCase() &&
          flow.subcategory.toLowerCase() === subcategory.toLowerCase()
        );
      } else {
        filtered = filtered.filter(flow => 
          flow.category.toLowerCase() === selectedCategory.toLowerCase()
        );
      }
    } else if (activeFilter !== "all-types") {
      // If no sidebar selection, use button selection
      filtered = filtered.filter(flow => flow.category === activeFilter);
    }
    
    // Apply sorting
    if (sortBy === "most-popular") {
      filtered.sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
    } else if (sortBy === "alphabetical") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // Default: most-recent
      const toTime = (d?: string) => (d ? new Date(d).getTime() : 0);
      filtered.sort((a, b) => toTime(b.updatedAt) - toTime(a.updatedAt));
    }
    
    setFilteredTemplates(filtered);
    // Reset displayed count when filters change
    setDisplayedCount(6);
  }, [templates, searchQuery, selectedType, selectedCategory, activeFilter, sortBy]);

  // Keep URL query in sync with category selections
  useEffect(() => {
    // Build categories set from either sidebar selection or top pill selection
    let categoriesSet = new Set<string>();
    if (selectedCategory !== "all-categories") {
      categoriesSet.add(selectedCategory);
    } else if (activeFilter !== "all-types") {
      categoriesSet.add(activeFilter);
    }

    writeFiltersToURL(router, {
      q: searchQuery || "",
      segments: new Set(),
      methodologies: new Set(),
      categories: categoriesSet
    });
  }, [searchQuery, selectedCategory, activeFilter, router]);

  // Control sidebar expansion reactively based on selection
  useEffect(() => {
    const allNames = CATEGORIES.map((c) => c.name);
    const noSelection =
      (selectedCategory === "all-categories" || !selectedCategory) &&
      activeFilter === "all-types";

    if (noSelection) {
      // Expand all categories when nothing is selected
      setExpandedCategories(new Set(allNames));
      return;
    }

    // Determine the base category that should stay expanded
    let baseCategory = "";
    if (selectedCategory !== "all-categories") {
      baseCategory = selectedCategory.includes("-")
        ? selectedCategory.split("-")[0]
        : selectedCategory;
    } else if (activeFilter !== "all-types") {
      baseCategory = activeFilter;
    }

    if (baseCategory) {
      setExpandedCategories(new Set([baseCategory]));
    }
  }, [selectedCategory, activeFilter]);

  return (
    <section id="browse-templates-section" className={`${styles.browseTemplates} ${className}`}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Browse Templates</h2>
        <div className={styles.header}>
          {/* Desktop Layout */}
          {!isMobile && (
            <>
              <div className={styles.searchAndFilters}>
                <div className={styles.searchContainer}>
                  <div className={styles.searchIcon}>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search use cases, methodology, integrations..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                  />
                  {(searchQuery || activeFilter !== "all-types" || selectedCategory !== "all-categories") && (
                    <div 
                      className={styles.clearIcon}
                      onClick={clearFilters}
                      title="Clear all filters"
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className={styles.filterPills}>
                  {CATEGORY_FILTERS.map((filter) => {
                    // Determine if this filter should be active
                    const isActive = activeFilter === filter.value && !searchQuery;
                    
                    return (
                      <button
                        key={filter.value}
                        className={`${styles.filterPill} ${
                          isActive ? styles.active : ""
                        } ${filter.value === "all-types" && isActive ? styles.allTypes : ""}`}
                        onClick={() => handleFilterChange(filter.value as FilterType)}
                      >
                      {filter.icon && (
                        <filter.icon size={20} className={styles.icon} />
                      )}
                      {filter.label}
                    </button>
                    );
                  })}
                </div>
              </div>

              <div className={styles.resultsAndSort}>
                <div className={styles.resultsHeader}>
                  <h2 className={styles.title}>Categories</h2>
                  <div className={styles.resultsCount}>
                    Showing 1 - {filteredTemplates.length} of {templates.length} results in All Templates
                  </div>
                </div>
                <div className={styles.sortContainer}>
                  <label htmlFor="sort-by" className={styles.sortLabel}>Sort by</label>
                  <select id="sort-by" className={styles.sortSelect} value={sortBy} onChange={handleSortChange}>
                    <option value="most-recent">Most Recent</option>
                    <option value="most-popular">Most Popular</option>
                    <option value="alphabetical">Alphabetical</option>
                  </select>
                  <div className={styles.sortIcon}>▼</div>
                </div>
              </div>
            </>
          )}

          {/* Mobile Layout */}
          {isMobile && (
            <>
              <div className={styles.mobileSearchContainer}>
                <div className={styles.mobileSearchInput}>
                  <div className={styles.searchIcon}>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search use cases..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={styles.mobileSearchField}
                  />
                </div>
              </div>

              <div className={styles.mobileSelectors}>
                {/* Categories selector - enabled to reflect URL changes */}
                <div className={`${styles.mobileSelector} ${styles.selectWrapper}`}>
                  <select 
                    id="category-select" 
                    className={styles.mobileSelect} 
                    value={selectedCategory} 
                    onChange={handleCategoryChange}
                  >
                    <option value="all-categories">All Types</option>
                    {CATEGORIES.map((category) => (
                      <optgroup key={category.name} label={category.name}>
                        {category.subcategories.map((subcategory) => (
                          <option key={`${category.name}-${subcategory}`} value={`${category.name}-${subcategory}`}>
                            {subcategory}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <HiOutlineChevronDown className={styles.selectChevron} size={16} />
                </div>

                <div className={`${styles.mobileSelector} ${styles.selectWrapper}`}>
                  <select
                    id="mobile-sort"
                    className={styles.mobileSelect}
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="most-recent">Most Recent</option>
                    <option value="most-popular">Most Popular</option>
                    <option value="alphabetical">Alphabetical</option>
                  </select>
                  <HiOutlineChevronDown className={styles.selectChevron} size={16} />
                </div>
              </div>
            </>
          )}
        </div>

        <div className={styles.mainContent}>
          {!isMobile && (
            <div className={styles.sidebar}>
              {/* <div className={styles.sidebarHeader}>
                <h3 className={styles.sidebarTitle}>Categories</h3>
                {(selectedCategory !== "all-categories" || selectedType !== "all-types" || searchQuery || activeFilter !== "all-types") && (
                  <button 
                    className={styles.clearFiltersButton}
                    onClick={clearFilters}
                    title="Clear all filters"
                  >
                    Clear Filters
                  </button>
                )}
              </div> */}
              <div className={styles.categoriesPanel}>
                <div className={styles.categoriesList}>
                {CATEGORIES.map((category) => (
                  <div key={category.name} className={styles.categoryItem}>
                    <button
                      className={`${styles.categoryButton} ${
                        selectedCategory === category.name ? styles.selected : ""
                      }`}
                      onClick={() => {
                        toggleCategory(category.name);
                        handleCategoryClick(category.name);
                      }}
                      aria-expanded={expandedCategories.has(category.name)}
                    >
                      {category.subcategories.length > 0 && (
                        <span className={styles.categoryIcon}>
                          {expandedCategories.has(category.name) ? 
                          <DownArrow /> : <div className={styles.upArrowIcon}><DownArrow /></div>}
                        </span>
                      )}
                      <span className={styles.categoryName}>{category.name}</span>
                    </button>
                    {category.subcategories.length > 0 && expandedCategories.has(category.name) && (
                      <div className={styles.subcategories}>
                        {category.subcategories.map((sub) => (
                          <button 
                            key={sub} 
                            className={`${styles.subcategoryButton} ${
                              selectedCategory === `${category.name}-${sub}` ? styles.selected : ""
                            }`}
                            onClick={() => handleSubcategoryClick(category.name, sub)}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                </div>
              </div>
            </div>
          )}
          
          <div className={styles.templatesArea}>
            <div className={styles.templatesContainer}>
              {isLoading ? (
                <div className={styles.loadingState}>
                  <p>Loading templates...</p>
                </div>
              ) : filteredTemplates.length > 0 ? (
                filteredTemplates.slice(0, displayedCount).map((flow) => {
                  const template: Template = {
                    id: flow.slug,
                    slug: flow.slug,
                    title: flow.title,
                    summary: flow.shortDescription,
                    thumbnailUrl: "/images/card-1.webp",
                    segments: [],
                    methodologies: [],
                    badges: ["openai"],
                    updatedAt: flow.updatedAt || "2025-01-01T00:00:00Z",
                  };
                  return (
                    <TemplateCard
                      key={flow.slug}
                      template={template}
                      iconType={flow.iconType}
                      footerTags={[flow.category, flow.subcategory]}
                    />
                  );
                })
              ) : (
                <div className={styles.emptyState}>
                  <p>No templates found matching your criteria.</p>
                </div>
              )}
            </div>
            {/* Show View More button only if there are more templates to display */}
            {filteredTemplates.length > 6 && displayedCount < filteredTemplates.length && (
              <div className={styles.viewMoreContainer}>
                <button
                  className={styles.viewMoreButton}
                  onClick={handleViewMore}
                  title="Load more templates"
                >
                  View More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseTemplates;