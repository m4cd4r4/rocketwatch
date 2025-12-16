'use client';

import { VehicleCard } from '@/components/vehicle/vehicle-card';
import { useUserPreferences } from '@/lib/stores/preferences';
import { Rocket } from 'lucide-react';
import type { Vehicle } from '@/types/vehicle';

// Mock vehicle data
const MOCK_VEHICLES: Vehicle[] = [
  {
    id: '1',
    name: 'Falcon 9',
    slug: 'falcon-9',
    manufacturer: { id: '121', name: 'SpaceX', logo: '', countryCode: 'USA' },
    description: {
      explorer: 'A rocket that can land and fly again!',
      cadet: 'A reusable two-stage rocket designed for reliable and cost-effective access to space.',
      missionControl: 'Falcon 9 is a reusable, two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of people and payloads into Earth orbit and beyond.',
    },
    status: 'active',
    reusable: true,
    image: 'https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launcher_images/falcon2520925_image_20230807133459.jpeg',
    specs: { height: 70, diameter: 3.7, mass: 549054, stages: 2, payloadCapacity: 22800, crewCapacity: 7 },
    firstFlight: '2010-06-04',
    totalLaunches: 200,
    successfulLaunches: 198,
    failedLaunches: 2,
    pendingLaunches: 50,
  },
  {
    id: '2',
    name: 'Starship',
    slug: 'starship',
    manufacturer: { id: '121', name: 'SpaceX', logo: '', countryCode: 'USA' },
    description: {
      explorer: 'The biggest rocket ever built!',
      cadet: 'A fully reusable super heavy-lift launch system capable of carrying 100+ tons to orbit.',
      missionControl: 'Starship is a fully reusable super heavy-lift launch system under development by SpaceX, designed to be the most powerful launch vehicle ever built.',
    },
    status: 'development',
    reusable: true,
    image: 'https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launcher_images/starship_image_20210531060426.png',
    specs: { height: 120, diameter: 9, mass: 5000000, stages: 2, payloadCapacity: 150000, crewCapacity: 100 },
    firstFlight: '2023-04-20',
    totalLaunches: 3,
    successfulLaunches: 2,
    failedLaunches: 1,
    pendingLaunches: 8,
  },
];

export default function VehiclesPage(): JSX.Element {
  const { ageMode } = useUserPreferences();

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Rocket className="h-8 w-8 text-rocket-orange" />
          <h1 className="text-4xl font-bold text-starlight">
            {ageMode === 'explorer' ? '🚀 Rockets' : 'Launch Vehicles'}
          </h1>
        </div>
        <p className="text-stardust">
          {ageMode === 'explorer'
            ? 'Explore amazing rockets that go to space!'
            : 'Browse launch vehicles and rockets from around the world'}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_VEHICLES.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-stardust/60">
          More vehicles coming soon! Phase 2 will integrate full Launch Library 2 database.
        </p>
      </div>
    </div>
  );
}
