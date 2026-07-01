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
    <main className="relative min-h-screen overflow-hidden text-[#cfcfd8]">
      {/* Header */}
      <header className="relative z-10 mx-auto flex max-w-5xl flex-col px-5 pb-12 pt-28 sm:px-8">
        <Link
          href="/my-journey"
          className="link-wipe mb-10 inline-flex w-fit items-center gap-2 font-sans text-sm transition-colors"
          style={{ color: 'var(--cyan)' }}
        >
          <ArrowLeft size={16} />
          Back to the timeline
        </Link>

        <span className="kicker" style={{ color: 'var(--cyan)' }}>Chapter — {yearData.year}</span>
        <h1 className="font-editorial mt-3 text-5xl text-[#ECECF2] sm:text-8xl">
          {yearData.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#a9a9b6]">
          {yearData.description}
        </p>
      </header>

      {/* Story */}
      <section className="relative z-10 pb-24">
        {yearData.story.length > 0 ? (
          <StoryRenderer blocks={yearData.story} />
        ) : (
          <div className="py-20 text-center font-editorial text-2xl text-[#6b6b78]">
            This chapter is still being written…
          </div>
        )}
      </section>
    </main>
  );
}
