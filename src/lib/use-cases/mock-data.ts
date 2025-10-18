// Auto-generated from spreadsheet "Langflow Use Cases - Cases by Category (2).csv"
// Do not edit manually. Source-of-truth is the sheet.
// Generated on 2025-10-02

import { Category, Template } from './types';

export const mockCategories: Category[] = [
  {
    slug: "document-intelligence",
    name: "Document Intelligence",
    description: "Use cases and flows for Document Intelligence.",
    templates_count: 8,
    last_updated: "2025-06-17",
    featured_templates: [
      "summarization",
      "document-classification",
      "routing-sync"
    ]
  },
  {
    slug: "sales-marketing-automation",
    name: "Sales & Marketing Automation",
    description: "Use cases and flows for Sales & Marketing Automation.",
    templates_count: 8,
    last_updated: "2025-06-16",
    featured_templates: [
      "sales-offer-generation",
      "personalized-outreach",
      "lead-scoring"
    ]
  },
  {
    slug: "customer-support-operations",
    name: "Customer Support & Operations",
    description: "Use cases and flows for Customer Support & Operations.",
    templates_count: 8,
    last_updated: "2025-06-18",
    featured_templates: [
      "fraud-flagging-analysis",
      "sentiment-urgency-detection",
      "support-agent-copilot"
    ]
  },
  {
    slug: "data-analytics-augmentation",
    name: "Data & Analytics Augmentation",
    description: "Use cases and flows for Data & Analytics Augmentation.",
    templates_count: 9,
    last_updated: "2025-06-19",
    featured_templates: [
      "trend-pattern-detection",
      "multi-source-retrieval",
      "survey-feedback-analytics"
    ]
  },
  {
    slug: "web-workflow-automation",
    name: "Web & Workflow Automation",
    description: "Use cases and flows for Web & Workflow Automation.",
    templates_count: 4,
    last_updated: "2025-06-17",
    featured_templates: [
      "agentic-process-automation-apa",
      "automated-data-entry",
      "web-scraping-content-extraction"
    ]
  },
  {
    slug: "programming-developer-productivity",
    name: "Programming & Developer Productivity",
    description: "Use cases and flows for Programming & Developer Productivity.",
    templates_count: 7,
    last_updated: "2025-06-13",
    featured_templates: [
      "infra-scripting",
      "test-generation",
      "code-generation-generate-sql"
    ]
  },
  {
    slug: "financial-services-risk",
    name: "Financial Services & Risk",
    description: "Use cases and flows for Financial Services & Risk.",
    templates_count: 8,
    last_updated: "2025-06-18",
    featured_templates: [
      "debt-collection-strategy",
      "insurance-underwriting",
      "stock-market-analysis"
    ]
  },
  {
    slug: "social-brand-intelligence",
    name: "Social & Brand Intelligence",
    description: "Use cases and flows for Social & Brand Intelligence.",
    templates_count: 6,
    last_updated: "2025-06-17",
    featured_templates: [
      "social-listening-for-trends",
      "social-brand-intelligence-social-media-sentiment-analysis",
      "brand-reputation-monitoring"
    ]
  },
  {
    slug: "industry-hospitality",
    name: "Industry: Hospitality",
    description: "Use cases and flows for Industry: Hospitality.",
    templates_count: 1,
    last_updated: "2025-06-24",
    featured_templates: [
      "nan"
    ]
  },
  {
    slug: "industry-customer-svc",
    name: "Industry: Customer Svc",
    description: "Use cases and flows for Industry: Customer Svc.",
    templates_count: 1,
    last_updated: "2025-06-25",
    featured_templates: [
      "nan"
    ]
  },
  {
    slug: "industry-coaching",
    name: "Industry: Coaching",
    description: "Use cases and flows for Industry: Coaching.",
    templates_count: 1,
    last_updated: "2024-01-01",
    featured_templates: [
      "nan"
    ]
  },
  {
    slug: "industry-enterprise",
    name: "Industry: Enterprise",
    description: "Use cases and flows for Industry: Enterprise.",
    templates_count: 1,
    last_updated: "2024-01-01",
    featured_templates: [
      "nan"
    ]
  },
  {
    slug: "industry-government",
    name: "Industry: Government",
    description: "Use cases and flows for Industry: Government.",
    templates_count: 1,
    last_updated: "2025-06-26",
    featured_templates: [
      "nan"
    ]
  }
];

