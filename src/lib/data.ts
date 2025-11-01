// This file stores your application's static data.
// In a real-world app, this data would come from a CMS or database.

// --- PROJECTS ---

export type Project = {
  title: string;
  description: string;
  tags: string[];
  language: string;
  framework: string;
  category: string;
  aiHighlight: string;
};

const allProjects: Project[] = [
  {
    title: 'Microservices API Gateway',
    description:
      'Scalable API gateway with service mesh architecture, intelligent routing, and distributed tracing for microservices communication.',
    tags: ['Node.js', 'Docker', 'Kubernetes', 'gRPC'],
    language: 'JavaScript',
    framework: 'Express',
    category: 'Backend',
    aiHighlight:
      'Handles 10K+ concurrent requests with AI-powered load balancing and automatic service discovery.',
  },
  {
    title: 'AI-Powered Chat Application',
    description:
      'Real-time chat platform with AI-driven features including smart replies, sentiment analysis, and context-aware responses.',
    tags: ['React', 'Swift', 'OpenAI', 'WebSocket'],
    language: 'JavaScript',
    framework: 'React',
    category: 'AI',
    aiHighlight:
      'Integrates GPT-4 for intelligent chat suggestions with 95% user satisfaction rating.',
  },
  {
    title: 'Swift iOS Design System',
    description:
      'Comprehensive design system for iOS applications with reusable SwiftUI components, animations, and accessibility features.',
    tags: ['Swift', 'SwiftUI', 'iOS', 'UIKit'],
    language: 'Swift',
    framework: 'SwiftUI',
    category: 'Mobile',
    aiHighlight:
      'Reduces development time by 40% with modular components and automated theming system.',
  },
  {
    title: 'E-Commerce Backend',
    description:
      'Microservices-based e-commerce platform with order processing, inventory management, and payment integration.',
    tags: ['Node.js', 'PostgreSQL', 'Redis', 'Stripe'],
    language: 'JavaScript',
    framework: 'Express',
    category: 'Backend',
    aiHighlight:
      'Processes 5K+ orders daily with 99.9% uptime and automated fraud detection.',
  },
  {
    title: 'React Dashboard Framework',
    description:
      'Modern dashboard framework with real-time data visualization, customizable widgets, and responsive design.',
    tags: ['React', 'TypeScript', 'Recharts', 'TailwindCSS'],
    language: 'TypeScript',
    framework: 'React',
    category: 'Frontend',
    aiHighlight:
      'Renders complex data visualizations with AI-powered insights and anomaly detection.',
  },
  {
    title: 'Mobile Fitness Tracker',
    description:
      'iOS fitness tracking app with workout planning, progress tracking, and social features built with Swift.',
    tags: ['Swift', 'Core Data', 'HealthKit', 'SwiftUI'],
    language: 'Swift',
    framework: 'SwiftUI',
    category: 'Mobile',
    aiHighlight:
      'Uses ML to provide personalized workout recommendations based on user performance.',
  },
];

export const getProjects = () => allProjects;

