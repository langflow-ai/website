"use client";

import { BackgroundGradient } from "@/components/BackgroundGradient";
import Button from "@/components/ui/button";
import { ButtonTypes } from "@/components/ui/button/types";
import { mockCategories } from "@/lib/use-cases/mock-data";
import { CategoryCard, ContentSection, HeroSection } from "../shared";
import styles from "./styles.module.scss";

const UseCasesTemplate = () => {
  return (
    <>
      <BackgroundGradient />
      
      {/* Hero Section */}
      <HeroSection
        title="Use Cases"
        description="Discover AI workflows and templates for every use case. Browse our collection of ready-to-use Langflow templates for customer support, content generation, data analysis, and more."
      >
        <div className={styles.buttonGroup}>
          <Button 
            variant={ButtonTypes.FILLED} 
            href="/use-cases/categories"
            className={styles.primaryButton}
          >
            Browse by Category
          </Button>
          <Button 
            variant={ButtonTypes.BORDER} 
            href="#featured-categories"
            className={styles.secondaryButton}
          >
            View Featured
          </Button>
        </div>
      </HeroSection>

      {/* Featured Categories */}
      <ContentSection id="featured-categories" className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>
          Featured Categories
        </h2>
        <div className="row g-4">
          {mockCategories.slice(0, 6).map((category) => (
            <div key={category.slug} className="col-lg-6 col-12">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </ContentSection>

      {/* All Categories CTA */}
      <HeroSection
        title="Explore All Categories"
        description="Browse our complete collection of AI workflow templates organized by category. Find the perfect template for your specific use case."
        className={styles.ctaSection}
      >
        <Button 
          variant={ButtonTypes.BORDER} 
          href="/use-cases/categories"
          className={styles.ctaButton}
        >
          View All Categories
        </Button>
      </HeroSection>
    </>
  );
};

export default UseCasesTemplate;
