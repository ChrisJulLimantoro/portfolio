/**
 * Blog Post Content Renderer
 *
 * This component takes the raw string content from your blog post
 * and renders it into HTML. We've extracted your simple parser
 * from `BlogPage.tsx` into this dedicated component.
 *
 * For a more robust solution, consider using a library like `react-markdown`.
 */
export function BlogPost({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-cyan-400 prose-strong:text-white">
      {content.split('\n').map((paragraph, index) => {
        const trimmed = paragraph.trim();
        if (trimmed.startsWith('##')) {
          return (
            <h2 key={index} className="mt-12 mb-6 text-white">
              {trimmed.replace(/##/g, '').trim()}
            </h2>
          );
        } else if (trimmed.startsWith('**')) {
          // This rule seems custom, keeping it as-is
          return (
            <p key={index} className="mb-4 text-slate-300">
              {paragraph}
            </p>
          );
        } else if (trimmed.match(/^\d+\./)) {
          // This is a simple list item
          return (
            <p key={index} className="mb-3 ml-6 text-slate-300">
              {paragraph}
            </p>
          );
        } else if (trimmed) {
          // Standard paragraph
          return (
            <p key={index} className="mb-6 leading-relaxed text-slate-300">
              {paragraph}
            </p>
          );
        }
        return null;
      })}
    </div>
  );
}
