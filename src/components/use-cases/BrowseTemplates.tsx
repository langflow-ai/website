"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import DownArrow from "../icons/downArrow/DownArrow";
import TemplateCard from "../pages/UseCases/BeginnerBasics/TemplateCard";
import styles from "./BrowseTemplates.module.scss";

interface BrowseTemplatesProps {
  className?: string;
}

type FilterType = "all-types" | "automation" | "chat";

const FILTER_TYPES = [
  { value: "all-types", label: "All Types" },
  { value: "automation", label: "Automation" },
  { value: "chat", label: "Chat" },
];

const MOCK_TEMPLATES = [
  {
    id: "1",
    name: "Memory Chatbot",
    description: "Create a chatbot that saves and references previous messages.",
    categories: ["Category", "Sub-category"],
    iconType: "robot" as const,
    slug: "memory-chatbot"
  },
  {
    id: "2",
    name: "Basic Prompting",
    description: "Perform basic prompting with an OpenAI model.",
    categories: ["Category", "Sub-category"],
    iconType: "basic" as const,
    slug: "basic-prompting"
  },
  {
    id: "3",
    name: "Advanced Chatbot",
    description: "Create an advanced chatbot with memory and context.",
    categories: ["Category", "Sub-category"],
    iconType: "robot" as const,
    slug: "advanced-chatbot"
  },
  {
    id: "4",
    name: "Content Generator",
    description: "Generate content using AI models.",
    categories: ["Category", "Sub-category"],
    iconType: "basic" as const,
    slug: "content-generator"
  },
  {
    id: "5",
    name: "Data Processor",
    description: "Process and analyze data with AI assistance.",
    categories: ["Category", "Sub-category"],
    iconType: "robot" as const,
    slug: "data-processor"
  },
  {
    id: "6",
    name: "Email Assistant",
    description: "AI-powered email management and responses.",
    categories: ["Category", "Sub-category"],
    iconType: "basic" as const,
    slug: "email-assistant"
  },
];

const CATEGORIES = [
  {
    name: "Category 1",
    expanded: false,
    subcategories: ["Sub-category 1", "Sub-category 2", "Sub-category 3"],
  },
  {
    name: "Category 2",
    expanded: true,
    subcategories: [
      "Sub-category 1",
      "Sub-category 2", 
      "Sub-category 3",
    ],
  },
  {
    name: "Category 3",
    expanded: false,
    subcategories: ["Sub-category 1", "Sub-category 2"],
  },
  {
    name: "Category 4",
    expanded: false,
    subcategories: ["Sub-category 1", "Sub-category 2"],
  },
  {
    name: "Category 5",
    expanded: false,
    subcategories: ["Sub-category 1", "Sub-category 2"],
  },
  {
    name: "Category 6",
    expanded: false,
    subcategories: ["Sub-category 1", "Sub-category 2"],
  },
];

const BrowseTemplates: React.FC<BrowseTemplatesProps> = ({ className = "" }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all-types");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("most-recent");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["Category 2"]));
  const [isMobile, setIsMobile] = useState(false);
  const [selectedType, setSelectedType] = useState("all-types");
  const [selectedCategory, setSelectedCategory] = useState("all-categories");

  // Check if mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
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
    setSelectedCategory(e.target.value);
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

  // Filter templates based on active filter and search query
  const filteredTemplates = MOCK_TEMPLATES.filter((template) => {
    const matchesFilter = activeFilter === "all-types" || 
      (activeFilter === "automation" && template.iconType === "basic") ||
      (activeFilter === "chat" && template.iconType === "robot");
    
    const matchesSearch = searchQuery === "" || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <section className={`${styles.browseTemplates} ${className}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Browse templates</h2>
          
          {/* Desktop Layout */}
          {!isMobile && (
            <>
              <div className={styles.searchAndFilters}>
                <div className={styles.searchContainer}>
                  <input
                    type="text"
                    placeholder="Search use cases, methodology, integrations..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                  />
                </div>
                
                <div className={styles.filterPills}>
                  {FILTER_TYPES.map((filter) => (
                    <button
                      key={filter.value}
                      className={`${styles.filterPill} ${
                        activeFilter === filter.value ? styles.active : ""
                      } ${filter.value === "all-types" ? styles.allTypes : ""}`}
                      onClick={() => handleFilterChange(filter.value as FilterType)}
                    >
                      {filter.value === "automation" && (
                        <Image
                          src="/images/robot.png"
                          alt="Automation"
                          width={24}
                          height={24}
                        />
                      )}
                      {filter.value === "chat" && (
                        <Image
                          src="/images/chat.png"
                          alt="Chat"
                          width={24}
                          height={24}
                        />
                      )}
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.resultsAndSort}>
                <div className={styles.resultsCount}>
                  Showing 1 - {filteredTemplates.length} of {MOCK_TEMPLATES.length} results in All Templates
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
                    <option value="all-types">Type: All Types</option>
                    <option value="automation">Automation</option>
                    <option value="chat">Chat</option>
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
                      <option key={category.name} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.mobileResultsAndSort}>
                <div className={styles.mobileResultsCount}>
                  6866 Results
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
              <h3 className={styles.sidebarTitle}>Categories</h3>
              <div className={styles.categoriesPanel}>
                <div className={styles.categoriesList}>
                {CATEGORIES.map((category) => (
                  <div key={category.name} className={styles.categoryItem}>
                    <button
                      className={styles.categoryButton}
                      onClick={() => toggleCategory(category.name)}
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
                          <button key={sub} className={styles.subcategoryButton}>
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
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  title={template.name}
                  description={template.description}
                  categories={template.categories}
                  iconType={template.iconType}
                  slug={template.slug}
                />
              ))}
            </div>
            <div className={styles.viewMoreContainer}>
              <button className={styles.viewMoreButton}>View More</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseTemplates;