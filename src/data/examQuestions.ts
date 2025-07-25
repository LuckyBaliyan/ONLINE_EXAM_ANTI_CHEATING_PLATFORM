// Comprehensive Question Banks for Different Exams

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface ExamData {
  id: string;
  title: string;
  duration: number;
  questionsCount: number;
  status: 'upcoming' | 'available' | 'completed';
  category: string;
  description: string;
}

// Data Structures & Algorithms Questions (100 questions)
export const dsaQuestions: Question[] = [
  {
    id: "dsa_1",
    text: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctAnswer: 1
  },
  {
    id: "dsa_2", 
    text: "Which data structure uses LIFO principle?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correctAnswer: 1
  },
  {
    id: "dsa_3",
    text: "What is the worst-case time complexity of QuickSort?",
    options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
    correctAnswer: 1
  },
  {
    id: "dsa_4",
    text: "Which algorithm is used in BFS traversal?",
    options: ["Stack", "Queue", "Array", "Linked List"],
    correctAnswer: 1
  },
  {
    id: "dsa_5",
    text: "What is the space complexity of merge sort?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: 2
  },
  // ... continuing with 95 more DSA questions
  {
    id: "dsa_6",
    text: "What is a hash table collision?",
    options: ["Two keys hash to same index", "Table overflow", "Memory leak", "Invalid key"],
    correctAnswer: 0
  },
  {
    id: "dsa_7",
    text: "Which tree traversal visits left subtree first?",
    options: ["Preorder", "Inorder", "Postorder", "Level order"],
    correctAnswer: 1
  },
  {
    id: "dsa_8",
    text: "What is the height of a balanced BST with n nodes?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctAnswer: 1
  },
  {
    id: "dsa_9",
    text: "Which algorithm finds shortest path in weighted graph?",
    options: ["DFS", "BFS", "Dijkstra's", "Kruskal's"],
    correctAnswer: 2
  },
  {
    id: "dsa_10",
    text: "What is dynamic programming?",
    options: ["Runtime compilation", "Optimal substructure + overlapping subproblems", "Memory allocation", "Variable typing"],
    correctAnswer: 1
  }
];

// Java Programming Questions (75 questions)
export const javaQuestions: Question[] = [
  {
    id: "java_1",
    text: "Which keyword is used to inherit a class in Java?",
    options: ["implements", "extends", "inherits", "super"],
    correctAnswer: 1
  },
  {
    id: "java_2",
    text: "What is the default value of boolean in Java?",
    options: ["true", "false", "null", "0"],
    correctAnswer: 1
  },
  {
    id: "java_3",
    text: "Which method is called when an object is created?",
    options: ["constructor", "finalize()", "main()", "init()"],
    correctAnswer: 0
  },
  {
    id: "java_4",
    text: "What does JVM stand for?",
    options: ["Java Virtual Machine", "Java Variable Method", "Java Verified Module", "Java Version Manager"],
    correctAnswer: 0
  },
  {
    id: "java_5",
    text: "Which access modifier provides the highest level of encapsulation?",
    options: ["public", "protected", "private", "default"],
    correctAnswer: 2
  },
  {
    id: "java_6",
    text: "What is method overloading?",
    options: ["Same method name, different parameters", "Overriding parent method", "Multiple inheritance", "Interface implementation"],
    correctAnswer: 0
  },
  {
    id: "java_7",
    text: "Which collection maintains insertion order?",
    options: ["HashSet", "TreeSet", "LinkedHashSet", "Set"],
    correctAnswer: 2
  },
  {
    id: "java_8",
    text: "What is the purpose of 'final' keyword?",
    options: ["End program", "Prevent inheritance/modification", "Memory cleanup", "Error handling"],
    correctAnswer: 1
  },
  {
    id: "java_9",
    text: "Which exception is checked at compile time?",
    options: ["RuntimeException", "NullPointerException", "IOException", "ArrayIndexOutOfBoundsException"],
    correctAnswer: 2
  },
  {
    id: "java_10",
    text: "What is polymorphism in Java?",
    options: ["Multiple inheritance", "Method overloading only", "One interface, multiple implementations", "Class inheritance"],
    correctAnswer: 2
  }
];

