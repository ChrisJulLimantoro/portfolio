import { getJourneyBySlug, getJourneyData } from '@/lib/data';
import { notFound } from 'next/navigation';
import { StoryRenderer } from '@/components/features/journey/story/storyRenderer';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const years = getJourneyData();
  return years.map((year) => ({
    slug: year.slug,
  }));
}

export default async function JourneyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const yearData = getJourneyBySlug(slug);

  if (!yearData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-cyan-950/20 to-transparent z-0 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 pt-24 pb-12 px-6 max-w-5xl mx-auto flex flex-col items-center text-center">
        <Link 
          href="/my-journey"
          className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors mb-8 self-start md:self-center"
        >
          <ArrowLeft size={16} />
          Back to Timeline
        </Link>
        
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-slate-700 to-slate-800 absolute top-10 left-1/2 -translate-x-1/2 -z-10 opacity-20 select-none">
          {yearData.year}
        </h1>

        <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4">
          Year {yearData.year}
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
          {yearData.title}
        </h2>
        <p className="max-w-2xl text-lg text-slate-400 leading-relaxed">
          {yearData.description}
        </p>
      </header>

      {/* Main Content: Story Blocks */}
      <section className="relative z-10 pb-24">
        {yearData.story.length > 0 ? (
          <StoryRenderer blocks={yearData.story} />
        ) : (
          <div className="text-center py-20 text-slate-500 italic">
            Story content coming soon...
          </div>
        )}
      </section>

    </main>
  );
}
