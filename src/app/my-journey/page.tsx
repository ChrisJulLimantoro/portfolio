import { getJourneyData } from '@/lib/data';
import { JourneyYearSection } from '@/components/features/journey/journeyYearSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Journey | Julius',
  description: 'A timeline of my growth as a software engineer.',
};

export default function MyJourneyPage() {
  const journeyData = getJourneyData();

  return (
    <main className="bg-slate-950 min-h-screen pt-20">
      {/* Page Header */}
      <div className="py-24 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
          The Journey
        </h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto">
          Every year has a story. Here is how I went from writing my first line of code to building scalable systems.
        </p>
      </div>

      {/* Vertical Timeline Line (Decorational) */}
      <div className="fixed left-6 md:left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-900/50 to-transparent z-0 pointer-events-none hidden xl:block" />

      {/* Years Container */}
      <div className="relative z-10 space-y-0">
        {journeyData.map((year) => (
          <JourneyYearSection key={year.year} data={year} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="py-32 text-center">
        <p className="text-slate-500 mb-4">You have reached the beginning.</p>
        <div className="inline-block w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
      </div>
    </main>
  );
}
