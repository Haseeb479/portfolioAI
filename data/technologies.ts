// ─── Technologies Data ────────────────────────────────────────────────────────
// Source: Haseeb Tariq resume
// Only technologies present in the resume are listed here.

export interface Technology {
  name: string;
  category: string;
  description: string;
}

export const technologies: Technology[] = [
  // Languages
  { name: "Python", category: "LANGUAGES", description: "Primary language for all AI/ML work" },
  { name: "JavaScript", category: "LANGUAGES", description: "Node.js backend and frontend development" },
  { name: "TypeScript", category: "LANGUAGES", description: "Type-safe application development" },
  { name: "PHP", category: "LANGUAGES", description: "Laravel backend APIs" },
  { name: "Java", category: "LANGUAGES", description: "Enterprise applications with Spring AI" },
  // Machine Learning
  { name: "TensorFlow", category: "MACHINE LEARNING", description: "Deep learning model training" },
  { name: "scikit-learn", category: "MACHINE LEARNING", description: "Classical ML pipelines" },
  { name: "QLoRA", category: "MACHINE LEARNING", description: "Parameter-efficient fine-tuning" },
  { name: "MLflow", category: "MACHINE LEARNING", description: "Experiment tracking and model registry" },
  { name: "NLP", category: "MACHINE LEARNING", description: "Text classification, NER, sentiment" },
  // Generative AI
  { name: "Azure OpenAI", category: "GENERATIVE AI", description: "Production LLM applications" },
  { name: "LangChain", category: "GENERATIVE AI", description: "LLM orchestration framework" },
  { name: "LlamaIndex", category: "GENERATIVE AI", description: "RAG and document intelligence" },
  { name: "Groq", category: "GENERATIVE AI", description: "High-speed LLM inference" },
  { name: "Agno", category: "GENERATIVE AI", description: "Multi-agent AI framework" },
  { name: "Prompt Engineering", category: "GENERATIVE AI", description: "Few-shot, system prompts, context" },
  // AI Architecture
  { name: "RAG", category: "AI ARCHITECTURE", description: "Retrieval-augmented generation systems" },
  { name: "Agentic RAG", category: "AI ARCHITECTURE", description: "Multi-hop reasoning agents" },
  { name: "Multi-Agent Systems", category: "AI ARCHITECTURE", description: "Coordinated AI agent workflows" },
  { name: "MCP", category: "AI ARCHITECTURE", description: "Model context protocol" },
  { name: "Function Calling", category: "AI ARCHITECTURE", description: "LLM tool-use patterns" },
  { name: "Vector Search", category: "AI ARCHITECTURE", description: "Semantic retrieval systems" },
  // Cloud
  { name: "Microsoft Azure", category: "CLOUD", description: "Primary cloud platform" },
  { name: "Azure AI Search", category: "CLOUD", description: "Enterprise vector search" },
  { name: "Azure Machine Learning", category: "CLOUD", description: "MLOps on Azure" },
  { name: "AWS EC2", category: "CLOUD", description: "Compute infrastructure" },
  { name: "AWS Lambda", category: "CLOUD", description: "Serverless functions" },
  { name: "Docker", category: "CLOUD", description: "Containerization and deployment" },
  // Backend & Data
  { name: "FastAPI", category: "BACKEND", description: "High-performance Python APIs" },
  { name: "Node.js", category: "BACKEND", description: "Real-time server applications" },
  { name: "Laravel", category: "BACKEND", description: "PHP REST API development" },
  { name: "PostgreSQL", category: "BACKEND", description: "Relational data storage" },
  { name: "MongoDB", category: "BACKEND", description: "Document database" },
  { name: "MySQL", category: "BACKEND", description: "Relational database" },
  // Tools
  { name: "Power BI", category: "TOOLS", description: "Data visualization and dashboards" },
  { name: "Selenium", category: "TOOLS", description: "Automated data collection" },
  { name: "Google Apps Script", category: "TOOLS", description: "Workflow automation" },
];

export const technologyCategories = [
  "LANGUAGES",
  "MACHINE LEARNING",
  "GENERATIVE AI",
  "AI ARCHITECTURE",
  "CLOUD",
  "BACKEND",
  "TOOLS",
];
