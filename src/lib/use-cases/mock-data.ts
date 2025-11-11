// Use Cases Mock Data
// Updated with 13 templates from team

import { Category, Template } from './types';

// Re-export types for easier imports
export type { Category, Template } from './types';

export const mockCategories: Category[] = [
  {
    slug: "customer-support-operations",
    name: "Customer Support & Operations",
    description: "Use cases and flows for Customer Support & Operations.",
    templates_count: 2,
    last_updated: "2025-01-15",
    featured_templates: [
      "use-langflow-to-process-and-classify-call-transcripts",
      "use-langflow-to-analyze-and-classify-support-tickets"
    ]
  },
  {
    slug: "document-intelligence",
    name: "Document Intelligence",
    description: "Use cases and flows for Document Intelligence.",
    templates_count: 3,
    last_updated: "2025-01-15",
    featured_templates: [
      "use-langflow-to-split-label-and-classify-file-chunks-automatically",
      "use-langflow-to-extract-structured-data-from-unstructured-documents",
      "use-langflow-to-create-concise-document-summaries-and-overviews"
    ]
  },
  {
    slug: "data-analytics-augmentation",
    name: "Data & Analytics Augmentation",
    description: "Use cases and flows for Data & Analytics Augmentation.",
    templates_count: 3,
    last_updated: "2025-01-15",
    featured_templates: [
      "use-langflow-to-analyze-files-and-extract-insights-automatically",
      "use-langflow-to-summarize-github-metrics-from-bigquery",
      "use-langflow-to-fetch-stock-data-and-generate-an-ai-summary"
    ]
  },
  {
    slug: "web-workflow-automation",
    name: "Web & Workflow Automation",
    description: "Use cases and flows for Web & Workflow Automation.",
    templates_count: 1,
    last_updated: "2025-01-15",
    featured_templates: [
      "use-langflow-to-manage-communication-and-information-tasks"
    ]
  },
  {
    slug: "sales-marketing-automation",
    name: "Sales & Marketing Automation",
    description: "Use cases and flows for Sales & Marketing Automation.",
    templates_count: 1,
    last_updated: "2025-01-15",
    featured_templates: [
      "use-langflow-to-enrich-calendar-meetings-automatically"
    ]
  },
  {
    slug: "agentic-rag",
    name: "Agentic RAG",
    description: "Use cases and flows for Agentic RAG systems.",
    templates_count: 2,
    last_updated: "2025-01-15",
    featured_templates: [
      "use-langflow-to-classify-and-route-uploaded-files",
      "use-langflow-to-implement-web-based-rag-for-article-processing"
    ]
  }
];

