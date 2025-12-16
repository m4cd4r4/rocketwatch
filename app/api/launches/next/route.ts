import { NextResponse } from 'next/server';
import { getLL2Client } from '@/lib/external/launch-library';
import { transformLaunch } from '@/lib/utils/transforms';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate every 60 seconds

/**
 * GET /api/launches/next
 * Returns the next upcoming launch
 */
export async function GET() {
  try {
    const client = getLL2Client();
    const response = await client.getUpcomingLaunches({ limit: 1 });

    if (response.results.length === 0) {
      return NextResponse.json(null, { status: 404 });
    }

    const launch = transformLaunch(response.results[0]);

    return NextResponse.json(launch, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    console.error('Failed to fetch next launch:', error);
    return NextResponse.json(
      { error: 'Failed to fetch launch data' },
      { status: 500 }
    );
  }
}
