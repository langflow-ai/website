// Template and Use Cases Types

export type Segment =
  | "agents"
  | "assistants"
  | "classification"
  | "coding"
  | "content-generation"
  | "qna"; // "Q&A" rendered, key "qna"

export type Methodology =
  | "rag"
  | "agents"
  | "prompting-basics"
  | "evaluation"
  | "etl"
  | "integrations";

export type Template = {
  id: string;
  slug: string;
  title: string;                 // ex: "Build Your First AI Agent"
  summary: string;               // short description
  thumbnailUrl?: string;         // optional card cover
  segments: Segment[];           // use-cases
  methodologies: Methodology[];  // methodology
  badges?: string[];             // icons/integrations
  updatedAt: string;             // ISO
  // Dynamic blocks for detail page
  whatYouDo?: string[];
  whatYouLearn?: string[];
  whyItMatters?: string;
  // Classification flags
  isBeginner?: boolean;
  isTrending?: boolean;
};

export type TemplateCollections = {
  beginnerBasics: Template[];
  trending: Template[];
  featured: Template[];
  recentlyAdded: Template[];
};

export type SuggestionGroup = {
  label: "Use case" | "Methodology";
  items: {
    label: string;
    value: string;
    type: "segment" | "methodology";
  }[];
};

export type FilterState = {
  q: string;
  segments: Set<Segment>;
  methodologies: Set<Methodology>;
};

// Segment display labels
export const SEGMENT_LABELS: Record<Segment, string> = {
  agents: "Agents",
  assistants: "Assistants",
  classification: "Classification", 
  coding: "Coding",
  "content-generation": "Content Generation",
  qna: "Q&A"
};

// Methodology display labels
export const METHODOLOGY_LABELS: Record<Methodology, string> = {
  rag: "RAG",
  agents: "Agents",
  "prompting-basics": "Prompting Basics",
  evaluation: "Evaluation",
  etl: "ETL",
  integrations: "Integrations"
};
