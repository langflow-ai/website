// Use Cases Types and Interfaces

export type TemplateStatus = 'DONE' | 'IMPROVED' | 'STILL LIMITED' | 'NOT POSSIBLE';
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Category {
  slug: string;
  name: string;
  description: string;
  templates_count: number;
  last_updated: string;
  featured_templates: string[];
}

export interface Template {
  slug: string;
  topic: string;
  title: string; // Display title (may differ from topic)
  summary: string;
  shortDescription?: string; // Alternative short description
  category: string[]; // Array of category slugs
  categoryDisplay?: string; // Display category name (e.g., "Sales", "Business")
  subcategory?: string; // Subcategory name
  mapped_use_cases: string[];
  status: TemplateStatus;
  difficulty: DifficultyLevel;
  type?: "automation" | "research" | "classification"; // Flow type
  iconType?: "basic" | "robot" | "automation" | "research" | "support"; // Icon type for display
  builder: {
    name: string;
    url?: string;
  };
  updated_at: string;
  updatedAt?: string; // ISO date format for sorting
  example: {
    input: string;
    output: string;
  };
  flow: {
    json_url: string;
    image_url: string;
    version: string;
  };
  iframeSrc?: string; // URL for iframe embedding
  githubDownloadUrl?: string; // URL for downloading the flow JSON
  clicks?: number; // Popularity weight for sorting
  comment?: string;
  line_number?: number; // Line number from spreadsheet for quick reference
  // Detailed content for template detail page
  introText?: string; // Introduction/summary text
  howItWorks?: string; // "How it works" section text block
  exampleUseCases?: string[]; // List of example use cases
  extendingText?: string; // Text about extending the flow
}

export interface SearchFilters {
  status?: TemplateStatus[];
  difficulty?: DifficultyLevel[];
  updated_after?: string;
  search?: string;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TemplatesResponse {
  templates: Template[];
  pagination: PaginationInfo;
  filters: SearchFilters;
}

// Status badge colors mapping
export const STATUS_COLORS: Record<TemplateStatus, string> = {
  'DONE': '#10B981',           // Green
  'IMPROVED': '#3B82F6',       // Blue
  'STILL LIMITED': '#F59E0B',  // Amber
  'NOT POSSIBLE': '#6B7280'    // Gray
};

// Difficulty badge colors mapping
export const DIFFICULTY_COLORS: Record<DifficultyLevel, string> = {
  'Beginner': '#10B981',       // Green
  'Intermediate': '#F59E0B',   // Amber
  'Advanced': '#EF4444'        // Red
};

// Sort options
export const SORT_OPTIONS: SortOption[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'updated', label: 'Recently Updated' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'difficulty', label: 'Difficulty' }
];