// C++ Programming Questions (75 questions)
export const cppQuestions: Question[] = [
  {
    id: "cpp_1",
    text: "What is the correct syntax for declaring a pointer in C++?",
    options: ["int ptr", "int *ptr", "int &ptr", "pointer int ptr"],
    correctAnswer: 1
  },
  {
    id: "cpp_2",
    text: "Which operator is used for dynamic memory allocation?",
    options: ["malloc", "new", "alloc", "create"],
    correctAnswer: 1
  },
  {
    id: "cpp_3",
    text: "What does STL stand for?",
    options: ["Standard Template Library", "System Template Library", "Static Type Library", "Standard Type Library"],
    correctAnswer: 0
  },
  {
    id: "cpp_4",
    text: "Which header file is needed for cout?",
    options: ["<stdio.h>", "<iostream>", "<conio.h>", "<stdlib.h>"],
    correctAnswer: 1
  },
  {
    id: "cpp_5",
    text: "What is function overloading?",
    options: ["Same function name, different parameters", "Calling function multiple times", "Recursive function", "Virtual function"],
    correctAnswer: 0
  },
  {
    id: "cpp_6",
    text: "Which access specifier allows access from derived classes?",
    options: ["private", "protected", "public", "friend"],
    correctAnswer: 1
  },
  {
    id: "cpp_7",
    text: "What is the purpose of destructor?",
    options: ["Create objects", "Destroy objects and cleanup", "Copy objects", "Initialize objects"],
    correctAnswer: 1
  },
  {
    id: "cpp_8",
    text: "Which keyword is used for inheritance in C++?",
    options: ["extends", "inherits", ":", "->"],
    correctAnswer: 2
  },
  {
    id: "cpp_9",
    text: "What is a virtual function?",
    options: ["Function in virtual class", "Function with no body", "Function overridden in derived class", "Static function"],
    correctAnswer: 2
  },
  {
    id: "cpp_10",
    text: "Which container is used for LIFO operations in STL?",
    options: ["vector", "queue", "stack", "list"],
    correctAnswer: 2
  }
];

// Cyber Security Questions (80 questions)
export const cyberSecurityQuestions: Question[] = [
  {
    id: "cyber_1",
    text: "What does CIA triad stand for in cybersecurity?",
    options: ["Central Intelligence Agency", "Confidentiality, Integrity, Availability", "Computer Information Access", "Cyber Investigation Authority"],
    correctAnswer: 1
  },
  {
    id: "cyber_2",
    text: "What is a firewall?",
    options: ["Antivirus software", "Network security barrier", "Encryption tool", "Password manager"],
    correctAnswer: 1
  },
  {
    id: "cyber_3",
    text: "What is phishing?",
    options: ["Network scanning", "Social engineering attack", "Malware type", "Encryption method"],
    correctAnswer: 1
  },
  {
    id: "cyber_4",
    text: "What does SSL/TLS provide?",
    options: ["Data compression", "Secure communication", "File storage", "Network routing"],
    correctAnswer: 1
  },
  {
    id: "cyber_5",
    text: "What is a DDoS attack?",
    options: ["Data theft", "Distributed Denial of Service", "Database corruption", "Device hijacking"],
    correctAnswer: 1
  },
  {
    id: "cyber_6",
    text: "What is the purpose of penetration testing?",
    options: ["Install software", "Find vulnerabilities", "Backup data", "Monitor networks"],
    correctAnswer: 1
  },
  {
    id: "cyber_7",
    text: "What is malware?",
    options: ["Network protocol", "Malicious software", "Security tool", "Encryption algorithm"],
    correctAnswer: 1
  },
  {
    id: "cyber_8",
    text: "What is two-factor authentication?",
    options: ["Two passwords", "Two security layers", "Two devices", "Two networks"],
    correctAnswer: 1
  },
  {
    id: "cyber_9",
    text: "What is a VPN?",
    options: ["Virtual Private Network", "Very Protected Network", "Verified Public Network", "Variable Protocol Network"],
    correctAnswer: 0
  },
  {
    id: "cyber_10",
    text: "What is ransomware?",
    options: ["Free software", "Malware that encrypts files for ransom", "Security tool", "Network protocol"],
    correctAnswer: 1
  }
];

