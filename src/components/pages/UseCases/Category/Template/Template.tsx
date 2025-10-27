"use client";

import { BackgroundGradient } from "@/components/BackgroundGradient";
import Button from "@/components/ui/button";
import { ButtonTypes } from "@/components/ui/button/types";
import Display from "@/components/ui/Display";
import ImportModal from "@/components/ui/ImportModal";
import { getCategoryBySlug, getTemplatesByCategory, searchTemplates } from "@/lib/use-cases/mock-data";
import { DifficultyLevel, Template, TemplateStatus } from "@/lib/use-cases/types";
import { useMemo, useState } from "react";
import { BackLink, ContentSection, EmptyState, HeroSection, SearchInput, SearchSection, TemplateCard } from "../../shared";
import styles from "./styles.module.scss";

interface CategoryTemplateProps {
  slug: string;
}

const CategoryTemplate = ({ slug }: CategoryTemplateProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TemplateStatus[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyLevel[]>([]);
  const [sortBy, setSortBy] = useState<"relevance" | "updated" | "difficulty">("relevance");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const category = getCategoryBySlug(slug);
  
  if (!category) {
    return (
      <>
        <BackgroundGradient />
        <section className="container py-5">
          <div className="row">
            <div className="col text-center">
              <Display size={600} tagName="h1" className="mb-3">
                Category Not Found
              </Display>
              <p className="mb-4">The requested category could not be found.</p>
              <Button variant={ButtonTypes.BORDER} href="/use-cases/categories">
                Browse All Categories
              </Button>
            </div>
          </div>
        </section>
      </>
    );
  }

  const allTemplates = getTemplatesByCategory(slug);
  
  const filteredAndSortedTemplates = useMemo(() => {
    let filtered = allTemplates;

    // Apply search filter
    if (searchQuery) {
      filtered = searchTemplates(searchQuery, { status: statusFilter, difficulty: difficultyFilter });
      filtered = filtered.filter(template => template.category.includes(slug));
    } else {
      // Apply other filters
      if (statusFilter.length > 0) {
        filtered = filtered.filter(template => statusFilter.includes(template.status));
      }
      if (difficultyFilter.length > 0) {
        filtered = filtered.filter(template => difficultyFilter.includes(template.difficulty));
      }
    }

    // Sort templates
    switch (sortBy) {
      case "updated":
        return filtered.sort((a, b) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      case "difficulty":
        const difficultyOrder = { "Beginner": 0, "Intermediate": 1, "Advanced": 2 };
        return filtered.sort((a, b) => 
          difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        );
      case "relevance":
      default:
        return filtered;
    }
  }, [allTemplates, searchQuery, statusFilter, difficultyFilter, sortBy, slug]);

  const handleStatusFilter = (status: TemplateStatus) => {
    setStatusFilter(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handleDifficultyFilter = (difficulty: DifficultyLevel) => {
    setDifficultyFilter(prev => 
      prev.includes(difficulty) 
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter([]);
    setDifficultyFilter([]);
  };

  return (
    <>
      <BackgroundGradient />
      
      {/* Header Section */}
      <HeroSection
        title={category.name}
        description={category.description}
      >
        <div className="position-relative">
          <BackLink href="/use-cases/categories">
            ← Back to Categories  
          </BackLink>
        </div>  
      </HeroSection>

      {/* Search and Filters */}
      <SearchSection>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <SearchInput
              placeholder="Search templates in this category..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
        </div>
        
        {/* Filter Chips */}
        <div className="row">
          <div className="col">
            <div className={styles.filterChips}>
              {searchQuery && (
                <button
                  onClick={clearFilters}
                  className={styles.clearFilters}
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        </div>
      </SearchSection>

      {/* Templates Grid */}
      <ContentSection>
        {filteredAndSortedTemplates.length === 0 ? (
          <EmptyState
            title="No templates found"
            description="Try adjusting your search terms or filters."
            buttonText="Clear Filters"
            onButtonClick={clearFilters}
          />
        ) : (
          <div className="row g-4">
            {filteredAndSortedTemplates.map((template) => (
              <div key={template.slug} className="col-lg-6 col-12">
                <TemplateCard
                  template={template}
                  onOpenInLangflow={(template) => {
                    setSelectedTemplate(template);
                    setIsImportModalOpen(true);
                  }}
                  onViewDetails={(slug) => {
                    // Handle view details
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </ContentSection>

      {/* Import Modal */}
      <ImportModal
        template={selectedTemplate}
        isOpen={isImportModalOpen}
        onClose={() => {
          setIsImportModalOpen(false);
          setSelectedTemplate(null);
        }}
      />
    </>
  );
};

export default CategoryTemplate;
