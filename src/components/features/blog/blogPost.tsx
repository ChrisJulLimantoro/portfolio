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
      {/* Introduction — with a reading-room drop cap */}
      {post.intro && (
        <div className="prose prose-invert max-w-none
          prose-p:text-[#cfcfd8] prose-p:leading-relaxed prose-p:mb-8 prose-p:text-lg prose-p:font-normal
          prose-strong:text-white prose-strong:font-bold
          prose-em:text-slate-200 prose-em:italic
          [&>p:first-of-type]:first-letter:font-editorial [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:text-6xl [&>p:first-of-type]:first-letter:leading-[0.7] [&>p:first-of-type]:first-letter:text-[#ffb627]">
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
                font-editorial tracking-tight leading-tight mb-8
                ${section.level === 2
                  ? 'text-4xl sm:text-5xl text-[#ECECF2] border-b pb-4 mt-20 border-[color:var(--line)]'
                  : 'text-3xl text-[#ffb627] mt-12'
                }
              `}
            >
              {section.title}
            </HeadingTag>

            {/* Section Content */}
            <div className="prose prose-invert max-w-none 
              prose-headings:text-[#ECECF2] prose-headings:font-editorial prose-headings:scroll-mt-24 prose-headings:tracking-tight
              prose-h4:text-2xl prose-h4:mb-6 prose-h4:mt-12 prose-h4:text-[#34e0e0] prose-h4:leading-snug
              prose-p:text-[#cfcfd8] prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg prose-p:font-normal
              prose-a:text-[#ffb627] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-bold prose-strong:text-xl prose-strong:block prose-strong:mt-8 prose-strong:mb-4
              prose-em:text-slate-200 prose-em:italic
              prose-code:text-[#ffb627] prose-code:bg-[var(--ink-2)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-[var(--ink-2)] prose-pre:border prose-pre:border-[color:var(--line)] prose-pre:rounded-xl prose-pre:p-6 prose-pre:overflow-x-auto prose-pre:my-10
              prose-ul:text-[#cfcfd8] prose-ul:my-6 prose-ul:text-lg prose-ul:space-y-4 prose-ul:pl-6
              prose-ol:text-[#cfcfd8] prose-ol:my-6 prose-ol:text-lg prose-ol:space-y-6
              prose-li:my-4 prose-li:text-lg prose-li:leading-relaxed prose-li:pl-2
              prose-blockquote:border-l-4 prose-blockquote:border-[color:var(--gold)] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-[#a9a9b6] prose-blockquote:my-10
              prose-img:rounded-xl prose-img:shadow-2xl prose-img:my-12
              prose-hr:border-[color:var(--line)] prose-hr:my-16
              prose-table:text-[#cfcfd8] prose-table:my-10
              prose-th:bg-[var(--ink-2)] prose-th:text-white prose-th:font-semibold
              prose-td:border-[color:var(--line)]"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                components={{
                  // Custom link component (open external links in new tab)
                  a({ children, href, ...props }) {
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
                  p({ children, ...props }) {
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
