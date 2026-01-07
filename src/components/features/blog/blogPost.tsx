'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css';
import type { BlogPost } from '@/lib/data/blog';

/**
 * Enhanced Blog Post Content Renderer with Sections
 * 
 * Renders blog content as structured sections with individual styling
 */
export function BlogPost({ post }: { post: BlogPost }) {
  return (
    <div className="space-y-16">
      {/* Introduction */}
      {post.intro && (
        <div className="prose prose-invert max-w-none
          prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-8 prose-p:text-lg prose-p:font-normal
          prose-strong:text-white prose-strong:font-bold
          prose-em:text-slate-200 prose-em:italic">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeRaw]}>
            {post.intro}
          </ReactMarkdown>
        </div>
      )}

      {/* Sections */}
      {post.sections.map((section, index) => {
        const HeadingTag = section.level === 3 ? 'h3' : 'h2';
        const headingId = section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        return (
          <section key={index} id={headingId} className="scroll-mt-24">
            {/* Section Title */}
            <HeadingTag 
              className={`
                font-display font-extrabold tracking-tight leading-tight mb-8
                ${section.level === 2 
                  ? 'text-5xl text-white border-b border-slate-700 pb-4 mt-20' 
                  : 'text-3xl text-cyan-400 mt-12'
                }
              `}
            >
              {section.title}
            </HeadingTag>

            {/* Section Content */}
            <div className="prose prose-invert max-w-none 
              prose-headings:text-white prose-headings:font-display prose-headings:scroll-mt-24 prose-headings:tracking-tight
              prose-h4:text-2xl prose-h4:mb-6 prose-h4:mt-12 prose-h4:font-bold prose-h4:text-emerald-400 prose-h4:leading-snug
              prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg prose-p:font-normal
              prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300 hover:prose-a:underline
              prose-strong:text-white prose-strong:font-bold prose-strong:text-xl prose-strong:block prose-strong:mt-8 prose-strong:mb-4
              prose-em:text-slate-200 prose-em:italic
              prose-code:text-cyan-300 prose-code:bg-slate-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-slate-900/50 prose-pre:border prose-pre:border-slate-700 prose-pre:rounded-xl prose-pre:p-6 prose-pre:overflow-x-auto prose-pre:my-10
              prose-ul:text-slate-300 prose-ul:my-6 prose-ul:text-lg prose-ul:space-y-4 prose-ul:pl-6
              prose-ol:text-slate-300 prose-ol:my-6 prose-ol:text-lg prose-ol:space-y-6
              prose-li:my-4 prose-li:text-lg prose-li:leading-relaxed prose-li:pl-2
              prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-400 prose-blockquote:my-10
              prose-img:rounded-xl prose-img:shadow-2xl prose-img:my-12
              prose-hr:border-slate-700 prose-hr:my-16
              prose-table:text-slate-300 prose-table:my-10
              prose-th:bg-slate-800/50 prose-th:text-white prose-th:font-semibold
              prose-td:border-slate-700"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                components={{
                  // Custom link component (open external links in new tab)
                  a({ node, children, href, ...props }) {
                    const isExternal = href?.startsWith('http');
                    return (
                      <a
                        href={href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        {...props}
                      >
                        {children}
                      </a>
                    );
                  },
                  // Add spacing after paragraphs inside list items
                  p({ node, children, ...props }) {
                    return <p className="mb-4" {...props}>{children}</p>;
                  },
                }}
              >
                {section.content}
              </ReactMarkdown>
            </div>
          </section>
        );
      })}
    </div>
  );
}