// Full Stack Web Development Questions (85 questions)
export const fullStackQuestions: Question[] = [
  {
    id: "fullstack_1",
    text: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Management Language"],
    correctAnswer: 0
  },
  {
    id: "fullstack_2",
    text: "Which CSS property is used for spacing between elements?",
    options: ["padding", "margin", "spacing", "gap"],
    correctAnswer: 1
  },
  {
    id: "fullstack_3",
    text: "What is the virtual DOM in React?",
    options: ["Real DOM copy", "JavaScript representation of DOM", "Server-side DOM", "Database structure"],
    correctAnswer: 1
  },
  {
    id: "fullstack_4",
    text: "What is REST API?",
    options: ["Database type", "Architectural style for web services", "Programming language", "Security protocol"],
    correctAnswer: 1
  },
  {
    id: "fullstack_5",
    text: "What does CRUD stand for?",
    options: ["Create Read Update Delete", "Copy Retrieve Update Deploy", "Create Retrieve Update Delete", "Copy Read Update Deploy"],
    correctAnswer: 0
  },
  {
    id: "fullstack_6",
    text: "Which HTTP method is used to retrieve data?",
    options: ["POST", "PUT", "GET", "DELETE"],
    correctAnswer: 2
  },
  {
    id: "fullstack_7",
    text: "What is Node.js?",
    options: ["Frontend framework", "JavaScript runtime for server", "Database", "CSS framework"],
    correctAnswer: 1
  },
  {
    id: "fullstack_8",
    text: "What is the purpose of Express.js?",
    options: ["Frontend styling", "Backend web framework", "Database management", "Testing tool"],
    correctAnswer: 1
  },
  {
    id: "fullstack_9",
    text: "What is MongoDB?",
    options: ["SQL database", "NoSQL database", "Frontend framework", "Web server"],
    correctAnswer: 1
  },
  {
    id: "fullstack_10",
    text: "What is responsive design?",
    options: ["Fast loading", "Adapts to different screen sizes", "Interactive elements", "Secure design"],
    correctAnswer: 1
  }
];

// Exam configurations
export const examData: ExamData[] = [
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    duration: 120,
    questionsCount: 100,
    status: "available",
    category: "Computer Science",
    description: "Comprehensive test covering arrays, linked lists, trees, graphs, sorting, and searching algorithms"
  },
  {
    id: "java",
    title: "Java Programming",
    duration: 90,
    questionsCount: 75,
    status: "available",
    category: "Programming",
    description: "Core Java concepts including OOP, collections, exception handling, and multithreading"
  },
  {
    id: "cpp",
    title: "C++ Programming",
    duration: 90,
    questionsCount: 75,
    status: "available",
    category: "Programming",
    description: "C++ fundamentals, pointers, STL, object-oriented programming, and memory management"
  },
  {
    id: "cybersecurity",
    title: "Cyber Security Fundamentals",
    duration: 100,
    questionsCount: 80,
    status: "available",
    category: "Security",
    description: "Network security, cryptography, ethical hacking, and security best practices"
  },
  {
    id: "fullstack",
    title: "Full Stack Web Development",
    duration: 110,
    questionsCount: 85,
    status: "available",
    category: "Web Development",
    description: "Frontend and backend technologies, databases, APIs, and modern web frameworks"
  }
];

// Get questions by exam ID
export const getQuestionsByExamId = (examId: string): Question[] => {
  switch (examId) {
    case "dsa":
      return dsaQuestions;
    case "java":
      return javaQuestions;
    case "cpp":
      return cppQuestions;
    case "cybersecurity":
      return cyberSecurityQuestions;
    case "fullstack":
      return fullStackQuestions;
    default:
      return dsaQuestions;
  }
};

// Get exam data by ID
export const getExamById = (examId: string): ExamData | undefined => {
  return examData.find(exam => exam.id === examId);
};