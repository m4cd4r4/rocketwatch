'use client';

import Link from 'next/link';
import { useNextLaunch } from '@/lib/queries/launches';
import { Starfield } from './starfield';
import { LaunchCountdown } from '../launch/launch-countdown';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import { Badge } from '../ui/badge';
import { Rocket, Play, MapPin, ExternalLink } from 'lucide-react';
import { useUserPreferences } from '@/lib/stores/preferences';

export function HeroSection(): JSX.Element {
  const { data: nextLaunch, isLoading, error } = useNextLaunch();
  const { ageMode } = useUserPreferences();

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-b from-void via-cosmos to-void">
      {/* Starfield Background */}
      <Starfield starCount={ageMode === 'explorer' ? 150 : 200} />

      {/* Content */}
      <div className="container-custom relative z-10 py-20 text-center min-h-[600px] flex flex-col justify-center">
        {isLoading && (
          <div className="flex flex-col items-center gap-4">
            <Spinner size="large" />
            <p className="text-stardust">Loading next launch...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl font-bold text-starlight md:text-6xl">The Great Expanse</h1>
            <p className="text-xl text-mars-red">Failed to load launch data</p>
            <p className="text-stardust">Please try again later</p>
          </div>
        )}

        {nextLaunch && (
          <div className="flex flex-col items-center">
            {/* Title */}
            <h1 className="mb-4 text-3xl font-bold text-starlight md:text-5xl lg:text-6xl">
              {ageMode === 'explorer' ? '🚀 Next Rocket Launch!' : 'Next Launch'}
            </h1>

            {/* Launch Name */}
            <div className="mb-6 flex flex-col items-center gap-3">
              <h2 className="text-2xl font-semibold text-gradient-space md:text-4xl lg:text-5xl">
                {nextLaunch.name}
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="flex items-center gap-2 text-stardust">
                  <Rocket className="h-5 w-5" />
                  <span className="text-lg">
                    {nextLaunch.provider.name} • {nextLaunch.vehicle.name}
                  </span>
                </div>
                <Badge
                  variant={
                    nextLaunch.status.name === 'Go'
                      ? 'success'
                      : nextLaunch.status.name === 'TBD'
                      ? 'tbd'
                      : 'upcoming'
                  }
                >
                  {nextLaunch.status.abbrev}
                </Badge>
              </div>
            </div>

            {/* Countdown */}
            <div className="mb-8">
              <LaunchCountdown targetDate={nextLaunch.net} size="hero" />
            </div>

            {/* Location */}
            <div className="mb-8 flex items-center gap-2 text-stardust">
              <MapPin className="h-5 w-5 text-aurora-teal" />
              <span className="text-lg">{nextLaunch.launchSite.name}</span>
            </div>

            {/* Mission Description */}
            {nextLaunch.mission && (
              <div className="mb-8 max-w-2xl">
                <p className="text-lg text-stardust">
                  {ageMode === 'explorer'
                    ? nextLaunch.mission.description.explorer
                    : ageMode === 'cadet'
                    ? nextLaunch.mission.description.cadet
                    : nextLaunch.mission.description.missionControl}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="large" variant="primary" asChild>
                <Link href={`/launches/${nextLaunch.id}`}>
                  <Rocket className="mr-2 h-5 w-5" />
                  View Details
                </Link>
              </Button>

              {nextLaunch.webcastUrl && (
                <Button size="large" variant="secondary" asChild>
                  <a
                    href={nextLaunch.webcastUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {nextLaunch.webcastLive ? (
                      <>
                        <Play className="mr-2 h-5 w-5" />
                        Watch Live
                      </>
                    ) : (
                      <>
                        <ExternalLink className="mr-2 h-5 w-5" />
                        Watch Webcast
                      </>
                    )}
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
