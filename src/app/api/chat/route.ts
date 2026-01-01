import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { getFilteredContext } from '@/lib/ai/context';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Get the latest user message to filter context
  const latestUserMessage = messages.filter((m: any) => m.role === 'user').pop();
  const userQuestion = latestUserMessage?.content || '';

  // Use smart filtering to only send relevant context
  const context = getFilteredContext(userQuestion);

  const result = await streamText({
    model: groq('llama-3.3-70b-versatile'),
    system: `
      You are an AI assistant for Julius's portfolio website. 
      Your goal is to answer questions about Julius's professional journey, projects, and skills based STRICTLY on the context provided below.
      
      RULES:
      1. Use the context provided to answer questions.
      2. If the answer is not in the context, politely state that you don't have that information. Do not hallucinate or make up facts.
      3. Keep answers concise, professional, yet friendly and enthusiastic.
      4. **Use Markdown formatting** for better readability:
         - Use **bold** for emphasis
         - Use bullet points for lists
         - Use code blocks for technical terms
         - Use headers (##) for sections if needed
         - **IMPORTANT: Add blank lines between paragraphs, lists, and sections for better spacing**
         - Example: After each paragraph, add a blank line. After lists, add a blank line.
      5. When mentioning projects, journey years, or blog posts, suggest relevant page links at the end using this format:
         - For projects: "Learn more: [Project Name](/project/[slug])"
         - For journey: "Read full story: [Year](/my-journey/[slug])"
         - For general: "Explore: [Projects](/projects) | [Journey](/my-journey) | [Blog](/blog)"
      6. **For contact questions**: Provide the direct contact information from the context (email, LinkedIn, GitHub).
      7. **For CV/Resume questions**: Provide this direct download link: [Download CV](/resume.pdf)
      
      CONTEXT:
      ${context}
    `,
    messages,
  });

  return result.toTextStreamResponse();
}
