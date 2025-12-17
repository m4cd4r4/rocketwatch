# The Great Expanse 🚀

> For the love of space

A free, inclusive space launch tracking platform serving everyone from 5-year-olds to aerospace engineers.

**🌐 Live Site:** [https://www.thegreatexpanse.com](https://www.thegreatexpanse.com)

## Features

### 🚀 Launch Tracking
- **Real-time Launch Data**: Next upcoming launch prominently displayed
- **Launch Calendar**: Comprehensive list of upcoming launches with detailed information
- **Live Streams**: Integrated YouTube streams for launch events
- **Historical Data**: Complete launch history and statistics
- **Agency Profiles**: Detailed information about space agencies worldwide
- **Vehicle Database**: Technical specifications and launch history for rockets

### 🎮 Space Arcade
Play while you wait for launches! Four classic games with a space theme:
- **Asteroids**: Navigate through an asteroid field and shoot to survive
- **Space Invaders**: Defend Earth from waves of alien invaders
- **Cosmic Snake**: Collect space fuel while avoiding your trail
- **Asteroid Defense**: Breakout-style game to protect the station

All games adapt their difficulty based on your age mode setting!

### 🌈 Age Mode
Three inclusive experience modes:
- **Explorer Mode** (5-12 years): Simplified interface, curated content
- **Cadet Mode** (13-17 years): Balanced detail, educational focus
- **Mission Control** (18+ years): Full technical specifications

### ✨ Features
- 🆓 **Free Forever**: No accounts, no paywalls, no ads
- 🌍 **Comprehensive**: All agencies, all launches, all history
- ♿ **Accessible**: WCAG AA compliant
- 📱 **Responsive**: Beautiful on all devices
- 🎨 **Dark Theme**: Easy on the eyes during late-night launch watching
- ⚡ **Fast**: Optimized with caching and edge functions

## Tech Stack

- **Framework:** Next.js 14.2 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 3.4+
- **Animation:** Framer Motion
- **State Management:** Zustand + TanStack Query v5
- **APIs:** Launch Library 2, YouTube Data API
- **Caching:** Vercel KV / Upstash Redis
- **Hosting:** Vercel (Edge Functions)
- **Games:** Pure HTML5 Canvas (no external libraries)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/m4cd4r4/rocketwatch.git
cd rocketwatch

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local
```

### Environment Variables

Edit `.env.local` with your API keys:

```env
# Base URL for the application
NEXT_PUBLIC_BASE_URL=https://www.thegreatexpanse.com

# Launch Library 2 API
LL2_API_KEY=your_launch_library_key

# YouTube Data API
YOUTUBE_API_KEY=your_youtube_key

# Upstash Redis (Vercel KV)
KV_REST_API_URL=your_upstash_url
KV_REST_API_TOKEN=your_upstash_token
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
thegreatexpanse/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   ├── icon.tsx           # Favicon generation
│   ├── apple-icon.tsx     # Apple touch icon
│   ├── opengraph-image.tsx # Social media preview
│   ├── launches/          # Launch pages
│   ├── live/              # Live streams
│   ├── agencies/          # Space agencies
│   ├── vehicles/          # Rockets & vehicles
│   └── api/               # API routes
├── components/
│   ├── ui/                # Base UI components
│   ├── layout/            # Header, Footer, Navigation
│   ├── arcade/            # Game components
│   ├── launch/            # Launch-specific components
│   ├── video/             # Video/stream components
│   ├── agency/            # Agency components
│   ├── vehicle/           # Vehicle components
│   └── home/              # Homepage sections
├── lib/
│   ├── api/               # Internal API client
│   ├── external/          # External API clients (LL2, YouTube)
│   ├── queries/           # TanStack Query hooks
│   ├── stores/            # Zustand state stores
│   └── utils/             # Utility functions
├── types/                 # TypeScript type definitions
├── styles/                # Global styles
└── public/                # Static assets
```

## Design System

### Color Palette
Our deep space-inspired color scheme:
- `void` (#0a0e1a) - Deepest background
- `cosmos` (#0f1629) - Card backgrounds
- `nebula` (#1a1f36) - Elevated surfaces
- `stardust` (#9ca3af) - Secondary text
- `starlight` (#f1f5f9) - Primary text
- `rocket-orange` (#f97316) - Primary CTAs
- `plasma-blue` (#3b82f6) - Links, info states
- `aurora-teal` (#14b8a6) - Success states
- `nebula-purple` (#8b5cf6) - Highlights
- `solar-gold` (#eab308) - Warnings
- `mars-red` (#ef4444) - Errors, live indicators

### Typography
- **Display:** Space Grotesk - Headlines and hero text
- **Body:** Inter - All body text
- **Mono:** JetBrains Mono - Technical data and code

## Development Timeline

### Day 1-2: Foundation
- Next.js 14 project setup with TypeScript
- Tailwind CSS with custom design system
- Component library (Button, Badge, Card, Spinner)
- Layout components (Header, Footer, Mobile Menu)
- State management (Zustand stores)
- Base architecture

### Day 3-5: Core Features
- Launch Library 2 API integration
- YouTube Data API integration
- Launch tracking and display
- Live stream integration
- Agency and vehicle pages
- Comprehensive filtering and search

### Day 6-8: Polish & Features
- Age mode system implementation
- Responsive design refinements
- Accessibility improvements (WCAG AA)
- Performance optimization
- Error handling and loading states

### Day 9-11: Enhancement
- SEO optimization (meta tags, OpenGraph, Twitter cards)
- Dynamic favicon and app icons
- Performance monitoring
- Caching strategy refinement

### Day 12-14: Arcade & Launch
- Complete rebranding to "The Great Expanse"
- Arcade game system with 4 classic games
- Game selection menu
- Age-based difficulty scaling
- Domain setup and deployment
- Production launch 🎉

## Arcade Games

### Technical Implementation
All games are built with pure HTML5 Canvas API - no external game libraries. Each game:
- Runs at 60 FPS with `requestAnimationFrame`
- Integrates with age mode for difficulty scaling
- Includes pause, game over, and restart functionality
- Weighs only ~15KB each
- Fully keyboard-controlled

### Game Details

**Asteroids (Medium)**
- Classic space shooter with rotating ship physics
- Difficulty scales: 3-5 asteroids based on age mode
- Features: Thrust mechanics, wrapping screen edges, collision detection

**Space Invaders (Easy)**
- Defend against waves of descending aliens
- Aliens shoot back with increasing frequency
- Victory condition: Clear all aliens
- Difficulty scales: 3-5 rows of aliens

**Cosmic Snake (Easy)**
- Grid-based snake gameplay
- Speed increases as you collect fuel
- Progressive difficulty with score

**Asteroid Defense (Medium)**
- Breakout-style paddle game
- Multi-hit bricks with color coding
- Physics-based ball bouncing
- Difficulty scales: Paddle width and ball speed

## API Integration

### Launch Library 2
- Upcoming launches with detailed metadata
- Launch status and updates
- Agency information
- Vehicle specifications
- Historical launch data

### YouTube Data API
- Live stream detection
- Video metadata
- Thumbnail generation
- Channel information

### Caching Strategy
- Edge caching with Vercel KV
- 5-minute TTL for launch data
- 1-hour TTL for agency/vehicle data
- Stale-while-revalidate pattern

## Deployment

The site is deployed on Vercel with:
- Edge Functions for optimal performance
- Automatic deployments from `master` branch
- Environment variable management
- Analytics and performance monitoring

**Production URL:** [https://www.thegreatexpanse.com](https://www.thegreatexpanse.com)

## Contributing

This is a personal project, but suggestions and feedback are welcome! Feel free to:
- Open issues for bugs or feature requests
- Submit pull requests for improvements
- Share your launch viewing experiences

## License

MIT License - Built with love for space exploration 🌌

## Acknowledgments

- **Launch Library 2** for comprehensive launch data
- **YouTube Data API** for live stream integration
- **The Space Community** for inspiration and passion
- **All Space Agencies** for making exploration accessible

---

**The Great Expanse** - Making space accessible to everyone, from 5-year-olds to aerospace engineers.

Visit us at [https://www.thegreatexpanse.com](https://www.thegreatexpanse.com) 🚀
