export type Flow = {
  slug: string;
  title: string;
  topic: string;
  shortDescription: string;
  iconType: "basic" | "robot" | "automation" | "research" | "support";
  category: string;
  subcategory: string;
  type: "automation" | "research" | "classification";
  iframeSrc: string;
  githubDownloadUrl: string;
  updatedAt?: string; // ISO date used for sorting by recency
  clicks?: number;    // popularity weight used for sorting by popularity
};

export const FLOWS: Flow[] = [
  {
    slug: "basic-prompting",
    title: "Basic Prompting",
    topic: "Prompt Engineering",
    shortDescription:
      "Learn the fundamentals of prompt engineering with this interactive template. Perfect for beginners starting their AI journey.",
    iconType: "basic",
    category: "Getting Started",
    subcategory: "Prompt Engineering",
    type: "automation",
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/9e15c125-463a-4815-bd55-b52b55f57b12?embed=true",
    githubDownloadUrl: "/flows/basic_prompting.json",
    // Fixed date: Oct 20
    updatedAt: "2025-10-20T00:00:00Z",
    clicks: 300
  },
  {
    slug: "changelog-summarizer-github-release-notes",
    title: "Changelog Summarizer",
    topic: "Changelog Automation",
    shortDescription:
      "Ingest commits, PRs, and issues from GitHub and generate release notes in Markdown and HTML with breaking changes.",
    iconType: "automation",
    category: "Development",
    subcategory: "Release Management",
    type: "automation",
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/8eb64311-0d80-40ee-a7b6-b3328f8ee5a3?embed=true",
    githubDownloadUrl: "/flows/generate_concise_overviews.json",
    // Fixed date: Oct 21
    updatedAt: "2025-10-21T00:00:00Z",
    clicks: 600
  },
  {
    slug: "personal-research-assistant-agentic-rag",
    title: "Research Assistant",
    topic: "Agentic RAG Research",
    shortDescription:
      "Index PDFs, notes, and web pages and respond with citations. Agent coordinates retrieve, verify, and cite with RAG.",
    iconType: "research",
    category: "Research",
    subcategory: "Document Analysis",
    type: "research",
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/eb618c7b-38c1-4bf1-91ee-9ddc77cc431d?embed=true",
    githubDownloadUrl: "/flows/rag_article_in_web_with_agent.json",
    // Fixed date: Oct 22
    updatedAt: "2025-10-22T00:00:00Z",
    clicks: 1200
  },
  {
    slug: "support-ticket-auto-labeling-routing",
    title: "Ticket Auto-Labeling",
    topic: "Ticket Classification",
    shortDescription:
      "Classify tickets by theme, product, and urgency and apply routing to the right team.",
    iconType: "support",
    category: "Customer Support",
    subcategory: "Ticket Management",
    type: "classification",
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/4a0a22de-bd71-4840-991c-ca5cc07a8b16?embed=true",
    githubDownloadUrl: "/flows/ticket_analysis_classification.json",
    // Fixed date: Oct 23
    updatedAt: "2025-10-23T00:00:00Z",
    clicks: 150
  }
];

// Helper function to get flow by slug
export function getFlowBySlug(slug: string): Flow | null {
  return FLOWS.find(flow => flow.slug === slug) || null;
}

// Helper function to check if a URL is a placeholder
export function isPlaceholderUrl(url: string): boolean {
  return url.includes('YOURORG') || url.includes('TAG') || url.includes('YOUR-LANGFLOW-HOST');
}

// Helper function to get unique categories from flows
export function getCategoriesFromFlows(): Array<{name: string, subcategories: string[]}> {
  const categoryMap = new Map<string, Set<string>>();
  
  FLOWS.forEach(flow => {
    if (!categoryMap.has(flow.category)) {
      categoryMap.set(flow.category, new Set());
    }
    categoryMap.get(flow.category)!.add(flow.subcategory);
  });
  
  return Array.from(categoryMap.entries()).map(([name, subcategories]) => ({
    name,
    subcategories: Array.from(subcategories)
  }));
}

// Helper function to get unique types from flows
export function getTypesFromFlows(): Array<{value: string, label: string}> {
  const types = new Set<string>();
  FLOWS.forEach(flow => types.add(flow.type));
  
  return [
    { value: "all-types", label: "All Types" },
    ...Array.from(types).map(type => ({
      value: type,
      label: type.charAt(0).toUpperCase() + type.slice(1)
    }))
  ];
}

// Helper function to get top-level categories (for Hero CategoryBar)
// Returns categories in a consistent order matching BrowseTemplates
export function getTopLevelCategories(): string[] {
  const categories = new Set<string>();
  FLOWS.forEach(flow => categories.add(flow.category));
  // Return in a specific order to match BrowseTemplates CATEGORY_FILTERS
  const orderedCategories = [
    "Getting Started",
    "Development", 
    "Research",
    "Customer Support"
  ];
  // Return only categories that exist in flows, in the specified order
  return orderedCategories.filter(cat => categories.has(cat));
}
