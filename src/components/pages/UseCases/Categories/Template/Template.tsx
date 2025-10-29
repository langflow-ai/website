"use client";

import { BackgroundGradient } from "@/components/BackgroundGradient";
import { mockCategories } from "@/lib/use-cases/mock-data";
import { useMemo, useState } from "react";
import { BackLink, CategoryCard, ContentSection, EmptyState, HeroSection, SearchInput, SearchSection } from "../../shared";

const CategoriesTemplate = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"popular" | "templates" | "updated">("popular");

  const filteredAndSortedCategories = useMemo(() => {
    let filtered = mockCategories;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(category => 
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query) ||
        category.featured_templates.some(template => 
          template.toLowerCase().includes(query)
        )
      );
    }

    // Sort categories
    switch (sortBy) {
      case "templates":
        return filtered.sort((a, b) => b.templates_count - a.templates_count);
      case "updated":
        return filtered.sort((a, b) => 
          new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime()
        );
      case "popular":
      default:
        return filtered.sort((a, b) => b.templates_count - a.templates_count);
    }
  }, [searchQuery, sortBy]);

  return (
    <>
      <BackgroundGradient />
      
      {/* Header Section */}
      <HeroSection
        title="Use Cases by Category"
        description="Browse AI workflow templates organized by category. Find the perfect template for your specific use case."
      />

      {/* Search and Filters */}
      <SearchSection>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <SearchInput
              placeholder="Search categories and templates..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
        </div>
      </SearchSection>

      {/* Categories Grid */}
      <ContentSection>
        {filteredAndSortedCategories.length === 0 ? (
          <EmptyState
            title="No categories found"
            description="Try adjusting your search terms or browse all categories."
            buttonText="Clear Search"
            onButtonClick={() => setSearchQuery("")}
          />
        ) : (
          <div className="row g-4">
            {filteredAndSortedCategories.map((category) => (
              <div key={category.slug} className="col-lg-6 col-12">
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        )}
      </ContentSection>

      {/* Back to Use Cases */}
      <ContentSection>
        <div className="text-center">
          <BackLink href="/use-cases">
            ← Back to Use Cases
          </BackLink>
        </div>
      </ContentSection>
    </>
  );
};

export default CategoriesTemplate;
