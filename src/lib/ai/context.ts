import { getJourneyData, getProjects, getBlogPosts } from '@/lib/data';
import { CONTACT, GMAIL_COMPOSE_URL } from '@/lib/contact';

/**
 * Full portfolio context for the chat model.
 *
 * The whole corpus is small (~15-20k tokens), well within the model's context
 * window, so we send everything instead of keyword-filtering per question.
 * Filtering broke follow-up questions ("tell me more about that") and missed
 * synonyms; the token savings were negligible.
 *
 * Built once per server instance — the data is static at build time.
 */
let cachedContext: string | null = null;

export function getPortfolioContext(): string {
  if (cachedContext) return cachedContext;

  const projects = getProjects();
  const journey = getJourneyData();
  const blogs = getBlogPosts();

  const projectContext = projects
    .map(
      (p) =>
        `Project: ${p.title} (${p.category})
         Page: /project/${p.slug}
         Description: ${p.description}
         Details: ${p.longDescription}
         Tech Stack: ${[...p.languages, ...p.frameworks].join(', ')}
         Tags: ${p.tags.join(', ')}
         Key Highlights: ${p.highlights.join('; ')}
         Links: ${Object.entries(p.links || {})
           .map(([k, v]) => `${k}: ${v}`)
           .join(', ') || 'none'}`
    )
    .join('\n\n');

  const journeyContext = journey
    .map(
      (j) =>
        `Year: ${j.year} - ${j.title}
         Page: /my-journey/${j.slug}
         Description: ${j.description}
         Milestones: ${j.milestones.map((m) => `${m.title}: ${m.description}`).join('; ')}
         Achievements: ${j.achievements.map((a) => a.title).join('; ')}
         Detailed Story: ${j.story
           .filter((s) => s.type === 'text')
           .map((s) => s.content)
           .join('\n')}`
    )
    .join('\n\n');

  const blogContext = blogs
    .map(
      (b) =>
        `Blog Post: ${b.title} (${b.date})
         Page: /blog/${b.id}
         Tags: ${b.tags.join(', ')}
         Summary: ${b.excerpt}`
    )
    .join('\n\n');

  cachedContext = `
=== PROFILE SUMMARY ===
Chris (Julius) is a Software Developer focused on building solutions, not just software.
Expertise: iOS, Web Development (Next.js, Laravel), AI/ML integration.
Education: Apple Developer Academy (Intern), Petra Christian University (Top Graduate 2025).
Current Role: Software Engineer at GDP Labs & Researcher at Apple RnL.
Values: "Leadership is service", "The best way to predict the future is to create it."

Contact Information:
- Email: ${CONTACT.email}
- Compose in Gmail: ${GMAIL_COMPOSE_URL}
- LinkedIn: ${CONTACT.linkedin}
- GitHub: ${CONTACT.github}
- CV Download: ${CONTACT.resume}

=== PROJECTS ===
${projectContext}

=== JOURNEY & EXPERIENCE ===
${journeyContext}

=== BLOG POSTS ===
${blogContext}
`;

  return cachedContext;
}
