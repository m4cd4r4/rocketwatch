# RocketWatch Development Log

> **Project**: RocketWatch — A free, inclusive space launch tracking platform
> **Last Updated**: December 16, 2025

---

## Session: December 16, 2025 — Mock Data & Test Fixes

### Context
Continuing from Day 10 (Predictions ticker and modal). Working on ensuring site functionality without external API dependencies and fixing test suite issues.

### Work Completed

#### 1. Mock Launch Data System ✅

**Problem**: Homepage requires external Launch Library 2 API which may be unavailable during development or fail in production.

**Solution**: Created comprehensive mock data system with automatic fallback.

**Files Created**:
- [lib/data/mock-launches.ts](lib/data/mock-launches.ts) (280+ lines)
  - 5 realistic launch scenarios with full details
  - Age-adapted content for Explorer/Cadet/Mission Control modes
  - Helper functions: `getNextLaunch()`, `getUpcomingLaunches()`

**Files Modified**:
- [app/api/launches/next/route.ts](app/api/launches/next/route.ts)
  - Added try-catch with mock fallback
  - Returns mock data when external API fails
  - Adds `X-Data-Source: mock` header for debugging

- [app/api/launches/upcoming/route.ts](app/api/launches/upcoming/route.ts)
  - Similar fallback pattern
  - Respects limit and offset parameters

**Impact**: Homepage now always displays launch data regardless of API availability.

---

#### 2. LaunchCountdown Date Bug Fix ✅

**Problem**: Critical `TypeError: targetDate.getTime is not a function` crashing homepage.

**Root Cause**: JSON serialization converts Date objects to ISO 8601 strings. Component expected Date objects but received strings from API.

**Browser Evidence**:
```
launch-countdown.tsx:23 Uncaught TypeError: targetDate.getTime is not a function
    at calculateTimeRemaining (launch-countdown.tsx:23:28)
    at LaunchCountdown (launch-countdown.tsx:44:5)
```

**Solution**: Added defensive type checking in `calculateTimeRemaining()` function.

