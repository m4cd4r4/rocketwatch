import { NextRequest, NextResponse } from 'next/server';
import { getLL2Client } from '@/lib/external/launch-library';
import { transformLaunch } from '@/lib/utils/transforms';

export const dynamic = 'force-dynamic';
export const revalidate = 300; // Revalidate every 5 minutes

/**
 * GET /api/launches/upcoming
 * Returns upcoming launches
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const client = getLL2Client();
    const response = await client.getUpcomingLaunches({ limit, offset });

    const launches = response.results.map(transformLaunch);

    return NextResponse.json(launches, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Failed to fetch upcoming launches:', error);
    return NextResponse.json(
      { error: 'Failed to fetch launches' },
      { status: 500 }
    );
  }
}
