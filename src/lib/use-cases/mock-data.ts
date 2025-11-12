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
    title: "Call Classification Analytics",
    summary: "Build an automated call transcription and classification system using Langflow that converts audio files into structured data with AI-powered analysis for topic, sentiment, resolution status, and urgency labeling.",
    shortDescription: "Build an automated call transcription and classification system using Langflow that converts audio files into structured data with AI-powered analysis for topic, sentiment, resolution status, and urgency labeling.",
    category: [
      "customer-support-operations"
    ],
    categoryDisplay: "Business",
    subcategory: "Customer Support",
    type: "classification",
    iconType: "support",
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
    updatedAt: "2025-01-15T00:00:00Z",
    example: {
      input: "Audio files",
      output: "Structured data with topic, sentiment, resolution status, and urgency labeling",
    },
    flow: {
      json_url: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/business_funcions/customer_support_operations/call_classification_analytics/call_classification_analytics.json",
      image_url: "https://cdn.langflow.org/templates/call-classification-analytics.png",
      version: "1.0.0",
    },
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/cf555ffa-5afd-4dbc-9ed6-9201240981c6/folder/861d1f51-3efd-40f1-ae6d-057838791478",
    githubDownloadUrl: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/business_funcions/customer_support_operations/call_classification_analytics/call_classification_analytics.json",
    comment: "Automated call transcription and classification system",
    line_number: 1,
    introText: "This Langflow flow creates a complete call transcription and classification system that transforms raw audio files into structured, analyzable data. The system automatically transcribes calls, analyzes their content using AI, and outputs consistent labels for topic, sentiment, resolution status, and urgency level. Langflow's visual interface lets you build this pipeline quickly without extensive coding, making it accessible for teams that need scalable call analytics but lack deep technical resources.",
    howItWorks: "This Langflow flow creates a comprehensive call transcription and classification system. The flow starts by taking an audio file and submitting it to AssemblyAI for transcription processing. It then monitors the transcription job until completion and retrieves the final transcript text.\n\nOnce the transcript is ready, the system processes it through a specialized AI agent designed for call analysis. The agent receives detailed instructions on how to classify calls based on topic, resolution status, sentiment, and urgency level. A parser component formats the transcript data appropriately before sending it to the agent for analysis.\n\nThe final stage uses structured output processing to ensure the results follow a consistent format. The agent's analysis gets converted into structured JSON data containing both the original transcript and classification details including topic, resolution, sentiment, and urgency fields. This structured output is then displayed through a chat interface, providing a complete call analytics solution from audio input to categorized results.",
    exampleUseCases: [
      "Sales teams can automatically label prospect calls by stage, objection type, and competitor mentions using prompt templates tailored to their sales process.",
      "Customer support operations can classify tickets by reason codes, sentiment scores, and SLA breach flags through webhook integration with their ticketing system.",
      "Quality assurance teams can audit compliance by checking script adherence and required disclosures using conditional logic components.",
      "Contact centers can generate coaching summaries and performance analytics by processing batches of calls through the Files API.",
      "Healthcare providers can categorize patient calls by urgency and route them appropriately using API request components to update their scheduling systems."
    ],
    extendingText: "The flow can be extended significantly using other Langflow components. You can add vector store integration to match transcripts against knowledge bases for policy compliance checks, implement text splitting for processing longer calls, or connect to downstream systems like CRMs and data warehouses. Conditional routing can trigger escalation workflows for high-priority issues, while embedding models enable semantic search across historical call data. For production deployments, you can expose the entire flow as an API endpoint and monitor performance using LangSmith integration. Advanced implementations might incorporate MCP tools to call external services during analysis or chain multiple flows together for complex processing pipelines accessible through the flow API."
  },
  {
    slug: "use-langflow-to-split-label-and-classify-file-chunks-automatically",
    topic: "Use Langflow to split, label, and classify file chunks automatically.",
    title: "Chunk Classification",
    summary: "Automate document processing with this Langflow workflow that ingests files, splits them into chunks, and uses AI-powered classification to systematically categorize each text segment. Build the entire pipeline through drag-and-drop components without extensive coding.",
    shortDescription: "Automate document processing with this Langflow workflow that ingests files, splits them into chunks, and uses AI-powered classification to systematically categorize each text segment. Build the entire pipeline through drag-and-drop components without extensive coding.",
    category: [
      "document-intelligence"
    ],
    categoryDisplay: "Documents",
    subcategory: "Knowledge Bases",
    type: "classification",
    iconType: "research",
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
    updatedAt: "2025-01-15T00:00:00Z",
    example: {
      input: "Files",
      output: "Categorized text segments",
    },
    flow: {
      json_url: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/ai_patterns/document_intelligence/chunk_classification/chunk_classification.json",
      image_url: "https://cdn.langflow.org/templates/chunk-classification.png",
      version: "1.0.0",
    },
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/6a96232c-0283-44ab-b06e-b4578e7b14ff/folder/861d1f51-3efd-40f1-ae6d-057838791478",
    githubDownloadUrl: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/ai_patterns/document_intelligence/chunk_classification/chunk_classification.json",
    comment: "Automated document chunking and classification workflow",
    line_number: 2,
    introText: "This Langflow workflow automates the process of ingesting documents, breaking them into manageable chunks, and systematically classifying each piece using AI-powered analysis. The approach eliminates manual document triage while preserving detailed metadata for each text segment, making it valuable for organizations that need to process large volumes of unstructured content efficiently. Langflow's visual interface lets you build this entire pipeline without extensive coding, connecting components through a drag-and-drop workflow builder.",
    howItWorks: "This Langflow flow processes documents by splitting them into chunks and classifying each chunk using an AI agent.\n\nThe flow begins by reading a file and splitting its content into manageable text chunks. A Split Text component breaks down the document using configurable parameters like chunk size and overlap. These chunks are then processed through a Loop component that handles each piece individually, converting the data format as needed with a Type Converter component.\n\nEach text chunk gets classified by an AI agent that follows specific instructions provided through a Prompt component. The agent uses OpenAI's language model to categorize each chunk into predefined fields: text, category, and explanation. A Structured Output component ensures the AI's response follows a consistent JSON format with proper data validation.\n\nThe classified results from all chunks are collected and displayed through a Chat Output component once the loop completes processing. This creates a systematic workflow for document analysis where large texts are broken down, individually classified, and then aggregated into structured results. The flow is particularly useful for content categorization, document analysis, or any task requiring systematic classification of text segments.\n\nFor more advanced implementations, you can extend this basic classification workflow by adding embedding models to generate vector representations of each chunk, then store both the classified metadata and embeddings in vector databases like Chroma or Pinecone. This enables similarity search and retrieval capabilities on top of the classification system.",
    exampleUseCases: [
      "Knowledge base ingestion where you automatically tag policies, procedures, and FAQs at the chunk level for downstream retrieval-augmented generation systems using vector store components.",
      "Compliance and governance workflows that flag personally identifiable information or contract clauses, then route sensitive chunks for human review through webhook integrations.",
      "Customer support documentation where you classify product manuals by features and versions, then push the labeled results to collaboration tools via Composio integrations.",
      "Research and publishing workflows that apply topic labels to literature collections for improved targeted retrieval using processing components.",
      "Enterprise data pipelines that normalize and classify email attachments or file storage contents before indexing them in production vector databases."
    ],
    extendingText: "The workflow can be extended significantly using other Langflow components. You can swap in different text splitters from the LangChain bundle to handle various document types, add conditional logic with If-Else components to route chunks based on classification results, or integrate custom Python components for domain-specific processing rules. The Playground feature also allows you to test and refine your classification criteria interactively before deploying the flow to production systems."
  },
  {
    slug: "use-langflow-to-analyze-files-and-extract-insights-automatically",
    topic: "Use Langflow to analyze files and extract insights automatically.",
    title: "CSV Query Assistant",
    summary: "Automated document analysis assistant built with Langflow that processes uploaded files, extracts insights through natural language queries, and performs mathematical calculations on document data without manual review.",
    shortDescription: "Automated document analysis assistant built with Langflow that processes uploaded files, extracts insights through natural language queries, and performs mathematical calculations on document data without manual review.",
    category: [
      "data-analytics-augmentation"
    ],
    categoryDisplay: "Analytics",
    subcategory: "Data",
    type: "research",
    iconType: "research",
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
    updatedAt: "2025-01-15T00:00:00Z",
    example: {
      input: "Uploaded files",
      output: "Extracted insights and calculations",
    },
    flow: {
      json_url: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/business_funcions/data_and_analytics_augmentation/csv_query_assistant/csv_query_assistant.json",
      image_url: "https://cdn.langflow.org/templates/csv-query-assistant.png",
      version: "1.0.0",
    },
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/674e858f-2b6e-415a-9d43-989792d46abf/folder/861d1f51-3efd-40f1-ae6d-057838791478",
    githubDownloadUrl: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/business_funcions/data_and_analytics_augmentation/csv_query_assistant/csv_query_assistant.json",
    comment: "Automated file analysis and insight extraction assistant",
    line_number: 3,
    introText: "This Langflow flow creates a document analysis assistant that automatically processes uploaded files and extracts meaningful insights through natural language queries. The system combines file parsing capabilities with AI-powered analysis to help users quickly understand document contents without manual review. Langflow's visual builder makes creating this type of automated analysis pipeline straightforward, requiring minimal code while providing powerful document processing capabilities.",
    howItWorks: "This Langflow flow creates a document analysis assistant that can read files and perform calculations on the data within them. The flow connects a chat input to an AI agent that has access to two specialized tools: a file reader and a calculator. Users can upload documents and ask questions about their contents, with the agent able to both extract information from files and perform mathematical operations on the data.\n\nThe agent is configured with specific instructions to act as a data-aware assistant that only relies on information found in uploaded files. It can process various file formats including CSV, JSON, TXT, PDF, and office documents through an advanced document parser. When users ask questions, the agent searches through the uploaded files to find relevant information and clearly indicates when data is not available in the documents.\n\nThe calculator tool enables the agent to perform mathematical analysis on data extracted from the files. This includes calculations like averages, totals, percentages, growth rates, and other statistical operations. The agent can combine information from multiple uploaded files and perform complex calculations to provide insights based on the actual data rather than making assumptions. The results are displayed through a chat output interface that maintains conversation history.",
    exampleUseCases: [
      "Financial report analysis where the system extracts revenue figures and calculates growth rates using structured output components",
      "Contract review workflows that identify key terms and calculate payment schedules from uploaded legal documents",
      "Research data processing that summarizes findings from multiple PDF papers and performs statistical analysis on cited figures",
      "Inventory management where CSV files are analyzed to calculate stock levels and reorder points automatically",
      "Customer survey analysis that processes response data and computes satisfaction metrics across different categories"
    ],
    extendingText: "The flow can be extended using other Langflow components to add more sophisticated capabilities. You could integrate vector stores like Chroma or FAISS for semantic search across large document collections, add web search functionality through Tavily to supplement file data with current information, or connect API request components to automatically send analysis results to external systems like CRMs or reporting dashboards. Additional processing nodes could handle specialized document types or implement custom business logic for specific analysis requirements."
  },
  {
    slug: "use-langflow-to-extract-structured-data-from-unstructured-documents",
    topic: "Use Langflow to extract structured data from unstructured documents.",
    title: "Data Extraction",
    summary: "Transform unstructured documents like PDFs, emails, and web pages into structured, machine-readable data using Langflow's visual, low-code approach. Build automated document processing pipelines for contracts, invoices, resumes, and financial reports with AI-powered extraction and validation.",
    shortDescription: "Transform unstructured documents like PDFs, emails, and web pages into structured, machine-readable data using Langflow's visual, low-code approach. Build automated document processing pipelines for contracts, invoices, resumes, and financial reports with AI-powered extraction and validation.",
    category: [
      "document-intelligence"
    ],
    categoryDisplay: "Processing",
    subcategory: "Data Extraction",
    type: "automation",
    iconType: "automation",
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
    updatedAt: "2025-01-15T00:00:00Z",
    example: {
      input: "Unstructured documents (PDFs, emails, web pages)",
      output: "Structured, machine-readable data",
    },
    flow: {
      json_url: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/ai_patterns/document_intelligence/data_extraction/data_extraction.json",
      image_url: "https://cdn.langflow.org/templates/data-extraction.png",
      version: "1.0.0",
    },
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/ee2e6481-b161-44d1-b5af-e0b9c248ebba/folder/861d1f51-3efd-40f1-ae6d-057838791478",
    githubDownloadUrl: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/ai_patterns/document_intelligence/data_extraction/data_extraction.json",
    comment: "Automated structured data extraction from unstructured documents",
    line_number: 4,
    introText: "Extracting structured data from unstructured documents transforms messy inputs like PDFs, emails, and scraped web pages into consistent, machine-readable formats. This process enables downstream automation for ETL pipelines, quality assurance, analytics, and robotic process automation without requiring custom parsers for each document type. Langflow provides a visual, low-code approach to building these document processing systems quickly and efficiently.",
    howItWorks: "This Langflow flow creates a document processing system that extracts structured data from contracts and generates SQL insert statements. The flow takes a file as input and processes it through an AI agent that has been specifically instructed to extract contracting company information. The agent uses OpenAI's GPT-4o model and follows a detailed prompt template that guides it to identify key business details like legal names, addresses, and representative information.\n\nThe system begins with file input components that can handle multiple document formats. For higher-fidelity text extraction that preserves tables and layout, you can use specialized parsers like Docling or Unstructured. The document content flows into a prompt template that provides clear extraction instructions and defines variables for the language model to process.\n\nThe extracted information gets processed through a structured output component that enforces a predefined schema with eight specific fields: legal_name, legal_document, business_address, email, phone, representative_name, representative_id, and representative_address. This component uses the same language model to ensure the data conforms to the expected structure and data types. The structured output component acts as a validation layer that converts the agent's response into a consistent JSON format.\n\nThe final output displays the processed results through a chat interface that shows the structured data extraction results. The flow combines file reading capabilities with AI-powered information extraction and data validation to create a complete document processing pipeline. Additional data operations and parsing components can clean and format fields before saving to CSV or JSON files, pushing data via API requests, or displaying results in chat outputs.\n\nFor deployment and automation, the flow can be triggered through API endpoints, webhook integrations, or programmatic file uploads. This system would be useful for automating the extraction of company information from legal contracts and converting that information into database-ready formats.",
    exampleUseCases: [
      "Financial reporting: Extract key performance indicators from earnings PDFs and convert them into structured rows for analysis and reporting dashboards.",
      "Legal document processing: Pull specific clauses and terms from contracts into JSON format, with RAG capabilities adding cross-document references for comprehensive contract analysis.",
      "HR and recruitment: Process resumes and support tickets for automated triage, then push results to Slack or email systems using Composio integrations.",
      "Research and compliance: Scrape web content with Apify, extract structured data, and save results to files or SQL databases for regulatory reporting.",
      "Invoice and receipt processing: Convert billing documents into structured data for accounting systems and expense management workflows."
    ],
    extendingText: "The flow can be extended significantly using other Langflow components. For enhanced document parsing, Docling integration preserves reading order, headings, and table structures while exporting to Markdown or HTML formats. Batch processing capabilities allow the model to run across multiple documents simultaneously. For improved accuracy on large document collections, you can implement retrieval-enhanced extraction by storing document chunks in vector databases and retrieving relevant context during processing. Webhook triggers enable event-driven processing from forms and queues, while API integrations send structured results to downstream business intelligence tools and databases."
  },
  {
    slug: "use-langflow-to-manage-communication-and-information-tasks",
    topic: "Use Langflow to manage communication and information tasks.",
    title: "Email Calendar Integration",
    summary: "Build sophisticated communication and information management systems with Langflow's visual drag-and-drop interface. Create automated email management, calendar integration, and reporting pipelines that connect Gmail, Google Calendar, and Outlook through intelligent agents powered by GPT-4o.",
    shortDescription: "Build sophisticated communication and information management systems with Langflow's visual drag-and-drop interface. Create automated email management, calendar integration, and reporting pipelines that connect Gmail, Google Calendar, and Outlook through intelligent agents powered by GPT-4o.",
    category: [
      "web-workflow-automation"
    ],
    categoryDisplay: "Automation",
    subcategory: "Workflow",
    type: "automation",
    iconType: "automation",
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
    updatedAt: "2025-01-15T00:00:00Z",
    example: {
      input: "Emails and calendar events",
      output: "Automated management and reporting",
    },
    flow: {
      json_url: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/ai_patterns/web_%26_workflow_automation/email_calendar_integration/email_calendar_integration.json",
      image_url: "https://cdn.langflow.org/templates/email-calendar-integration.png",
      version: "1.0.0",
    },
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/ab4bce81-f7de-48b2-8298-b92de6d509b3/folder/861d1f51-3efd-40f1-ae6d-057838791478",
    githubDownloadUrl: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/ai_patterns/web_%26_workflow_automation/email_calendar_integration/email_calendar_integration.json",
    comment: "Communication and information management automation",
    line_number: 5,
    introText: "Langflow enables you to build sophisticated communication and information management systems through visual, drag-and-drop interfaces that require minimal coding. This approach transforms complex email management, calendar integration, and automated reporting tasks into configurable pipelines that can be deployed as APIs, embedded chat widgets, or triggered by webhooks. The visual framework assembles LLMs, prompts, retrievers, tools, and connectors in a model-agnostic environment, reducing development time and enabling rapid iteration.",
    howItWorks: "This Langflow flow creates an administrative assistant that automates email management and calendar integration across multiple platforms. The system connects to Gmail, Google Calendar, and Outlook services through Composio API components, providing a unified interface for handling email and scheduling tasks. The flow uses OpenAI's GPT-4o model to power an intelligent agent that can understand natural language requests and execute appropriate actions across these connected services.\n\nThe core functionality revolves around email summarization and automated reporting. The agent is specifically programmed to fetch emails based on user-defined criteria, create concise summaries of the email content, and format these summaries in a structured format. The system follows a specific template that includes sender information, email subjects, and brief content summaries, ensuring consistent and readable output for users who need quick overviews of their email communications.\n\nThe flow operates through a simple chat interface where users can input requests in natural language. The agent processes these requests, determines which tools to use (Gmail for email operations, Google Calendar for scheduling, or Outlook for Microsoft-based email management), and returns formatted responses through the chat output. The system includes built-in safeguards to avoid including full email payloads or confidential data, focusing instead on providing useful summaries while maintaining privacy and security standards.\n\nThe architecture begins with input components that can handle various trigger types. Users can implement Chat Input components for embedded UIs, POST requests to /v1/run endpoints for programmatic calls, or Webhook components for event-driven payloads. The processing layer includes Parser and Data Operations components to extract fields from incoming payloads, Prompt Templates to compose instructions with variables, and Language Models for generation tasks.\n\nThe system can be extended with RAG capabilities using vector stores for document retrieval, web search functionality for real-time information, and Structured Output components to emit validated JSON for downstream actions. Message History components provide continuity across conversations, while API Request components enable integration with external systems beyond the built-in service connectors.",
    exampleUseCases: [
      "Email triage systems that automatically classify incoming messages, extract key information, and route them to appropriate team members based on content analysis and priority scoring.",
      "Daily digest generators that scan multiple email accounts and calendar systems to produce structured summaries of upcoming meetings, pending tasks, and important communications for executive briefings.",
      "Customer support automation that processes support tickets from email, categorizes issues using RAG retrieval against knowledge bases, and drafts initial responses or escalation notifications.",
      "Meeting preparation assistants that analyze calendar invitations, gather relevant documents and previous communications, and compile briefing materials automatically before scheduled meetings.",
      "Cross-platform notification systems that monitor multiple communication channels and send consolidated alerts through preferred channels when specific criteria are met."
    ],
    extendingText: "The flow can be extended significantly using other Langflow components. You can integrate vector stores like pgvector or Qdrant for document retrieval capabilities, add web search tools for real-time information gathering, or connect to databases and CRM systems through API Request components. The system supports streaming responses for real-time interactions and can be exposed as MCP tools for integration with other AI systems. Advanced users can implement routing logic to distribute requests across different language models based on cost or latency requirements, and add observability features for monitoring and troubleshooting deployed flows."
  },
  {
    slug: "use-langflow-to-create-concise-document-summaries-and-overviews",
    topic: "Use Langflow to create concise document summaries and overviews.",
    title: "Generate Concise Overviews",
    summary: "Build document summarization workflows in Langflow using visual drag-and-drop components to automatically generate concise overviews from files, URLs, and APIs. Create production-ready pipelines with vector storage, structured outputs, and automated processing without complex coding.",
    shortDescription: "Build document summarization workflows in Langflow using visual drag-and-drop components to automatically generate concise overviews from files, URLs, and APIs. Create production-ready pipelines with vector storage, structured outputs, and automated processing without complex coding.",
    category: [
      "document-intelligence"
    ],
    categoryDisplay: "Documents",
    subcategory: "Knowledge Bases",
    type: "automation",
    iconType: "research",
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
    updatedAt: "2025-01-15T00:00:00Z",
    example: {
      input: "Files, URLs, and APIs",
      output: "Concise document summaries and overviews",
    },
    flow: {
      json_url: "/flows/generate_concise_overviews.json",
      image_url: "https://cdn.langflow.org/templates/generate-concise-overviews.png",
      version: "1.0.0",
    },
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/5f11b2b7-72e2-4174-85f3-7c98e7b0fd8e/folder/861d1f51-3efd-40f1-ae6d-057838791478",
    githubDownloadUrl: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/ai_patterns/document_intelligence/generate_concise_overviews/generate_concise_overviews.json",
    comment: "Automated document summarization workflow",
    line_number: 6,
    introText: "Langflow enables you to build document summarization workflows that automatically generate concise overviews from various content sources including files, URLs, and API data. This visual approach eliminates complex coding while creating production-ready pipelines that can process documents, extract key information, and produce structured summaries through an intuitive drag-and-drop interface.",
    howItWorks: "Document summarization flows in Langflow typically begin with input components that accept content from multiple sources. Chat Input components handle manual document uploads and user queries, while Webhook components enable automated processing from external systems. File and URL components ingest documents directly, and API Request components pull content from remote services.\n\nFor simple summarization tasks, documents flow directly to text processing components. The Split Text component breaks large documents into manageable chunks, while Parser components convert various file formats into readable text. This processed content then connects to Prompt Template components that structure the summarization instructions with variables for context and specific requirements.\n\nMore sophisticated workflows incorporate vector storage for retrieval-augmented generation. Documents get embedded using Embedding Model components and stored in vector databases like Astra DB, Chroma, or FAISS. When processing queries, the system retrieves relevant document sections, combines them with the summarization prompt, and sends everything to the Language Model component.\n\nThe Language Model component processes the assembled prompt and generates summaries according to specified parameters like length, format, and tone. For consistent output formatting, Structured Output components enforce JSON schemas that organize summaries into sections like key points, conclusions, and action items.\n\nResults appear through Chat Output components during testing or get returned as JSON responses when accessed via Langflow's REST API. The entire workflow can be deployed as a standalone service or integrated into existing applications through API calls.",
    exampleUseCases: [
      "Generate executive summaries from research reports and policy documents using File components paired with structured output formatting.",
      "Create meeting summaries by combining AssemblyAI transcription bundles with summarization prompts.",
      "Process customer support tickets automatically through Webhook triggers that generate incident overviews.",
      "Build compliance document digests using vector store retrieval across large document collections.",
      "Summarize web content and articles by connecting URL components to Docling parsing bundles for complex document formats."
    ],
    extendingText: "These basic summarization flows can be extended significantly using additional Langflow components. LLM Router components can direct different document types to specialized models, while Batch Run components enable processing multiple documents simultaneously. Integration components like API Request can automatically distribute summaries to Slack channels, email systems, or document management platforms, creating end-to-end automation workflows."
  },
  {
    slug: "use-langflow-to-classify-and-route-uploaded-files",
    topic: "Use Langflow to classify and route uploaded files.",
    title: "Ingestion Router",
    summary: "Automate document categorization and storage with this Langflow system that intelligently routes uploaded files to separate knowledge bases based on content analysis, eliminating manual sorting for HR, legal, and business documents.",
    shortDescription: "Automate document categorization and storage with this Langflow system that intelligently routes uploaded files to separate knowledge bases based on content analysis, eliminating manual sorting for HR, legal, and business documents.",
    category: [
      "agentic-rag"
    ],
    categoryDisplay: "Data",
    subcategory: "Agentic RAG",
    type: "automation",
    iconType: "automation",
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
    updatedAt: "2025-01-15T00:00:00Z",
    example: {
      input: "Uploaded files",
      output: "Files routed to appropriate knowledge bases",
    },
    flow: {
      json_url: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/ai_patterns/agentic_rag/ingestion_router/ingestion_router.json",
      image_url: "https://cdn.langflow.org/templates/ingestion-router.png",
      version: "1.0.0",
    },
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/56e118ac-7700-47de-93a7-11662905c2bf/folder/861d1f51-3efd-40f1-ae6d-057838791478",
    githubDownloadUrl: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/ai_patterns/agentic_rag/ingestion_router/ingestion_router.json",
    comment: "Automated file classification and routing system",
    line_number: 7,
    introText: "This Langflow flow creates an intelligent document routing and ingestion system that automatically categorizes uploaded files and stores them in separate knowledge bases. Organizations often receive diverse document types that need to be processed differently, and manual sorting becomes time-consuming and error-prone. Langflow provides a visual, code-light approach to building this automation, allowing teams to create sophisticated document workflows without extensive programming.",
    howItWorks: "This Langflow flow creates an intelligent document routing and ingestion system that automatically categorizes uploaded files and stores them in separate knowledge bases.\n\nThe flow starts by reading files through a File component, which can handle various document formats including PDFs, Word documents, images, and text files. These files are then passed to a Smart Router component that uses a language model to automatically categorize the content. The router is configured with two routes: \"HR\" for resumes and HR-related documents, and \"Legal\" for contracts and agreements. The language model analyzes each document's content and determines which category it belongs to based on the routing instructions.\n\nOnce categorized, the documents follow separate processing paths. Each route feeds into its own Split Text component that breaks the documents into manageable chunks with configurable size and overlap settings. The chunked text is then processed by dedicated Knowledge Ingestion components that store the data in separate knowledge bases - \"HR_BASE\" for HR documents and \"Legal_BASE\" for legal documents. Each knowledge base is configured to vectorize the text content for semantic search capabilities while maintaining the original document structure and metadata.\n\nThe classification process relies on either a Prompt Template combined with a Language Model or the Structured Output component to extract document types with confidence scores. The routing logic uses conditional components to evaluate classifications and direct documents to appropriate processing branches. Files can be uploaded through the UI, programmatically via the v2 files API, or attached to chat and webhook triggers, with support for files up to 1024 MB in common formats.",
    exampleUseCases: [
      "Accounts payable departments can route invoices directly to ERP systems while sending non-invoice documents to review queues using API Request components.",
      "Recruiting teams can classify resumes versus cover letters and push qualified resumes to applicant tracking systems through HTTP integrations.",
      "Legal operations can identify contracts and load them into vector stores for clause search and compliance monitoring.",
      "Support teams can triage attachments like logs versus screenshots and automatically open tickets with appropriate templates using webhook triggers.",
      "Knowledge management systems can detect reference documents and ingest them for RAG applications while filtering out personal files."
    ],
    extendingText: "The flow can be extended using additional Langflow components for more sophisticated processing. Teams can add confidence-aware routing by incorporating confidence scores from Structured Output and sending uncertain classifications to human reviewers via Slack integration. Storage options can be customized with S3 uploaders or local file storage, while database logging captures classification results. Multi-step processing chains can trigger secondary flows for OCR, redaction, or document signing workflows. For more complex scenarios, Agent components can replace simple language models to enable dynamic decision-making with access to external tools and APIs."
  },
  {
    slug: "use-langflow-to-enrich-calendar-meetings-automatically",
    topic: "Use Langflow to enrich calendar meetings automatically.",
    title: "Meeting Preparation",
    summary: "Automate sales meeting preparation with this Langflow AI assistant that analyzes calendar events, researches attendee companies, and generates structured briefings with talking points and business intelligence to help sales teams arrive informed at every meeting.",
    shortDescription: "Automate sales meeting preparation with this Langflow AI assistant that analyzes calendar events, researches attendee companies, and generates structured briefings with talking points and business intelligence to help sales teams arrive informed at every meeting.",
    category: [
      "sales-marketing-automation"
    ],
    categoryDisplay: "Productivity",
    subcategory: "Sales Intelligence",
    type: "automation",
    iconType: "automation",
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
    updatedAt: "2025-01-15T00:00:00Z",
    example: {
      input: "Calendar events",
      output: "Structured briefings with talking points and business intelligence",
    },
    flow: {
      json_url: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/business_funcions/sales_marketing_automation/meeting_preparation/meeting_preparation.json",
      image_url: "https://cdn.langflow.org/templates/meeting-preparation.png",
      version: "1.0.0",
    },
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/c1a9d40e-d784-49f4-9a46-10da8fe5307b/folder/861d1f51-3efd-40f1-ae6d-057838791478",
    githubDownloadUrl: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/business_funcions/sales_marketing_automation/meeting_preparation/meeting_preparation.json",
    comment: "Automated calendar meeting enrichment system",
    line_number: 8,
    introText: "This Langflow flow creates an AI assistant that automatically prepares sales meeting briefings by analyzing calendar events and researching attendee companies. The system eliminates manual preparation time by gathering relevant business intelligence before each meeting, ensuring sales teams arrive informed about participants and their organizations. Langflow's visual interface makes building this automation straightforward without extensive coding requirements.",
    howItWorks: "This Langflow flow creates an AI assistant that automatically prepares sales meeting briefings by analyzing calendar events and researching attendee companies. The system uses an OpenAI-powered agent that receives detailed instructions through a prompt component, which tells it to read calendar events, extract participant email domains, and research associated companies. The agent has access to two main tools: a Google Calendar integration for retrieving meeting information and a Serp Search API for conducting web research on companies.\n\nThe workflow begins when the agent receives the system prompt containing comprehensive instructions for meeting preparation. The prompt specifies that the agent should analyze event titles, descriptions, and participant lists from the connected calendar, then extract email domains to identify companies that need research. The agent is instructed to gather specific information about each company including their value proposition, industry sector, company size, main products, and target customers using credible web sources.\n\nThe agent processes this information and delivers structured output for each calendar event, providing actionable business context in 3-5 line summaries. It maps participants to their associated companies, suggests 2-3 relevant talking points for sales or partnership conversations, and includes source links for verification. The system maintains professional standards by only using verifiable information and clearly stating when data is insufficient, ensuring the sales team receives reliable intelligence for their upcoming meetings.",
    exampleUseCases: [
      "Sales teams can automatically receive company research and talking points for prospect meetings triggered through Zapier's Google Calendar integration.",
      "Partnership managers can get industry context and competitive intelligence for vendor meetings using Langflow's webhook component to process calendar updates.",
      "Account executives can receive briefings on client company news, recent developments, and strategic initiatives before quarterly business reviews.",
      "Business development teams can automatically gather market research and company positioning data for networking events and conferences.",
      "Customer success managers can get updated company information and recent news before renewal discussions."
    ],
    extendingText: "The flow can be extended using other Langflow nodes to create more comprehensive meeting preparation. You could add vector store retrievers to pull internal CRM notes and previous meeting records, incorporate API request components to fetch data from sales tools like Salesforce or HubSpot, or use structured output components to format briefings as standardized templates. Additional Composio integrations could automatically update calendar descriptions with research findings or send briefings to Slack channels, while agent components could enable more sophisticated reasoning about meeting priorities and research depth based on deal size or relationship status."
  },
  {
    slug: "use-langflow-to-summarize-github-metrics-from-bigquery",
    topic: "Use Langflow to summarize GitHub metrics from BigQuery.",
    title: "09_multi-source_retrieval",
    summary: "Execute SQL queries against Google's public GitHub datasets in BigQuery and generate human-readable development reports using Langflow's visual workflow interface. Build automated analytics pipelines that process commit metrics, contributor statistics, and language distributions without custom coding.",
    shortDescription: "Execute SQL queries against Google's public GitHub datasets in BigQuery and generate human-readable development reports using Langflow's visual workflow interface. Build automated analytics pipelines that process commit metrics, contributor statistics, and language distributions without custom coding.",
    category: [
      "data-analytics-augmentation"
    ],
    categoryDisplay: "Analytics",
    subcategory: "DevOps",
    type: "research",
    iconType: "research",
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
    updatedAt: "2025-01-15T00:00:00Z",
    example: {
      input: "BigQuery GitHub datasets",
      output: "Human-readable development reports",
    },
    flow: {
      json_url: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/business_funcions/data_and_analytics_augmentation/multi-source_retrieval/multi-source_retrieval.json",
      image_url: "https://cdn.langflow.org/templates/multi-source-retrieval.png",
      version: "1.0.0",
    },
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/d8df7a67-892a-4835-87c4-b6ebc8b40f0a/folder/861d1f51-3efd-40f1-ae6d-057838791478",
    githubDownloadUrl: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/business_funcions/data_and_analytics_augmentation/multi-source_retrieval/multi-source_retrieval.json",
    comment: "Automated GitHub metrics analysis from BigQuery",
    line_number: 9,
    introText: "This Langflow workflow executes SQL queries against Google's public GitHub datasets in BigQuery, processes the results, and uses an LLM to generate human-readable summaries of development metrics. The flow eliminates the need for custom glue code while providing an easy way to test, reuse, and deploy GitHub analytics pipelines. Langflow's visual interface lets you build this data processing pipeline quickly without extensive coding.",
    howItWorks: "This Langflow flow creates a data analytics system that processes GitHub metrics from BigQuery and generates comprehensive development reports. The flow combines data retrieval, processing, and analysis capabilities through a series of connected components.\n\nThe flow begins with a trigger component, typically a Chat Input for interactive use or a Webhook for automated scheduling. The core data retrieval happens through Langflow's BigQuery component, which executes parameterized SQL queries against public datasets like bigquery-public-data.github_repos. These queries can retrieve commit volumes by repository, contributor statistics, language distributions, and other development metrics over specified time periods.\n\nRaw query results flow into processing components that reshape the tabular data into formats suitable for LLM consumption. DataFrame Operations or Parser components convert rows and columns into concise text snippets or structured data that can be embedded in prompts.\n\nThe processed data feeds into a Prompt Template component that defines the summary goals and output format. This prompt instructs the LLM on how to interpret the metrics and what type of narrative to generate, whether that's bullet points, JSON structures, or executive summaries. A Language Model component then processes the prompt and data to create the final human-readable report.\n\nThe workflow concludes with output components that deliver results to users or downstream systems. Chat Output handles interactive scenarios, while API Request components can send summaries to external services like Slack webhooks or dashboard applications.",
    exampleUseCases: [
      "Generate weekly engineering reports that summarize commits by repository and team, identify top contributors, and highlight development hotspots with narrative context for management reviews.",
      "Create developer relations insights by analyzing language trends across organizational repositories and detecting activity spikes that inform content strategy or roadmap decisions.",
      "Produce compliance and security summaries that flag anomalous commit patterns or large file additions with plain-language explanations for non-technical stakeholders.",
      "Build automated project health dashboards that combine commit velocity, contributor diversity, and code quality metrics into digestible executive briefings.",
      "Monitor open source project engagement by tracking stars, forks, and contribution patterns across multiple repositories with trend analysis."
    ],
    extendingText: "You can extend this flow using other Langflow components to create more sophisticated analytics pipelines. Add LLM Router components to select different models based on the type of analysis needed, incorporate API Request components to pull additional context from GitHub's REST API, or use conditional logic to trigger different processing paths based on metric thresholds. The flow can be published and called via API with runtime parameters, allowing a single workflow to serve multiple teams or projects with different filtering criteria.\n\nThe setup process involves several key steps. First, configure Google Cloud by enabling the BigQuery API, creating a service account with BigQuery Job User permissions, and downloading the JSON credentials. In Langflow, add the Google BigQuery component and upload the service account key to establish authentication.\n\nBuild the core flow by connecting components in sequence: input trigger, BigQuery query execution, data processing, prompt templating, LLM analysis, and output delivery. Start development using BigQuery's sample tables like sample_commits to control costs and estimate query complexity before switching to full datasets.\n\nFor production deployment, publish the flow through Langflow's API or embed the chat interface in web applications. Runtime parameters called \"tweaks\" allow dynamic filtering by repository, date ranges, or team assignments without modifying the underlying flow structure.\n\nCost management becomes important when working with large datasets. BigQuery charges based on bytes scanned, so optimize queries by selecting specific columns, using appropriate date filters, and testing with sample tables first. The public GitHub datasets contain nested fields that may require flattening in SQL queries for proper analysis.\n\nThis approach provides significant advantages over traditional data pipeline development. The visual flow design makes it easy for non-developers to understand and modify the analytics logic. Component reusability means you can adapt the same pattern for different metrics or data sources. The integration between BigQuery's powerful SQL capabilities and modern LLMs creates sophisticated analysis tools without complex infrastructure management."
  },
  {
    slug: "use-langflow-to-implement-web-based-rag-for-article-processing",
    topic: "Use Langflow to implement web-based RAG for article processing.",
    title: "RAG Article in Web with Agent",
    summary: "Build a RAG system in Langflow that extracts content from web articles and RSS feeds, stores it in vector databases, and provides grounded answers to questions about the content using a visual drag-and-drop interface with minimal coding required.",
    shortDescription: "Build a RAG system in Langflow that extracts content from web articles and RSS feeds, stores it in vector databases, and provides grounded answers to questions about the content using a visual drag-and-drop interface with minimal coding required.",
    category: [
      "agentic-rag"
    ],
    categoryDisplay: "Data",
    subcategory: "Agentic RAG",
    type: "research",
    iconType: "research",
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
    updatedAt: "2025-01-15T00:00:00Z",
    example: {
      input: "Web articles and RSS feeds",
      output: "Grounded answers to questions about the content",
    },
    flow: {
      json_url: "/flows/rag_article_in_web_with_agent.json",
      image_url: "https://cdn.langflow.org/templates/rag-article-in-web-with-agent.png",
      version: "1.0.0",
    },
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/9fdea31e-f344-4e28-b206-dc72d82a5566/folder/861d1f51-3efd-40f1-ae6d-057838791478",
    githubDownloadUrl: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/ai_patterns/agentic_rag/rag_article_in_web_with_agent/rag_article_in_web_with_agent.json",
    comment: "Web-based RAG system for article processing",
    line_number: 10,
    introText: "This Langflow flow creates a RAG (Retrieval-Augmented Generation) system that can extract content from web articles, store it in a vector database, and answer questions about the content. The system allows you to process URLs or RSS feeds, clean and chunk the text, embed it into a vector store, then provide grounded answers based on retrieved passages. Langflow's visual interface makes building this pipeline fast and requires minimal coding, letting you connect components through drag-and-drop operations.",
    howItWorks: "This Langflow flow creates a RAG system that extracts content from web articles, stores it in a vector database, and answers questions about the content. The flow consists of several connected components that work together to process URLs and respond to user queries about the extracted content.\n\nThe system uses input components like Webhook to start runs from external systems, API Request for arbitrary HTTP calls, URL for crawling pages, and RSS Reader to pull article feeds. These components output Data/DataFrame or Message objects for downstream processing steps.\n\nFor article parsing, the flow normalizes raw HTML to text or Markdown using Parser components for templated extraction, or Docling components for robust document-to-Markdown conversion when handling complex content structures.\n\nThe indexing process splits text into manageable chunks, generates embeddings using Embedding Model components or provider-specific embeddings, and writes the results to a vector store such as pgvector, Pinecone, Chroma, Astra DB, or Weaviate.\n\nAt query time, the system embeds the user question, runs similarity search on the vector store, optionally applies reranking, builds a Prompt Template that inserts retrieved context, calls a Language Model, and returns a grounded answer via Chat Output. The Vector Store RAG template separates ingestion from retrieval, making it ideal for repeatable indexing plus a chat interface.\n\nThe flow operates by taking user input containing both a URL and a question about that URL's content. The system includes guardrails to ensure content extraction succeeds and that responses are grounded in the actual document content rather than external knowledge. You can run flows via API endpoints or trigger them via webhooks, making the same pipeline work for web apps, webhooks, or embedded widgets without additional backend code.",
    exampleUseCases: [
      "Editorial research assistants that summarize multiple articles and pull quotes with citations using the Vector Store RAG template",
      "Compliance and news monitoring systems that flag policy changes across sources by processing RSS feeds",
      "Competitive and SEO briefing tools that aggregate and compare posts from multiple URLs",
      "Academic and market research reviewers providing grounded Q&A over reading lists",
      "Customer education portals that answer how-to questions from published documentation"
    ],
    extendingText: "The flow can be extended using other Langflow nodes for enhanced functionality. You can prepend web search using SearchApi components to discover relevant URLs before ingestion, use Apify Actors for structured site-wide crawling, add NVIDIA Rerank components to improve context ordering, switch among different vector stores like pgvector depending on hosting requirements, integrate LangWatch for observability, and test iterations in the Playground environment."
  },
  {
    slug: "use-langflow-to-fetch-stock-data-and-generate-an-ai-summary",
    topic: "Use Langflow to fetch stock data and generate an AI summary.",
    title: "Stock Market Analysis",
    summary: "Build a financial market analysis assistant using Langflow that researches companies and stock performance through an AI-powered chat interface. The system uses OpenAI's GPT-4o with Yahoo Finance and web search tools to analyze market data, news impact, and provide structured investment insights for portfolio managers, traders, and financial advisors.",
    shortDescription: "Build a financial market analysis assistant using Langflow that researches companies and stock performance through an AI-powered chat interface. The system uses OpenAI's GPT-4o with Yahoo Finance and web search tools to analyze market data, news impact, and provide structured investment insights for portfolio managers, traders, and financial advisors.",
    category: [
      "data-analytics-augmentation"
    ],
    categoryDisplay: "Analytics",
    subcategory: "Financial",
    type: "research",
    iconType: "research",
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
    updatedAt: "2025-01-15T00:00:00Z",
    example: {
      input: "Company and stock queries",
      output: "Structured investment insights and market analysis",
    },
    flow: {
      json_url: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/business_funcions/data_and_analytics_augmentation/stock_market_analysis/stock_market_analysis.json",
      image_url: "https://cdn.langflow.org/templates/stock-market-analysis.png",
      version: "1.0.0",
    },
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/cd11ae4e-b22d-4da9-b138-014ab23b09bb/folder/861d1f51-3efd-40f1-ae6d-057838791478",
    githubDownloadUrl: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/business_funcions/data_and_analytics_augmentation/stock_market_analysis/stock_market_analysis.json",
    comment: "Financial market analysis assistant",
    line_number: 11,
    introText: "This Langflow flow creates a financial market analysis assistant that helps users research companies and their stock performance. The system takes user input through a chat interface and processes it using an AI agent powered by OpenAI's GPT-4o model. The agent receives specific instructions to act as a financial market analyst and follows a structured approach to gather and analyze company information. Langflow makes building this system straightforward through its visual, drag-and-drop interface that requires minimal coding.",
    howItWorks: "This Langflow flow creates a financial market analysis assistant that helps users research companies and their stock performance. The system takes user input through a chat interface and processes it using an AI agent powered by OpenAI's GPT-4o model. The agent receives specific instructions to act as a financial market analyst and follows a structured approach to gather and analyze company information.\n\nThe agent has access to two main research tools to gather financial data and news. The Yahoo Finance component retrieves financial information, news articles, and various market data for specified companies using their stock symbols. The Serp Search API component serves as a backup search tool that can find additional information through web searches when Yahoo Finance doesn't provide sufficient results.\n\nThe system processes user queries by first identifying the companies mentioned, then using the available tools to gather recent news and financial data. The agent analyzes this information to generate insights about how news events might impact stock prices, categorizing each impact as positive, negative, or neutral. The final analysis is delivered through the chat output, providing users with clear, company-specific insights focused on stock performance implications.\n\nThe flow begins with a Chat Input component that captures user queries about specific companies or market conditions. This input connects to a Prompt Template that structures the agent's instructions and defines its role as a financial analyst. The prompt template feeds into a Language Model component configured with OpenAI's GPT-4o, which processes the request and determines what information to gather.\n\nWhen the agent needs market data, it calls the API Request component configured for Yahoo Finance endpoints. This component handles authentication using global variables for API keys and manages the HTTP requests to retrieve stock prices, company news, and financial metrics. The raw JSON responses from these API calls pass through Parser components that extract relevant fields like closing prices, volume data, and news headlines.\n\nThe parsed data flows back to the language model, which synthesizes the information into a coherent analysis. The system can handle multiple companies in a single query and provides structured insights about each one. Error handling occurs through conditional logic that manages cases where stock symbols are invalid or API requests fail.",
    exampleUseCases: [
      "Portfolio managers can quickly assess multiple holdings by asking \"What's the outlook for AAPL, MSFT, and GOOGL based on recent news?\"",
      "Financial advisors can prepare for client meetings by requesting summaries like \"Analyze Tesla's recent performance and any factors affecting its stock price.\"",
      "Traders can get rapid market insights during volatile periods by querying \"What news is driving unusual activity in banking stocks today?\"",
      "Research teams can use the system to generate preliminary analysis before deeper investigation into specific sectors or companies.",
      "Investment committees can obtain structured briefings on companies under consideration for portfolio inclusion."
    ],
    extendingText: "The flow can be extended significantly using other Langflow components. You could add SQL Database connections to store historical analysis for trend tracking, implement Webhook triggers for automated daily briefings, or incorporate News Search components for broader market context. Structured Output components could format results as JSON for integration with external systems, while Router components could direct different types of queries to specialized analysis paths. Additional API Request nodes could pull data from multiple financial providers for cross-validation, and Run Flow components could chain multiple analysis workflows together for comprehensive market research."
  },
  {
    slug: "use-langflow-to-analyze-and-classify-support-tickets",
    topic: "Use Langflow to analyze and classify support tickets.",
    title: "Ticket Analysis Classification",
    summary: "Automate support ticket classification with AI-powered analysis that categorizes priority levels, sentiment, and topics from unstructured text using Langflow's visual workflow builder for faster customer service triage.",
    shortDescription: "Automate support ticket classification with AI-powered analysis that categorizes priority levels, sentiment, and topics from unstructured text using Langflow's visual workflow builder for faster customer service triage.",
    category: [
      "customer-support-operations"
    ],
    categoryDisplay: "Business",
    subcategory: "Customer Support",
    type: "classification",
    iconType: "support",
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
    updatedAt: "2025-01-15T00:00:00Z",
    example: {
      input: "Support tickets (unstructured text)",
      output: "Categorized tickets by priority, sentiment, and topics",
    },
    flow: {
      json_url: "/flows/ticket_analysis_classification.json",
      image_url: "https://cdn.langflow.org/templates/ticket-analysis-classification.png",
      version: "1.0.0",
    },
    iframeSrc: "https://ubuntu-production-da92.up.railway.app/flow/a1c3a4f3-1a7d-4248-ab07-698591143ff4/folder/861d1f51-3efd-40f1-ae6d-057838791478",
    githubDownloadUrl: "https://raw.githubusercontent.com/Empreiteiro/langflow-templates/main/business_funcions/customer_support_operations/ticket_analysis_classification/ticket_analysis_classification.json",
    comment: "Automated support ticket classification system",
    line_number: 12,
    introText: "Support ticket classification is a critical process for customer service teams that need to quickly categorize, prioritize, and route incoming requests. This Langflow workflow automates the analysis and classification of support tickets by using AI to extract structured information like priority levels, sentiment, and topic categories from unstructured ticket text. Langflow's visual interface makes it straightforward to build this classification system without extensive coding, allowing teams to deploy automated ticket triage quickly.",
    howItWorks: "This Langflow flow creates a ticket classification system that analyzes customer support messages. The flow receives support tickets through a chat input interface and processes them using an AI agent powered by OpenAI's GPT-4o model. The system is designed to automatically categorize incoming support requests without human intervention.\n\nThe core functionality centers around a detailed prompt template that instructs the AI to classify tickets on two dimensions: severity and sentiment. Severity levels range from Critical (urgent business-affecting issues) to Low (minor problems or general inquiries), while sentiment is categorized as Positive, Neutral, or Negative based on the customer's tone. The prompt includes specific examples and strict formatting requirements to ensure consistent output.\n\nThe AI agent processes each ticket according to these classification rules and returns structured results in a standardized format. The classified ticket information is then displayed through a chat output component, making it easy to view the results. This automated system helps support teams quickly prioritize and route tickets based on their urgency and the customer's emotional state.\n\nFor production deployments, tickets typically arrive via webhook nodes that receive POST requests from external ticketing systems, or through scheduled API requests that fetch new tickets from platforms like Zendesk or Jira Service Management. The flow uses data processing components to normalize ticket fields like subject, body, customer information, and communication channel before classification.\n\nThe language model component runs the classification instructions, often paired with structured output schemas to ensure consistent JSON formatting and reduce parsing errors. Logic components like conditional branches can route high-severity tickets to different processing paths, such as immediately alerting on-call teams for critical issues while sending routine requests to standard queues.\n\nResults can be stored in databases, sent to notification systems, or used to update ticket fields in the original support platform through API calls. The playground environment allows teams to test classification accuracy with sample tickets before deploying the flow to production.",
    exampleUseCases: [
      "E-commerce platforms can automatically route product complaints to specific teams while flagging angry customers for priority handling using conditional logic.",
      "SaaS companies can identify security-related tickets and escalate them immediately to engineering teams through Slack notifications.",
      "Financial services can detect compliance-sensitive requests and flag them for specialized review using custom classification schemas.",
      "Healthcare organizations can classify patient inquiries by urgency and route appointment requests differently from billing questions.",
      "IT departments can automatically assign hardware issues to field technicians while directing software problems to development teams."
    ],
    extendingText: "The flow can be extended significantly using other Langflow components. Embedding models and vector stores can match tickets to existing knowledge base articles for better context during classification. Agent components can automatically create follow-up tasks in project management tools or draft initial response templates. Database connectors enable storing classification results for analytics dashboards that track support trends over time. Teams can also chain multiple flows together, where the classification output triggers secondary workflows for customer sentiment analysis or automated response generation using MCP tools. Monitoring integrations with platforms like LangSmith provide visibility into classification accuracy and model performance over time."
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

// Flow compatibility functions (for backward compatibility with flows.ts)
// Flow type that extends Template with Flow-compatible properties
export type Flow = Template & {
  // Ensure these properties exist for backward compatibility
  category: string; // Override array with string for Flow compatibility
  subcategory: string;
  title: string;
  shortDescription: string;
  iconType: "basic" | "robot" | "automation" | "research" | "support";
  type: "automation" | "research" | "classification";
  iframeSrc: string;
  githubDownloadUrl: string;
  updatedAt: string;
  clicks?: number;
  line_number?: number; // Preserve line_number for sorting
};

// Convert Template to Flow format for backward compatibility
function templateToFlow(template: Template): Flow {
  return {
    ...template,
    category: template.categoryDisplay || template.category[0] || 'Other',
    subcategory: template.subcategory || 'General',
    title: template.title || template.topic,
    shortDescription: template.shortDescription || template.summary,
    iconType: template.iconType || 'basic',
    type: template.type || 'automation',
    iframeSrc: template.iframeSrc || '',
    githubDownloadUrl: template.githubDownloadUrl || template.flow.json_url,
    updatedAt: template.updatedAt || template.updated_at || '2025-01-15T00:00:00Z',
    clicks: template.clicks,
    // Preserve line_number for sorting
    line_number: template.line_number
  } as Flow;
}

// Export mockTemplates as FLOWS for backward compatibility (converted to Flow format)
// Sort by line_number to ensure correct order
export const FLOWS: Flow[] = mockTemplates
  .sort((a, b) => (a.line_number || 0) - (b.line_number || 0))
  .map(templateToFlow);

// Helper function to get flow by slug (compatible with flows.ts)
export function getFlowBySlug(slug: string): Flow | null {
  const template = mockTemplates.find(template => template.slug === slug);
  return template ? templateToFlow(template) : null;
}

// Helper function to check if a URL is a placeholder
export function isPlaceholderUrl(url: string): boolean {
  return url.includes('YOURORG') || url.includes('TAG') || url.includes('YOUR-LANGFLOW-HOST');
}

// Helper function to get unique categories from flows (compatible with flows.ts)
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

// Helper function to get unique types from flows (compatible with flows.ts)
export function getTypesFromFlows(): Array<{value: string, label: string}> {
  const types = new Set<string>();
  FLOWS.forEach(flow => {
    if (flow.type) {
      types.add(flow.type);
    }
  });
  
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
  FLOWS.forEach(flow => {
    if (flow.category) {
      categories.add(flow.category);
    }
  });
  
  // Return in a specific order to match BrowseTemplates CATEGORY_FILTERS
  const orderedCategories = [
    "Sales",
    "Business",
    "Documents",
    "Analytics",
    "Processing",
    "Automation",
    "Data",
    "Productivity"
  ];
  
  // Return only categories that exist in flows, in the specified order
  return orderedCategories.filter(cat => categories.has(cat));
}