export const mockTemplates: Template[] = [
  {
    slug: "use-langflow-to-process-and-classify-call-transcripts",
    topic: "Use Langflow to process and classify call transcripts.",
    summary: "Build an automated call transcription and classification system using Langflow that converts audio files into structured data with AI-powered analysis for topic, sentiment, resolution status, and urgency labeling.",
    category: [
      "customer-support-operations"
    ],
    mapped_use_cases: [
      "Build an automated call transcription and classification system using Langflow that converts audio files into structured data with AI-powered analysis for topic, sentiment, resolution status, and urgency labeling."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Langflow Team",
      url: "https://docs.google.com/document/d/1bRrPVdnULWR8Hsk89rlsVofm_9zvClZvl7mtQJjMDos",
    },
    updated_at: "2025-01-15",
    example: {
      input: "Audio files",
      output: "Structured data with topic, sentiment, resolution status, and urgency labeling",
    },
    flow: {
      json_url: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/business_funcions/customer_support_operations/call_classification_analytics/call_classification_analytics.json",
      image_url: "https://cdn.langflow.org/templates/call-classification-analytics.png",
      version: "1.0.0",
    },
    comment: "Automated call transcription and classification system",
    line_number: 2
  },
  {
    slug: "use-langflow-to-split-label-and-classify-file-chunks-automatically",
    topic: "Use Langflow to split, label, and classify file chunks automatically.",
    summary: "Automate document processing with this Langflow workflow that ingests files, splits them into chunks, and uses AI-powered classification to systematically categorize each text segment. Build the entire pipeline through drag-and-drop components without extensive coding.",
    category: [
      "document-intelligence"
    ],
    mapped_use_cases: [
      "Automate document processing with this Langflow workflow that ingests files, splits them into chunks, and uses AI-powered classification to systematically categorize each text segment. Build the entire pipeline through drag-and-drop components without extensive coding."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Langflow Team",
      url: "https://docs.google.com/document/d/1NFCP0mDIZymJ-OACiQN9mF7-RWPszKvdCo7KtGe4tGQ",
    },
    updated_at: "2025-01-15",
    example: {
      input: "Files",
      output: "Categorized text segments",
    },
    flow: {
      json_url: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/ai_patterns/document_intelligence/chunk_classification/chunk_classification.json",
      image_url: "https://cdn.langflow.org/templates/chunk-classification.png",
      version: "1.0.0",
    },
    comment: "Automated document chunking and classification workflow",
    line_number: 3
  },
  {
    slug: "use-langflow-to-analyze-files-and-extract-insights-automatically",
    topic: "Use Langflow to analyze files and extract insights automatically.",
    summary: "Automated document analysis assistant built with Langflow that processes uploaded files, extracts insights through natural language queries, and performs mathematical calculations on document data without manual review.",
    category: [
      "data-analytics-augmentation"
    ],
    mapped_use_cases: [
      "Automated document analysis assistant built with Langflow that processes uploaded files, extracts insights through natural language queries, and performs mathematical calculations on document data without manual review."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Langflow Team",
      url: "https://docs.google.com/document/d/1EwJv91x80s08EI4OZe7ba9rKvwlCi-Y3TGEok6FN6tM",
    },
    updated_at: "2025-01-15",
    example: {
      input: "Uploaded files",
      output: "Extracted insights and calculations",
    },
    flow: {
      json_url: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/business_funcions/data_and_analytics_augmentation/csv_query_assistant/csv_query_assistant.json",
      image_url: "https://cdn.langflow.org/templates/csv-query-assistant.png",
      version: "1.0.0",
    },
    comment: "Automated file analysis and insight extraction assistant",
    line_number: 4
  },
  {
    slug: "use-langflow-to-extract-structured-data-from-unstructured-documents",
    topic: "Use Langflow to extract structured data from unstructured documents.",
    summary: "Transform unstructured documents like PDFs, emails, and web pages into structured, machine-readable data using Langflow's visual, low-code approach. Build automated document processing pipelines for contracts, invoices, resumes, and financial reports with AI-powered extraction and validation.",
    category: [
      "document-intelligence"
    ],
    mapped_use_cases: [
      "Transform unstructured documents like PDFs, emails, and web pages into structured, machine-readable data using Langflow's visual, low-code approach. Build automated document processing pipelines for contracts, invoices, resumes, and financial reports with AI-powered extraction and validation."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Langflow Team",
      url: "https://docs.google.com/document/d/1zu1Czx-Hp0U33ruyoVhAuptoxSE1FoQ6EZO617Ey_S0",
    },
    updated_at: "2025-01-15",
    example: {
      input: "Unstructured documents (PDFs, emails, web pages)",
      output: "Structured, machine-readable data",
    },
    flow: {
      json_url: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/ai_patterns/document_intelligence/data_extraction/data_extraction.json",
      image_url: "https://cdn.langflow.org/templates/data-extraction.png",
      version: "1.0.0",
    },
    comment: "Automated structured data extraction from unstructured documents",
    line_number: 5
  },
  {
    slug: "use-langflow-to-manage-communication-and-information-tasks",
    topic: "Use Langflow to manage communication and information tasks.",
    summary: "Build sophisticated communication and information management systems with Langflow's visual drag-and-drop interface. Create automated email management, calendar integration, and reporting pipelines that connect Gmail, Google Calendar, and Outlook through intelligent agents powered by GPT-4o.",
    category: [
      "web-workflow-automation"
    ],
    mapped_use_cases: [
      "Build sophisticated communication and information management systems with Langflow's visual drag-and-drop interface. Create automated email management, calendar integration, and reporting pipelines that connect Gmail, Google Calendar, and Outlook through intelligent agents powered by GPT-4o."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Langflow Team",
      url: "https://docs.google.com/document/d/1O78qJQ8ou70nzu33cs4hT70YJo0a4Wn1FdeBhZ4cnqI",
    },
    updated_at: "2025-01-15",
    example: {
      input: "Emails and calendar events",
      output: "Automated management and reporting",
    },
    flow: {
      json_url: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/ai_patterns/web_%26_workflow_automation/email_calendar_integration/email_calendar_integration.json",
      image_url: "https://cdn.langflow.org/templates/email-calendar-integration.png",
      version: "1.0.0",
    },
    comment: "Communication and information management automation",
    line_number: 6
  },
  {
    slug: "use-langflow-to-create-concise-document-summaries-and-overviews",
    topic: "Use Langflow to create concise document summaries and overviews.",
    summary: "Build document summarization workflows in Langflow using visual drag-and-drop components to automatically generate concise overviews from files, URLs, and APIs. Create production-ready pipelines with vector storage, structured outputs, and automated processing without complex coding.",
    category: [
      "document-intelligence"
    ],
    mapped_use_cases: [
      "Build document summarization workflows in Langflow using visual drag-and-drop components to automatically generate concise overviews from files, URLs, and APIs. Create production-ready pipelines with vector storage, structured outputs, and automated processing without complex coding."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Langflow Team",
      url: "https://docs.google.com/document/d/1WNB_J_HVo_wOJul3q4KV93mbBm0tjnOgss7tSfH3pEc",
    },
    updated_at: "2025-01-15",
    example: {
      input: "Files, URLs, and APIs",
      output: "Concise document summaries and overviews",
    },
    flow: {
      json_url: "/flows/generate_concise_overviews.json",
      image_url: "https://cdn.langflow.org/templates/generate-concise-overviews.png",
      version: "1.0.0",
    },
    comment: "Automated document summarization workflow",
    line_number: 7
  },
  {
    slug: "use-langflow-to-classify-and-route-uploaded-files",
    topic: "Use Langflow to classify and route uploaded files.",
    summary: "Automate document categorization and storage with this Langflow system that intelligently routes uploaded files to separate knowledge bases based on content analysis, eliminating manual sorting for HR, legal, and business documents.",
    category: [
      "agentic-rag"
    ],
    mapped_use_cases: [
      "Automate document categorization and storage with this Langflow system that intelligently routes uploaded files to separate knowledge bases based on content analysis, eliminating manual sorting for HR, legal, and business documents."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Langflow Team",
      url: "https://docs.google.com/document/d/1WuiH_brH6hDPj07tJjr22rs8pO5jMczVrw9WCh0yg7M",
    },
    updated_at: "2025-01-15",
    example: {
      input: "Uploaded files",
      output: "Files routed to appropriate knowledge bases",
    },
    flow: {
      json_url: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/ai_patterns/agentic_rag/ingestion_router/ingestion_router.json",
      image_url: "https://cdn.langflow.org/templates/ingestion-router.png",
      version: "1.0.0",
    },
    comment: "Automated file classification and routing system",
    line_number: 8
  },
  {
    slug: "use-langflow-to-enrich-calendar-meetings-automatically",
    topic: "Use Langflow to enrich calendar meetings automatically.",
    summary: "Automate sales meeting preparation with this Langflow AI assistant that analyzes calendar events, researches attendee companies, and generates structured briefings with talking points and business intelligence to help sales teams arrive informed at every meeting.",
    category: [
      "sales-marketing-automation"
    ],
    mapped_use_cases: [
      "Automate sales meeting preparation with this Langflow AI assistant that analyzes calendar events, researches attendee companies, and generates structured briefings with talking points and business intelligence to help sales teams arrive informed at every meeting."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Langflow Team",
      url: "https://docs.google.com/document/d/1DfUZ49Zei9-GD5g3t4H2GEAe90RZpVelNi7szVAckdQ",
    },
    updated_at: "2025-01-15",
    example: {
      input: "Calendar events",
      output: "Structured briefings with talking points and business intelligence",
    },
    flow: {
      json_url: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/business_funcions/sales_marketing_automation/meeting_preparation/meeting_preparation.json",
      image_url: "https://cdn.langflow.org/templates/meeting-preparation.png",
      version: "1.0.0",
    },
    comment: "Automated calendar meeting enrichment system",
    line_number: 9
  },
  {
    slug: "use-langflow-to-summarize-github-metrics-from-bigquery",
    topic: "Use Langflow to summarize GitHub metrics from BigQuery.",
    summary: "Execute SQL queries against Google's public GitHub datasets in BigQuery and generate human-readable development reports using Langflow's visual workflow interface. Build automated analytics pipelines that process commit metrics, contributor statistics, and language distributions without custom coding.",
    category: [
      "data-analytics-augmentation"
    ],
    mapped_use_cases: [
      "Execute SQL queries against Google's public GitHub datasets in BigQuery and generate human-readable development reports using Langflow's visual workflow interface. Build automated analytics pipelines that process commit metrics, contributor statistics, and language distributions without custom coding."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Langflow Team",
      url: "https://docs.google.com/document/d/1FmoqLMcKAX9LktVje6UqN_TnGAXUAMbrl_c8E68296Y",
    },
    updated_at: "2025-01-15",
    example: {
      input: "BigQuery GitHub datasets",
      output: "Human-readable development reports",
    },
    flow: {
      json_url: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/business_funcions/data_and_analytics_augmentation/multi-source_retrieval/multi-source_retrieval.json",
      image_url: "https://cdn.langflow.org/templates/multi-source-retrieval.png",
      version: "1.0.0",
    },
    comment: "Automated GitHub metrics analysis from BigQuery",
    line_number: 10
  },
  {
    slug: "use-langflow-to-implement-web-based-rag-for-article-processing",
    topic: "Use Langflow to implement web-based RAG for article processing.",
    summary: "Build a RAG system in Langflow that extracts content from web articles and RSS feeds, stores it in vector databases, and provides grounded answers to questions about the content using a visual drag-and-drop interface with minimal coding required.",
    category: [
      "agentic-rag"
    ],
    mapped_use_cases: [
      "Build a RAG system in Langflow that extracts content from web articles and RSS feeds, stores it in vector databases, and provides grounded answers to questions about the content using a visual drag-and-drop interface with minimal coding required."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Langflow Team",
      url: "https://docs.google.com/document/d/1RiRTvN-iCp_qWG0ZTXn7zUn1bnLExqGAZLJT463bswk",
    },
    updated_at: "2025-01-15",
    example: {
      input: "Web articles and RSS feeds",
      output: "Grounded answers to questions about the content",
    },
    flow: {
      json_url: "/flows/rag_article_in_web_with_agent.json",
      image_url: "https://cdn.langflow.org/templates/rag-article-in-web-with-agent.png",
      version: "1.0.0",
    },
    comment: "Web-based RAG system for article processing",
    line_number: 11
  },
  {
    slug: "use-langflow-to-fetch-stock-data-and-generate-an-ai-summary",
    topic: "Use Langflow to fetch stock data and generate an AI summary.",
    summary: "Build a financial market analysis assistant using Langflow that researches companies and stock performance through an AI-powered chat interface. The system uses OpenAI's GPT-4o with Yahoo Finance and web search tools to analyze market data, news impact, and provide structured investment insights for portfolio managers, traders, and financial advisors.",
    category: [
      "data-analytics-augmentation"
    ],
    mapped_use_cases: [
      "Build a financial market analysis assistant using Langflow that researches companies and stock performance through an AI-powered chat interface. The system uses OpenAI's GPT-4o with Yahoo Finance and web search tools to analyze market data, news impact, and provide structured investment insights for portfolio managers, traders, and financial advisors."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Langflow Team",
      url: "https://docs.google.com/document/d/18QZI14-D8FxkPzbqrX5k5bcF96708ArbLj9Tm545QqY",
    },
    updated_at: "2025-01-15",
    example: {
      input: "Company and stock queries",
      output: "Structured investment insights and market analysis",
    },
    flow: {
      json_url: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/business_funcions/data_and_analytics_augmentation/stock_market_analysis/stock_market_analysis.json",
      image_url: "https://cdn.langflow.org/templates/stock-market-analysis.png",
      version: "1.0.0",
    },
    comment: "Financial market analysis assistant",
    line_number: 12
  },
  {
    slug: "use-langflow-to-analyze-and-classify-support-tickets",
    topic: "Use Langflow to analyze and classify support tickets.",
    summary: "Automate support ticket classification with AI-powered analysis that categorizes priority levels, sentiment, and topics from unstructured text using Langflow's visual workflow builder for faster customer service triage.",
    category: [
      "customer-support-operations"
    ],
    mapped_use_cases: [
      "Automate support ticket classification with AI-powered analysis that categorizes priority levels, sentiment, and topics from unstructured text using Langflow's visual workflow builder for faster customer service triage."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Langflow Team",
      url: "https://docs.google.com/document/d/1q0gVs7iGwPb6SddZR1Y50KW3HkjDSNfueuWxWMvSDII",
    },
    updated_at: "2025-01-15",
    example: {
      input: "Support tickets (unstructured text)",
      output: "Categorized tickets by priority, sentiment, and topics",
    },
    flow: {
      json_url: "/flows/ticket_analysis_classification.json",
      image_url: "https://cdn.langflow.org/templates/ticket-analysis-classification.png",
      version: "1.0.0",
    },
    comment: "Automated support ticket classification system",
    line_number: 13
  }
];

