// ─── Projects Data ────────────────────────────────────────────────────────────
// Source: Haseeb Tariq resume + TASK.md project brief
// Images are conceptual mockups — replace with real screenshots when available.

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  image: string;
  gallery: string[];
  year: string;
  category: string;
  caseStudy: {
    overview: string;
    problem: string;
    solution: string;
    features: string[];
    architecture: string;
    result: string;
  };
}

export const projects: Project[] = [
  {
    id: "whatsapp-ai-pos",
    number: "01",
    title: "WhatsApp AI Ordering System",
    subtitle: "Multi-tenant AI bot + POS + restaurant dashboard",
    description:
      "A production-grade multi-tenant conversational AI platform that enables restaurant ordering through WhatsApp. Powered by Groq LLaMA-3.3-70B with full POS integration, real-time order management and an analytics dashboard.",
    technologies: ["Groq LLaMA-3.3-70B", "Node.js", "Laravel", "MySQL", "WhatsApp API", "Context Engineering"],
    image: "/img/project-whatsapp.jpg",
    gallery: ["/img/project-whatsapp.jpg"],
    year: "2024",
    category: "AI SaaS Platform",
    caseStudy: {
      overview:
        "A multi-tenant SaaS platform enabling restaurants to receive and manage orders through WhatsApp via an AI-powered conversational agent.",
      problem:
        "Restaurants needed a low-friction ordering channel that didn't require customers to download an app, while still giving owners real-time order visibility and control.",
      solution:
        "Built a conversational AI layer on WhatsApp using Groq LLaMA-3.3-70B with stateful context engineering for multi-turn ordering. Connected to a Laravel REST API and POS system for live order processing.",
      features: [
        "AI-driven menu discovery and order flow",
        "Multi-turn context management across conversations",
        "Real-time POS order creation and state management",
        "Owner and customer WhatsApp notification workflows",
        "Multi-tenant architecture supporting multiple restaurants",
        "Analytics dashboard for order metrics",
      ],
      architecture:
        "WhatsApp Webhook → Node.js gateway → Groq LLaMA-3.3-70B → Laravel REST API → MySQL → POS system",
      result:
        "Delivered a fully functional production-ready multi-tenant ordering system with AI conversational capabilities.",
    },
  },
  {
    id: "recruitment-management",
    number: "02",
    title: "Recruitment Management System",
    subtitle: "Enterprise ATS with AI-assisted candidate screening",
    description:
      "A comprehensive applicant tracking system featuring AI-assisted candidate screening, pipeline management, CV parsing, and workforce analytics. Built as an enterprise platform for HR teams.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "NLP", "scikit-learn", "REST API", "Docker"],
    image: "/img/project-recruitment.jpg",
    gallery: ["/img/project-recruitment.jpg"],
    year: "2024",
    category: "Enterprise Platform",
    caseStudy: {
      overview:
        "An enterprise recruitment platform that automates the candidate screening and pipeline management process using NLP and AI-assisted matching.",
      problem:
        "HR teams waste significant time manually screening CVs and tracking candidates across fragmented spreadsheets and email threads.",
      solution:
        "Built a full ATS with NLP-powered CV parsing, automated candidate scoring, and a visual pipeline management interface backed by a FastAPI service layer.",
      features: [
        "Automated CV parsing and candidate profiling",
        "AI-assisted candidate scoring and ranking",
        "Kanban-style recruitment pipeline",
        "Job posting and applicant tracking",
        "Interview scheduling and feedback tracking",
        "Workforce analytics and reporting",
      ],
      architecture:
        "React frontend → FastAPI backend → PostgreSQL → NLP scoring engine → Docker deployment",
      result:
        "Significantly reduced manual screening time with automated AI-driven candidate prioritization.",
    },
  },
  {
    id: "ai-finance",
    number: "03",
    title: "AI-Native Finance System",
    subtitle: "Intelligent financial management with AI insights",
    description:
      "An AI-native financial management platform featuring an intelligent assistant for financial analysis, automated report generation, anomaly detection, and real-time portfolio insights powered by Azure OpenAI.",
    technologies: ["Azure OpenAI", "LangChain", "FastAPI", "MongoDB", "Power BI", "Python"],
    image: "/img/project-finance.jpg",
    gallery: ["/img/project-finance.jpg"],
    year: "2024",
    category: "AI Application",
    caseStudy: {
      overview:
        "An intelligent finance dashboard where an AI assistant proactively surfaces insights, detects anomalies, and generates financial reports from raw transaction data.",
      problem:
        "Financial analysts spend excessive time manually reviewing transactions and generating reports instead of focusing on strategic decisions.",
      solution:
        "Built an AI-powered finance platform using Azure OpenAI for natural language financial Q&A, automated anomaly detection, and LangChain-orchestrated report generation pipelines.",
      features: [
        "AI financial assistant with natural language Q&A",
        "Real-time transaction monitoring and anomaly detection",
        "Automated financial report generation",
        "Portfolio performance visualization",
        "AI-generated actionable insights",
        "Power BI integration for executive dashboards",
      ],
      architecture:
        "Next.js frontend → FastAPI → Azure OpenAI → LangChain → MongoDB → Power BI",
      result:
        "Delivered an intelligent finance platform that reduces manual reporting effort and surfaces insights automatically.",
    },
  },
  {
    id: "ml-training-system",
    number: "04",
    title: "ML Training & Prediction System",
    subtitle: "QLoRA fine-tuning with MLflow experiment tracking",
    description:
      "A complete machine learning pipeline for training, evaluating and deploying fine-tuned language models. Features QLoRA fine-tuning on TinyLlama-1.1B, MLflow experiment tracking, and a FastAPI prediction service — achieving 40% improvement in lead-scoring accuracy.",
    technologies: ["QLoRA", "TinyLlama-1.1B", "MLflow", "FastAPI", "scikit-learn", "TensorFlow", "Docker"],
    image: "/img/project-ml.jpg",
    gallery: ["/img/project-ml.jpg"],
    year: "2023",
    category: "Machine Learning",
    caseStudy: {
      overview:
        "An end-to-end ML pipeline for domain-specific language model fine-tuning with full experiment tracking, evaluation and production deployment.",
      problem:
        "Rule-based lead scoring systems are brittle, require constant manual updates, and fail to capture nuanced signals in sales data.",
      solution:
        "Applied QLoRA fine-tuning on TinyLlama-1.1B using domain-specific sales data, tracked all experiments with MLflow, and deployed the model through a FastAPI service with PostgreSQL and MongoDB backends.",
      features: [
        "QLoRA parameter-efficient fine-tuning on TinyLlama-1.1B",
        "MLflow experiment tracking and model registry",
        "Feature engineering and data preprocessing pipeline",
        "Model evaluation with confusion matrix and feature importance",
        "FastAPI production prediction service",
        "40% improvement over baseline rule-based system",
      ],
      architecture:
        "Dataset → Preprocessing → QLoRA Fine-tuning → MLflow → FastAPI → PostgreSQL / MongoDB",
      result:
        "Achieved 40% improvement in lead-scoring accuracy compared to the baseline rule-based approach.",
    },
  },
];
