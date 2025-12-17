'use client';

import { useNextLaunch, useUpcomingLaunches } from '@/lib/queries/launches';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { format, parseISO } from 'date-fns';
import { Rocket, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LaunchesPage(): JSX.Element {
  const { data: nextLaunch, isLoading: isLoadingNext, error: nextError } = useNextLaunch();
  const {
    data: upcomingLaunches,
    isLoading: isLoadingUpcoming,
    error: upcomingError,
  } = useUpcomingLaunches(10);

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-starlight mb-2">Launches</h1>
        <p className="text-stardust">Track every space launch, past, present, and future</p>
      </div>

      {/* Next Launch Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-starlight mb-4">Next Launch</h2>

        {isLoadingNext && (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <Spinner size="large" />
            </CardContent>
          </Card>
        )}

        {nextError && (
          <Card variant="outlined">
            <CardContent className="py-8 text-center">
              <p className="text-mars-red">Failed to load next launch</p>
            </CardContent>
          </Card>
        )}

        {nextLaunch && (
          <Card variant="elevated" interactive>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">{nextLaunch.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Rocket className="h-4 w-4" />
                    {nextLaunch.provider.name} • {nextLaunch.vehicle.name}
                  </CardDescription>
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
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-plasma-blue mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-starlight">Launch Time</p>
                    <p className="text-sm text-stardust">
                      {format(parseISO(nextLaunch.net), 'PPpp')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-aurora-teal mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-starlight">Location</p>
                    <p className="text-sm text-stardust">
                      {nextLaunch.launchSite.name}
                    </p>
                  </div>
                </div>
              </div>

              {nextLaunch.mission && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-starlight mb-2">Mission</p>
                  <p className="text-sm text-stardust">{nextLaunch.mission.description.cadet}</p>
                </div>
              )}

              {nextLaunch.webcastUrl && (
                <div className="mt-4">
                  <Button variant="primary" size="default" asChild>
                    <a
                      href={nextLaunch.webcastUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Watch Webcast
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </section>

      {/* Upcoming Launches Section */}
      <section>
        <h2 className="text-2xl font-semibold text-starlight mb-4">Upcoming Launches</h2>

        {isLoadingUpcoming && (
          <div className="flex items-center justify-center py-12">
            <Spinner size="large" />
          </div>
        )}

        {upcomingError && (
          <Card variant="outlined">
            <CardContent className="py-8 text-center">
              <p className="text-mars-red">Failed to load upcoming launches</p>
            </CardContent>
          </Card>
        )}

        {upcomingLaunches && (
          <div className="grid gap-4">
            {upcomingLaunches.map((launch) => (
              <Card key={launch.id} interactive>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{launch.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {launch.provider.name} • {launch.vehicle.name}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        launch.status.name === 'Go'
                          ? 'success'
                          : launch.status.name === 'TBD'
                          ? 'tbd'
                          : 'upcoming'
                      }
                    >
                      {launch.status.abbrev}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-stardust">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(parseISO(launch.net), 'PPp')}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {launch.launchSite.name}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
