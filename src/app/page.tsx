import { HeroSection } from '@/components/features/home/heroSection';
import { AiFlagship } from '@/components/features/home/aiFlagship';
import { NovelgitFeature } from '@/components/features/home/novelgitFeature';
import { ProjectHighlight } from '@/components/features/home/projectHighlight';
import { ChineseLearner } from '@/components/features/home/chineseLearner';
import { MyJourneySection } from '@/components/features/home/myjourneySection';

/**
 * Homepage — "The Issue": AI/automation-forward editorial spread.
 * Masthead → Contents → AI Trader → NovelGit → Chinese Learner → Timeline.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectHighlight />
      <AiFlagship />
      <NovelgitFeature />
      <ChineseLearner />
      <MyJourneySection />
    </>
  );
}
