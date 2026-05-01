export const personalInfo = {
  name: "Mohit",
  tagline: "AI/ML Engineer & Full-Stack Developer",
  summary:
    "B.Tech AI/ML student (CGPA: 9.30/10) with 5+ production-grade products. AI Engineer @ Xelytics, holder of 30+ patents, SIH 2024 team leader.",
  links: {
    linkedin: "https://linkedin.com/in/mohit-0a20b01b1",
    github: "https://github.com/mohitrock850",
    website: "https://xelytics.live",
  },
  phone: "+91 9284585304",
  email: "mohittherockers@gmail.com",
};

export const about = {
  description: `Results-driven B.Tech AI/ML Engineering student (CGPA: 9.30/10) with proven experience building production-grade AI systems, autonomous agents, and full-stack web applications. Delivered 5+ end-to-end products spanning multi-agent orchestration (CrewAI), voice-activated AI assistants, DAG-based workflow automation, real-time financial analytics, and scalable MERN e-commerce platforms. Currently working as AI Engineer at Xelytics, an AI-driven automated data analytics platform. Holder of 30+ patents and Smart India Hackathon 2024 team leader.`,
  education: [
    {
      degree: "B.Tech - Artificial Intelligence and Machine Learning",
      school: "NIMS University",
      year: "Expected 2027",
      cgpa: "9.30/10",
    },
    {
      degree: "Intermediate",
      school: "Bharat Mata Saraswati Bal Mandir",
      year: "2022–2023",
      percentage: "73.4%",
    },
    {
      degree: "High School",
      school: "G.D. Goenka International",
      year: "2020–2021",
      percentage: "92%",
    },
  ],
};

export const experience = [
  {
    role: "AI Engineer",
    company: "Xelytics",
    duration: "Oct 2025 – Present",
    location: "Remote",
    website: "https://xelytics.live",
    highlights: [
      "Building Xelytics, a zero-configuration AI analytics platform that auto-ingests CSV/Excel data, selects appropriate statistical models, and generates human-readable narrative insights with dynamic visualizations.",
      "Engineered core statistical reasoning engine with large-scale significance sweeps, p-value validation, and mathematical grounding.",
      "Developed enterprise-ready infrastructure with encrypted data handling, audit trails, API integration, and scalable processing.",
    ],
  },
  {
    role: "AI Intern",
    company: "Sweet Design Hub",
    duration: "Feb 2025 – Present",
    location: "Remote",
    highlights: [
      "Developed AI-powered content generation pipelines and LLM-assisted design automation tools integrated directly into client-facing creative workflows.",
      "Prototyped and deployed NLP-based tools to automate repetitive design tasks, reducing manual effort and improving team productivity.",
    ],
  },
  {
    role: "AI/ML Intern",
    company: "SunTec India",
    duration: "Jun 2025 – Oct 2025",
    location: "New Delhi, India",
    highlights: [
      "Developed and deployed scalable Generative AI backend services using FastAPI and proprietary LLM APIs, resulting in new internal tooling capabilities.",
      "Engineered Python data extraction and processing pipelines; managed Docker containerization and GitHub CI/CD workflows to streamline deployment cycles.",
    ],
  },
];

export const skillClusters = [
  {
    title: "AI, LLMs & Agents",
    skills: [
      "Agentic AI", "LLMs", "Multi-Agent Systems (CrewAI)", "LLM Tool Calling",
      "Autonomous Agents", "Model Context Protocol (MCP)", "RAG", "LangChain",
      "LangGraph", "Google ADK"
    ],
  },
  {
    title: "Backend & Frontend",
    skills: [
      "Node.js", "Express.js", "FastAPI", "Python", "REST APIs", "WebSockets",
      "React.js", "Next.js", "Tailwind CSS", "MERN Stack"
    ],
  },
  {
    title: "Databases",
    skills: [
      "MongoDB", "PostgreSQL", "Vector Databases (FAISS, ChromaDB)", "Neo4j (Cypher)"
    ],
  },
  {
    title: "DevOps & Cloud",
    skills: [
      "Docker", "Git/GitHub", "CI/CD", "n8n", "AWS (S3, EC2)", "Render",
      "Vercel", "Netlify", "LangSmith", "PyTest", "Jest"
    ],
  },
  {
    title: "ML, NLP & Multimodal",
    skills: [
      "Machine Learning", "Deep Learning", "NLP", "Transformers", "LoRA/PEFT",
      "Hugging Face", "YOLOv8", "OpenCV", "STT/TTS Engines", "Streamlit", "Gradio"
    ],
  },
  {
    title: "Quantitative & Financial",
    skills: [
      "TradingView Pine Script v5", "Quantitative Finance Scripting", "Financial Data Integration"
    ],
  },
];

