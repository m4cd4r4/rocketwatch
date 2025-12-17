import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/hero-section';
import { StatusBar } from '@/components/home/status-bar';
import { UpcomingLaunches } from '@/components/home/upcoming-launches';
import { FeaturedVideos } from '@/components/home/featured-videos';
import { AgencyRow } from '@/components/home/agency-row';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Track upcoming rocket launches from SpaceX, NASA, ESA, and more. Watch live streams, explore space agencies, and never miss a launch. Free forever, no accounts, no paywalls.',
  openGraph: {
    title: 'The Great Expanse - Track Every Space Launch',
    description:
      'Track upcoming rocket launches from SpaceX, NASA, ESA, and more. Watch live streams, explore space agencies, and never miss a launch.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Great Expanse - Track Every Space Launch',
    description:
      'Track upcoming rocket launches from SpaceX, NASA, ESA, and more. Watch live streams and never miss a launch.',
  },
};

export default function Home(): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section with Live Data */}
      <HeroSection />

      {/* Status Bar */}
      <StatusBar />

      {/* Upcoming Launches */}
      <UpcomingLaunches />

      {/* Featured Videos */}
      <FeaturedVideos />

      {/* Explore by Agency */}
      <AgencyRow />
    </div>
  );
}
