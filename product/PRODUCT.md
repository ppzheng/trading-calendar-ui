# Product

## Product definition

This product is a personalized trading calendar dashboard. It presents monthly and daily trading guidance based on Ganzhi and Five Elements content stored in the repository.

The current application is a Next.js single-page dashboard at `app/page.tsx`. It combines a monthly overview, daily signal calendar, monthly analysis cards, personal Bazi analysis, Five Elements analysis, month selection, locale switching, and calendar export.

## Core user value

- Help a user review a trading month through daily signal classifications, Ganzhi labels, and short trading advice.
- Surface high-risk days and preferred trading windows before the user trades.
- Keep personal Bazi and Five Elements context available alongside the calendar.
- Allow the visible trading calendar to be exported for offline review or sharing.

## Current feature scope

Completed in current code:

- Monthly trading calendar for registered months.
- Daily entries with ISO date, display date, Ganzhi, signal type, and trading advice.
- Four trading day classifications: trend, follow, adjust, risk.
- Monthly overview with theme, highlights, risks, signal indicators, signal distribution, and radar chart.
- Monthly analysis with best windows, high-risk days, monthly suggestions, suitable strategies, and behaviors to avoid.
- Month selector for registered plans.
- Chinese and English UI mode.
- Personal Bazi analysis modal.
- Five Elements analysis modal.
- Mobile-compatible calendar viewing through horizontal scrolling.
- Calendar export through a print/new-window HTML export flow in `TradingCalendar.tsx`.

## Current out of scope

Not confirmed as completed in current code:

- User accounts, authentication, saved preferences, or cloud sync.
- Live market data.
- Live economic/event calendar integration.
- Backend API or database.
- Trading execution, brokerage integration, alerts, or notifications.
- Dynamic generation or verification of Ganzhi data.
- Automated investment advice or portfolio management.
- A formal disclaimer page beyond the export footer text.

## Main modules

- App shell: `app/layout.tsx`, `app/page.tsx`.
- State: `lib/locale.tsx`, `lib/trading-plan-context.tsx`.
- Trading data: `data/tradingPlanMay2026.ts`, `data/tradingPlans.ts`.
- Personal analysis data: `data/analysisData.ts`.
- Dashboard UI: `components/dashboard/Header.tsx`, `MonthlyIndicators.tsx`, `TradingCalendar.tsx`, `BottomSection.tsx`, `DestinyModal.tsx`, `FiveElementsModal.tsx`.
- Reusable UI primitives: `components/ui/`.
- Shared types and helpers: `lib/types.ts`, `lib/utils.ts`.

## Success standards

- A user can identify the selected month, date range, daily signal distribution, best windows, and high-risk dates.
- Every supported day has a date, display date, Ganzhi, classification, and advice.
- Month switching keeps existing months available.
- Chinese and English modes remain usable.
- Mobile users can inspect the calendar without layout breakage.
- Calendar export preserves the selected month, locale, day classifications, advice, and risk labels.

