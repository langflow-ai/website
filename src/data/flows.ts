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
    slug: "crm-data-enrichment",
    title: "CRM Data Enrichment",
    topic: "Workflow Automation",
    shortDescription:
      "Automates CRM data entry processes with intelligent form filling and validation.",
    iconType: "automation",
    category: "Sales & Marketing Automation",
    subcategory: "Workflow Automation",
    type: "automation",
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/9e15c125-463a-4815-bd55-b52b55f57b12?embed=true",
    githubDownloadUrl: "/flows/crm_data_enrichment.json",
    updatedAt: "2025-11-01T00:00:00Z",
    clicks: 450
  },
  {
    slug: "call-classification-analytics",
    title: "Call Classification Analytics",
    topic: "Customer Support",
    shortDescription:
      "Automatically convert audio to text, detect sentiment, and classify calls by topic, resolution, and urgency.",
    iconType: "support",
    category: "Business Functions",
    subcategory: "Customer Support Operations",
    type: "classification",
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/9e15c125-463a-4815-bd55-b52b55f57b12?embed=true",
    githubDownloadUrl: "/flows/call_classification_analytics.json",
    updatedAt: "2025-11-02T00:00:00Z",
    clicks: 580
  },
  {
    slug: "chunk-classifier",
    title: "Chunk Classifier",
    topic: "Knowledge bases",
    shortDescription:
      "Split any file into smaller parts and label each chunk automatically, returning a clean JSON output with text + classifications.",
    iconType: "research",
    category: "Document Intelligence",
    subcategory: "Knowledge bases",
    type: "classification",
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/9e15c125-463a-4815-bd55-b52b55f57b12?embed=true",
    githubDownloadUrl: "/flows/chunk_classifier.json",
    updatedAt: "2025-11-03T00:00:00Z",
    clicks: 720
  },
  {
    slug: "talk-to-csv",
    title: "Talk to CSV",
    topic: "Data Analytics",
    shortDescription:
      "Upload files and let an AI agent read, analyze, and extract insights from them—no manual searching needed.",
    iconType: "research",
    category: "Data and Analytics Augmentation",
    subcategory: "Data Analytics",
    type: "research",
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/9e15c125-463a-4815-bd55-b52b55f57b12?embed=true",
    githubDownloadUrl: "/flows/talk_to_csv.json",
    updatedAt: "2025-11-04T00:00:00Z",
    clicks: 890
  },
  {
    slug: "file-data-extractor",
    title: "File Data Extractor",
    topic: "Legal, B2B, Compliance, Automation",
    shortDescription:
      "Extracts structured data from unstructured documents like contracts and purchase orders.",
    iconType: "automation",
    category: "Document Processing",
    subcategory: "Data Extraction & Structuring",
    type: "automation",
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/9e15c125-463a-4815-bd55-b52b55f57b12?embed=true",
    githubDownloadUrl: "/flows/file_data_extractor.json",
    updatedAt: "2025-11-05T00:00:00Z",
    clicks: 630
  },
  {
    slug: "email-calendar-ai-assistant",
    title: "Email & Calendar AI Assistant",
    topic: "Workflow Automation",
    shortDescription:
      "An AI agent that can read, create, summarize, extract information, answer questions, and manage your inbox and calendar for you.",
    iconType: "automation",
    category: "Web & Workflow Automation",
    subcategory: "Workflow Automation",
    type: "automation",
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/9e15c125-463a-4815-bd55-b52b55f57b12?embed=true",
    githubDownloadUrl: "/flows/email_calendar_ai_assistant.json",
    updatedAt: "2025-11-06T00:00:00Z",
    clicks: 1050
  },
  {
    slug: "smart-document-ingestion-router",
    title: "Smart Document Ingestion Router",
    topic: "AI/ML",
    shortDescription:
      "Upload files and let an AI agent classify and route each one to the right destination based on its content.",
    iconType: "automation",
    category: "Data Processing & Automation",
    subcategory: "Agentic RAG",
    type: "automation",
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/9e15c125-463a-4815-bd55-b52b55f57b12?embed=true",
    githubDownloadUrl: "/flows/smart_document_ingestion_router.json",
    updatedAt: "2025-11-07T00:00:00Z",
    clicks: 780
  },
  {
    slug: "smart-meeting-research",
    title: "Smart Meeting Research",
    topic: "Sales, Partnerships, Consulting, Customer Success, B2B SaaS",
    shortDescription:
      "Automatically enrich calendar meetings with company insights, attendee context, and sales talking points.",
    iconType: "automation",
    category: "Productivity & Automation",
    subcategory: "Sales Intelligence",
    type: "automation",
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/9e15c125-463a-4815-bd55-b52b55f57b12?embed=true",
    githubDownloadUrl: "/flows/smart_meeting_research.json",
    updatedAt: "2025-11-08T00:00:00Z",
    clicks: 920
  },
  {
    slug: "multi-source-github-analytics-agent",
    title: "Multi-Source GitHub Analytics Agent",
    topic: "DevOps / Engineering Intelligence",
    shortDescription:
      "Agent that pulls GitHub metrics from BigQuery and turns them into a natural-language summary.",
    iconType: "research",
    category: "Data and Analytics Augmentation",
    subcategory: "DevOps",
    type: "research",
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/9e15c125-463a-4815-bd55-b52b55f57b12?embed=true",
    githubDownloadUrl: "/flows/multi_source_github_analytics_agent.json",
    updatedAt: "2025-11-09T00:00:00Z",
    clicks: 540
  },
  {
    slug: "sales-proposal-assistant",
    title: "Sales Proposal Assistant",
    topic: "Sales & Marketing",
    shortDescription:
      "Collects requirements, researches context, and builds a ready-to-use sales proposal.",
    iconType: "automation",
    category: "Sales & Marketing Automation",
    subcategory: "Proposal & Collateral Generation",
    type: "automation",
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/9e15c125-463a-4815-bd55-b52b55f57b12?embed=true",
    githubDownloadUrl: "/flows/sales_proposal_assistant.json",
    updatedAt: "2025-11-10T00:00:00Z",
    clicks: 670
  },
  {
    slug: "ai-stock-analysis-assistant",
    title: "AI Stock Analysis Assistant",
    topic: "Financial Services",
    shortDescription:
      "Fetch real market data for any stock ticker and generate an AI-powered analytical summary.",
    iconType: "research",
    category: "Data and Analytics Augmentation",
    subcategory: "Financial Services",
    type: "research",
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/9e15c125-463a-4815-bd55-b52b55f57b12?embed=true",
    githubDownloadUrl: "/flows/ai_stock_analysis_assistant.json",
    updatedAt: "2025-11-11T00:00:00Z",
    clicks: 810
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
    "Sales & Marketing Automation",
    "Business Functions",
    "Document Intelligence",
    "Data and Analytics Augmentation",
    "Document Processing",
    "Web & Workflow Automation",
    "Data Processing & Automation",
    "Productivity & Automation"
  ];
  // Return only categories that exist in flows, in the specified order
  return orderedCategories.filter(cat => categories.has(cat));
}
