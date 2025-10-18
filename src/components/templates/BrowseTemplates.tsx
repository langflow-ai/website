"use client";

import { useState } from "react";
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
    iconType: "robot" as const
  },
  {
    id: "2",
    name: "Basic Prompting",
    description: "Perform basic prompting with an OpenAI model.",
    categories: ["Category", "Sub-category"],
    iconType: "basic" as const
  },
  {
    id: "3",
    name: "Memory Chatbot",
    description: "Create a chatbot that saves and references previous messages.",
    categories: ["Category", "Sub-category"],
    iconType: "robot" as const
  },
  {
    id: "4",
    name: "Basic Prompting",
    description: "Perform basic prompting with an OpenAI model.",
    categories: ["Category", "Sub-category"],
    iconType: "basic" as const
  },
  {
    id: "5",
    name: "Memory Chatbot",
    description: "Create a chatbot that saves and references previous messages.",
    categories: ["Category", "Sub-category"],
    iconType: "robot" as const
  },
  {
    id: "6",
    name: "Basic Prompting",
    description: "Perform basic prompting with an OpenAI model.",
    categories: ["Category", "Sub-category"],
    iconType: "basic" as const
  },
];

const CATEGORIES = [
  {
    name: "Category 1",
    expanded: false,
    subcategories: [],
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
    subcategories: [],
  },
  {
    name: "Category 4",
    expanded: false,
    subcategories: [],
  },
  {
    name: "Category 5",
    expanded: false,
    subcategories: [],
  },
  {
    name: "Category 6",
    expanded: false,
    subcategories: [],
  },
];

const BrowseTemplates: React.FC<BrowseTemplatesProps> = ({ className = "" }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all-types");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("most-recent");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["Category 2"]));

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
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
                    }`}
                    onClick={() => handleFilterChange(filter.value as FilterType)}
                  >
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
        </div>

        <div className={styles.mainContent}>
          <div className={styles.sidebar}>
            <h3 className={styles.sidebarTitle}>Categories</h3>
            <div className={styles.categoriesList}>
              {CATEGORIES.map((category) => (
                <div key={category.name} className={styles.categoryItem}>
                  <button
                    className={styles.categoryButton}
                    onClick={() => toggleCategory(category.name)}
                    aria-expanded={expandedCategories.has(category.name)}
                  >
                    <span className={styles.categoryName}>{category.name}</span>
                    {category.subcategories.length > 0 && (
                      <span className={styles.categoryIcon}>
                        {expandedCategories.has(category.name) ? "▲" : "▼"}
                      </span>
                    )}
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
          
          <div className={styles.templatesArea}>
            <div className={styles.templatesContainer}>
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  title={template.name}
                  description={template.description}
                  categories={template.categories}
                  iconType={template.iconType}
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