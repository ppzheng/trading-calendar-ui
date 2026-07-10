# Current State

Last updated: 2026-07-10

## Completed

- Next.js single-page dashboard at `app/page.tsx`.
- App-level providers for locale and selected trading plan in `app/layout.tsx`.
- Default locale state is `zh` in `lib/locale.tsx`.
- Selected trading plan state is managed in `lib/trading-plan-context.tsx`; the first render uses a stable `may-2026` value, then the browser local date selects the matching registered plan or the nearest registered plan unless the user manually switches months.
- Header with month selector, selected-month feedback, language toggle, personal profile badges, current cycle Ganzhi badge, Bazi modal trigger, and Five Elements modal trigger.
- Current focus panel with selected month, date range, cycle Ganzhi, today/current focus, monthly summary chips, risk reminder, and quick links to current focus, best trading windows, and high-risk days.
- Monthly overview with theme, highlights, risks, signal bars, signal distribution, and radar chart.
- Calendar grid with daily Ganzhi, signal label, advice, and local-date today highlighting only when today exists in the selected plan.
- Calendar grid supports horizontal scrolling on small screens and includes a mobile signal guide.
- Calendar export button opens a print-ready HTML document for the selected plan and locale, with generating and error feedback.
- Monthly analysis section for best windows, high-risk days, suggestions, suitable strategies, and behaviors to avoid; best-window and high-risk sections have stable anchors for quick navigation.
- Personal Bazi analysis modal.
- Five Elements analysis modal.
- Chinese and English UI mode for implemented dashboard content.

## Current months

Registered trading plan IDs in `data/tradingPlans.ts`:

- `may-2026`: period `2026/5/5 — 2026/6/4`, cycle `癸巳`, 31 calendar days.
- `july-2026`: period `2026/7/7 — 2026/8/6`, cycle `乙未`, 31 calendar days.
- `august-2026`: period `2026/8/7 — 2026/9/6`, cycle `丙申`, 31 calendar days.

Implementation notes:

- May 2026 is defined in `data/tradingPlanMay2026.ts` with explicit Chinese and English text.
- July 2026 and August 2026 are defined as `TradingMonthInput` values in `data/tradingPlans.ts` and converted through `makePlan`.
- The July and August conversion uses Chinese source strings for many fields and `makeText(value)` defaults English to the same value when no English string is supplied.

## Technical architecture

- Framework: Next.js 16 with React 19.
- Styling: Tailwind CSS 4, shadcn CSS import, custom global CSS variables in `app/globals.css`.
- State: React context for locale and selected trading plan.
- Data: static TypeScript modules under `data/` and `lib/mock-data.ts`.
- Types: shared domain types in `lib/types.ts`; `types/dom-to-image-more.d.ts` declares the `dom-to-image-more` module.
- Build config: `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`.

## Main pages and components

Current main page composition:

- `Header`
- `CurrentFocusPanel`
- `MonthlyIndicators`
- `TradingCalendar`
- `BottomSection`

Additional dashboard components in repository:

- `DestinyModal`
- `FiveElementsModal`
- `CalendarExportView`
- `StatsBar`
- `MarketTicker`
- `EventPanel`
- `Sidebar`

Usage status:

- `DestinyModal` and `FiveElementsModal` are used from `Header`.
- `CalendarExportView`, `StatsBar`, `MarketTicker`, `EventPanel`, and `Sidebar` exist in the repository but are not referenced by the current main page.

## Language support

- Supported locale type: `zh | en`.
- Header, monthly overview, trading calendar, monthly analysis, Bazi modal, and Five Elements modal use locale state.
- To be confirmed: whether every July and August field has product-approved English copy, because many generated fields currently fall back to Chinese text in English mode.

## Export capability

- `TradingCalendar.tsx` implements export with `window.open`, writes a print-ready HTML document, and calls `window.print()`.
- The export includes title, period, cycle Ganzhi, legend counts, weekday header, daily cells, and a footer stating it is for reference and not investment advice.
- `CalendarExportView.tsx` contains an off-screen export component, but it is not currently wired into the main page.
- `dom-to-image-more` is installed and declared, but no current code import was found during audit.

## Known issues and risks

- `EventPanel.tsx` contains hardcoded May 2026 date references, but `EventPanel` is not referenced by the current main page.
- Some repository components and mock data appear unused in the current page.
- English mode for generated July/August content may show Chinese strings for fields that were not explicitly translated.
- Ganzhi and Five Elements derivation rules are not fully documented in code; do not infer new data from existing examples.

## In progress

- `SPRINT-001: User Love v1.1 — July Current Focus` is active under `product/sprints/active/SPRINT-001-user-love-v1.1-7m.md`.

## Approved but not developed

- To be confirmed. No additional approved specs beyond the active user-love sprint are documented.