export const patents = [
  "System for Market Research and Method Thereof (Patent No: 202411075497, Oct 2024)",
  "Augmented Reality Shopping System and Method (Patent No: 202411073694, Sept 2024)",
  "Smart Campus Security (Patent No: 202411073603, Sept 2024)",
  "27+ additional patents across AI, IoT, and software systems",
];

export const hackathons = [
  "Smart India Hackathon 2024 — Team Leader (national-level government-backed hackathon)",
  "Hackathon Code Crafter 2.0 — Team Leader",
];

export const certifications = [
  "Google Data Analytics Professional Certificate",
  "NPTEL Business Intelligence & Analytics",
  "NPTEL Deep Learning For Computer Vision",
  "NPTEL Introduction to Large Language Models (LLMs)",
];

// Projects data - the top 5 plus others, ready to be seeded
export const projects = [
  {
    title: "Autonomous Enterprise Researcher – Multi-Agent Compliance Auditor",
    description: "Engineered an enterprise-grade multi-agent system using CrewAI to fully automate legal compliance auditing, coordinating specialized agents for ingestion, risk detection, and structured report generation.",
    detailedDescription: "Implemented Hybrid RAG (FAISS + BM25) for high-precision contract analysis and deployed as an interactive Streamlit app for end-to-end document intelligence.",
    stack: ["Python", "CrewAI", "LLMs", "FAISS", "BM25", "Hybrid RAG", "PDF/CSV Ingestion", "Streamlit"],
    githubUrl: "https://github.com/mohitrock850/Autonomous-Enterprise-Researcher",
    demoUrl: "https://autonomous-enterprise-researcher.streamlit.app/",
    image: "/screenshots/autonomous_enterprise.png",
    category: "AI & Agents",
    featured: true,
    order: 1,
  },
  {
    title: "Echo – Autonomous Voice Assistant",
    description: "Developed an autonomous voice-activated AI agent with wake word detection that reasons and executes system-level tasks via structured LLM tool-calling.",
    detailedDescription: "Integrated STT/TTS engines with a custom graph-based LLM execution engine to securely interact with file systems, GitHub, task scheduler, and external APIs.",
    stack: ["Python", "LLM Tool Calling", "STT/TTS Engines", "Wake Word Detection", "Graph-based Execution"],
    githubUrl: "https://github.com/mohitrock850/Echo",
    demoUrl: null,
    image: "/screenshots/image.png",
    category: "AI & Agents",
    featured: true,
    order: 2,
  },
  {
    title: "Rule Intelligence – Visual DAG Workflow Automation Platform",
    description: "Built a full-stack DAG-driven workflow automation platform with a scalable Node.js execution engine handling conditional logic, database operations, and external webhooks in real time.",
    detailedDescription: "Designed a responsive React drag-and-drop interface with WebSocket-powered live execution tracking and real-time node status updates.",
    stack: ["Node.js", "Express.js", "React", "MongoDB", "WebSockets", "Tailwind CSS"],
    githubUrl: "https://github.com/mohitrock850/Rule_Intelligence",
    demoUrl: "https://poetic-croissant-bc6fdb.netlify.app/",
    image: "/screenshots/rule_intelligence.png",
    category: "Automation",
    featured: true,
    order: 3,
  },
  {
    title: "StockBuddy – AI-Powered Financial Analytics Platform",
    description: "Created a financial analytics platform combining real-time market data (Yahoo Finance API) with LLM-driven investment summaries, risk assessments, and fundamental analysis.",
    detailedDescription: "Designed a Next.js frontend with FastAPI backend to synthesize live stock metrics, news feeds, and quantitative financial scripting for retail investor decision-making.",
    stack: ["Next.js", "React", "FastAPI", "Python", "LLMs", "Yahoo Finance API", "TradingView Pine Script v5"],
    githubUrl: "https://github.com/mohitrock850/StockBuddy",
    demoUrl: null,
    image: "/screenshots/stockbuddy.png",
    category: "Full-Stack",
    featured: true,
    order: 4,
  },
  {
    title: "Maison Aurelle – Full-Stack Luxury E-Commerce Platform",
    description: "Developed a complete MERN e-commerce storefront with JWT-based role-based access control, shopping cart, checkout flow, inventory management, user reviews, and a full admin dashboard.",
    detailedDescription: "Deployed on Vercel with an optimized build pipeline delivering fast page loads and a fully mobile-responsive UI using Tailwind CSS.",
    stack: ["MongoDB", "Express.js", "React", "Node.js (MERN Stack)", "Tailwind CSS", "JWT Auth", "REST API"],
    githubUrl: "https://github.com/mohitrock850/Maison-Aurelle",
    demoUrl: "https://maison-aurelle.vercel.app/",
    image: "/screenshots/maison_aurelle.png",
    category: "Full-Stack",
    featured: true,
    order: 5,
  },
  // Other projects
  {
    title: "UrbanPlan AI",
    description: "AI-driven system assisting with urban planning and development strategies, utilizing advanced agentic workflows to analyze spatial and demographic insights.",
    stack: ["Python", "LangChain", "LangGraph", "LLMs"],
    githubUrl: "https://github.com/mohitrock850/Urban-AI-",
    demoUrl: null,
    image: "/screenshots/Urban_AI.png",
    category: "AI & Agents",
    featured: false,
    order: 6,
  },
  {
    title: "X-RAG",
    description: "Advanced Retrieval-Augmented Generation (RAG) system focused on optimized document retrieval and high-accuracy context injection for Large Language Models.",
    stack: ["Python", "Vector Databases (FAISS/ChromaDB)", "LangChain", "LLMs"],
    githubUrl: "https://github.com/mohitrock850/X-RAG-Explainable-Hybrid-Retrieval-Augmented-Generation-with-Knowledge-Graphs",
    demoUrl: null,
    image: "/screenshots/X_RAG.png",
    category: "AI & Agents",
    featured: false,
    order: 7,
  },
  {
    title: "Hospital Management System",
    description: "CRUD application managing patient records, doctor scheduling, and hospital administrative workflows.",
    stack: ["Full-stack development", "Database Management", "User Authentication"],
    githubUrl: "https://github.com/mohitrock850/Hospital-Management-System",
    demoUrl: null,
    image: "/screenshots/hospital_management.png",
    category: "Full-Stack",
    featured: false,
    order: 8,
  },
  {
    title: "Smart Mail Agent",
    description: "Autonomous AI agent capable of intelligent email processing, semantic understanding, and automated contextual responses.",
    stack: ["Python", "LLMs", "LangChain", "Email APIs"],
    githubUrl: "https://github.com/mohitrock850/SmartMail_Agent-",
    demoUrl: null,
    image: "/screenshots/smart_mail.png",
    category: "AI & Agents",
    featured: false,
    order: 9,
  },
  {
    title: "Autonomous-Compliance-Auditor",
    description: "Automated tool designed to review, parse, and analyze compliance and regulatory documents using state-of-the-art multi-agent workflows.",
    stack: ["Python", "CrewAI", "LLMs", "Document Intelligence"],
    githubUrl: "https://github.com/mohitrock850/Autonomous-Compliance-Auditor",
    demoUrl: null,
    image: "/screenshots/autonomous_compliance.png",
    category: "Automation",
    featured: false,
    order: 10,
  },
  {
    title: "LoRA-multi-adapter-system",
    description: "Efficient fine-tuning architecture implementing Low-Rank Adaptation (LoRA) for dynamic loading of multiple task-specific model adapters.",
    stack: ["Python", "PyTorch", "Hugging Face", "PEFT", "LoRA"],
    githubUrl: "https://github.com/mohitrock850/LoRA-multi-adapter-system",
    demoUrl: null,
    image: "/screenshots/LORA_multi.png",
    category: "Machine Learning",
    featured: false,
    order: 11,
  },
];