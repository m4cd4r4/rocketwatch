# The Great Expanse — Claude Code Skills Document

> **Project:** The Great Expanse — A free, inclusive space launch tracking platform
> **Live Site:** https://www.thegreatexpanse.com
> **Version:** 1.0
> **Last Updated:** December 18, 2024
> **Status:** ✅ Launched!

---

## Table of Contents

1. [Project Vision](#1-project-vision)
2. [Decisions Log](#2-decisions-log)
3. [Tech Stack](#3-tech-stack)
4. [Design System](#4-design-system)
5. [Data Architecture](#5-data-architecture)
6. [Component Inventory](#6-component-inventory)
7. [Page Wireframes](#7-page-wireframes)
8. [API Structure](#8-api-structure)
9. [Development Roadmap](#9-development-roadmap)
10. [Content Guidelines](#10-content-guidelines)
11. [Setup Instructions](#11-setup-instructions)
12. [Code Standards](#12-code-standards)

---

## 1. Project Vision

### What is The Great Expanse?

A free, inclusive space hub that serves everyone from 5-year-olds to aerospace engineers. Think "Linear meets NASA" — premium dark UI with space aesthetics, age-adaptive content, comprehensive coverage of all space launches, and a built-in arcade to play while waiting for launches!

### Core Principles

| Principle | Implementation |
|-----------|----------------|
| **Free forever** | No paywalls, no premium tiers, no accounts required |
| **Inclusive** | Age-adaptive UI (Explorer 5-8, Cadet 9-13, Mission Control 14+) |
| **Comprehensive** | All agencies, all launches, all history (1940s onwards) |
| **Accessible** | WCAG AA compliant, keyboard navigable, screen reader friendly |
| **Delightful** | Beautiful dark UI, subtle animations, optional soundscapes |

### Target Audience

| Mode | Age Range | Characteristics |
|------|-----------|-----------------|
| **Explorer** | 5-8 | Large touch targets, simple language, Cosmo mascot, wonder-focused |
| **Cadet** | 9-13 | Educational depth, context, engaging visuals (DEFAULT) |
| **Mission Control** | 14+ | Technical detail, data tables, full specifications |

### MVP Features (2-Week Sprint)

- ✅ Home page with live countdown to next launch
- ✅ Launch list and detail pages
- ✅ Live streams and video library
- ✅ Agency and vehicle directories
- ✅ 3 age modes with content adaptation
- ✅ Prediction ticker with modal (road closure → launch prediction)
- ✅ Responsive design (mobile-first)
- ✅ WCAG AA accessibility

### Deferred to Phase 2

- Global search
- Calendar integration (ICS export)
- Learn section (interactive timeline, quizzes)
- Cosmo mascot animations
- Ambient soundscapes
- Data sync cron jobs
- Advanced filters

---

## 2. Decisions Log

All confirmed decisions for this project:

| Area | Decision |
|------|----------|
| **Name** | The Great Expanse |
| **Tagline** | "For the love of space" |
| **Hosting** | Vercel (Edge Functions) |
| **Domain** | ✅ thegreatexpanse.com |
| **Light Mode** | Dark only (no light mode) |
| **User Accounts** | None — anonymous, stateless |
| **Monetization** | None — passion project |
| **Arcade Games** | ✅ 4 games (Asteroids, Space Invaders, Snake, Breakout) |
| **Mascot** | "Cosmo" (simple SVG robot), Explorer mode only, Phase 2 |
| **Sound Effects** | Optional ambient soundscapes, Explorer mode only, Phase 2 |
| **Starfield Style** | Hybrid (photo base + animated star overlay) |
| **History Depth** | Full (1940s V-2 onwards), pre-1957 de-emphasized in Explorer mode |
| **Content Writing** | AI-assisted drafts, human reviewed |
| **Road Predictions** | Algorithmic with confidence percentage |
| **LL2 API Tier** | Start free (15 req/hr), upgrade to paid ($5/mo) at 80% capacity |

---

## 3. Tech Stack

### Core Framework

```json
{
  "framework": "Next.js 14+ (App Router)",
  "language": "TypeScript (strict mode)",
  "styling": "Tailwind CSS 3.4+",
  "animation": "Framer Motion",
  "state": {
    "server": "TanStack Query v5",
    "client": "Zustand"
  },
  "hosting": "Vercel",
  "cache": "Vercel KV / Upstash Redis"
}
```

### Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "framer-motion": "^10.16.0",
    "@tanstack/react-query": "^5.0.0",
    "zustand": "^4.4.0",
    "lucide-react": "^0.263.1",
    "date-fns": "^2.30.0",
    "@vercel/kv": "^1.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0",
    "prettier": "^3.0.0",
    "prettier-plugin-tailwindcss": "^0.5.0"
  }
}
```

### Project Structure

```
rocketwatch/
├── app/
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Home page
│   ├── launches/
│   │   ├── page.tsx               # Launches list
│   │   └── [id]/
│   │       └── page.tsx           # Launch detail
│   ├── live/
│   │   └── page.tsx               # Live streams & videos
│   ├── explorers/
│   │   ├── page.tsx               # Agencies list
│   │   └── [id]/
│   │       └── page.tsx           # Agency detail
│   ├── vehicles/
│   │   ├── page.tsx               # Vehicles list
│   │   └── [id]/
│   │       └── page.tsx           # Vehicle detail
│   └── api/
│       ├── launches/
│       │   ├── route.ts           # GET /api/launches
│       │   ├── next/
│       │   │   └── route.ts       # GET /api/launches/next
│       │   ├── upcoming/
│       │   │   └── route.ts       # GET /api/launches/upcoming
│       │   └── [id]/
│       │       └── route.ts       # GET /api/launches/:id
│       ├── agencies/
│       │   ├── route.ts           # GET /api/agencies
│       │   └── [id]/
│       │       └── route.ts       # GET /api/agencies/:id
│       ├── vehicles/
│       │   ├── route.ts           # GET /api/vehicles
│       │   └── [id]/
│       │       └── route.ts       # GET /api/vehicles/:id
│       ├── videos/
│       │   ├── route.ts           # GET /api/videos
│       │   └── live/
│       │       └── route.ts       # GET /api/videos/live
│       └── predictions/
│           └── route.ts           # GET /api/predictions
├── components/
│   ├── ui/                        # Base UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── tabs.tsx
│   │   ├── modal.tsx
│   │   ├── skeleton.tsx
│   │   ├── spinner.tsx
│   │   └── empty-state.tsx
│   ├── layout/                    # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── mobile-menu.tsx
│   │   ├── age-mode-toggle.tsx
│   │   └── prediction-ticker.tsx
│   ├── launch/                    # Launch-specific components
│   │   ├── launch-card.tsx
│   │   ├── launch-countdown.tsx
│   │   ├── launch-timeline.tsx
│   │   └── launch-hero.tsx
│   ├── video/                     # Video components
│   │   ├── video-card.tsx
│   │   ├── video-modal.tsx
│   │   └── youtube-embed.tsx
│   ├── agency/                    # Agency components
│   │   └── agency-card.tsx
│   ├── vehicle/                   # Vehicle components
│   │   └── vehicle-card.tsx
│   └── home/                      # Home page sections
│       ├── hero-section.tsx
│       ├── starfield.tsx
│       ├── status-bar.tsx
│       ├── upcoming-launches.tsx
│       ├── featured-videos.tsx
│       └── agency-row.tsx
├── lib/
│   ├── api/
│   │   ├── client.ts              # Base API client
│   │   └── errors.ts              # API error handling
│   ├── external/
│   │   ├── launch-library.ts      # LL2 API client
│   │   ├── spacex.ts              # SpaceX API client
│   │   └── youtube.ts             # YouTube API client
│   ├── queries/
│   │   ├── keys.ts                # Query key factory
│   │   ├── launches.ts            # Launch query hooks
│   │   ├── agencies.ts            # Agency query hooks
│   │   ├── vehicles.ts            # Vehicle query hooks
│   │   └── videos.ts              # Video query hooks
│   ├── stores/
│   │   ├── preferences.ts         # User preferences (age mode, sound)
│   │   ├── ui.ts                  # UI state (modals, menus)
│   │   └── filters.ts             # Launch filters
│   ├── utils/
│   │   ├── date.ts                # Date formatting utilities
│   │   ├── content.ts             # Age-adapted content utility
│   │   └── cn.ts                  # Class name utility
│   └── redis.ts                   # Redis client
├── types/
│   ├── launch.ts                  # Launch types
│   ├── agency.ts                  # Agency types
│   ├── vehicle.ts                 # Vehicle types
│   ├── video.ts                   # Video types
│   ├── prediction.ts              # Prediction types
│   └── common.ts                  # Shared types
├── styles/
│   └── globals.css                # Global styles + CSS variables
├── public/
│   ├── images/
│   └── sounds/                    # Phase 2
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── .env.local
```

---

## 4. Design System

### Color Palette

```css
:root {
  /* Base Colors */
  --color-void: #0a0e1a;           /* Deepest background */
  --color-cosmos: #0f1629;         /* Card backgrounds */
  --color-nebula: #1a1f36;         /* Elevated surfaces */
  --color-stardust: #9ca3af;       /* Secondary text */
  --color-starlight: #f1f5f9;      /* Primary text */
  
  /* Accent Colors */
  --color-rocket-orange: #f97316;  /* Primary CTA */
  --color-plasma-blue: #3b82f6;    /* Links, info */
  --color-aurora-teal: #14b8a6;    /* Success states */
  --color-nebula-purple: #8b5cf6;  /* Highlights */
  --color-solar-gold: #eab308;     /* Warnings, stars */
  --color-mars-red: #ef4444;       /* Errors, live indicators */
  
  /* Transparency */
  --glass-light: rgba(255, 255, 255, 0.05);
  --glass-medium: rgba(255, 255, 255, 0.1);
  --glass-heavy: rgba(255, 255, 255, 0.15);
}
```

### Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#0a0e1a',
        cosmos: '#0f1629',
        nebula: '#1a1f36',
        stardust: '#9ca3af',
        starlight: '#f1f5f9',
        'rocket-orange': '#f97316',
        'plasma-blue': '#3b82f6',
        'aurora-teal': '#14b8a6',
        'nebula-purple': '#8b5cf6',
        'solar-gold': '#eab308',
        'mars-red': '#ef4444',
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'countdown-hero': ['6rem', { lineHeight: '1', fontWeight: '700' }],
        'countdown-large': ['3rem', { lineHeight: '1', fontWeight: '700' }],
        'countdown-medium': ['1.5rem', { lineHeight: '1', fontWeight: '600' }],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
```

### Typography Scale

| Element | Font | Size | Weight | Usage |
|---------|------|------|--------|-------|
| Hero countdown | Space Grotesk | 6rem / 4rem mobile | 700 | Home hero only |
| Page title | Space Grotesk | 2.5rem | 700 | Page headers |
| Section title | Space Grotesk | 1.5rem | 600 | Section headers |
| Card title | Inter | 1.125rem | 600 | Card headers |
| Body | Inter | 1rem | 400 | General text |
| Small | Inter | 0.875rem | 400 | Secondary text |
| Caption | Inter | 0.75rem | 500 | Labels, badges |
| Data | JetBrains Mono | 0.875rem | 500 | Countdown digits, stats |

### Spacing System

Use Tailwind's default spacing scale (4px base):
- `space-y-2` (8px) — Tight groupings
- `space-y-4` (16px) — Related elements
- `space-y-6` (24px) — Section padding
- `space-y-8` (32px) — Major sections
- `space-y-12` (48px) — Page sections

### Border Radius

| Size | Value | Usage |
|------|-------|-------|
| sm | 4px | Buttons, badges |
| DEFAULT | 8px | Cards, inputs |
| lg | 12px | Large cards, modals |
| xl | 16px | Hero sections |
| full | 9999px | Pills, avatars |

---

## 5. Data Architecture

### Core Types

```typescript
// types/common.ts
export type AgeMode = 'explorer' | 'cadet' | 'missionControl';

export interface AgeAdaptedContent {
  explorer: string;      // Simple, wonder-focused (5-8)
  cadet: string;         // Educational, contextual (9-13)
  missionControl: string; // Detailed, technical (14+)
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
```

```typescript
// types/launch.ts
export interface Launch {
  id: string;
  name: string;
  slug: string;
  status: LaunchStatus;
  
  // Timing
  net: Date;                     // No Earlier Than
  windowStart?: Date;
  windowEnd?: Date;
  holdReason?: string;
  
  // Relations
  provider: AgencySummary;
  vehicle: VehicleSummary;
  launchSite: LaunchSiteSummary;
  mission?: Mission;
  
  // Media
  image?: string;
  webcastUrl?: string;
  webcastLive: boolean;
  
  // Metadata
  probability?: number;          // Weather probability %
  
  // Age-adapted content
  description: AgeAdaptedContent;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface LaunchStatus {
  id: string;
  name: 'Go' | 'TBD' | 'Hold' | 'In Flight' | 'Success' | 'Failure' | 'Partial Failure';
  abbrev: string;
  description: string;
}

export interface Mission {
  id: string;
  name: string;
  type: string;
  orbit?: Orbit;
  description: AgeAdaptedContent;
}

export interface Orbit {
  name: string;
  abbrev: string;
  altitude?: number;
}
```

```typescript
// types/agency.ts
export interface Agency {
  id: string;
  name: string;
  shortName?: string;
  slug: string;
  type: 'government' | 'commercial' | 'international' | 'educational';
  
  country: string;
  countryCode: string;
  
  description: AgeAdaptedContent;
  foundedYear?: number;
  administrator?: string;
  website?: string;
  
  logo: string;
  image?: string;
  
  totalLaunches: number;
  successfulLaunches: number;
  failedLaunches: number;
  pendingLaunches: number;
  
  vehicles: VehicleSummary[];
  launchSites: LaunchSiteSummary[];
}

export interface AgencySummary {
  id: string;
  name: string;
  shortName?: string;
  logo: string;
  countryCode: string;
}
```

```typescript
// types/vehicle.ts
export interface Vehicle {
  id: string;
  name: string;
  slug: string;
  type: 'rocket' | 'capsule' | 'station' | 'probe' | 'lander';
  status: 'active' | 'retired' | 'development' | 'planned';
  
  provider: AgencySummary;
  specs: VehicleSpecs;
  description: AgeAdaptedContent;
  
  image?: string;
  silhouette?: string;
  
  totalLaunches: number;
  successfulLaunches: number;
  failedLaunches: number;
  firstFlight?: Date;
  lastFlight?: Date;
  
  // Fun comparisons for Explorer/Cadet
  comparisons?: VehicleComparisons;
}

export interface VehicleSpecs {
  height?: number;
  diameter?: number;
  mass?: number;
  massToLEO?: number;
  massToGTO?: number;
  stages?: number;
  boosters?: number;
  reusable: boolean;
  thrust?: number;
  engines?: EngineConfig[];
}

export interface EngineConfig {
  name: string;
  count: number;
  type: string;
  fuel: string;
}

export interface VehicleComparisons {
  heightComparison: string;
  massComparison: string;
  speedComparison: string;
}

export interface VehicleSummary {
  id: string;
  name: string;
  image?: string;
  provider: string;
}
```

```typescript
// types/video.ts
export interface Video {
  id: string;
  source: 'youtube' | 'vimeo' | 'other';
  externalId: string;
  
  title: string;
  description?: string;
  channel: VideoChannel;
  thumbnailUrl: string;
  duration?: number;
  publishedAt: Date;
  
  isLive: boolean;
  viewCount?: number;
  
  category: VideoCategory;
  relatedLaunchId?: string;
  relatedAgencyId?: string;
  
  ageAppropriate: AgeMode[];
}

export interface VideoChannel {
  id: string;
  name: string;
  logo?: string;
  url: string;
}

export type VideoCategory = 
  | 'launch' 
  | 'documentary' 
  | 'news' 
  | 'educational' 
  | 'interview' 
  | 'livestream'
  | 'recap';
```

```typescript
// types/prediction.ts
export interface RoadClosure {
  id: string;
  location: RoadClosureLocation;
  startDate: Date;
  endDate: Date;
  status: 'scheduled' | 'active' | 'cancelled' | 'completed';
  source: string;
  prediction?: LaunchPrediction;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoadClosureLocation {
  id: string;
  name: string;
  region: string;
  country: string;
  relatedSiteId?: string;
}

export interface LaunchPrediction {
  confidence: number;
  predictedEvent: string;
  predictedVehicle?: VehicleSummary;
  reasoning: string[];
  algorithmVersion: string;
  generatedAt: Date;
}
```

### Zustand Stores

```typescript
// lib/stores/preferences.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AgeMode } from '@/types/common';

interface UserPreferencesState {
  ageMode: AgeMode;
  setAgeMode: (mode: AgeMode) => void;
  
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  
  reducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;
  
  hasVisitedBefore: boolean;
  setHasVisitedBefore: (visited: boolean) => void;
}

export const useUserPreferences = create<UserPreferencesState>()(
  persist(
    (set) => ({
      ageMode: 'cadet',
      soundEnabled: false,
      reducedMotion: false,
      hasVisitedBefore: false,
      
      setAgeMode: (mode) => set({ ageMode: mode }),
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
      setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
      setHasVisitedBefore: (visited) => set({ hasVisitedBefore: visited }),
    }),
    {
      name: 'rocketwatch-preferences',
    }
  )
);
```

```typescript
// lib/stores/ui.ts
import { create } from 'zustand';

interface UIState {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  
  activeModal: string | null;
  modalData: unknown;
  openModal: (modalId: string, data?: unknown) => void;
  closeModal: () => void;
  
  tickerPaused: boolean;
  setTickerPaused: (paused: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  activeModal: null,
  modalData: null,
  tickerPaused: false,
  
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  openModal: (modalId, data) => set({ activeModal: modalId, modalData: data }),
  closeModal: () => set({ activeModal: null, modalData: null }),
  setTickerPaused: (paused) => set({ tickerPaused: paused }),
}));
```

### Query Hooks Pattern

```typescript
// lib/queries/keys.ts
export const queryKeys = {
  launches: {
    all: ['launches'] as const,
    lists: () => [...queryKeys.launches.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => 
      [...queryKeys.launches.lists(), filters] as const,
    upcoming: () => [...queryKeys.launches.all, 'upcoming'] as const,
    next: () => [...queryKeys.launches.all, 'next'] as const,
    details: () => [...queryKeys.launches.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.launches.details(), id] as const,
  },
  agencies: {
    all: ['agencies'] as const,
    lists: () => [...queryKeys.agencies.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) => 
      [...queryKeys.agencies.lists(), filters] as const,
    details: () => [...queryKeys.agencies.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.agencies.details(), id] as const,
  },
  vehicles: {
    all: ['vehicles'] as const,
    lists: () => [...queryKeys.vehicles.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) => 
      [...queryKeys.vehicles.lists(), filters] as const,
    details: () => [...queryKeys.vehicles.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.vehicles.details(), id] as const,
  },
  videos: {
    all: ['videos'] as const,
    lists: () => [...queryKeys.videos.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) => 
      [...queryKeys.videos.lists(), filters] as const,
    live: () => [...queryKeys.videos.all, 'live'] as const,
  },
  predictions: {
    all: ['predictions'] as const,
    active: () => [...queryKeys.predictions.all, 'active'] as const,
  },
};
```

```typescript
// lib/queries/launches.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { queryKeys } from './keys';
import type { Launch } from '@/types/launch';

export function useNextLaunch() {
  return useQuery({
    queryKey: queryKeys.launches.next(),
    queryFn: () => apiClient<Launch>('/launches/next'),
    refetchInterval: 60 * 1000, // Refetch every minute
    staleTime: 30 * 1000,
  });
}

export function useUpcomingLaunches() {
  return useQuery({
    queryKey: queryKeys.launches.upcoming(),
    queryFn: () => apiClient<Launch[]>('/launches/upcoming'),
    staleTime: 5 * 60 * 1000,
  });
}

export function useLaunch(id: string) {
  return useQuery({
    queryKey: queryKeys.launches.detail(id),
    queryFn: () => apiClient<Launch>(`/launches/${id}`),
    enabled: !!id,
  });
}
```

### Cache TTL Strategy

| Data Type | Redis TTL | Query staleTime |
|-----------|-----------|-----------------|
| Next launch | 1 min | 30 sec |
| Upcoming launches | 5 min | 5 min |
| Launch detail | 5 min | 5 min |
| Live videos | 2 min | 2 min |
| Video list | 15 min | 10 min |
| Agencies | 1 hour | 30 min |
| Vehicles | 1 hour | 30 min |
| Predictions | 30 min | 15 min |

---

## 6. Component Inventory

### Layout Components

#### Header
- **Description:** Sticky navigation with logo, nav links, age mode toggle
- **Height:** 64px (desktop), 56px (mobile)
- **Background:** `rgba(10, 14, 26, 0.8)` + `backdrop-filter: blur(12px)`
- **Age Adaptations:**
  - Explorer: 4 nav items max (Home, Live, Launches, Learn)
  - Cadet/Mission Control: Full nav

#### Prediction Ticker
- **Description:** Scrolling banner showing road closure predictions
- **Height:** 36px
- **Visibility:** Hidden in Explorer mode
- **Behavior:** Pause on hover, click to open modal

#### Footer
- **Content:** Logo, tagline, nav links, data attribution, social links

### Hero Components

#### Launch Countdown
- **Props:** `targetDate`, `size`, `showLabels`
- **Sizes:** hero (96px), large (36px), medium (24px), small (16px)
- **Age Adaptations:**
  - Explorer: 20% larger, animated digit transitions
  - Cadet: Standard
  - Mission Control: Includes T- prefix

#### Starfield Background
- **Implementation:** CSS or Canvas
- **Props:** `starCount`, `parallaxIntensity`, `enableTwinkle`
- **Accessibility:** `aria-hidden="true"`, respects `prefers-reduced-motion`

### Card Components

#### Launch Card
- **Props:** `launch`, `variant`, `showCountdown`
- **Variants:** default, compact, featured
- **Age Adaptations:**
  - Explorer: Larger image, minimal text, bigger countdown
  - Cadet: Balanced
  - Mission Control: Additional data row (booster, orbit)

#### Video Card
- **Props:** `video`, `variant`
- **States:** Default, hover (play overlay), live (pulsing badge)

#### Agency Card
- **Props:** `agency`, `variant`
- **Age Adaptations:**
  - Explorer: Top 4 agencies only, larger cards
  - Others: Full list

#### Vehicle Card
- **Props:** `vehicle`, `variant`, `showSpecs`
- **Age Adaptations:**
  - Explorer: Visual only, fun comparisons ("as tall as 23 elephants")
  - Cadet: Basic specs with comparisons
  - Mission Control: Full technical specs

### Interactive Components

#### Button
- **Variants:** primary, secondary, ghost, danger
- **Sizes:** small (32px), default (40px), large (48px)
- **States:** default, hover, active, focus, disabled, loading
- **Age Adaptations:**
  - Explorer: 20% larger touch targets

#### Status Badge
- **Variants:** live (red, pulsing), upcoming (blue), success (teal), failure (orange), tbd (gray)
- **Props:** `status`, `size`, `showIcon`, `pulse`

#### Tabs
- **Props:** `tabs`, `activeTab`, `onTabChange`, `variant`
- **Variants:** underline, pills
- **Accessibility:** `role="tablist"`, arrow key navigation

#### Modal
- **Props:** `isOpen`, `onClose`, `title`, `size`
- **Sizes:** default (500px), large (800px), fullscreen
- **Accessibility:** Focus trap, close on Escape, `aria-modal="true"`

### Feedback Components

#### Skeleton Loader
- **Variants:** text, card, avatar, image
- **Props:** `width`, `height`, `count`

#### Empty State
- **Props:** `icon`, `title`, `description`, `action`
- **Age Adaptations:**
  - Explorer: Friendly message (Cosmo in Phase 2)

---

## 7. Page Wireframes

### Home Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                      │
│ [Logo] [Nav Links] [Age Toggle] [Search]                    │
├─────────────────────────────────────────────────────────────┤
│ PREDICTION TICKER (not Explorer)                            │
│ ⚡ Road closure at Boca Chica Dec 18-19 → 78% Starship test │
├─────────────────────────────────────────────────────────────┤
│ HERO (full viewport)                                        │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [Starfield Background]                                  │ │
│ │                                                         │ │
│ │         NEXT LAUNCH                                     │ │
│ │         SpaceX Falcon 9                                 │ │
│ │         Starlink Group 6-29                             │ │
│ │                                                         │ │
│ │         T- 02:34:12                                     │ │
│ │                                                         │ │
│ │         [Watch Live] [Details →]                        │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ STATUS BAR                                                  │
│ [🔴 2 Live] [🟡 3 Today] [📅 12 This Week] [🛰️ ISS Visible] │
├─────────────────────────────────────────────────────────────┤
│ UPCOMING LAUNCHES                          [View All →]     │
│ [Card] [Card] [Card]                                        │
├─────────────────────────────────────────────────────────────┤
│ LIVE & VIDEOS                              [View All →]     │
│ [Featured Live] [Card] [Card]                               │
├─────────────────────────────────────────────────────────────┤
│ EXPLORE BY AGENCY                          [View All →]     │
│ [Logo] [Logo] [Logo] [Logo] [Logo] [Logo]                   │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                      │
└─────────────────────────────────────────────────────────────┘
```

### Launches Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER + TICKER                                             │
├─────────────────────────────────────────────────────────────┤
│ PAGE HEADER                                                 │
│ Launches                                                    │
│ Every mission, past and future                              │
│                                                             │
│ [Upcoming] [Recent] [Historical]                            │
│                                                             │
│ Filter: [All Agencies ▼]    Search: [🔍 Search...]         │
├─────────────────────────────────────────────────────────────┤
│ TODAY — December 15, 2024                                   │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [Falcon 9] SpaceX • Starlink    T- 02:34:12   [Watch]  │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ TOMORROW — December 16, 2024                                │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [Electron] Rocket Lab • NROL    Dec 16, 14:00  [→]     │ │
│ └─────────────────────────────────────────────────────────┘ │
│ ... more launches ...                                       │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                      │
└─────────────────────────────────────────────────────────────┘
```

### Launch Detail Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER + TICKER                                             │
├─────────────────────────────────────────────────────────────┤
│ BREADCRUMB: Launches → SpaceX → Starlink Group 6-29         │
├─────────────────────────────────────────────────────────────┤
│ LAUNCH HERO                                                 │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ SpaceX                          ┌───────────────────┐   │ │
│ │ Starlink Group 6-29             │ T- 02:34:12       │   │ │
│ │ 🟢 GO for launch                │                   │   │ │
│ │ December 15, 2024 • 18:30 UTC   │ [Watch Live]      │   │ │
│ │ Cape Canaveral SLC-40           └───────────────────┘   │ │
│ │                                                         │ │
│ │ [Share] [Calendar] [Notify]                             │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ TABS: [Overview] [Vehicle] [Payload] [Site] [Media]         │
├─────────────────────────────────────────────────────────────┤
│ TAB CONTENT                                                 │
│ ┌─────────────────────┐ ┌───────────────────────────────┐  │
│ │ Mission Summary     │ │ Quick Facts                   │  │
│ │ This mission will...│ │ Vehicle: Falcon 9 Block 5     │  │
│ │                     │ │ Booster: B1062 (12th flight)  │  │
│ │                     │ │ Orbit: LEO (550km)            │  │
│ └─────────────────────┘ └───────────────────────────────┘  │
│                                                             │
│ TIMELINE                                                    │
│ ● T-00:38:00 Propellant load begins                        │
│ ● T-00:07:00 Engine chill                                  │
│ ● T-00:00:00 LIFTOFF                                       │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. API Structure

### External APIs

| API | Purpose | Auth | Rate Limit |
|-----|---------|------|------------|
| Launch Library 2 | Launches, agencies, vehicles | API Key | 15/hr free, 300/hr paid |
| SpaceX API | SpaceX-specific data | None | Generous |
| YouTube Data API | Live streams, videos | API Key | 10,000 units/day |

### Internal API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/launches/next` | GET | Next upcoming launch |
| `/api/launches/upcoming` | GET | Next 20 launches |
| `/api/launches/[id]` | GET | Single launch detail |
| `/api/launches` | GET | Paginated launches with filters |
| `/api/agencies` | GET | All agencies |
| `/api/agencies/[id]` | GET | Single agency detail |
| `/api/vehicles` | GET | All vehicles |
| `/api/vehicles/[id]` | GET | Single vehicle detail |
| `/api/videos/live` | GET | Currently live streams |
| `/api/videos` | GET | Paginated videos |
| `/api/predictions` | GET | Active road closure predictions |

### API Route Example

```typescript
// app/api/launches/next/route.ts
import { NextResponse } from 'next/server';
import { getLaunchLibraryClient } from '@/lib/external/launch-library';
import { transformLaunch } from '@/lib/transforms/launch';
import { redis } from '@/lib/redis';

const CACHE_KEY = 'launches:next';
const CACHE_TTL = 60; // 1 minute

export async function GET() {
  try {
    // Check cache
    const cached = await redis.get(CACHE_KEY);
    if (cached) {
      return NextResponse.json(JSON.parse(cached));
    }
    
    // Fetch from LL2
    const client = getLaunchLibraryClient();
    const response = await client.getUpcomingLaunches({ limit: 1 });
    
    if (response.results.length === 0) {
      return NextResponse.json(null);
    }
    
    const launch = transformLaunch(response.results[0]);
    
    // Cache
    await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(launch));
    
    return NextResponse.json(launch);
  } catch (error) {
    console.error('Failed to fetch next launch:', error);
    return NextResponse.json(
      { error: 'Failed to fetch launch data' },
      { status: 500 }
    );
  }
}
```

### Launch Library 2 Client

```typescript
// lib/external/launch-library.ts
const LL2_BASE_URL = 'https://ll.thespacedevs.com/2.2.0';

interface LL2Config {
  apiKey?: string;
}

export function getLaunchLibraryClient(config?: LL2Config) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (config?.apiKey) {
    headers['Authorization'] = `Token ${config.apiKey}`;
  }
  
  async function fetchLL2<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
    const url = new URL(`${LL2_BASE_URL}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    
    const response = await fetch(url.toString(), { headers });
    
    if (!response.ok) {
      throw new Error(`LL2 API error: ${response.status}`);
    }
    
    return response.json();
  }
  
  return {
    getUpcomingLaunches: (params?: { limit?: number }) =>
      fetchLL2<LL2LaunchResponse>('/launch/upcoming/', params),
    
    getLaunch: (id: string) =>
      fetchLL2<LL2Launch>(`/launch/${id}/`),
    
    getAgencies: (params?: { limit?: number }) =>
      fetchLL2<LL2AgencyResponse>('/agencies/', params),
    
    getAgency: (id: string) =>
      fetchLL2<LL2Agency>(`/agencies/${id}/`),
    
    getVehicles: (params?: { limit?: number }) =>
      fetchLL2<LL2VehicleResponse>('/config/launcher/', params),
  };
}
```

---

## 9. Development Roadmap

### 2-Week Sprint Schedule

#### Week 1: Foundation + Core Pages

| Day | Focus | Key Deliverables |
|-----|-------|------------------|
| **Day 1** | Setup | Project init, Vercel, domain research, design tokens |
| **Day 2** | Components | Button, Badge, Card, Header, Footer, Mobile Menu |
| **Day 3** | API Layer | Types, LL2 client, API routes, query hooks, caching |
| **Day 4** | Home Hero | Starfield, Countdown, Hero section, Launch card |
| **Day 5** | Home Complete | Status bar, Videos section, Agency row |
| **Day 6** | Launches | List page, filters, Detail page (hero + tabs) |
| **Day 7** | Live/Videos | Video page, modal, remaining launch detail tabs |

#### Week 2: Remaining + Polish + Launch

| Day | Focus | Key Deliverables |
|-----|-------|------------------|
| **Day 8** | Directories | Agencies page + detail, Vehicles page + detail |
| **Day 9** | Age Modes | Context, CSS vars, adaptations for all components |
| **Day 10** | Predictions | Ticker, modal, basic prediction logic |
| **Day 11** | Accessibility | Keyboard nav, ARIA, focus states, reduced motion |
| **Day 12** | SEO + Perf | Meta tags, OG images, Lighthouse, optimization |
| **Day 13** | Testing | Mobile, cross-browser, bug fixes |
| **Day 14** | LAUNCH 🚀 | DNS, SSL, smoke test, go live! |

### Daily Task Breakdown

See the full daily task breakdown in the project plan. Key milestones:

- **Day 4:** Hero with live countdown working
- **Day 5:** Home page complete
- **Day 7:** Launches + Videos sections complete
- **Day 9:** Age mode switching works site-wide
- **Day 11:** WCAG AA baseline met
- **Day 14:** MVP LIVE 🚀

### Definition of Done

**For Components:**
- [ ] Works in all 3 age modes
- [ ] Responsive (mobile → desktop)
- [ ] Accessible (keyboard, screen reader)
- [ ] Loading state
- [ ] Error state
- [ ] TypeScript types complete

**For Pages:**
- [ ] All components integrated
- [ ] Data fetching with loading/error states
- [ ] SEO meta tags
- [ ] Mobile tested
- [ ] Age mode tested

**For MVP Launch:**
- [ ] All MVP features complete
- [ ] Lighthouse score > 90
- [ ] WCAG AA compliant
- [ ] Works in major browsers
- [ ] Works on mobile devices

---

## 10. Content Guidelines

### Age-Adapted Content Pattern

For every piece of content that users see, provide 3 variants:

```typescript
const spaceXDescription: AgeAdaptedContent = {
  explorer: "SpaceX builds amazing rockets that can land back on Earth! They want to help people visit Mars someday.",
  cadet: "SpaceX is a private space company founded by Elon Musk in 2002. They build reusable rockets and spacecraft, and are working toward making humans a multi-planetary species.",
  missionControl: "Space Exploration Technologies Corp. (SpaceX) is an American aerospace manufacturer founded in 2002. The company has developed the Falcon 9 and Falcon Heavy launch vehicles, the Dragon spacecraft family, and is developing Starship for Mars colonization missions."
};
```

### Content Tone by Mode

| Mode | Tone | Vocabulary | Sentence Length |
|------|------|------------|-----------------|
| Explorer | Wonder, excitement | Simple, concrete | Short (10-15 words) |
| Cadet | Educational, engaging | Age-appropriate, explains jargon | Medium (15-25 words) |
| Mission Control | Factual, technical | Full technical vocabulary | Long (25+ words) |

### Vehicle Comparisons (Explorer/Cadet)

Make specs relatable:

```typescript
const falcon9Comparisons: VehicleComparisons = {
  heightComparison: "As tall as a 23-story building",
  massComparison: "Weighs as much as 25 school buses",
  speedComparison: "Can travel from New York to London in about 30 minutes",
};
```

---

## 11. Setup Instructions

### Prerequisites

- Node.js 18+
- npm or pnpm
- Git
- Vercel account
- Code editor (VS Code recommended)

### API Keys Required

| Service | Where to Get | Env Variable |
|---------|--------------|--------------|
| Launch Library 2 | https://thespacedevs.com/llapi | `LL2_API_KEY` |
| YouTube Data API | https://console.cloud.google.com | `YOUTUBE_API_KEY` |
| Upstash Redis | https://upstash.com | `KV_REST_API_URL`, `KV_REST_API_TOKEN` |

### Environment Variables

```bash
# .env.local
LL2_API_KEY=your_launch_library_key
YOUTUBE_API_KEY=your_youtube_key
KV_REST_API_URL=your_upstash_url
KV_REST_API_TOKEN=your_upstash_token
```

### Initial Setup Commands

```bash
# Create project
npx create-next-app@latest rocketwatch --typescript --tailwind --eslint --app --src-dir=false

# Navigate to project
cd rocketwatch

# Install dependencies
npm install zustand @tanstack/react-query framer-motion lucide-react date-fns @vercel/kv

# Install dev dependencies
npm install -D prettier prettier-plugin-tailwindcss

# Start development server
npm run dev
```

### Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

---

## 12. Code Standards

### TypeScript

- Strict mode enabled
- Explicit return types on functions
- Interface over type where possible
- No `any` — use `unknown` if needed

### Component Pattern

```typescript
// components/ui/button.tsx
import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'small' | 'default' | 'large';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          // variants...
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? <Spinner size="small" /> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### File Organization

- One component per file
- Keep files under 200 lines
- Colocate tests with components
- Use index.ts for public exports

### Import Order

```typescript
// 1. React/Next
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. External libraries
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';

// 3. Internal libraries
import { cn } from '@/lib/utils/cn';
import { useUserPreferences } from '@/lib/stores/preferences';

// 4. Components
import { Button } from '@/components/ui/button';
import { LaunchCard } from '@/components/launch/launch-card';

// 5. Types
import type { Launch } from '@/types/launch';
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `LaunchCard.tsx` |
| Hooks | camelCase with use prefix | `useCountdown.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Types | PascalCase | `Launch`, `AgeMode` |
| Constants | SCREAMING_SNAKE_CASE | `CACHE_TTL` |
| CSS classes | kebab-case (Tailwind) | `text-starlight` |

### Git Commit Messages

```
feat: Add launch countdown component
fix: Correct timezone handling in countdown
style: Update button hover states
refactor: Extract API client to separate module
docs: Update README with setup instructions
chore: Update dependencies
```

---

## Quick Reference

### Key Files to Create First

1. `tailwind.config.ts` — Design tokens
2. `lib/utils/cn.ts` — Class name utility
3. `types/common.ts` — Shared types
4. `lib/stores/preferences.ts` — User preferences store
5. `components/ui/button.tsx` — Base button component

### Most Important Components

1. Launch Countdown (core feature)
2. Launch Card (used everywhere)
3. Header with Age Mode Toggle
4. Starfield Background (visual identity)

### Critical Paths to Test

1. Home → Launch Detail → Watch Live
2. Age mode switching (all 3 modes)
3. Mobile navigation
4. Countdown accuracy

---

## Support

If stuck, check:
1. Launch Library 2 docs: https://thespacedevs.com/llapi
2. Next.js docs: https://nextjs.org/docs
3. TanStack Query docs: https://tanstack.com/query
4. Tailwind docs: https://tailwindcss.com/docs

---

**Good luck! Build something amazing! 🚀**
