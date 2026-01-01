import { getJourneyData, getProjects, getBlogPosts } from '@/lib/data';

export function getPortfolioContext(): string {
  const projects = getProjects();
  const journey = getJourneyData();
  const blogs = getBlogPosts();

  const projectContext = projects
    .map(
      (p) =>
        `Project: ${p.title} (${p.category})
         Description: ${p.description}
         Tech Stack: ${p.languages.join(', ')}, ${p.frameworks.join(', ')}
         Key Highlights: ${p.highlights.join('; ')}
         Links: ${Object.entries(p.links || {})
           .map(([k, v]) => `${k}: ${v}`)
           .join(', ')}`
    )
    .join('\n\n');

  const journeyContext = journey
    .map(
      (j) =>
        `Year: ${j.year} - ${j.title}
         Description: ${j.description}
         Milestones: ${j.milestones.map((m) => `${m.title}: ${m.description}`).join('; ')}
         Achievements: ${j.achievements.map((a) => a.title).join('; ')}
         Detailed Story: ${j.story.filter((s) => s.type === 'text').map((s: any) => s.content).join('\n')}`
    )
    .join('\n\n');

  const blogContext = blogs
    .map(
      (b) =>
        `Blog Post: ${b.title} (${b.date})
         Summary: ${b.excerpt}`
    )
    .join('\n\n');

  return `
    Here is the comprehensive context about Chris (the portfolio owner). Use this strictly to answer questions.

    === PROJECTS ===
    ${projectContext}

    === JOURNEY & EXPERIENCE ===
    ${journeyContext}

    === BLOG POSTS ===
    ${blogContext}
    
    === PROFILE SUMMARY ===
    Chris (Julius) is a Software Developer focused on building solutions, not just software. 
    Expertise: iOS, Web Development (Next.js, Laravel), AI/ML integration.
    Education: Apple Developer Academy (Intern), Petra Christian University (Top Graduate 2025).
    Current Role: Software Engineer at GDP Labs & Researcher at Apple RnL.
    Values: "Leadership is service", "The best way to predict the future is to create it."
    
    Contact Information:
    - Email: chrisjullimantoro@gmail.com
    - LinkedIn: linkedin.com/in/chris-julius-limantoro
    - GitHub: github.com/ChrisJulLimantoro
    - CV Download: /cv/Julius_Limantoro_CV.pdf (direct download link)
  `;
}

/**
 * Smart context filtering: Only return relevant context based on the user's question
 * This reduces token usage by 80-90%
 */
export function getFilteredContext(userQuestion: string): string {
  const projects = getProjects();
  const journey = getJourneyData();
  const blogs = getBlogPosts();
  
  const questionLower = userQuestion.toLowerCase();
  
  // Extract keywords from the question
  const keywords = questionLower.split(/\s+/).filter(word => word.length > 3);
  
  // Helper function to calculate relevance score
  const calculateRelevance = (text: string): number => {
    const textLower = text.toLowerCase();
    return keywords.reduce((score, keyword) => {
      return score + (textLower.includes(keyword) ? 1 : 0);
    }, 0);
  };
  
  // Filter relevant projects
  const relevantProjects = projects
    .map(p => ({
      project: p,
      score: calculateRelevance(`${p.title} ${p.description} ${p.tags?.join(' ')} ${p.languages.join(' ')} ${p.frameworks.join(' ')}`)
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3) // Top 3 most relevant
    .map(({ project: p }) => 
      `Project: ${p.title} (${p.category})
       Description: ${p.description}
       Tech Stack: ${p.languages.join(', ')}, ${p.frameworks.join(', ')}
       Key Highlights: ${p.highlights.join('; ')}`
    );
  
  // Filter relevant journey years
  const relevantJourney = journey
    .map(j => ({
      year: j,
      score: calculateRelevance(`${j.year} ${j.title} ${j.description} ${j.milestones.map(m => m.title).join(' ')} ${j.story.filter(s => s.type === 'text').map((s: any) => s.content).join(' ')}`)
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2) // Top 2 most relevant years
    .map(({ year: j }) =>
      `Year: ${j.year} - ${j.title}
       Description: ${j.description}
       Milestones: ${j.milestones.map((m) => `${m.title}: ${m.description}`).join('; ')}
       Achievements: ${j.achievements.map((a) => a.title).join('; ')}
       Detailed Story: ${j.story.filter((s) => s.type === 'text').map((s: any) => s.content).join('\n')}`
    );
  
  // Filter relevant blogs
  const relevantBlogs = blogs
    .map(b => ({
      blog: b,
      score: calculateRelevance(`${b.title} ${b.excerpt} ${b.tags.join(' ')}`)
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2) // Top 2 most relevant
    .map(({ blog: b }) =>
      `Blog Post: ${b.title} (${b.date})
       Summary: ${b.excerpt}`
    );
  
  // Build filtered context
  let filteredContext = `Here is relevant context about Chris to answer the question: "${userQuestion}"\n\n`;
  
  if (relevantProjects.length > 0) {
    filteredContext += `=== RELEVANT PROJECTS ===\n${relevantProjects.join('\n\n')}\n\n`;
  }
  
  if (relevantJourney.length > 0) {
    filteredContext += `=== RELEVANT JOURNEY & EXPERIENCE ===\n${relevantJourney.join('\n\n')}\n\n`;
  }
  
  if (relevantBlogs.length > 0) {
    filteredContext += `=== RELEVANT BLOG POSTS ===\n${relevantBlogs.join('\n\n')}\n\n`;
  }
  
  // Always include profile summary
  filteredContext += `=== PROFILE SUMMARY ===
Chris (Julius) is a Software Developer focused on building solutions, not just software. 
Expertise: iOS, Web Development (Next.js, Laravel), AI/ML integration.
Education: Apple Developer Academy (Intern), Petra Christian University (Top Graduate 2025).
Current Role: Software Engineer at GDP Labs & Researcher at Apple RnL.
Values: "Leadership is service", "The best way to predict the future is to create it."

Contact Information:
- Email: chrisjullimantoro@gmail.com
- LinkedIn: linkedin.com/in/chris-julius-limantoro
- GitHub: github.com/ChrisJulLimantoro
- CV Download: /resume.pdf (direct download link)

When asked about contact, provide the email, LinkedIn, and GitHub directly.
When asked about CV/resume, provide the download link: [Download CV](/resume.pdf)`;
  
  // If no relevant content found, return a minimal context
  if (relevantProjects.length === 0 && relevantJourney.length === 0 && relevantBlogs.length === 0) {
    return `${filteredContext}\n\nNote: No specific projects or experiences directly match this question. Please provide a general answer based on the profile summary.`;
  }
  
  return filteredContext;
}