// Helper: get templates by either parent topic slug or leaf category slug
export function getTemplatesByCategory(categorySlug: string): Template[] {
  return mockTemplates.filter(t => t.category.includes(categorySlug));
}

// Helper: get top-level category by slug
export function getCategoryBySlug(slug: string): Category | undefined {
  return mockCategories.find(c => c.slug === slug);
}

// Full-text search with optional filters
export function searchTemplates(query: string, filters?: { status?: string[]; difficulty?: string[] }): Template[] {
  let results = mockTemplates;

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(t =>
      t.topic.toLowerCase().includes(q) ||
      t.summary.toLowerCase().includes(q) ||
      t.mapped_use_cases.some(uc => uc.toLowerCase().includes(q)) ||
      (t.comment && t.comment.toLowerCase().includes(q)) ||
      t.category.some(c => c.toLowerCase().includes(q))
    );
  }

  if (filters?.status?.length) {
    results = results.filter(t => filters.status!.includes(t.status));
  }

  if (filters?.difficulty?.length) {
    results = results.filter(t => filters.difficulty!.includes(t.difficulty));
  }

  return results;
}

// Get template by slug
export function getTemplateBySlug(slug: string): Template | null {
  return mockTemplates.find(t => t.slug === slug) || null;
}

// Helper functions
export function getAllCategories(): Category[] {
  return mockCategories;
}