// --- BLOG ---

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  aiSummary: string;
  content: string; // Your "markdown" content
};

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable AI Systems: Lessons from Production',
    excerpt:
      'A deep dive into architectural patterns and best practices for deploying AI models at scale in production environments.',
    date: 'October 15, 2025',
    readTime: '8 min read',
    tags: ['AI', 'Architecture', 'Production'],
    aiSummary:
      'This post explores proven strategies for scaling AI systems, including model serving optimization, caching strategies, and distributed inference patterns.',
    content: `
Deploying AI models in production requires careful consideration of performance, scalability, and reliability. In this post, I'll share lessons learned from building and maintaining AI systems that serve millions of requests daily.

## The Challenge of Scale

When an AI model transitions from research to production, it faces entirely new challenges. Response time, throughput, and resource utilization become critical metrics that directly impact user experience and operational costs.

## Key Architectural Patterns

1. Model Serving Layer: Separate your model inference from application logic using a dedicated serving layer like TensorFlow Serving or TorchServe.
2. Intelligent Caching: Implement multi-tier caching strategies to avoid redundant model inference for similar inputs.
3. Async Processing: Use message queues for non-real-time predictions to improve system responsiveness.
4. Load Balancing: Distribute requests across multiple model instances with intelligent routing based on model type and resource availability.

## Monitoring and Observability

Effective monitoring is crucial for AI systems. Track not just traditional metrics like latency and throughput, but also model-specific metrics like prediction confidence, drift detection, and input distribution changes.

## Conclusion

Building production AI systems is as much about software engineering as it is about machine learning. A solid architecture that prioritizes scalability, reliability, and observability will set your AI projects up for long-term success.
    `,
  },
  {
    id: '2',
    title: 'Microservices Architecture: When to Use It and When to Avoid It',
    excerpt:
      'An honest look at microservices architecture, exploring both its benefits and drawbacks based on real-world experience.',
    date: 'September 28, 2025',
    readTime: '10 min read',
    tags: ['Microservices', 'Architecture', 'DevOps'],
    aiSummary:
      'A balanced perspective on microservices adoption, covering organizational readiness, technical complexity, and decision-making frameworks.',
    content: `
Microservices have become incredibly popular, but they're not a silver bullet. Let's explore when this architecture makes sense and when a monolith might be the better choice.

## What Are Microservices?

Microservices architecture structures an application as a collection of loosely coupled, independently deployable services. Each service is focused on a specific business capability.

## When Microservices Make Sense

1. Large Teams: When you have multiple teams working on different parts of the system
2. Different Scaling Needs: When different components have vastly different resource requirements
3. Technology Diversity: When different services benefit from different technology stacks
4. Independent Deployment: When you need to deploy features independently without affecting the entire system

## When to Stick with a Monolith

1. Small Teams: Teams under 10 people often struggle with the overhead of microservices
2. Early Stage Products: When you're still finding product-market fit, the flexibility of a monolith is valuable
3. Limited DevOps Maturity: Microservices require sophisticated deployment and monitoring infrastructure
4. Tight Coupling: When your domain has naturally high coupling, forcing microservices boundaries creates more problems than it solves

## The Middle Ground

Consider a modular monolith as a stepping stone. Build your application with clear module boundaries that could later be extracted into services if needed.

## Conclusion

Choose your architecture based on your organization's needs, team structure, and technical requirements—not based on trends or what sounds impressive.
    `,
  },
  {
    id: '3',
    title: 'The Future of Full-Stack Development: AI-Assisted Coding',
    excerpt:
      'How AI coding assistants are transforming the development workflow and what it means for software engineers.',
    date: 'November 1, 2025',
    readTime: '6 min read',
    tags: ['AI', 'Development', 'Future Tech'],
    aiSummary:
      'Explores the impact of AI coding assistants on developer productivity, code quality, and the evolving role of software engineers.',
    content: `
AI coding assistants like GitHub Copilot, ChatGPT, and specialized tools are fundamentally changing how we write software. Let's explore what this means for developers.

## The Current State

Today's AI assistants can generate boilerplate code, suggest completions, and even write entire functions based on natural language descriptions. They're particularly effective at:

- Writing repetitive code patterns
- Generating test cases
- Translating between programming languages
- Explaining complex code

## Impact on Productivity

Studies show developers using AI assistants complete tasks 55% faster. However, the real value isn't just speed—it's the cognitive load reduction for routine tasks, allowing developers to focus on architectural decisions and complex problem-solving.

## Code Quality Considerations

AI-generated code requires careful review. While it's often syntactically correct, it may not follow best practices, might have security vulnerabilities, or may not align with your project's specific requirements.

## The Evolving Role of Developers

Rather than replacing developers, AI assistants are elevating the role. Future developers will need to excel at:

1. System Design: Understanding how components fit together
2. Prompt Engineering: Effectively communicating with AI tools
3. Code Review: Critically evaluating AI-generated solutions
4. Domain Expertise: Applying business knowledge that AI lacks

## Conclusion

AI coding assistants are powerful tools that enhance developer capabilities. The developers who thrive will be those who effectively combine AI assistance with deep technical knowledge and critical thinking.
    `,
  },
];

export const getBlogPosts = () => blogPosts;

export const getBlogPostById = (id: string) =>
  blogPosts.find((post) => post.id === id);
