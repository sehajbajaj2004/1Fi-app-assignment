# 1Fi Marketplace

An SDE intern assignment: a fully-built **1Fi Marketplace** tab added to the existing
Shop page of the 1Fi app, alongside two intentionally-stubbed tabs (**Top Brands**,
**Nearby Stores**) that mirror the real app's chrome but carry no implementation, per
the assignment's scope.

Built with Expo (React Native + TypeScript) — runs on a phone via Expo Go, or in a
browser with zero install.

## Quick start

```bash
npm install
npx expo start
```

- **On your phone**: install the free **Expo Go** app (App Store / Play Store), make
  sure your phone and computer are on the same Wi-Fi, then scan the QR code the
  terminal prints (Android: use Expo Go's scanner; iPhone: use the regular Camera app).
  If you're on a network that blocks device-to-device traffic, use
  `npx expo start --tunnel` instead.
- **In a browser, no install**: `npx expo start --web`.

The app launches directly into the **Shop** tab, on the **1Fi Marketplace** sub-tab
(see [Assumptions](#assumptions) for why).

## What's here

- **Bottom nav**: Home, Shop, EMI Dues, Limit, Profile — only **Shop** is functional;
  the other four are simple placeholder screens.
- **Shop page**: a pill-switcher with three tabs.
  - **Top Brands** / **Nearby Stores** — intentional blank stubs (assignment scope
    says these need zero implementation). They keep the same chrome (heading,
    search bar, location chip) as the reference screenshots for visual consistency,
    with a "Coming soon" empty state where real content would go.
  - **1Fi Marketplace** — the actual deliverable: browse a mock catalog grouped by
    category, open a product, pick a variant, pick an EMI plan, and "check out" into
    a mocked order confirmation.

## Tech stack

- **Expo SDK 57** (React Native 0.86, React 19), TypeScript, `strict` mode
- **React Navigation** — bottom tabs (root) + native stack (Shop tab's internal flow:
  Marketplace list → Product detail → Order confirmation)
- **TanStack React Query** — data fetching, caching, loading/error states
- No backend — see [Data & the mock API layer](#data--the-mock-api-layer) below

## Project structure

```
app/
  components/
    ui/       Shared design-system primitives (SegmentedTabs, SearchBar, Badge,
              PrimaryButton, EmptyState, Skeleton)
    shop/     Marketplace-specific components (HeroBanner, ProductCard,
              VariantSelector, EMIPlanOption)
  screens/
    shop/     ShopScreen (hero + tabs + search) and its three tab contents,
              plus ProductDetailScreen and OrderConfirmationScreen
    stubs/    The four non-Shop bottom-nav placeholder screens
  navigation/ RootTabNavigator (5 tabs) + ShopStackNavigator (Shop's internal stack)
  data/
    mock/     products.json, emiPlans.json — the mock catalog
    api/      marketplaceApi.ts — async functions simulating a real backend
    hooks/    React Query hooks wrapping the API layer
  types/      Shared TypeScript types (Product, ProductVariant, EMIPlan, Category)
  theme/      Design tokens (colors, typography, spacing) extracted from the
              reference screenshots
assets/images/hero-banner.jpg   The provided "Shop today, pay later" banner,
                                 rendered as-is (not recreated in code)
```

## Data & the mock API layer

There's no real backend for this assignment, so `data/api/marketplaceApi.ts` stands
in for one: `getProducts`, `getCategories`, `getProductById`, and `getEmiPlans` are
all `async` functions with **400–800ms simulated latency**, so every screen exercises
real loading states rather than data just appearing instantly.

**To test the error states on demand**, open the Marketplace tab and flip the
**"Simulate error (dev only)"** switch at the bottom of the product list (only visible
in development — gone in a production build). It fails `getProducts`/`getCategories`
immediately and refetches, so you see the error + Retry state right away; flip it back
off to see recovery, also immediate.

EMI math (`computeEmiPlans`) is a pure function shared by the async `getEmiPlans`
endpoint and by `ProductCard`'s synchronous "EMI from ₹X/mo" teaser — one formula, so
the number on the listing card always matches what the detail screen computes for the
same variant.

## Assumptions

The assignment brief referenced "reference screens/content" that wasn't attached, and
this was built without access to 1Fi's real source code. Concretely:

1. **No real source code.** This is a from-scratch build, visually and behaviorally
   matched to two reference screenshots of the live Shop page (Top Brands tab, Nearby
   Stores tab) provided alongside the brief — not a reimplementation of the actual
   1Fi codebase. Design tokens (`theme/colors.ts`, `typography.ts`) were extracted by
   eye from those screenshots.
2. **Hero banner is the real provided asset**, dropped in as-is at
   `assets/images/hero-banner.jpg` and rendered full-width via `resizeMode="cover"` —
   not a gradient/headline/illustration recreated in code.
3. **Product/EMI data is mocked**, since no real catalog or EMI dataset was provided.
   `data/mock/products.json` defines 8 products across 3 categories (Mobiles &
   Laptops, Two-Wheelers, Cars) echoing the hero banner's own imagery, with 1–3
   variants each; `data/mock/emiPlans.json` defines 3/6/12-month tenure rules (3 & 6
   months no-cost, 12 months at a flat 8% for the non-no-cost case).
4. **No real product photography.** Each product renders an icon tile (an Ionicons
   glyph appropriate to the product, e.g. a phone, laptop, bike, or car icon) instead
   of a photo — there was no image asset source to pull real product photos from.
5. **Marketplace is the default sub-tab on launch**, not Nearby Stores (what the
   reference screenshots show as selected). Since Marketplace is the actual built
   deliverable, it made more sense to land there directly rather than require an
   extra tap to see the real feature.
6. **Checkout is fully mocked.** "Proceed with this plan" simulates a brief loading
   state and lands on a confirmation screen with a generated reference number — there
   is no real payment/checkout backend, and the assignment doesn't call for one.

## Evaluation criteria — self-check

| Criterion | Where it's addressed |
|---|---|
| Product understanding | 3-tab Shop structure, stubs-vs-built split, and EMI framing all match what the assignment and reference screenshots describe |
| UI/UX consistency | Shared design tokens + UI kit (`components/ui`) used identically across stub tabs and the built Marketplace tab; real provided hero asset, not a recreation |
| Engineering quality | Typed end-to-end (`strict`, `noUnusedLocals`/`noUnusedParameters`), no hardcoded product/EMI values in components — everything flows through hooks, single source of truth for EMI math |
| Functionality | Full browse → detail → variant → EMI plan → checkout → confirmation flow, plus 4 stub bottom-nav screens |
| Data/API implementation | Simulated-latency async API layer + React Query, with an on-demand failure toggle for QA of error states |
| Attention to detail | Loading/empty/error states everywhere data is fetched (not just the happy path); responsive layout verified with no horizontal overflow at 375/768/1280px widths |

## Known limitations

- Top Brands and Nearby Stores search bars are visually present but non-functional
  (`editable={false}`), per the assignment's stub scope.
- No global state management beyond React Query's cache — not needed at this scope
  (EMI plan selection is local `useState` in `ProductDetailScreen`, as the assignment
  suggests).
- No automated tests. Given the time box, verification was done by hand (typecheck +
  manual click-through of every flow, including error/retry and responsive checks)
  rather than a test suite.