export const mockTemplates: Template[] = [
  {
    slug: "data-extraction",
    topic: "Document Intelligence – Data Extraction",
    summary: "Extract key fields from contracts, invoices, forms",
    category: [
      "document-intelligence",
      "data-extraction"
    ],
    mapped_use_cases: [
      "Extract specific parts of contracts and store the structured information in an external table.",
      "<iframe>", // Marker for Langflow demo
      "Extract, label, normalize and disambiguate entities from documents or news articles.",
      "Event Extraction: use news to discover parent events and their related children events"
    ],
    status: "IMPROVED",
    difficulty: "Intermediate",
    builder: {
      name: "Alice Reis",
      url: "",
    },
    updated_at: "2024-01-01",
    example: {
      input: "",
      output: "Extract key fields from contracts, invoices, forms",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/data-extraction.json",
      image_url: "https://cdn.langflow.org/templates/data-extraction.png",
      version: "1.0.0",
    },
    comment: "The documentation and experience with Input Schema have improved a lot and we have also generated the snippet for file uploads, which was previously a very big limitation."
  },
  {
    slug: "summarization",
    topic: "Document Intelligence – Summarization",
    summary: "Generate concise overviews of reports or legal docs",
    category: [
      "document-intelligence",
      "summarization"
    ],
    mapped_use_cases: [
      "Agent receives several news items related to a mapped topic and summarizes all the news in a single article.",
      "Agent accesses specific directory and summarizes all documents into a single file.",
      "Summarize messages from meetings, channels, or groups."
    ],
    status: "IMPROVED",
    difficulty: "Intermediate",
    builder: {
      name: "Lucas Goularte",
      url: "",
    },
    updated_at: "2025-06-17",
    example: {
      input: "",
      output: "Generate concise overviews of reports or legal docs",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/summarization.json",
      image_url: "https://cdn.langflow.org/templates/summarization.png",
      version: "1.0.0",
    },
    comment: "Loop fixed in version 1.5.1. Conversion resolved through the Type Converter. BigQuery component fixed."
  },
  {
    slug: "translation",
    topic: "Document Intelligence – Translation",
    summary: "Translate an entire book",
    category: [
      "document-intelligence",
      "translation"
    ],
    mapped_use_cases: [
      "Loads a file, splits it into parts, translates the parts, and then assembles the translated parts into a new file."
    ],
    status: "IMPROVED",
    difficulty: "Intermediate",
    builder: {
      name: "Gustavo Costa",
      url: "",
    },
    updated_at: "2025-06-10",
    example: {
      input: "",
      output: "Translate an entire book",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/translation.json",
      image_url: "https://cdn.langflow.org/templates/translation.png",
      version: "1.0.0",
    },
    comment: "Loop fixed in version 1.5.1."
  },
  {
    slug: "document-classification",
    topic: "Document Intelligence – Document Classification",
    summary: "Label full documents (e.g., NDA, invoice)",
    category: [
      "document-intelligence",
      "document-classification"
    ],
    mapped_use_cases: [
      "Receive documents via API, classify them with an AI agent, and store them in Google Drive folders labeled \"Approved\" and \"For Human Review.\""
    ],
    status: "IMPROVED",
    difficulty: "Intermediate",
    builder: {
      name: "Lucas Goularte",
      url: "",
    },
    updated_at: "2025-06-17",
    example: {
      input: "",
      output: "Label full documents (e.g., NDA, invoice)",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/document-classification.json",
      image_url: "https://cdn.langflow.org/templates/document-classification.png",
      version: "1.0.0",
    },
    comment: "The tweak experience has improved, but we can still improve in terms of automations."
  },
  {
    slug: "chunk-classification",
    topic: "Document Intelligence – Chunk Classification",
    summary: "Classify sections (e.g., Risks, Dates, Obligations)",
    category: [
      "document-intelligence",
      "chunk-classification"
    ],
    mapped_use_cases: [
      "Receive a file (Ex: Contract), divide it into parts and classify each part according to the established rules."
    ],
    status: "IMPROVED",
    difficulty: "Intermediate",
    builder: {
      name: "Alice Reis",
      url: "",
    },
    updated_at: "2024-01-01",
    example: {
      input: "",
      output: "Classify sections (e.g., Risks, Dates, Obligations)",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/chunk-classification.json",
      image_url: "https://cdn.langflow.org/templates/chunk-classification.png",
      version: "1.0.0",
    },
    comment: "Loop fixed in version 1.5.1."
  },
  {
    slug: "text-quantification",
    topic: "Document Intelligence – Text Quantification",
    summary: "Read analyst reports and assign a risk score, extract satisfaction scores or urgency levels.",
    category: [
      "document-intelligence",
      "text-quantification"
    ],
    mapped_use_cases: [
      "Receive a list of patients from a hospital and classify the risk level of patients according to pre-established criteria."
    ],
    status: "STILL LIMITED",
    difficulty: "Intermediate",
    builder: {
      name: "Lucas Goularte",
      url: "",
    },
    updated_at: "2025-06-16",
    example: {
      input: "",
      output: "Read analyst reports and assign a risk score, extract satisfaction scores or urgency levels.",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/text-quantification.json",
      image_url: "https://cdn.langflow.org/templates/text-quantification.png",
      version: "1.0.0",
    },
    comment: "The agent now has an output in date format (JSON), but it is not yet a reliable function."
  },
  {
    slug: "routing-sync",
    topic: "Document Intelligence – Routing & Sync",
    summary: "Send outputs to Slack, Sheets, or team inboxes",
    category: [
      "document-intelligence",
      "routing-sync"
    ],
    mapped_use_cases: [
      "Receives a message, summarizes the message and forwards it to the channel according to the context."
    ],
    status: "IMPROVED",
    difficulty: "Intermediate",
    builder: {
      name: "Lucas Goularte",
      url: "",
    },
    updated_at: "2025-06-17",
    example: {
      input: "",
      output: "Send outputs to Slack, Sheets, or team inboxes",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/routing-sync.json",
      image_url: "https://cdn.langflow.org/templates/routing-sync.png",
      version: "1.0.0",
    },
    comment: "Conditional routing component added. Improved if/else. API request fixed. Integrations and execution scheduling are not yet available."
  },
  {
    slug: "information-retrieval",
    topic: "Document Intelligence – Information Retrieval",
    summary: "Ask questions about uploaded documents",
    category: [
      "document-intelligence",
      "information-retrieval"
    ],
    mapped_use_cases: [
      "Website or Documentation Q&A.",
      "Documents/Data Lake RAG."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Victor Madeira",
      url: "",
    },
    updated_at: "2024-01-01",
    example: {
      input: "",
      output: "Ask questions about uploaded documents",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/information-retrieval.json",
      image_url: "https://cdn.langflow.org/templates/information-retrieval.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "lead-scoring",
    topic: "Sales & Marketing Automation – Lead Scoring",
    summary: "Prioritize leads based on behavior or CRM signals",
    category: [
      "sales-marketing-automation",
      "lead-scoring"
    ],
    mapped_use_cases: [
      "Receives lead data from Facebook, classifies it based on form responses, and sends the classified lead to HubSpot (CRM)."
    ],
    status: "IMPROVED",
    difficulty: "Intermediate",
    builder: {
      name: "Alice Reis",
      url: "",
    },
    updated_at: "2025-06-13",
    example: {
      input: "",
      output: "Prioritize leads based on behavior or CRM signals",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/lead-scoring.json",
      image_url: "https://cdn.langflow.org/templates/lead-scoring.png",
      version: "1.0.0",
    },
    comment: "Nested JSON handling has been added to dataoperations. Awaiting PRS approval."
  },
  {
    slug: "personalized-outreach",
    topic: "Sales & Marketing Automation – Personalized Outreach",
    summary: "Generate custom email copy using prospect data",
    category: [
      "sales-marketing-automation",
      "personalized-outreach"
    ],
    mapped_use_cases: [
      "Retrieves a list of potential customers from HubSpot and sends personalized emails based on registration details using the HubSpot API.",
      "Generate customer's persona page based on previous chat interactions."
    ],
    status: "STILL LIMITED",
    difficulty: "Intermediate",
    builder: {
      name: "Lucas Goularte",
      url: "",
    },
    updated_at: "2025-06-16",
    example: {
      input: "",
      output: "Generate custom email copy using prospect data",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/personalized-outreach.json",
      image_url: "https://cdn.langflow.org/templates/personalized-outreach.png",
      version: "1.0.0",
    },
    comment: "Still no plans to schedule executions."
  },
  {
    slug: "meeting-preparation",
    topic: "Sales & Marketing Automation – Meeting Preparation",
    summary: "Prepare sales briefings with trends and insights",
    category: [
      "sales-marketing-automation",
      "meeting-preparation"
    ],
    mapped_use_cases: [
      "Reads daily events from Google Calendar, uses AI to generate relevant information and summaries based on the meeting topics, and adds this information to the event description."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Lucas Goularte",
      url: "",
    },
    updated_at: "2024-01-01",
    example: {
      input: "",
      output: "Prepare sales briefings with trends and insights",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/meeting-preparation.json",
      image_url: "https://cdn.langflow.org/templates/meeting-preparation.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "sales-offer-generation",
    topic: "Sales & Marketing Automation – Sales Offer Generation",
    summary: "Match needs to product bundles and pricing",
    category: [
      "sales-marketing-automation",
      "sales-offer-generation"
    ],
    mapped_use_cases: [
      "Check product stock via SQL query component. Ask buyer to choose a supported payment method (with fees stored in the database), optionally suggest the cheapest. Send offer with product price plus selected fee through the same platform the request came from (e.g., email or WhatsApp)."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Lucas Goularte",
      url: "",
    },
    updated_at: "2025-06-16",
    example: {
      input: "",
      output: "Match needs to product bundles and pricing",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/sales-offer-generation.json",
      image_url: "https://cdn.langflow.org/templates/sales-offer-generation.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "nan",
    topic: "Sales & Marketing Automation – Similar Company Discovery",
    summary: "Find prospects similar to current clients",
    category: [
      "sales-marketing-automation",
      "similar-company-discovery"
    ],
    mapped_use_cases: [
      "Use LinkedIn’s search API to find potential clients based on current client data stored in the vector database. Save results to a new collection in the same database."
    ],
    status: "NOT POSSIBLE",
    difficulty: "Intermediate",
    builder: {
      name: "",
      url: "",
    },
    updated_at: "2024-01-01",
    example: {
      input: "",
      output: "Find prospects similar to current clients",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/nan.json",
      image_url: "https://cdn.langflow.org/templates/nan.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "seo-automation",
    topic: "Sales & Marketing Automation – SEO Automation",
    summary: "Audit and optimize pages, generate outlines",
    category: [
      "sales-marketing-automation",
      "seo-automation"
    ],
    mapped_use_cases: [
      "Access a URL and evaluate possible SEO optimizations, generating a report with recommendations."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Lucas Goularte",
      url: "",
    },
    updated_at: "2025-06-09",
    example: {
      input: "",
      output: "Audit and optimize pages, generate outlines",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/seo-automation.json",
      image_url: "https://cdn.langflow.org/templates/seo-automation.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "youtube-transcription-summarizer",
    topic: "Sales & Marketing Automation – Marketing Content Creation",
    summary: "Generate blog posts and social content",
    category: [
      "sales-marketing-automation",
      "marketing-content-creation"
    ],
    mapped_use_cases: [
      "Based on documents or bullet points, create posts for specific platform (caring about best format and public), and post once approved.",
      "Aggregate videos transcriptions from YouTube and convert into article.",
      "Receives form data via API, processes it with an AI agent, and generates a tailored proposal."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Victor Madeira",
      url: "",
    },
    updated_at: "2024-01-01",
    example: {
      input: "",
      output: "Generate blog posts and social content",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/youtube-transcription-summarizer.json",
      image_url: "https://cdn.langflow.org/templates/youtube-transcription-summarizer.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "sales-collateral-generation",
    topic: "Sales & Marketing Automation – Sales Collateral Generation",
    summary: "Generate one-pagers, outreach PDFs",
    category: [
      "sales-marketing-automation",
      "sales-collateral-generation"
    ],
    mapped_use_cases: [
      "Receive a request with custom fields and process the information with an agent, creating a customized proposal."
    ],
    status: "STILL LIMITED",
    difficulty: "Intermediate",
    builder: {
      name: "Alice Reis",
      url: "",
    },
    updated_at: "2024-01-01",
    example: {
      input: "",
      output: "Generate one-pagers, outreach PDFs",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/sales-collateral-generation.json",
      image_url: "https://cdn.langflow.org/templates/sales-collateral-generation.png",
      version: "1.0.0",
    },
    comment: "We still don't have a good component for writing files in multiple formats."
  },
  {
    slug: "ticket-analysis-classification",
    topic: "Customer Support & Operations – Ticket Analysis & Classification",
    summary: "Label support tickets by type or topic",
    category: [
      "customer-support-operations",
      "ticket-analysis-classification"
    ],
    mapped_use_cases: [
      "Receive tickets via API and classify them according to severity and sentiment, returning the classification via API."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Gustavo Costa",
      url: "",
    },
    updated_at: "2024-01-01",
    example: {
      input: "",
      output: "Label support tickets by type or topic",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/ticket-analysis-classification.json",
      image_url: "https://cdn.langflow.org/templates/ticket-analysis-classification.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "sentiment-urgency-detection",
    topic: "Customer Support & Operations – Sentiment & Urgency Detection",
    summary: "Assess tone, escalation risk, or emotion",
    category: [
      "customer-support-operations",
      "sentiment-urgency-detection"
    ],
    mapped_use_cases: [
      "Receives a list of client messages via API and classifies each one according to previously configured rules. Returns a list with the original messages and their respective classifications."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Lucas Goularte",
      url: "",
    },
    updated_at: "2025-06-17",
    example: {
      input: "",
      output: "Assess tone, escalation risk, or emotion",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/sentiment-urgency-detection.json",
      image_url: "https://cdn.langflow.org/templates/sentiment-urgency-detection.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "support-agent-copilot",
    topic: "Customer Support & Operations – Support Agent Copilot",
    summary: "Suggest replies, auto-draft responses",
    category: [
      "customer-support-operations",
      "support-agent-copilot"
    ],
    mapped_use_cases: [
      "RAG company knowledge base, connect to support tool (MCP maybe) to suggest answers based on internal rules."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Lucas Goularte",
      url: "",
    },
    updated_at: "2025-06-17",
    example: {
      input: "",
      output: "Suggest replies, auto-draft responses",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/support-agent-copilot.json",
      image_url: "https://cdn.langflow.org/templates/support-agent-copilot.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "smart-ticket-routing",
    topic: "Customer Support & Operations – Smart Ticket Routing",
    summary: "Send tickets to the right team/agent",
    category: [
      "customer-support-operations",
      "smart-ticket-routing"
    ],
    mapped_use_cases: [
      "Receives tickets from HubSpot Operations, classifies the tickets and fills data with AI, returning the processed information to HS."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Alice Reis",
      url: "",
    },
    updated_at: "2025-06-17",
    example: {
      input: "",
      output: "Send tickets to the right team/agent",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/smart-ticket-routing.json",
      image_url: "https://cdn.langflow.org/templates/smart-ticket-routing.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "call-classification-analytics",
    topic: "Customer Support & Operations – Call Classification & Analytics",
    summary: "Tag transcripts by topic or resolution",
    category: [
      "customer-support-operations",
      "call-classification-analytics"
    ],
    mapped_use_cases: [
      "Receives audio link, transcribes using Assembly, classifies according to predefined characteristics. Saves the transcription and classification."
    ],
    status: "STILL LIMITED",
    difficulty: "Intermediate",
    builder: {
      name: "Lucas Goularte",
      url: "",
    },
    updated_at: "2025-06-17",
    example: {
      input: "",
      output: "Tag transcripts by topic or resolution",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/call-classification-analytics.json",
      image_url: "https://cdn.langflow.org/templates/call-classification-analytics.png",
      version: "1.0.0",
    },
    comment: "Some multimodal components have been proposed, but we do not yet have a plan to add them as standard."
  },
  {
    slug: "nan",
    topic: "Customer Support & Operations – Voice-based Customer Authentication",
    summary: "Authenticate users via voice",
    category: [
      "customer-support-operations",
      "voice-based-customer-authentication"
    ],
    mapped_use_cases: [
      "nan"
    ],
    status: "NOT POSSIBLE",
    difficulty: "Intermediate",
    builder: {
      name: "",
      url: "",
    },
    updated_at: "2024-01-01",
    example: {
      input: "",
      output: "Authenticate users via voice",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/nan.json",
      image_url: "https://cdn.langflow.org/templates/nan.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "fraud-flagging-analysis",
    topic: "Customer Support & Operations – Fraud Flagging & Analysis",
    summary: "Detect suspicious behavior or risks",
    category: [
      "customer-support-operations",
      "fraud-flagging-analysis"
    ],
    mapped_use_cases: [
      "Queries credit card transactions from a SQL database, analyzes spending patterns against purchase history, and provides personalized category insights and recommendations."
    ],
    status: "STILL LIMITED",
    difficulty: "Intermediate",
    builder: {
      name: "Lucas Goularte",
      url: "",
    },
    updated_at: "2025-06-18",
    example: {
      input: "",
      output: "Detect suspicious behavior or risks",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/fraud-flagging-analysis.json",
      image_url: "https://cdn.langflow.org/templates/fraud-flagging-analysis.png",
      version: "1.0.0",
    },
    comment: "Api remains limited and confusing (focus on chat)."
  },
  {
    slug: "support-agent-copilot",
    topic: "Customer Support & Operations – Conversational Support Assistants",
    summary: "End-user self-serve support agents",
    category: [
      "customer-support-operations",
      "conversational-support-assistants"
    ],
    mapped_use_cases: [
      "Widget on the website receives support requests to help with user questions. Answers are given based on a vectorized basis (RAG).",
      "Systems to help retrieve relevant past information from coach-member conversations in real-time"
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Lucas Goularte",
      url: "",
    },
    updated_at: "2025-06-17",
    example: {
      input: "",
      output: "End-user self-serve support agents",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/support-agent-copilot.json",
      image_url: "https://cdn.langflow.org/templates/support-agent-copilot.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "csv-query-assistant",
    topic: "Data & Analytics Augmentation – Natural Language Data Queries",
    summary: "Ask questions over CSVs or databases",
    category: [
      "data-analytics-augmentation",
      "natural-language-data-queries"
    ],
    mapped_use_cases: [
      "Receives structured documents (CSV or JSON) and provides answers based on questions in NL."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Victor Madeira",
      url: "",
    },
    updated_at: "2024-01-01",
    example: {
      input: "",
      output: "Ask questions over CSVs or databases",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/csv-query-assistant.json",
      image_url: "https://cdn.langflow.org/templates/csv-query-assistant.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "multi-source-retrieval",
    topic: "Data & Analytics Augmentation – Multi-source Retrieval",
    summary: "Combine insights from docs, websites, Notion",
    category: [
      "data-analytics-augmentation",
      "multi-source-retrieval"
    ],
    mapped_use_cases: [
      "Consult information from multiple sources and summarize it in a document or in a response on a chosen channel.",
      "Create queries in multiple databases and summarize everything in a single database for later human decision."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Victor Madeira",
      url: "",
    },
    updated_at: "2025-06-17",
    example: {
      input: "",
      output: "Combine insights from docs, websites, Notion",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/multi-source-retrieval.json",
      image_url: "https://cdn.langflow.org/templates/multi-source-retrieval.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "dashboard-chart-generation",
    topic: "Data & Analytics Augmentation – Data Exploration & Insights Generation",
    summary: "Build visual reports from text prompts",
    category: [
      "data-analytics-augmentation",
      "data-exploration-insights-generation"
    ],
    mapped_use_cases: [
      "T2D: Query SQL databases and create tables or graphs based on natural language queries."
    ],
    status: "STILL LIMITED",
    difficulty: "Intermediate",
    builder: {
      name: "Lucas Goularte",
      url: "",
    },
    updated_at: "2025-06-09",
    example: {
      input: "",
      output: "Build visual reports from text prompts",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/dashboard-chart-generation.json",
      image_url: "https://cdn.langflow.org/templates/dashboard-chart-generation.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "natural-language-q-a",
    topic: "Data & Analytics Augmentation – Data Exploration & Insights Generation",
    summary: "Natural Language Q&A",
    category: [
      "data-analytics-augmentation",
      "data-exploration-insights-generation"
    ],
    mapped_use_cases: [
      "Evaluate a local SQL database using the SQL component."
    ],
    status: "STILL LIMITED",
    difficulty: "Intermediate",
    builder: {
      name: "Lucas Goularte",
      url: "",
    },
    updated_at: "2025-06-17",
    example: {
      input: "",
      output: "Natural Language Q&A",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/natural-language-q-a.json",
      image_url: "https://cdn.langflow.org/templates/natural-language-q-a.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "talk-to-csv",
    topic: "Data & Analytics Augmentation – Data Exploration & Insights Generation",
    summary: "Talk to CSV",
    category: [
      "data-analytics-augmentation",
      "data-exploration-insights-generation"
    ],
    mapped_use_cases: [
      "Ask questions about your CSV."
    ],
    status: "IMPROVED",
    difficulty: "Intermediate",
    builder: {
      name: "Lucas Goularte",
      url: "",
    },
    updated_at: "2025-06-17",
    example: {
      input: "",
      output: "Talk to CSV",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/talk-to-csv.json",
      image_url: "https://cdn.langflow.org/templates/talk-to-csv.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "customer-segmentation",
    topic: "Data & Analytics Augmentation – Customer Segmentation",
    summary: "Group users by behavior or demographics",
    category: [
      "data-analytics-augmentation",
      "customer-segmentation"
    ],
    mapped_use_cases: [
      "Based on ip, determine region where user lives. With address, estimate income, social class (by average of that region).",
      "Based on recent buys, estimate what user may need soon, schedule adds for them.",
      "Sequential LLMs used for profile/persona generation."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Lucas Goularte",
      url: "",
    },
    updated_at: "2025-06-09",
    example: {
      input: "",
      output: "Group users by behavior or demographics",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/customer-segmentation.json",
      image_url: "https://cdn.langflow.org/templates/customer-segmentation.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "survey-feedback-analytics",
    topic: "Data & Analytics Augmentation – Survey & Feedback Analytics",
    summary: "Summarize open-ended feedback",
    category: [
      "data-analytics-augmentation",
      "survey-feedback-analytics"
    ],
    mapped_use_cases: [
      "Agent consults NPS response database and summarizes main points of attention."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Alice Reis",
      url: "",
    },
    updated_at: "2025-06-17",
    example: {
      input: "",
      output: "Summarize open-ended feedback",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/survey-feedback-analytics.json",
      image_url: "https://cdn.langflow.org/templates/survey-feedback-analytics.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "quantification-from-text",
    topic: "Data & Analytics Augmentation – Quantification from Text",
    summary: "Convert text to metrics or categories",
    category: [
      "data-analytics-augmentation",
      "quantification-from-text"
    ],
    mapped_use_cases: [
      "Categorizes and summarizes messages from a channel according to identified categories."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Alice Reis",
      url: "",
    },
    updated_at: "2025-06-17",
    example: {
      input: "",
      output: "Convert text to metrics or categories",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/quantification-from-text.json",
      image_url: "https://cdn.langflow.org/templates/quantification-from-text.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "trend-pattern-detection",
    topic: "Data & Analytics Augmentation – Trend & Pattern Detection",
    summary: "Spot changes or spikes in usage or data",
    category: [
      "data-analytics-augmentation",
      "trend-pattern-detection"
    ],
    mapped_use_cases: [
      "Data Quality: detect anomalies (data out of pattern) in dataframes and alert them."
    ],
    status: "STILL LIMITED",
    difficulty: "Intermediate",
    builder: {
      name: "Lucas Goularte",
      url: "",
    },
    updated_at: "2025-06-19",
    example: {
      input: "",
      output: "Spot changes or spikes in usage or data",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/trend-pattern-detection.json",
      image_url: "https://cdn.langflow.org/templates/trend-pattern-detection.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "web-scraping-content-extraction",
    topic: "Web & Workflow Automation – Web Scraping & Content Extraction",
    summary: "Scrape listings, reviews, or articles",
    category: [
      "web-workflow-automation",
      "web-scraping-content-extraction"
    ],
    mapped_use_cases: [
      "Extract article content, split in chunks, vectorize with embedding model and load to vector database. Ready to RAG",
      "Deep Research, Focused Research"
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Gustavo Costa",
      url: "",
    },
    updated_at: "2024-01-01",
    example: {
      input: "",
      output: "Scrape listings, reviews, or articles",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/web-scraping-content-extraction.json",
      image_url: "https://cdn.langflow.org/templates/web-scraping-content-extraction.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "automated-data-entry",
    topic: "Web & Workflow Automation – Automated Data Entry",
    summary: "Fill CRMs or forms from extracted data",
    category: [
      "web-workflow-automation",
      "automated-data-entry"
    ],
    mapped_use_cases: [
      "Receives completed lead forms and enriches the information by consulting APIS. Saves the enriched information in the CRM (HubSpot)."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Lucas Goularte",
      url: "",
    },
    updated_at: "2025-06-10",
    example: {
      input: "",
      output: "Fill CRMs or forms from extracted data",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/automated-data-entry.json",
      image_url: "https://cdn.langflow.org/templates/automated-data-entry.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "email-calendar-integration",
    topic: "Web & Workflow Automation – Email & Calendar Integration",
    summary: "Turn emails into calendar events/tasks",
    category: [
      "web-workflow-automation",
      "email-calendar-integration"
    ],
    mapped_use_cases: [
      "In chat tools (slack, discord, etc), find free slots in schedule to share with people.",
      "Summarize emails and send summary in slack.",
      "Create automatic responses and save proposals as a draft."
    ],
    status: "STILL LIMITED",
    difficulty: "Intermediate",
    builder: {
      name: "Victor Madeira",
      url: "",
    },
    updated_at: "2024-01-01",
    example: {
      input: "",
      output: "Turn emails into calendar events/tasks",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/email-calendar-integration.json",
      image_url: "https://cdn.langflow.org/templates/email-calendar-integration.png",
      version: "1.0.0",
    },
    comment: "Still no plans to schedule executions. Super limited Slack component with no native connection to other tools."
  },
  {
    slug: "agentic-process-automation-apa",
    topic: "Web & Workflow Automation – Agentic Process Automation (APA)",
    summary: "Chain multiple steps via agent logic",
    category: [
      "web-workflow-automation",
      "agentic-process-automation-apa"
    ],
    mapped_use_cases: [
      "Access the message database, summarize messages by period, create a document with a quantitative and textual summary and share it with interested parties.",
      "Agent accesses information from bidding website, summarizes data and fills out forms automatically.",
      "Extracts data from dozens of websites via webscraping and organizes the information for human analysis.",
      "Receive resumes from candidates, extract important parts and fill out an internal form based on the extracted information."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Victor Madeira",
      url: "",
    },
    updated_at: "2025-06-17",
    example: {
      input: "",
      output: "Chain multiple steps via agent logic",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/agentic-process-automation-apa.json",
      image_url: "https://cdn.langflow.org/templates/agentic-process-automation-apa.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "code-generation-generate-sql",
    topic: "Programming & Developer Productivity – Code Generation",
    summary: "Generate SQL, Python, CLI from plain prompts",
    category: [
      "programming-developer-productivity",
      "code-generation"
    ],
    mapped_use_cases: [
      "Create SQL queries based on a pre-established schema.",
      "Creates data synthesis flows for machine learning model training."
    ],
    status: "STILL LIMITED",
    difficulty: "Intermediate",
    builder: {
      name: "Lucas Goularte",
      url: "",
    },
    updated_at: "2025-06-11",
    example: {
      input: "",
      output: "Generate SQL, Python, CLI from plain prompts",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/code-generation-generate-sql.json",
      image_url: "https://cdn.langflow.org/templates/code-generation-generate-sql.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "code-explanation-review",
    topic: "Programming & Developer Productivity – Code Explanation & Review",
    summary: "Explain or flag problems in code",
    category: [
      "programming-developer-productivity",
      "code-explanation-review"
    ],
    mapped_use_cases: [
      "Create documentation for repository based on its scripts"
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Gustavo Costa",
      url: "",
    },
    updated_at: "2024-01-01",
    example: {
      input: "",
      output: "Explain or flag problems in code",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/code-explanation-review.json",
      image_url: "https://cdn.langflow.org/templates/code-explanation-review.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "nan",
    topic: "Programming & Developer Productivity – Code Explanation & Review",
    summary: "Ingest large legacy codebase files, extract code snippets, and use LLM to detect language",
    category: [
      "programming-developer-productivity",
      "code-explanation-review"
    ],
    mapped_use_cases: [
      "Analyze legacy code for language and logic classification.",
      "Build searchable knowledge base for business rule understanding.",
      "Use RAG to preload examples and instructions to improve accuracy."
    ],
    status: "STILL LIMITED",
    difficulty: "Intermediate",
    builder: {
      name: "",
      url: "",
    },
    updated_at: "2024-01-01",
    example: {
      input: "",
      output: "Ingest large legacy codebase files, extract code snippets, and use LLM to detect language",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/nan.json",
      image_url: "https://cdn.langflow.org/templates/nan.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "test-generation",
    topic: "Programming & Developer Productivity – Test Generation",
    summary: "Create unit tests for existing code",
    category: [
      "programming-developer-productivity",
      "test-generation"
    ],
    mapped_use_cases: [
      "Based on document pattern to create tests or on existing tests, create tests for new methods.",
      "Suggest mocks with simmulations near real"
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Victor Madeira",
      url: "",
    },
    updated_at: "2025-06-11",
    example: {
      input: "",
      output: "Create unit tests for existing code",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/test-generation.json",
      image_url: "https://cdn.langflow.org/templates/test-generation.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "infra-scripting",
    topic: "Programming & Developer Productivity – Infra Scripting",
    summary: "Generate Docker, Terraform, YAML configs",
    category: [
      "programming-developer-productivity",
      "infra-scripting"
    ],
    mapped_use_cases: [
      "Analyze a GitHub repository via its URL. Generate a cloud architecture diagram for visualization and Terraform IaC covering app deployment requirements for any environment. Create a README.md with estimated costs."
    ],
    status: "STILL LIMITED",
    difficulty: "Intermediate",
    builder: {
      name: "Victor Madeira",
      url: "",
    },
    updated_at: "2025-06-13",
    example: {
      input: "",
      output: "Generate Docker, Terraform, YAML configs",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/infra-scripting.json",
      image_url: "https://cdn.langflow.org/templates/infra-scripting.png",
      version: "1.0.0",
    },
    comment: "Authentication is still taboo in langflow. We can't save OAuth authentications."
  },
  {
    slug: "nan",
    topic: "Programming & Developer Productivity – Data Pipeline Scripting",
    summary: "Automate ETL with AI-generated scripts",
    category: [
      "programming-developer-productivity",
      "data-pipeline-scripting"
    ],
    mapped_use_cases: [
      "Extract structured data from one or more sources, transform the data using agents and store it in an external database."
    ],
    status: "STILL LIMITED",
    difficulty: "Intermediate",
    builder: {
      name: "Lucas Goularte",
      url: "",
    },
    updated_at: "2025-06-09",
    example: {
      input: "",
      output: "Automate ETL with AI-generated scripts",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/nan.json",
      image_url: "https://cdn.langflow.org/templates/nan.png",
      version: "1.0.0",
    },
    comment: "We still don't have a native component for data insertion."
  },
  {
    slug: "dev-assistant-chat-with-codebase",
    topic: "Programming & Developer Productivity – Dev Assistant (Chat with Codebase)",
    summary: "Answer questions about repo logic",
    category: [
      "programming-developer-productivity",
      "dev-assistant-chat-with-codebase"
    ],
    mapped_use_cases: [
      "With Git url, analyse all scripts in repository."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Alice Reis",
      url: "",
    },
    updated_at: "2025-06-09",
    example: {
      input: "",
      output: "Answer questions about repo logic",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/dev-assistant-chat-with-codebase.json",
      image_url: "https://cdn.langflow.org/templates/dev-assistant-chat-with-codebase.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "stock-market-analysis",
    topic: "Financial Services & Risk – Stock & Market Analysis",
    summary: "Summarize stock trends and company news",
    category: [
      "financial-services-risk",
      "stock-market-analysis"
    ],
    mapped_use_cases: [
      "Generate insights and explain how news can affect stocks of each company"
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Alice Reis",
      url: "",
    },
    updated_at: "2025-06-17",
    example: {
      input: "",
      output: "Summarize stock trends and company news",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/stock-market-analysis.json",
      image_url: "https://cdn.langflow.org/templates/stock-market-analysis.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "credit-scoring-lending-automation",
    topic: "Financial Services & Risk – Credit Scoring & Lending Automation",
    summary: "Assess creditworthiness with AI",
    category: [
      "financial-services-risk",
      "credit-scoring-lending-automation"
    ],
    mapped_use_cases: [
      "The agent collects initial customer information (name, email and document number), queries APIs to assess credit risk, calculates a credit score, and suggests a credit limit. It then forwards the organized data for human review."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Alice Reis",
      url: "",
    },
    updated_at: "2025-06-17",
    example: {
      input: "",
      output: "Assess creditworthiness with AI",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/credit-scoring-lending-automation.json",
      image_url: "https://cdn.langflow.org/templates/credit-scoring-lending-automation.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "fraud-detection",
    topic: "Financial Services & Risk – Fraud Detection",
    summary: "Flag suspicious transactions or patterns",
    category: [
      "financial-services-risk",
      "fraud-detection"
    ],
    mapped_use_cases: [
      "Agent analyzes recent purchases and identifies changes in behavior to identify potential fraud."
    ],
    status: "STILL LIMITED",
    difficulty: "Intermediate",
    builder: {
      name: "Lucas Goularte",
      url: "",
    },
    updated_at: "2025-06-17",
    example: {
      input: "",
      output: "Flag suspicious transactions or patterns",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/fraud-detection.json",
      image_url: "https://cdn.langflow.org/templates/fraud-detection.png",
      version: "1.0.0",
    },
    comment: "Problems continued."
  },
  {
    slug: "insurance-underwriting",
    topic: "Financial Services & Risk – Insurance Underwriting",
    summary: "Automate policy assessment and pricing",
    category: [
      "financial-services-risk",
      "insurance-underwriting"
    ],
    mapped_use_cases: [
      "Agent retrieves potential client data from SQL database, prices insurance based on profile, generates proposal, stores it in a data lake (e.g., S3, GCS), and sends emails formalization documents if needed."
    ],
    status: "STILL LIMITED",
    difficulty: "Intermediate",
    builder: {
      name: "Lucas Goularte",
      url: "",
    },
    updated_at: "2025-06-18",
    example: {
      input: "",
      output: "Automate policy assessment and pricing",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/insurance-underwriting.json",
      image_url: "https://cdn.langflow.org/templates/insurance-underwriting.png",
      version: "1.0.0",
    },
    comment: "Problems continued."
  },
  {
    slug: "debt-collection-strategy",
    topic: "Financial Services & Risk – Debt Collection Strategy",
    summary: "Optimize timing and messaging for collections",
    category: [
      "financial-services-risk",
      "debt-collection-strategy"
    ],
    mapped_use_cases: [
      "Retrieves collection data from a SQL database, sends personalized WhatsApp messages to debtors via API, and interacts with them to negotiate debt resolution following predefined rules."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Lucas Goularte",
      url: "",
    },
    updated_at: "2025-06-18",
    example: {
      input: "",
      output: "Optimize timing and messaging for collections",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/debt-collection-strategy.json",
      image_url: "https://cdn.langflow.org/templates/debt-collection-strategy.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "nan",
    topic: "Financial Services & Risk – KYC & Compliance Automation",
    summary: "Extract and verify ID and match policies",
    category: [
      "financial-services-risk",
      "kyc-compliance-automation"
    ],
    mapped_use_cases: [
      "nan"
    ],
    status: "NOT POSSIBLE",
    difficulty: "Intermediate",
    builder: {
      name: "",
      url: "",
    },
    updated_at: "2024-01-01",
    example: {
      input: "",
      output: "Extract and verify ID and match policies",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/nan.json",
      image_url: "https://cdn.langflow.org/templates/nan.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "nan",
    topic: "Financial Services & Risk – Conversational Banking Assistants",
    summary: "Chatbots for balance checks and FAQs",
    category: [
      "financial-services-risk",
      "conversational-banking-assistants"
    ],
    mapped_use_cases: [
      "Agent receives customer requests and responds based on database queries. If necessary, generates documents in PDF and/or sheets format."
    ],
    status: "STILL LIMITED",
    difficulty: "Intermediate",
    builder: {
      name: "",
      url: "",
    },
    updated_at: "2024-01-01",
    example: {
      input: "",
      output: "Chatbots for balance checks and FAQs",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/nan.json",
      image_url: "https://cdn.langflow.org/templates/nan.png",
      version: "1.0.0",
    },
    comment: "We still don't have a good component for writing files in multiple formats."
  },
  {
    slug: "nan",
    topic: "Financial Services & Risk – Portfolio Optimization & Planning",
    summary: "Suggest allocations and simulate returns",
    category: [
      "financial-services-risk",
      "portfolio-optimization-planning"
    ],
    mapped_use_cases: [
      "Agent receives questions related to investments and recommends possible investments according to the client's profile."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "",
      url: "",
    },
    updated_at: "2024-01-01",
    example: {
      input: "",
      output: "Suggest allocations and simulate returns",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/nan.json",
      image_url: "https://cdn.langflow.org/templates/nan.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "social-brand-intelligence-social-media-sentiment-analysis",
    topic: "Social & Brand Intelligence – Social Media Sentiment Analysis",
    summary: "Label posts by tone and urgency",
    category: [
      "social-brand-intelligence",
      "social-media-sentiment-analysis"
    ],
    mapped_use_cases: [
      "Analyse post comments and summarize main compliments and suggestions."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "",
      url: "",
    },
    updated_at: "2024-01-01",
    example: {
      input: "",
      output: "Label posts by tone and urgency",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/social-brand-intelligence-social-media-sentiment-analysis.json",
      image_url: "https://cdn.langflow.org/templates/social-brand-intelligence-social-media-sentiment-analysis.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "brand-reputation-monitoring",
    topic: "Social & Brand Intelligence – Brand Reputation Monitoring",
    summary: "Track spikes in complaints or praise",
    category: [
      "social-brand-intelligence",
      "brand-reputation-monitoring"
    ],
    mapped_use_cases: [
      "Access feedback platforms",
      "read comments",
      "summarize them and load to database",
      "create a daily score, load to SQL database."
    ],
    status: "STILL LIMITED",
    difficulty: "Intermediate",
    builder: {
      name: "Gustavo Costa",
      url: "",
    },
    updated_at: "2024-01-01",
    example: {
      input: "",
      output: "Track spikes in complaints or praise",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/brand-reputation-monitoring.json",
      image_url: "https://cdn.langflow.org/templates/brand-reputation-monitoring.png",
      version: "1.0.0",
    },
    comment: "We still don't have a native component for data insertion."
  },
  {
    slug: "nan",
    topic: "Social & Brand Intelligence – Competitor Monitoring",
    summary: "Compare brand mentions and positioning",
    category: [
      "social-brand-intelligence",
      "competitor-monitoring"
    ],
    mapped_use_cases: [
      "nan"
    ],
    status: "STILL LIMITED",
    difficulty: "Intermediate",
    builder: {
      name: "",
      url: "",
    },
    updated_at: "2024-01-01",
    example: {
      input: "",
      output: "Compare brand mentions and positioning",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/nan.json",
      image_url: "https://cdn.langflow.org/templates/nan.png",
      version: "1.0.0",
    },
    comment: "It depends on capturing and organizing data on an external platform."
  },
  {
    slug: "social-listening-for-trends",
    topic: "Social & Brand Intelligence – Social Listening for Trends",
    summary: "Spot emerging hashtags or pain points",
    category: [
      "social-brand-intelligence",
      "social-listening-for-trends"
    ],
    mapped_use_cases: [
      "Agent accesses table of data extracted from X (Twitter) and analyzes sentiments of messages sent to mapped hashtags. Returns classification for table and generates alerts for very negative messages."
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Victor Madeira",
      url: "",
    },
    updated_at: "2025-06-17",
    example: {
      input: "",
      output: "Spot emerging hashtags or pain points",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/social-listening-for-trends.json",
      image_url: "https://cdn.langflow.org/templates/social-listening-for-trends.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "nan",
    topic: "Social & Brand Intelligence – Notification & Comment Filtering",
    summary: "Highlight urgent or harmful messages",
    category: [
      "social-brand-intelligence",
      "notification-comment-filtering"
    ],
    mapped_use_cases: [
      "Analyse post comments, alert managers about detractors messages"
    ],
    status: "STILL LIMITED",
    difficulty: "Intermediate",
    builder: {
      name: "",
      url: "",
    },
    updated_at: "2024-01-01",
    example: {
      input: "",
      output: "Highlight urgent or harmful messages",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/nan.json",
      image_url: "https://cdn.langflow.org/templates/nan.png",
      version: "1.0.0",
    },
    comment: "It depends on capturing and organizing data on an external platform."
  },
  {
    slug: "nan",
    topic: "Social & Brand Intelligence – Influencer Analysis & Discovery",
    summary: "Identify key voices mentioning the brand",
    category: [
      "social-brand-intelligence",
      "influencer-analysis-discovery"
    ],
    mapped_use_cases: [
      "Agent accesses Instagram pages of previously defined influencers and summarizes topics and mentions by period."
    ],
    status: "STILL LIMITED",
    difficulty: "Intermediate",
    builder: {
      name: "",
      url: "",
    },
    updated_at: "2024-01-01",
    example: {
      input: "",
      output: "Identify key voices mentioning the brand",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/nan.json",
      image_url: "https://cdn.langflow.org/templates/nan.png",
      version: "1.0.0",
    },
    comment: "It depends on capturing and organizing data on an external platform."
  },
  {
    slug: "nan",
    topic: "Industry: Hospitality – Guest Communication",
    summary: "nan",
    category: [
      "industry-hospitality",
      "guest-communication"
    ],
    mapped_use_cases: [
      "Automated Content Generation & Guest Communication"
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Alice Reis",
      url: "",
    },
    updated_at: "2025-06-24",
    example: {
      input: "",
      output: "nan",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/nan.json",
      image_url: "https://cdn.langflow.org/templates/nan.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "nan",
    topic: "Industry: Customer Svc – Agent Monitoring",
    summary: "nan",
    category: [
      "industry-customer-svc",
      "agent-monitoring"
    ],
    mapped_use_cases: [
      "AI Agent Monitoring for Customer Interactions"
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Alice Reis",
      url: "",
    },
    updated_at: "2025-06-25",
    example: {
      input: "",
      output: "nan",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/nan.json",
      image_url: "https://cdn.langflow.org/templates/nan.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "nan",
    topic: "Industry: Coaching – Coaching QA",
    summary: "nan",
    category: [
      "industry-coaching",
      "coaching-qa"
    ],
    mapped_use_cases: [
      "AI Coaching Quality Assurance"
    ],
    status: "NOT POSSIBLE",
    difficulty: "Intermediate",
    builder: {
      name: "",
      url: "",
    },
    updated_at: "2024-01-01",
    example: {
      input: "",
      output: "nan",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/nan.json",
      image_url: "https://cdn.langflow.org/templates/nan.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "nan",
    topic: "Industry: Enterprise – AI Perf. Monitoring",
    summary: "nan",
    category: [
      "industry-enterprise",
      "ai-perf-monitoring"
    ],
    mapped_use_cases: [
      "AI Performance Monitoring for Enterprise Solutions"
    ],
    status: "NOT POSSIBLE",
    difficulty: "Intermediate",
    builder: {
      name: "",
      url: "",
    },
    updated_at: "2024-01-01",
    example: {
      input: "",
      output: "nan",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/nan.json",
      image_url: "https://cdn.langflow.org/templates/nan.png",
      version: "1.0.0",
    },
    comment: "nan"
  },
  {
    slug: "nan",
    topic: "Industry: Government – Public Sector Eval",
    summary: "nan",
    category: [
      "industry-government",
      "public-sector-eval"
    ],
    mapped_use_cases: [
      "Structured LLM Evaluation for Public Sector RAG Systems"
    ],
    status: "DONE",
    difficulty: "Intermediate",
    builder: {
      name: "Victor Madeira",
      url: "",
    },
    updated_at: "2025-06-26",
    example: {
      input: "",
      output: "nan",
    },
    flow: {
      json_url: "https://cdn.langflow.org/templates/nan.json",
      image_url: "https://cdn.langflow.org/templates/nan.png",
      version: "1.0.0",
    },
    comment: "nan"
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
