// Mock data for Sahil Kayastha's Portfolio
export const portfolioData = {
  personal: {
    name: "Sahil Kayastha",
    title: "AI/ML Developer | Full-Stack Enthusiast | Final-Year Computer Science Student",
    tagline: "Building intelligent solutions with data-driven insights",
    description: "Passionate about transforming complex problems into elegant solutions through machine learning, generative AI, and full-stack development. Currently pursuing Computer Science with a focus on cutting-edge AI technologies.",
    email: "sahil.kayastha@example.com",
    phone: "+91 9876543210",
    location: "India",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
  },

  socialLinks: {
    github: "https://github.com/sahilkayastha",
    linkedin: "https://linkedin.com/in/sahilkayastha",
    geeksforgeeks: "https://auth.geeksforgeeks.org/user/sahilkayastha",
    leetcode: "https://leetcode.com/sahilkayastha"
  },

  skills: [
    {
      category: "AI/ML & Data Science",
      items: [
        { name: "Machine Learning", level: 90, icon: "🤖" },
        { name: "Deep Learning", level: 85, icon: "🧠" },
        { name: "Generative AI", level: 88, icon: "✨" },
        { name: "LLMs", level: 82, icon: "💬" },
        { name: "Computer Vision", level: 78, icon: "👁️" },
        { name: "NLP", level: 80, icon: "📝" },
        { name: "Data Analysis", level: 92, icon: "📊" },
        { name: "Python", level: 95, icon: "🐍" }
      ]
    },
    {
      category: "Full-Stack Development",
      items: [
        { name: "React", level: 88, icon: "⚛️" },
        { name: "Node.js", level: 82, icon: "🟢" },
        { name: "FastAPI", level: 85, icon: "⚡" },
        { name: "MongoDB", level: 78, icon: "🍃" },
        { name: "PostgreSQL", level: 80, icon: "🐘" },
        { name: "Docker", level: 75, icon: "🐳" },
        { name: "AWS", level: 70, icon: "☁️" },
        { name: "Git", level: 90, icon: "📋" }
      ]
    },
    {
      category: "Tools & Frameworks",
      items: [
        { name: "TensorFlow", level: 85, icon: "🔥" },
        { name: "PyTorch", level: 80, icon: "🔦" },
        { name: "Scikit-learn", level: 90, icon: "🔬" },
        { name: "Pandas", level: 92, icon: "🐼" },
        { name: "NumPy", level: 90, icon: "🔢" },
        { name: "Power BI", level: 85, icon: "📈" },
        { name: "Jupyter", level: 88, icon: "📓" },
        { name: "VS Code", level: 90, icon: "💻" }
      ]
    }
  ],

  projects: [
    {
      id: 1,
      title: "AI-Powered Chatbot with RAG",
      description: "Developed an intelligent chatbot using retrieval-augmented generation (RAG) for enhanced contextual responses",
      longDescription: "Built a sophisticated chatbot system that combines large language models with retrieval-augmented generation techniques. The system uses vector databases for efficient document retrieval and provides contextually relevant responses. Implemented with FastAPI backend, React frontend, and integrated with OpenAI's GPT models.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      tags: ["Python", "LangChain", "OpenAI", "Vector DB", "React", "FastAPI"],
      liveUrl: "https://ai-chatbot-demo.vercel.app",
      githubUrl: "https://github.com/sahilkayastha/ai-chatbot-rag",
      featured: true
    },
    {
      id: 2,
      title: "Predictive Analytics Dashboard",
      description: "Machine learning dashboard for sales forecasting with interactive Power BI integration",
      longDescription: "Created a comprehensive predictive analytics platform that forecasts sales trends using advanced machine learning algorithms. The system integrates with Power BI for rich visualizations and provides actionable insights for business decision-making. Features include automated data preprocessing, model training, and real-time predictions.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      tags: ["Python", "Scikit-learn", "Power BI", "SQL", "Pandas", "Machine Learning"],
      liveUrl: "https://analytics-dashboard-demo.vercel.app",
      githubUrl: "https://github.com/sahilkayastha/predictive-analytics",
      featured: true
    },
    {
      id: 3,
      title: "Computer Vision Object Detection",
      description: "Real-time object detection system using YOLO with live camera feed processing",
      longDescription: "Implemented a real-time object detection system using YOLO (You Only Look Once) architecture. The system processes live camera feeds and identifies multiple objects with high accuracy. Built with OpenCV, TensorFlow, and deployed with optimized inference for edge devices.",
      image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&h=400&fit=crop",
      tags: ["Python", "OpenCV", "TensorFlow", "YOLO", "Computer Vision", "Deep Learning"],
      liveUrl: "https://object-detection-demo.vercel.app",
      githubUrl: "https://github.com/sahilkayastha/object-detection",
      featured: true
    },
    {
      id: 4,
      title: "Sentiment Analysis API",
      description: "NLP-based sentiment analysis service with REST API and web interface",
      longDescription: "Developed a comprehensive sentiment analysis service that processes text data and provides sentiment scores with confidence levels. The system includes a RESTful API built with FastAPI and a web interface for easy interaction. Uses transformer models for accurate sentiment classification.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
      tags: ["Python", "NLP", "Transformers", "FastAPI", "REST API", "BERT"],
      liveUrl: "https://sentiment-api-demo.vercel.app",
      githubUrl: "https://github.com/sahilkayastha/sentiment-analysis",
      featured: false
    },
    {
      id: 5,
      title: "Full-Stack E-commerce Platform",
      description: "Complete e-commerce solution with admin panel and payment integration",
      longDescription: "Built a full-featured e-commerce platform with user authentication, product catalog, shopping cart, and payment processing. Includes an admin panel for inventory management and order tracking. Implemented with React, Node.js, MongoDB, and Stripe integration.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      tags: ["React", "Node.js", "MongoDB", "Stripe", "JWT", "Express"],
      liveUrl: "https://ecommerce-demo.vercel.app",
      githubUrl: "https://github.com/sahilkayastha/ecommerce-platform",
      featured: false
    },
    {
      id: 6,
      title: "Data Visualization Suite",
      description: "Interactive dashboard for complex data visualization with D3.js and Python backend",
      longDescription: "Created an advanced data visualization suite that transforms complex datasets into interactive, insightful visualizations. The platform supports multiple chart types, real-time data updates, and export functionality. Built with D3.js frontend and Python Flask backend with pandas for data processing.",
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&h=400&fit=crop",
      tags: ["D3.js", "Python", "Flask", "Pandas", "Data Visualization", "JavaScript"],
      liveUrl: "https://dataviz-suite-demo.vercel.app",
      githubUrl: "https://github.com/sahilkayastha/data-visualization",
      featured: false
    }
  ],

  experience: [
    {
      id: 1,
      title: "AI/ML Developer Intern",
      company: "TechCorp Solutions",
      duration: "June 2024 - Present",
      location: "Remote",
      description: "Developing machine learning models for predictive analytics and implementing AI solutions for business automation.",
      achievements: [
        "Built 3 ML models with 95%+ accuracy for sales forecasting",
        "Reduced data processing time by 40% through optimization",
        "Collaborated with cross-functional teams on AI integration"
      ]
    },
    {
      id: 2,
      title: "Full-Stack Developer",
      company: "StartupXYZ",
      duration: "January 2024 - May 2024",
      location: "Hybrid",
      description: "Developed responsive web applications and implemented RESTful APIs for various client projects.",
      achievements: [
        "Delivered 5 client projects with 100% satisfaction rate",
        "Implemented automated testing reducing bugs by 60%",
        "Mentored 2 junior developers in React best practices"
      ]
    },
    {
      id: 3,
      title: "Data Science Intern",
      company: "Analytics Pro",
      duration: "August 2023 - December 2023",
      location: "On-site",
      description: "Analyzed large datasets and created predictive models for business intelligence solutions.",
      achievements: [
        "Processed 10M+ records for insight generation",
        "Created automated reporting dashboards",
        "Improved model accuracy by 25% through feature engineering"
      ]
    }
  ],

  certifications: [
    {
      id: 1,
      title: "AWS Certified Machine Learning - Specialty",
      issuer: "Amazon Web Services",
      date: "2024",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
      credentialId: "AWS-MLS-2024-001"
    },
    {
      id: 2,
      title: "Google Cloud Professional Data Engineer",
      issuer: "Google Cloud",
      date: "2024",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
      credentialId: "GCP-PDE-2024-002"
    },
    {
      id: 3,
      title: "TensorFlow Developer Certificate",
      issuer: "TensorFlow",
      date: "2023",
      image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=300&h=200&fit=crop",
      credentialId: "TF-DEV-2023-003"
    },
    {
      id: 4,
      title: "Meta React Developer Professional",
      issuer: "Meta",
      date: "2023",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      credentialId: "META-RD-2023-004"
    }
  ],

  achievements: [
    {
      id: 1,
      title: "Winner - AI Innovation Hackathon 2024",
      description: "First place in national AI hackathon with 500+ participants",
      icon: "🏆",
      date: "2024"
    },
    {
      id: 2,
      title: "Published Research Paper",
      description: "Co-authored paper on ML optimization in IEEE conference",
      icon: "📚",
      date: "2024"
    },
    {
      id: 3,
      title: "Top 1% on LeetCode",
      description: "Achieved top 1% ranking in competitive programming",
      icon: "💻",
      date: "2024"
    },
    {
      id: 4,
      title: "Open Source Contributor",
      description: "500+ contributions to popular ML libraries",
      icon: "🌟",
      date: "2023-2024"
    },
    {
      id: 5,
      title: "Dean's List Recognition",
      description: "Academic excellence for 4 consecutive semesters",
      icon: "🎓",
      date: "2022-2024"
    }
  ],

  codingProfiles: [
    {
      platform: "GitHub",
      username: "sahilkayastha",
      stats: {
        repositories: 45,
        stars: 234,
        followers: 156
      },
      icon: "🐱",
      url: "https://github.com/sahilkayastha"
    },
    {
      platform: "LeetCode",
      username: "sahilkayastha",
      stats: {
        problems: 750,
        rank: "Top 1%",
        rating: 2156
      },
      icon: "💡",
      url: "https://leetcode.com/sahilkayastha"
    },
    {
      platform: "GeeksforGeeks",
      username: "sahilkayastha",
      stats: {
        problems: 420,
        rank: "Expert",
        score: 1850
      },
      icon: "🔥",
      url: "https://auth.geeksforgeeks.org/user/sahilkayastha"
    },
    {
      platform: "LinkedIn",
      username: "sahilkayastha",
      stats: {
        connections: 1200,
        posts: 85,
        followers: 890
      },
      icon: "💼",
      url: "https://linkedin.com/in/sahilkayastha"
    }
  ]
};