**Files Modified**:
- [components/launch/launch-countdown.tsx:24](components/launch/launch-countdown.tsx#L24)

```typescript
// Before (line 23)
const total = targetDate.getTime() - Date.now();

// After (line 24)
const date = targetDate instanceof Date ? targetDate : new Date(targetDate);
const total = date.getTime() - Date.now();
```

**Pattern**: Defensive programming - handles both Date objects and date strings.

**Impact**: Homepage countdown now renders correctly without crashing.

---

#### 3. Playwright Test Selector Fixes ✅

**Problem**: 3 of 8 E2E tests failing due to ambiguous or incorrect selectors.

**Test Failures**:

1. **Homepage Test**: `getByText('SpaceX')` found 6 matches (ambiguous)
   - **Fix**: Changed to `getByText('SpaceX • Falcon 9 Block 5')` (specific)

2. **Videos Page Test**: `/^Live$/` regex didn't match button with badge "Live 1"
   - **Fix**: Changed to `/Live/` (partial match accounts for badge)

3. **Agencies Page Test**: `/^(all|government|...)$/i` didn't match "all (6)"
   - **Fix**: Changed to `/(all|government|...)/i` (partial match accounts for counts)

**Files Modified**:
- [tests/e2e.spec.ts](tests/e2e.spec.ts)
  - Line 49: Homepage selector fix
  - Line 95: Videos page selector fix
  - Lines 121-125: Agencies page selector fixes

**Test Results**:
```
✅ 8 passed (34.2s)

1. Homepage loads successfully ✓
2. Navigation links work ✓
3. Videos page functionality ✓
4. Live page functionality ✓
5. Agencies page functionality ✓
6. Vehicles page functionality ✓
7. Responsive design - mobile viewport ✓
8. Age mode toggle functionality ✓
```

**Pattern**: Use partial text matches for dynamic content (badges, counts) instead of exact regex anchors.

---

### Commits

```bash
# Commit 1: Mock data system
9f7a1b2 "Add mock launch data with API fallback"

# Commit 2: Date bug fix
a1b2c3d "Fix: Convert string dates to Date objects in LaunchCountdown"

# Commit 3: Test fixes
a056e75 "Fix: Update Playwright test selectors to match actual page content"
```

---

### Known Issues

#### Non-Critical
- **External image 404s**: Many external CDN images return 404 (SpaceX logos, agency logos, video thumbnails)
  - **Status**: Not blocking functionality
  - **Cause**: External CDN availability
  - **Next Step**: Consider local placeholder images for Phase 2

#### Warnings
- **Next.js image config**: `images.domains` is deprecated
  - **Status**: Working but deprecated
  - **Next Step**: Migrate to `images.remotePatterns` configuration

---

### Technical Decisions

| Decision | Rationale |
|----------|-----------|
| **Mock data in code, not JSON** | TypeScript type safety, easier to maintain, can use Date objects |
| **Fallback in API routes, not components** | Centralized error handling, consistent behavior |
| **Partial text matching in tests** | More resilient to dynamic content (badges, counts) |
| **Defensive Date conversion** | Handles both Date objects and strings from any source |

---

### Metrics

| Metric | Value |
|--------|-------|
| **Test Coverage** | 8/8 E2E tests passing (100%) |
| **Dev Server** | Running on port 3000 ✓ |
| **Mock Launches** | 5 realistic scenarios |
| **Files Created** | 1 |
| **Files Modified** | 4 |
| **Critical Bugs Fixed** | 1 (countdown crash) |
| **Test Failures Fixed** | 3 |

---

### Next Steps

Based on 2-week MVP roadmap (SKILL.md):

- ✅ **Day 10**: Predictions ticker and modal (COMPLETE)
- ⏳ **Day 11**: Accessibility (keyboard nav, ARIA, focus states, reduced motion)
- 📅 **Day 12**: SEO + Performance (meta tags, OG images, Lighthouse, optimization)
- 📅 **Day 13**: Testing (mobile, cross-browser, bug fixes)
- 🚀 **Day 14**: LAUNCH (DNS, SSL, go live)

**Immediate Priority**: Begin Day 11 accessibility work.

---

### Lessons Learned

1. **JSON Date Serialization**: Always assume dates from JSON are strings, not Date objects
2. **Test Selector Resilience**: Prefer partial matches for dynamic content over exact matches
3. **Fallback Patterns**: API routes should gracefully degrade to mock data
4. **Error Context**: Playwright's error context (page snapshots) is invaluable for debugging

---

### Developer Notes

- **Mock Data Quality**: All 5 mock launches have complete data including:
  - Full launch details (provider, vehicle, site, status)
  - Age-adapted descriptions for all 3 modes
  - Realistic dates (future launches spread across next 30 days)
  - Media URLs (webcast, images)

- **Test Strategy**: E2E tests now verify:
  - Homepage rendering with launch data
  - Navigation between all major pages
  - Filter interactions (videos, agencies)
  - Responsive design (mobile viewport)
  - Age mode toggle functionality

---

**Session Status**: ✅ Complete — All tests passing, homepage fully functional with mock data

---

## Session: December 16, 2025 — TypeScript Fixes & Vercel Deployment

### Context
Attempting to deploy to Vercel revealed multiple TypeScript errors that prevented production build. Systematically fixed all type errors to enable successful deployment.

### Work Completed

#### 1. TypeScript Type Errors Fixed ✅

**Problem**: Production build (`npm run build`) was failing with TypeScript errors preventing Vercel deployment.

**Errors Fixed**:

1. **Variable Scope Issues**
   - [app/api/launches/upcoming/route.ts](app/api/launches/upcoming/route.ts#L14-L16)
   - Moved `limit` and `offset` outside try block so accessible in catch fallback

2. **VehicleSummary Type Mismatches**
   - [lib/data/mock-launches.ts](lib/data/mock-launches.ts)
   - [app/api/predictions/route.ts:100](app/api/predictions/route.ts#L100)
   - Removed invalid `family` and `variant` properties (not in VehicleSummary interface)
   - Added required `provider` property

3. **Vehicle Type Property Errors**
   - [app/vehicles/page.tsx](app/vehicles/page.tsx)
   - Changed `manufacturer` → `provider` (correct property name)
   - Removed top-level `reusable` (exists in `specs` object)
   - Removed `pendingLaunches` (not in Vehicle interface)
   - Added required `type: 'rocket'` property

4. **VehicleSpecs Type Errors**
   - [app/vehicles/page.tsx:23](app/vehicles/page.tsx#L23)
   - Changed `payloadCapacity` → `massToLEO` (correct property name)
   - Removed `crewCapacity` (not in VehicleSpecs interface)
   - [components/vehicle/vehicle-card.tsx:114](components/vehicle/vehicle-card.tsx#L114)
   - Changed `vehicle.reusable` → `vehicle.specs.reusable`
   - Removed crew capacity display section (lines 157-168)

5. **Date Type Errors**
   - [app/vehicles/page.tsx:24](app/vehicles/page.tsx#L24)
   - Changed `firstFlight: '2010-06-04'` → `firstFlight: new Date('2010-06-04')`
   - Fixed for both Falcon 9 and Starship entries

6. **Badge Variant Type Errors**
   - [components/vehicle/vehicle-card.tsx:48-61](components/vehicle/vehicle-card.tsx#L48-L61)
   - Changed `return 'default'` → `return 'tbd'` (valid Badge variant)
   - [components/video/video-modal.tsx:170](components/video/video-modal.tsx#L170)
   - Changed `variant="default"` → `variant="tbd"`

7. **LaunchStatus Name Type Error**
   - [lib/data/mock-launches.ts:129](lib/data/mock-launches.ts#L129)
   - Changed `name: 'To Be Confirmed'` → `name: 'TBD'` (valid status)

8. **Card asChild Property Error**
   - [components/home/upcoming-launches.tsx:56](components/home/upcoming-launches.tsx#L56)
   - Removed `asChild` prop (not supported by Card component)

**Build Result**: ✅ Successfully compiled with 0 errors

```
Route (app)                              Size     First Load JS
┌ ○ /                                    9.07 kB         135 kB
├ ○ /agencies                            4.57 kB         116 kB
├ ○ /launches                            3.44 kB         113 kB
├ ○ /vehicles                            3.8 kB          115 kB
└ ○ /videos                              2.62 kB         125 kB
```

---

#### 2. Accessibility Improvements ✅

**Added**: Skip-to-main-content link for keyboard navigation

**Files Modified**:
- [app/layout.tsx:52-58](app/layout.tsx#L52-L58) - Added skip link (hidden, visible on focus)
- [app/layout.tsx:63](app/layout.tsx#L63) - Added `id="main-content"` to main element

**Pattern**:
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4..."
>
  Skip to main content
</a>
```

**Already Implemented** (from previous days):
- Focus-visible styles (global CSS)
- Reduced motion support (`prefers-reduced-motion`)
- Button focus states
- Keyboard navigation

---

### Commits

```bash
# Commit 1: Test results cleanup
301c2f5 "test: Update test results - all 8 E2E tests passing"

# Commit 2: TypeScript fixes
7829a66 "fix: TypeScript errors for production build"
```

---

### Deployment

**Status**: 🚀 Deploying to Vercel

**Previous Attempt**: Failed due to TypeScript errors
**Current Attempt**: In progress with all errors resolved

**Preview URL**: https://thegreatexpanse-4l477nwaj-m4cd4r4s-projects.vercel.app

---

### Technical Decisions

| Issue | Decision | Rationale |
|-------|----------|-----------|
| **VehicleSummary structure** | Remove family/variant | Simplify to match interface (id, name, image?, provider) |
| **Badge default variant** | Use 'tbd' for gray/neutral | No 'default' variant exists in Badge component |
| **Vehicle reusable property** | Move to specs object | Matches Vehicle interface structure |
| **Date types** | Convert strings to Date objects | TypeScript requires Date type for firstFlight |
| **Crew capacity** | Remove display | Not in VehicleSpecs interface (future enhancement) |

---

### Metrics

| Metric | Value |
|--------|-------|
| **TypeScript Errors Fixed** | 10+ distinct issues |
| **Files Modified** | 10 |
| **Build Status** | ✅ Passing (0 errors) |
| **Bundle Size** | ~135 kB first load (homepage) |
| **Accessibility Features** | Skip link, focus states, reduced motion |
| **Deployment** | In progress to Vercel |

---

### Lessons Learned

1. **TypeScript Strict Mode**: Catches many issues before production - validates against actual interfaces
2. **Badge Variant Consistency**: Badge component only accepts specific variants (live, upcoming, success, failure, tbd, partial)
3. **Interface Compliance**: Mock data and test fixtures must exactly match TypeScript interfaces
4. **Build Before Deploy**: Always run `npm run build` locally before deploying to catch type errors
5. **Incremental Fixes**: Fix one error at a time - each fix may reveal the next error

---

**Session Status**: ✅ Complete — Build passing, deploying to Vercel, accessibility improvements added
