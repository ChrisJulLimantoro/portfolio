import { MyJourneySection } from '@/components/features/home/myjourneySection';
import { HeroSection } from '@/components/features/home/heroSection';
import { ProjectHighlight } from '@/components/features/home/projectHighlight';

/**
 * Homepage - Server Component
 * This page is a "Server Component" by default. It fetches no data,
 * but it composes other components. `AboutSection` and `HeroSection`
 * are Client Components for animations, but the page itself is not.
 */
export default function HomePage() {
  return (
    <>
      {/* HeroSection is a Client Component for its <Link> buttons and animations */}
      <HeroSection />

      {/* AboutSection is a Client Component for its `motion` animations */}
      <MyJourneySection />

      {/* ProjectHighlight can be a Server Component as it just renders static info */}
      <ProjectHighlight />
    </>
  );
}
