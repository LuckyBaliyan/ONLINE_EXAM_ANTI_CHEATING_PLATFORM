export interface Creator {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  expertise: string[];
}

export const creators: Creator[] = [
  {
    id: "vikash",
    name: "Vikash Tripathi",
    role: "Founder & Lead Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    description: "Visionary leader with expertise in AI and secure exam systems",
    expertise: ["AI Development", "System Architecture", "Security"]
  },
  {
    id: "krishna", 
    name: "Krishna Kawtikwar",
    role: "Co-Founder & Technical Lead",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    description: "Technical innovator specializing in face detection and proctoring",
    expertise: ["Computer Vision", "Machine Learning", "Backend Development"]
  },
  {
    id: "sarvesh",
    name: "Sarvesh Mishra", 
    role: "Co-Founder & Product Manager",
    image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
    description: "Product strategist focused on user experience and education technology",
    expertise: ["Product Strategy", "UI/UX Design", "Educational Technology"]
  },
  {
    id: "lucky",
    name: "Lucky Baliyan",
    role: "Senior Developer",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face", 
    description: "Full-stack developer with expertise in modern web technologies",
    expertise: ["React Development", "Node.js", "Database Design"]
  },
  {
    id: "shivam",
    name: "Shivam Yadav",
    role: "Frontend Specialist",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    description: "Frontend expert creating intuitive and responsive user interfaces",
    expertise: ["React", "TypeScript", "UI/UX Implementation"]
  }
];

export const topPerformers = [
  { name: "Amit Sharma", score: 98, exam: "Data Structures & Algorithms", university: "IIT Delhi" },
  { name: "Priya Patel", score: 96, exam: "Full Stack Development", university: "BITS Pilani" },
  { name: "Rahul Kumar", score: 95, exam: "Cyber Security", university: "NIT Trichy" },
  { name: "Sneha Gupta", score: 94, exam: "Java Programming", university: "IIT Bombay" },
  { name: "Arjun Singh", score: 93, exam: "C++ Programming", university: "IIT Kanpur" }
];

export const platformFeatures = [
  {
    title: "AI-Powered Proctoring",
    description: "Advanced face detection and behavior monitoring ensure exam integrity",
    icon: "Brain"
  },
  {
    title: "Real-time Monitoring", 
    description: "Continuous surveillance with instant alerts for suspicious activities",
    icon: "Eye"
  },
  {
    title: "Secure Environment",
    description: "Fullscreen mode with tab switching prevention and copy-paste protection",
    icon: "Shield"
  },
  {
    title: "Comprehensive Analytics",
    description: "Detailed performance insights and cheating attempt tracking", 
    icon: "BarChart"
  },
  {
    title: "Multi-subject Support",
    description: "Wide range of technical subjects with expert-curated questions",
    icon: "BookOpen"
  },
  {
    title: "Instant Results",
    description: "Immediate scoring and detailed performance breakdown",
    icon: "Zap"
  }
];

export const whyChooseUs = [
  {
    title: "Uncompromising Security",
    description: "Industry-leading proctoring technology ensures fair examination",
    stats: "99.8% Detection Accuracy"
  },
  {
    title: "Expert Content",
    description: "Questions curated by industry professionals and top educators",
    stats: "1000+ Expert Questions"
  },
  {
    title: "Proven Results", 
    description: "Trusted by top universities and organizations nationwide",
    stats: "10,000+ Successful Exams"
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock technical assistance for seamless experience",
    stats: "< 5min Response Time"
  }
];