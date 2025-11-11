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
  summary: string;
  category: string[];
  mapped_use_cases: string[];
  status: TemplateStatus;
  difficulty: DifficultyLevel;
  builder: {
    name: string;
    url?: string;
  };
  updated_at: string;
  example: {
    input: string;
    output: string;
  };
  flow: {
    json_url: string;
    image_url: string;
    version: string;
  };
  comment?: string;
  line_number?: number; // Line number from spreadsheet for quick reference
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
