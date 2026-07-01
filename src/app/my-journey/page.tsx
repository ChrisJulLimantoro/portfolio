import { getJourneyData } from '@/lib/data';
import { JourneyYearSection } from '@/components/features/journey/journeyYearSection';
import { YearScrubber } from '@/components/features/journey/yearScrubber';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Journey | Julius',
  description: 'A timeline of my growth as a software engineer.',
};

/** The Journey — editorial "Timeline" room (cyan-led), with a year-scrubber spine. */
export default function MyJourneyPage() {
  const journeyData = getJourneyData();
  const years = journeyData.map((y) => y.year);

  return (
    <main className="relative min-h-screen px-5 pt-28 sm:px-8">
      <YearScrubber years={years} />

      {/* Header */}
      <div className="mx-auto max-w-7xl border-b pb-10" style={{ borderColor: 'var(--line)' }}>
        <span className="kicker" style={{ color: 'var(--cyan)' }}>
          The Timeline — how I got here
        </span>
        <h1 className="font-editorial mt-3 text-6xl text-[#ECECF2] sm:text-8xl">
          The Journey
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[#a9a9b6]">
          Every year has its own shape. From my first line of code to shipping
          AI agents — scroll the spine, year by year.
        </p>
      </div>

      {/* Years */}
      <div className="relative">
        {journeyData.map((year) => (
          <JourneyYearSection key={year.year} data={year} />
        ))}
      </div>

      {/* End */}
      <div className="py-28 text-center">
        <p className="font-editorial text-3xl text-[#6b6b78]">…and this is where it began.</p>
        <span className="mt-4 inline-block h-2 w-2 rounded-full" style={{ background: 'var(--cyan)' }} />
      </div>
    </main>
  );
}
