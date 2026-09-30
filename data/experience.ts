// ─── Experience Data ──────────────────────────────────────────────────────────
// Source: Haseeb Tariq resume
// All entries are from the actual resume — no invented data.

export interface ExperienceEntry {
  year: string;
  period: string;
  role: string;
  organization: string;
  type: string;
  description: string;
  highlights: string[];
}

export const experience: ExperienceEntry[] = [
  {
    year: "2024",
    period: "Jul – Aug 2024",
    role: "AI/ML Developer Intern",
    organization: "Mahmood Group of Industries",
    type: "Internship",
    description:
      "Designed and deployed cloud-native AI applications on Microsoft Azure, integrating OpenAI services and building production AI pipelines.",
    highlights: [
      "Architected Azure OpenAI + Azure AI Search integration for intelligent document retrieval",
      "Built multi-tenant WhatsApp AI SaaS platform using Groq LLaMA-3.3-70B",
      "Developed end-to-end RAG pipelines with chunking, embeddings and real-time data integration",
      "Created agentic AI workflows using MCP and function calling / A2A patterns",
      "Implemented MLflow-based experiment tracking for AI experiment reproducibility",
      "Containerized AI microservices with Docker and deployed via Azure App Service",
      "Integrated Azure Data Factory pipelines for real-time data ingestion",
    ],
  },
  {
    year: "2023",
    period: "2023 – Present",
    role: "AI/ML Engineer",
    organization: "Independent / Freelance",
    type: "Self-Employed",
    description:
      "Delivering production AI solutions for clients — from fine-tuned language models and NLP pipelines to automated content generation systems.",
    highlights: [
      "Developed AI Sales Intelligence Tool using QLoRA fine-tuning on TinyLlama-1.1B",
      "Achieved 40% improvement in lead-scoring accuracy over baseline rule-based system",
      "Built NLP pipelines for text classification, NER, and sentiment analysis",
      "Automated AI content-generation workflows with Kling AI, Runway Gen-3, Wan 2.1/2.6",
      "Reduced content production time by 70% through LLM-driven automation",
      "Built automated data scraping pipelines with Selenium and Google Apps Script",
      "Visualised business data through Power BI dashboards",
    ],
  },
];
