// Mock Data and API Functions for Templates

import { FilterState, Template, TemplateCollections } from "@/lib/types/templates";

// Mock templates data
const mockTemplates: Template[] = [
  {
    id: "1",
    slug: "build-your-first-ai-agent",
    title: "Build Your First AI Agent",
    summary: "This simple tutorial is the perfect way to get started. In just a few minutes, you'll build your first automation that runs on a schedule, fetches fresh data from the internet and delivers it straight to your inbox.",
    thumbnailUrl: "/images/card-1.webp",
    segments: ["agents", "assistants"],
    methodologies: ["agents", "prompting-basics"],
    badges: ["openai", "gmail", "schedule"],
    updatedAt: "2024-01-15T10:00:00Z",
    whatYouDo: [
      "Run the workflow to grab a random inspirational quote.",
      "See how data flows through each node as it moves from an API call to processing results.",
      "Connect Gmail and send the quote directly to your email."
    ],
    whatYouLearn: [
      "How to trigger workflows manually and on a schedule",
      "How to connect to external APIs and fetch data",
      "How to use the Set node to structure and map data",
      "How to connect Gmail to send the data"
    ],
    whyItMatters: "This workflow shows you the n8n basics step by step - no code required. By the end, you'll know how to build, test, and share automations that run on their own, giving you the confidence to explore more advanced use cases."
  },
  {
    id: "2",
    slug: "basic-prompting",
    title: "Basic Prompting",
    summary: "Perform basic prompting with an OpenAI model.",
    thumbnailUrl: "/images/card-2.webp",
    segments: ["assistants", "content-generation"],
    methodologies: ["prompting-basics"],
    badges: ["openai"],
    updatedAt: "2024-01-10T14:30:00Z",
    whatYouDo: [
      "Set up a simple prompt with OpenAI",
      "Test different prompt variations",
      "Understand prompt engineering basics"
    ],
    whatYouLearn: [
      "OpenAI API integration",
      "Prompt engineering fundamentals",
      "Response handling and formatting"
    ],
    whyItMatters: "Master the fundamentals of AI prompting to build more effective applications."
  },
  {
    id: "3",
    slug: "document-classification",
    title: "Document Classification",
    summary: "Automatically classify documents using AI-powered text analysis.",
    thumbnailUrl: "/images/card-3.webp",
    segments: ["classification"],
    methodologies: ["rag", "evaluation"],
    badges: ["openai", "pinecone"],
    updatedAt: "2024-01-12T09:15:00Z",
    whatYouDo: [
      "Upload documents for classification",
      "Configure classification categories",
      "Review and validate results"
    ],
    whatYouLearn: [
      "Document processing workflows",
      "Text classification techniques",
      "Quality assurance processes"
    ],
    whyItMatters: "Streamline document management with intelligent classification."
  },
  {
    id: "4",
    slug: "code-generation-assistant",
    title: "Code Generation Assistant",
    summary: "Generate code snippets and functions using AI assistance.",
    thumbnailUrl: "/images/card-1.webp",
    segments: ["coding", "assistants"],
    methodologies: ["agents", "prompting-basics"],
    badges: ["openai", "github"],
    updatedAt: "2024-01-08T16:45:00Z",
    whatYouDo: [
      "Describe the code you need",
      "Generate code snippets",
      "Test and refine the output"
    ],
    whatYouLearn: [
      "AI-assisted coding techniques",
      "Code generation best practices",
      "Integration with development tools"
    ],
    whyItMatters: "Accelerate development with AI-powered code generation."
  },
  {
    id: "5",
    slug: "content-generation-workflow",
    title: "Content Generation Workflow",
    summary: "Create engaging content for blogs, social media, and marketing materials.",
    thumbnailUrl: "/images/card-2.webp",
    segments: ["content-generation"],
    methodologies: ["prompting-basics", "evaluation"],
    badges: ["openai", "gmail"],
    updatedAt: "2024-01-05T11:20:00Z",
    whatYouDo: [
      "Define content requirements",
      "Generate multiple content variations",
      "Review and select best options"
    ],
    whatYouLearn: [
      "Content strategy and planning",
      "AI writing techniques",
      "Content quality assessment"
    ],
    whyItMatters: "Scale content creation with AI assistance while maintaining quality."
  },
  {
    id: "6",
    slug: "qa-knowledge-base",
    title: "Q&A Knowledge Base",
    summary: "Build a question-answering system using your own knowledge base.",
    thumbnailUrl: "/images/card-3.webp",
    segments: ["qna"],
    methodologies: ["rag", "integrations"],
    badges: ["openai", "pinecone", "wikipedia"],
    updatedAt: "2024-01-03T13:10:00Z",
    whatYouDo: [
      "Upload knowledge documents",
      "Configure Q&A parameters",
      "Test question answering"
    ],
    whatYouLearn: [
      "RAG (Retrieval Augmented Generation)",
      "Vector database integration",
      "Knowledge base management"
    ],
    whyItMatters: "Create intelligent Q&A systems that understand your specific domain."
  }
];

// Mock collections data
const mockCollections: TemplateCollections = {
  beginnerBasics: mockTemplates.filter(t => t.methodologies.includes("prompting-basics")),
  trending: mockTemplates.slice(0, 3),
  featured: mockTemplates.filter(t => t.badges?.includes("openai")),
  recentlyAdded: mockTemplates.slice(-3)
};

// API Functions
export async function fetchTemplates(filters: FilterState): Promise<Template[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  let filteredTemplates = [...mockTemplates];
  
  // Filter by search query
  if (filters.q.trim()) {
    const query = filters.q.toLowerCase();
    filteredTemplates = filteredTemplates.filter(template =>
      template.title.toLowerCase().includes(query) ||
      template.summary.toLowerCase().includes(query) ||
      template.segments.some(segment => segment.toLowerCase().includes(query)) ||
      template.methodologies.some(method => method.toLowerCase().includes(query))
    );
  }
  
  // Filter by segments
  if (filters.segments.size > 0) {
    filteredTemplates = filteredTemplates.filter(template =>
      template.segments.some(segment => filters.segments.has(segment))
    );
  }
  
  // Filter by methodologies
  if (filters.methodologies.size > 0) {
    filteredTemplates = filteredTemplates.filter(template =>
      template.methodologies.some(method => filters.methodologies.has(method))
    );
  }
  
  return filteredTemplates;
}

export async function fetchCollections(): Promise<TemplateCollections> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return mockCollections;
}

export async function getTemplate(slug: string): Promise<Template | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return mockTemplates.find(template => template.slug === slug) || null;
}

// Suggestion data for autocomplete
export const suggestionGroups = [
  {
    label: "Use case" as const,
    items: [
      { label: "Assistants", value: "assistants", type: "segment" as const },
      { label: "Classification", value: "classification", type: "segment" as const },
      { label: "Coding", value: "coding", type: "segment" as const },
      { label: "Content Generation", value: "content-generation", type: "segment" as const },
      { label: "Q&A", value: "qna", type: "segment" as const }
    ]
  },
  {
    label: "Methodology" as const,
    items: [
      { label: "RAG", value: "rag", type: "methodology" as const },
      { label: "Agents", value: "agents", type: "methodology" as const },
      { label: "Prompting Basics", value: "prompting-basics", type: "methodology" as const },
      { label: "Evaluation", value: "evaluation", type: "methodology" as const },
      { label: "ETL", value: "etl", type: "methodology" as const },
      { label: "Integrations", value: "integrations", type: "methodology" as const }
    ]
  }
];
