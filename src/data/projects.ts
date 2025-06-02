import { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: 'elostaz',
    title: 'Elostaz - Educational Platform',
    shortDescription: 'A comprehensive educational platform connecting students with tutors and educational resources.',
    fullDescription: `Elostaz is an innovative educational platform that facilitates seamless connections between students and tutors. 
    The platform features real-time communication, resource sharing, and comprehensive course management tools. Built with modern web 
    technologies, it provides an intuitive interface for both students and educators.`,
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'WebSocket', 'TailwindCSS'],
    role: 'Full Stack Developer',
    skills: [
      'Real-time Communication',
      'Database Design',
      'API Development',
      'User Authentication',
      'Responsive Design',
      'Performance Optimization'
    ],
    features: [
      'Real-time messaging',
      'Resource management',
      'Course scheduling',
      'Progress tracking',
      'Interactive learning tools',
      'Mobile-responsive design'
    ],
    image: '/projects/alsotaz-edu.jpg',
    githubUrl: 'https://github.com/www-e/Elostaz',
    liveUrl: 'https://www-e.github.io/Elostaz/',
    category: 'Education',
    keywords: [
      'Education Platform',
      'Tutoring',
      'Online Learning',
      'Course Management',
      'Student Portal'
    ]
  },
  {
    id: 'planthub',
    title: 'PlantHub - Plant Care Platform',
    shortDescription: 'An intelligent platform for plant care and management with AI-powered diagnostics.',
    fullDescription: `PlantHub is a comprehensive plant care management system that helps users maintain healthy plants through 
    AI-powered diagnostics and personalized care recommendations. The platform provides detailed care guides, disease detection, 
    and watering schedules.`,
    techStack: ['React', 'Node.js', 'MongoDB', 'TensorFlow', 'Express', 'TailwindCSS'],
    role: 'Full Stack Developer',
    skills: [
      'AI Integration',
      'Image Processing',
      'Database Design',
      'RESTful APIs',
      'User Authentication',
      'Responsive Design'
    ],
    features: [
      'AI plant disease detection',
      'Personalized care schedules',
      'Plant database',
      'Care reminders',
      'Community features',
      'Expert advice integration'
    ],
    image: '/projects/agritech-platform.jpg',
    githubUrl: 'https://github.com/www-e/planthub',
    liveUrl: 'https://www-e.github.io/planthub/frontend/pages/auth/signin.html',
    category: 'AI/ML',
    keywords: [
      'Plant Care',
      'AI Diagnostics',
      'Garden Management',
      'Plant Health',
      'Community Platform'
    ]
  },
  {
    id: 'todo',
    title: 'ToDo - Task Management App',
    shortDescription: 'A modern task management application with real-time updates and collaboration features.',
    fullDescription: `A feature-rich task management application that helps users organize their daily activities efficiently. 
    The app includes real-time updates, collaboration features, and intuitive task organization tools.`,
    techStack: ['React', 'Firebase', 'TailwindCSS', 'TypeScript'],
    role: 'Frontend Developer',
    skills: [
      'Real-time Updates',
      'State Management',
      'User Interface Design',
      'Performance Optimization',
      'Firebase Integration'
    ],
    features: [
      'Real-time task updates',
      'Collaborative workspaces',
      'Task categorization',
      'Due date reminders',
      'Progress tracking',
      'Mobile responsiveness'
    ],
    image: '/projects/task-management.jpg',
    githubUrl: 'https://github.com/www-e/ToDo',
    liveUrl: 'https://www-e.github.io/ToDo/',
    category: 'Web Development',
    keywords: [
      'Task Management',
      'Productivity',
      'Collaboration',
      'Organization',
      'Real-time Updates'
    ]
  },
  {
    id: 'ai-interviewer',
    title: 'AI Interviewer - Interview Practice Platform',
    shortDescription: 'An AI-powered platform for interview practice and skill assessment.',
    fullDescription: `AI Interviewer is an innovative platform that helps users prepare for job interviews through AI-powered 
    simulations. The system provides personalized feedback, adaptive questioning, and comprehensive performance analysis.`,
    techStack: ['Python', 'React', 'OpenAI', 'FastAPI', 'MongoDB', 'TailwindCSS'],
    role: 'Full Stack Developer',
    skills: [
      'AI Integration',
      'Natural Language Processing',
      'Real-time Audio Processing',
      'Performance Analysis',
      'User Experience Design'
    ],
    features: [
      'AI-powered interviews',
      'Real-time feedback',
      'Performance analytics',
      'Interview recordings',
      'Customized scenarios',
      'Progress tracking'
    ],
    image: '/projects/ai-interview-simulator.jpg',
    githubUrl: 'https://github.com/www-e/AiInterviewer',
    liveUrl: 'https://www-e.github.io/AiInterviewer/',
    category: 'AI/ML',
    keywords: [
      'Interview Practice',
      'AI Assistant',
      'Career Development',
      'Skill Assessment',
      'Performance Analysis'
    ]
  },
  {
    id: 'edge-x',
    title: 'EDGE-X - Portfolio Platform',
    shortDescription: 'A modern portfolio platform showcasing architectural and design projects.',
    fullDescription: `EDGE-X is a sophisticated portfolio platform designed to showcase architectural and design projects 
    with stunning visuals and interactive features. The platform emphasizes visual presentation and user experience.`,
    techStack: ['Next.js', 'Three.js', 'TailwindCSS', 'Framer Motion'],
    role: 'Frontend Developer',
    skills: [
      '3D Visualization',
      'Animation Design',
      'Performance Optimization',
      'Responsive Design',
      'Interactive UI'
    ],
    features: [
      '3D project viewing',
      'Interactive galleries',
      'Smooth animations',
      'Project filtering',
      'Contact integration',
      'Mobile optimization'
    ],
    image: '/projects/edge-x-portfolio.jpg',
    githubUrl: 'https://github.com/www-e/EDGE-X',
    liveUrl: 'https://preview--edge-x-vision-design.lovable.app/',
    category: 'Web Development',
    keywords: [
      'Portfolio',
      'Architecture',
      'Design',
      '3D Visualization',
      'Interactive Platform'
    ]
  },
  {
    id: 'optimization-project',
    title: 'Optimization Project - Performance Enhancement Tools',
    shortDescription: 'A collection of tools and techniques for optimizing web application performance.',
    fullDescription: `A comprehensive project focused on implementing and demonstrating various optimization techniques 
    for web applications. Includes tools for code splitting, lazy loading, caching strategies, and performance monitoring.`,
    techStack: ['JavaScript', 'Webpack', 'React', 'Node.js', 'Performance APIs'],
    role: 'Performance Engineer',
    skills: [
      'Performance Optimization',
      'Code Splitting',
      'Caching Strategies',
      'Bundle Analysis',
      'Monitoring Tools'
    ],
    features: [
      'Automated optimization',
      'Performance metrics',
      'Bundle analysis',
      'Loading strategies',
      'Caching implementation',
      'Real-time monitoring'
    ],
    image: '/projects/neural-network.jpg',
    githubUrl: 'https://github.com/www-e/OptimizationProject',
    liveUrl: 'https://github.com/www-e/OptimizationProject',
    category: 'Development Tools',
    keywords: [
      'Performance',
      'Optimization',
      'Web Development',
      'Tools',
      'Monitoring'
    ]
  },
  {
    id: 'image-processing',
    title: 'Image Processing - Advanced Image Manipulation',
    shortDescription: 'A powerful image processing application with advanced filters and transformations.',
    fullDescription: `An advanced image processing application that provides a wide range of image manipulation tools 
    and filters. Features include real-time preview, batch processing, and custom filter creation.`,
    techStack: ['Python', 'OpenCV', 'NumPy', 'React', 'FastAPI'],
    role: 'Computer Vision Engineer',
    skills: [
      'Image Processing',
      'Computer Vision',
      'Algorithm Design',
      'API Development',
      'UI/UX Design'
    ],
    features: [
      'Real-time processing',
      'Custom filters',
      'Batch operations',
      'Format conversion',
      'Image analysis',
      'Export options'
    ],
    image: '/projects/ai-image-enhancement.jpg',
    githubUrl: 'https://github.com/www-e/ImageProcessing',
    liveUrl: 'https://github.com/www-e/ImageProcessing',
    category: 'Computer Vision',
    keywords: [
      'Image Processing',
      'Computer Vision',
      'Filters',
      'Image Analysis',
      'Batch Processing'
    ]
  }
] 