"use client";

import { FLOWS, Flow, getCategoriesFromFlows, getTypesFromFlows } from "@/data/flows";
import { FilterState } from "@/lib/types/templates";
import Image from "next/image";
import { useEffect, useState } from "react";
import DownArrow from "../icons/downArrow/DownArrow";
import TemplateCard from "../pages/UseCases/BeginnerBasics/TemplateCard";
import styles from "./BrowseTemplates.module.scss";

interface BrowseTemplatesProps {
  className?: string;
  initialFilters?: FilterState;
}

type FilterType = "all-types" | "Getting Started" | "Development" | "Research" | "Customer Support";

// Get real categories and types from flows
const FILTER_TYPES = getTypesFromFlows();
const CATEGORIES = getCategoriesFromFlows().map((cat, index) => ({
  name: cat.name,
  expanded: index === 0, // First category expanded by default
  subcategories: cat.subcategories,
}));

// Create category filter buttons with icons
const CATEGORY_FILTERS = [
  { value: "all-types", label: "All Types", icon: null },
  { value: "Getting Started", label: "Getting Started", icon: "basic" },
  { value: "Development", label: "Development", icon: "automation" },
  { value: "Research", label: "Research", icon: "research" },
  { value: "Customer Support", label: "Customer Support", icon: "support" },
];

const BrowseTemplates: React.FC<BrowseTemplatesProps> = ({ className = "", initialFilters }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all-types");
  const [searchQuery, setSearchQuery] = useState(initialFilters?.q || "");
  const [sortBy, setSortBy] = useState("most-recent");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["Getting Started"]));
  const [isMobile, setIsMobile] = useState(false);
  const [selectedType, setSelectedType] = useState("all-types");
  const [selectedCategory, setSelectedCategory] = useState("all-categories");
  const [templates, setTemplates] = useState<Flow[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Flow[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    setFilteredTemplates(FLOWS);
  }, []);

  // Sync search query when initialFilters changes from hero
  useEffect(() => {
    if (initialFilters?.q) {
      setSearchQuery(initialFilters.q);
    }
  }, [initialFilters?.q]);

  // Reset activeFilter to all-types when search query is cleared
  useEffect(() => {
    if (!searchQuery && activeFilter === "all-types") {
      // Keep all-types selected when there's no query
      return;
    }
  }, [searchQuery]);

  // Sync category filter when initialFilters changes from hero
  useEffect(() => {
    if (initialFilters?.categories && initialFilters.categories.size > 0) {
      const firstCategory = Array.from(initialFilters.categories)[0];
      setActiveFilter(firstCategory as FilterType);
      setSelectedCategory(firstCategory);
    }
  }, [initialFilters?.categories]);

  const handleFilterChange = (filter: FilterType) => {
    // If clicking on "All Types" when already selected, do nothing
    if (filter === "all-types" && activeFilter === "all-types") {
      return;
    }
    // If clicking on a specific category, set activeFilter to that category
    if (filter !== "all-types") {
      setActiveFilter(filter);
    }
    // If clicking on "All Types" when another filter is selected, reset to "all-types"
    if (filter === "all-types" && activeFilter !== "all-types") {
      setActiveFilter("all-types");
    }
    setSelectedCategory("all-categories"); // Reset sidebar selection when button is used
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    
    // Filter flows based on category selection
    let filtered = [...templates];
    
    if (value !== "all-categories") {
      if (value.includes("-")) {
        const [category, subcategory] = value.split("-");
        filtered = filtered.filter(flow => 
          flow.category.toLowerCase() === category.toLowerCase() &&
          flow.subcategory.toLowerCase() === subcategory.toLowerCase()
        );
      } else {
        filtered = filtered.filter(flow => 
          flow.category.toLowerCase() === value.toLowerCase()
        );
      }
    }
    
    setFilteredTemplates(filtered);
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
    setActiveFilter("all-types"); // Reset button filter when sidebar is used
  };

  const handleSubcategoryClick = (categoryName: string, subcategoryName: string) => {
    setSelectedCategory(`${categoryName}-${subcategoryName}`);
    setActiveFilter("all-types"); // Reset button filter when sidebar is used
  };

  const clearFilters = () => {
    setSelectedCategory("all-categories");
    setSelectedType("all-types");
    setSearchQuery("");
    setActiveFilter("all-types");
  };

  // Apply additional filtering based on active filter and search query
  useEffect(() => {
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
    
    console.log('Filtering debug:', {
      selectedCategory,
      activeFilter,
      selectedType,
      searchQuery,
      originalCount: templates.length,
      filteredCount: filtered.length,
      filteredTitles: filtered.map(f => f.title)
    });
    
    setFilteredTemplates(filtered);
  }, [templates, searchQuery, selectedType, selectedCategory, activeFilter]);

  return (
    <section id="browse-templates-section" className={`${styles.browseTemplates} ${className}`}>
      <div className={styles.container}>
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
                      {filter.icon === "basic" && (
                        <Image
                          src="/images/basic.png"
                          alt="Basic"
                          width={24}
                          height={24}
                        />
                      )}
                      {filter.icon === "automation" && (
                        <Image
                          src="/images/robot.png"
                          alt="Automation"
                          width={24}
                          height={24}
                        />
                      )}
                      {filter.icon === "research" && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      )}
                      {filter.icon === "support" && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
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
                <div className={styles.mobileSelector}>
                  <select 
                    id="type-select" 
                    className={styles.mobileSelect} 
                    value={selectedType} 
                    onChange={handleTypeChange}
                  >
                    {FILTER_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.mobileSelector}>
                  <select 
                    id="category-select" 
                    className={styles.mobileSelect} 
                    value={selectedCategory} 
                    onChange={handleCategoryChange}
                  >
                    <option value="all-categories">Categories: All Categories</option>
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
                </div>
              </div>

              <div className={styles.mobileResultsAndSort}>
                <div className={styles.mobileResultsCount}>
                  {filteredTemplates.length} Results
                </div>
                <div className={styles.mobileSortContainer}>
                  <span className={styles.mobileSortText}>Most Recent</span>
                  <div className={styles.mobileSortIcon}>
                    <DownArrow />
                  </div>
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
                filteredTemplates.map((flow) => (
                  <TemplateCard
                    key={flow.slug}
                    title={flow.title}
                    description={flow.shortDescription}
                    categories={[flow.category, flow.subcategory]}
                    iconType={flow.iconType}
                    slug={flow.slug}
                  />
                ))
              ) : (
                <div className={styles.emptyState}>
                  <p>No templates found matching your criteria.</p>
                </div>
              )}
            </div>
            {filteredTemplates.length > 0 && (
              <div className={styles.viewMoreContainer}>
                <button className={styles.viewMoreButton}>View More</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseTemplates;