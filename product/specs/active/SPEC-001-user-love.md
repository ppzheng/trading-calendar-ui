# SPEC-001: v1.1_7m 7月交易用户喜爱度调整

Status: Approved

## Background

The current product is a personalized trading calendar dashboard with month selection, monthly overview, daily trading calendar, monthly analysis, Bazi analysis, Five Elements analysis, Chinese/English mode, mobile horizontal calendar scrolling, and calendar export.

The requested version, `v1.1_7m 7月交易用户喜爱度调整`, is a UI/UX and user-guidance improvement for the current-month trading experience, with July 2026 as the immediate target month based on the current registered data and the user's confirmed requirements. The request focuses on clearer layout and visual hierarchy, fewer unnecessary steps, stronger interaction feedback, mobile optimization, more intuitive navigation, and better onboarding.

This spec is based on the current repository implementation and product documents. It is not approved for implementation until the product owner confirms scope.

## User problem

Users enter the page without a clear first-step guide. They may see multiple dense sections at once, but not immediately understand:

- What the page is for.
- Which month is currently selected.
- What the most important July trading guidance is.
- Which action they should take next.
- How to interpret signal types before trusting the daily advice.

Evidence from current code:

- `app/page.tsx` starts with `Header`, then `MonthlyIndicators`, `TradingCalendar`, and `BottomSection`; there is no dedicated first-screen guidance or task-oriented summary.
- `lib/trading-plan-context.tsx` defaults to `may-2026`, not the user's current local month.
- `TradingCalendar.tsx` has a hardcoded `TODAY_STR = "2026-05-12"`, so today highlighting does not adapt to July or the selected month.
- Calendar export has a loading/disabled state, but general onboarding, guidance, and error/success feedback are limited.

## Objective

Improve first-time comprehension and task completion for the current-month trading calendar without changing approved trading data or classifications.

Success should be measured by whether a user can quickly answer:

- Which month am I viewing?
- What is the current month’s core trading posture?
- What are the next 1-3 actions I should take?
- Which dates are best opportunities and which are high-risk?
- How do I switch months, inspect details, and export the calendar?

## Scope

- [ ] Default to the registered trading plan that contains the user's real local date when a matching plan exists.
- [ ] Add a clear first-screen orientation for the selected/current month, with special copy and priority tuned for July 2026 when `july-2026` is selected.
- [ ] Make the selected month, period, cycle Ganzhi, and current state easier to identify above the calendar.
- [ ] Provide a concise “next steps” path in this priority: view today/current focus -> view best windows -> view risk days.
- [ ] Summarize the current month using existing approved plan fields, such as monthly theme, summary points, best windows, high-risk dates, and strategy guidance.
- [ ] Improve visual hierarchy so core guidance, high-risk dates, best windows, and export are easier to scan.
- [ ] Improve interaction feedback for key actions already present in the app, especially month switching, calendar export, modal opening/closing, and mobile calendar scrolling.
- [ ] Add or refine lightweight onboarding hints for new users without adding a separate tutorial flow.
- [ ] Improve mobile readability and navigation for the current dashboard layout.
- [ ] Preserve all existing months, trading classifications, locale support, and export behavior.
- [ ] Ensure new visible product copy is available in Chinese and English.

## Out of scope

- [ ] Changing July trading data, Ganzhi values, daily classifications, advice, best windows, or high-risk dates.
- [ ] Adding a new trading month.
- [ ] Changing the Five Elements or Ganzhi classification rules.
- [ ] Adding authentication, saved onboarding state, backend services, or analytics.
- [ ] Adding live market data or real event calendar integrations.
- [ ] Replacing the current React context state architecture.
- [ ] Replacing the entire dashboard with a new app shell.
- [ ] Removing Chinese or English support.
- [ ] Removing or weakening calendar export.
- [ ] Enhancing or expanding the disclaimer; the product owner confirmed this is not needed for this version.

## Current behavior

Current implemented capabilities:

- `Header.tsx` shows title, period, month selector, personal badges, Bazi/Five Elements modal buttons, language toggle, and PRO badge.
- `MonthlyIndicators.tsx` shows monthly overview, signal indicators, signal distribution, and radar chart.
- `TradingCalendar.tsx` shows the daily calendar, signal legend on desktop, mobile horizontal scrolling, and a calendar export button.
- `BottomSection.tsx` shows best trading windows, high-risk days, monthly suggestions, suitable strategies, and behaviors to avoid.
- `DestinyModal.tsx` and `FiveElementsModal.tsx` provide supporting personal analysis.
- `data/tradingPlans.ts` registers `may-2026`, `july-2026`, and `august-2026`.

Current limitations relevant to this request:

- There is no dedicated “what to do next” first-screen section.
- The page presents several dense information areas before guiding the user through a core workflow.
- July exists as a selectable month but is not selected by local-date matching.
- Today highlighting is hardcoded to May in `TradingCalendar.tsx`; July users may not see a meaningful current-day signal.
- Desktop legend tooltips explain signal types, but mobile users rely mainly on compact labels and native title behavior is not visible on touch devices.
- Calendar export handles popup-blocking with an alert, but broader success/error feedback is not standardized.
- Some July/August English-mode fields may fall back to Chinese due to `makeText(value)` behavior in `data/tradingPlans.ts`.

## Proposed behavior

After approval, the product should introduce a current-month usability layer on top of the existing dashboard:

1. Default month selection should use the user's real local date:
   - If the local date falls inside a registered plan period, select that plan by default.
   - If the local date does not fall inside any registered plan period, use a clearly defined fallback plan and label the state.
   - Manual month selection should still override the default during the session.
2. A concise first-screen orientation area that answers:
   - Current selected month.
   - Month period and cycle Ganzhi.
   - Current month summary.
   - Core July posture when July is selected.
   - Main risk reminder.
   - Primary next action.
3. A simple guided action path in the confirmed priority order:
   - Check today/current focus.
   - Review best windows.
   - Review high-risk days.
4. Current-month summary:
   - For July, summarize from existing July data: July has heavier earth energy and more risk points; trend days can be traded actively, while adjustment days should reduce position size and frequency.
   - Summaries must be derived from existing plan fields and must not introduce new trading rules.
   - If a month lacks enough approved content for a summary, show a conservative fallback and mark missing product copy as `To be confirmed`.
5. Clearer visual hierarchy:
   - High-risk content should be more prominent than low-priority decorative content.
   - Best windows and risk days should be scannable before the full calendar if the final design chooses that order.
   - The calendar should remain available as the central verification surface.
6. Mobile-first guidance:
   - Month selector and key actions remain visible and easy to use.
   - Calendar scrolling should be clearly discoverable.
   - Signal meanings should be accessible on touch devices.
7. Better feedback:
   - Export loading state remains visible and should communicate success/failure where feasible.
   - Month switching should make the selected month change obvious.
   - Empty, blocked, or popup-blocked export states should provide clear next steps.

This spec does not require a specific component architecture. Implementation should prefer small changes to existing dashboard components unless a new focused component clearly reduces complexity.

## User flow

1. User opens the dashboard.
2. App reads the user's local date and selects the registered plan that contains that date when possible.
3. User immediately sees the selected/current month, date range, cycle Ganzhi, and a concise summary of what matters now.
4. User sees suggested next actions and can choose one:
   - Inspect today/current focus.
   - Review best trading windows.
   - Check high-risk days.
5. User switches to another month if needed.
6. Page visibly updates to the selected month context.
7. User reads risk and opportunity highlights.
8. User reviews the calendar for day-by-day guidance.
9. User exports the calendar if useful.

## UI requirements

- [ ] First-screen content must make selected month and key action visible on desktop and mobile.
- [ ] Today's/current focus must use the user's real local date, not a hardcoded date.
- [ ] If the real local date is outside all registered plan ranges, the UI must explain the fallback state.
- [ ] The UI must not rely on hover-only explanations for core signal understanding.
- [ ] Risk days must stay visually distinct and warning-worthy.
- [ ] Navigation or guidance labels must be concise and not add a tutorial-heavy experience.
- [ ] Month selector must remain discoverable.
- [ ] Language toggle must remain accessible.
- [ ] Calendar export button must remain available.
- [ ] Mobile layout must avoid overlapping text, hidden primary controls, and unclear horizontal scrolling.
- [ ] New copy must support `zh` and `en`.
- [ ] Visual updates must preserve existing signal colors and labels unless separately approved.

## Business rules

- [ ] Do not modify July daily Ganzhi values.
- [ ] Do not modify July trading classifications.
- [ ] Do not modify existing trading day type names: `trend`, `follow`, `adjust`, `risk`.
- [ ] Do not delete or overwrite existing months.
- [ ] Default month detection must preserve manual month switching.
- [ ] Current-month summaries must use existing approved plan content and must not infer new Ganzhi or classification rules.
- [ ] Preserve Chinese and English modes.
- [ ] Preserve calendar export content: date, Ganzhi, signal labels, advice, legend/counts, period, and cycle context.
- [ ] Do not introduce unsupported financial-advice claims.
- [ ] Any guidance must frame the calendar as planning/reference content, not trade execution advice.

## Edge cases

- [ ] User's local date falls inside July 2026; `july-2026` should be selected by default.
- [ ] User's local date falls inside May or August; the matching registered month should be selected by default.
- [ ] User's local date falls outside all registered plan ranges; the app needs a defined fallback state.
- [ ] User switches between May, July, and August; guidance must update or clearly remain generic when not July.
- [ ] July date range spans July and August dates (`2026/7/7 — 2026/8/6`).
- [ ] Mobile user cannot hover signal tooltips.
- [ ] Export popup is blocked.
- [ ] Export is triggered while already generating.
- [ ] English mode displays untranslated July content if the source data lacks approved English copy.
- [ ] Real current date is outside the selected plan date range after a manual month switch.

## Dependencies

- [x] Product owner confirmed default month should use the user's real local date and show the matching current month when available.
- [x] Product owner confirmed the first-screen action priority: today/current focus -> best windows -> risk days.
- [x] Product owner confirmed today's focus should use the user's real local date.
- [x] Product owner confirmed disclaimer enhancement is not needed for this version.
- [ ] Product owner confirmation of final Chinese and English onboarding/guidance copy, unless implementation uses copy derived directly from existing approved plan fields.
- [ ] Design decision on whether to add a new first-screen summary component or reshape existing `MonthlyIndicators`.
- [ ] Product decision for fallback behavior when local date is outside all registered month ranges.
- [ ] QA access to desktop and mobile viewport checks.
- [ ] Export behavior verification after any UI/layout changes that affect calendar context.

## Acceptance criteria

- [ ] Spec remains `Draft` until explicitly approved.
- [ ] User can identify selected month, period, and cycle Ganzhi without scanning multiple sections.
- [ ] Default selected month matches the user's local date when that date falls inside a registered plan range.
- [ ] Today's/current focus uses the user's local date and no hardcoded May date remains in affected UI.
- [ ] User can identify the recommended next actions within the first screen in this order: today/current focus, best windows, risk days.
- [ ] Current-month summary is displayed using existing plan data and does not add unapproved trading rules.
- [ ] July high-risk days and best windows are easier to find than in the current layout.
- [ ] Signal type meanings are understandable on mobile without hover.
- [ ] Existing months remain selectable.
- [ ] Existing day classifications and advice remain unchanged.
- [ ] Chinese and English modes remain usable for all new visible text.
- [ ] Calendar export still works for the selected month and locale.
- [ ] Mobile layout remains readable and primary controls are accessible.
- [ ] Popup-blocked export state gives the user an understandable recovery path.

## Affected files

Likely affected if this Draft is approved:

- `app/page.tsx`
- `components/dashboard/Header.tsx`
- `components/dashboard/MonthlyIndicators.tsx`
- `components/dashboard/TradingCalendar.tsx`
- `components/dashboard/BottomSection.tsx`
- `lib/trading-plan-context.tsx`
- `lib/locale.tsx`
- `data/tradingPlans.ts`
- `app/globals.css`

Product documents likely affected after implementation:

- `product/CURRENT_STATE.md`
- This spec file
- A future sprint under `product/sprints/active/`

## Risks

- Increasing guidance may add information burden if it becomes another dense section.
- July-specific UX may confuse users viewing May or August unless the design clearly adapts to selected month.
- Changing default month from static `may-2026` to local-date matching affects current behavior and must be implemented carefully.
- Mobile improvements could break existing horizontal calendar behavior if not tested carefully.
- Signal explanations that oversimplify the rules may reduce trust or imply unsupported derivation logic.
- Feedback copy around trading guidance could be interpreted as financial advice if not carefully framed.
- Current-month summary could become misleading if it paraphrases beyond existing approved plan fields.

## Open questions

- Confirmed: default month should be based on the user's real local date and matching registered plan range.
- Confirmed: first-screen action priority is today/current focus, best windows, risk days.
- Confirmed: today/current focus should use the user's real local date.
- Confirmed: disclaimer enhancement is out of scope for this version.
- Should current-month summary copy be manually approved, or may implementation summarize from existing monthly theme, summary points, best windows, risk windows, and strategy fields?
- Should the first-screen summary be a new component or a redesign of `MonthlyIndicators`?
- Should the export flow show success confirmation after `window.print()`, or only handle generating/popup-blocked states?
- What should the fallback be when the user's local date is outside all registered month ranges?
- After manual month switching, should the today/current focus disappear, show nearest selected-month date, or show “today is outside this month”?

## Current implementation relationship

Current already implemented:

- Month selector.
- July plan data and calendar.
- Monthly overview.
- Daily calendar.
- Best windows and risk days.
- Chinese/English mode.
- Export loading state and popup-block alert.
- Mobile horizontal calendar scroll.

New capabilities proposed:

- First-screen orientation and guided next steps.
- Stronger July-focused visual hierarchy.
- Local-date-based default month selection.
- Real-local-date today/current focus.
- Current-month summary from existing plan data.
- Touch-friendly signal explanation.
- Clearer feedback for key actions.
- Mobile-first discoverability improvements.

Old functionality that may be affected:

- Month selection and default selected month.
- Calendar layout and horizontal scrolling.
- Signal legend/tooltips.
- Calendar export.
- Monthly overview and analysis section ordering.
- Chinese and English visible copy.

Unable to confirm:

- Whether July English copy is approved or should be rewritten.
- Whether onboarding should persist, be dismissible, or always visible.
- Fallback behavior when the user's local date is outside all registered month ranges.

## User Love Review

### User goal

The user wants to quickly understand the current trading month based on their real local date, know what matters most today, and decide what to inspect next without learning the entire dashboard first.

### Current experience

The current dashboard has useful data, but the user must infer the workflow from separate sections: header, monthly overview, full calendar, and monthly analysis. The page explains what each module contains, but not the recommended path through the product.

### Strengths

- The product already has the necessary raw surfaces: monthly overview, daily calendar, risk days, best windows, and export.
- Risk and signal colors are already consistent.
- Month switching and language switching exist.
- Export already has a generating state and popup-block fallback.
- Mobile calendar scrolling is implemented.

### Friction

- No clear “start here” moment.
- The current default month is static rather than based on the user's local date.
- Core risk and opportunity guidance may appear below broader overview content.
- Mobile users cannot rely on hover explanations.
- Today/current focus is hardcoded to a May date.
- Users may not know whether to read the radar, calendar, risk cards, or suggestions first.

### Trust risks

- Static current-day behavior can make guidance feel stale or incorrect.
- Untranslated English fallback for July/August can reduce confidence in English mode.
- Overly broad onboarding language may feel generic and dilute the personal trading guidance.
- If new guidance implies rule derivation that is not documented, trust may decrease.

### Aha moment

The target aha moment is: “The app opened to my current trading month, I can see today/current focus, and I know whether to inspect best windows or risk days next.”

### Retention value

Higher retention should come from faster repeat use: users return to check current focus, best windows, risk dates, and export the calendar without re-learning the dashboard.

### Recommendations

- Start with a compact July/month focus panel rather than a long tutorial.
- Prioritize the confirmed action sequence: today/current focus, best windows, risk days.
- Make risk days and best windows directly reachable from the top area.
- Add touch-friendly signal explanations.
- Use the user's real local date for current-day behavior.
- Summarize the current month from existing plan content, without adding new rules.
- Keep the full calendar central; do not hide or replace it.

### Priority

High for local-date default selection, real-date current focus, first-screen orientation, mobile signal explanation, selected-month clarity, and risk/window discoverability.

Medium for export success feedback and broader interaction feedback.

Low until confirmed for persistent onboarding, saved preferences, or major navigation restructuring.

### Evidence

- `app/page.tsx` renders dashboard sections without a dedicated guidance component.
- `Header.tsx` contains month and language controls but no guided workflow.
- `MonthlyIndicators.tsx` contains overview metrics but not task-oriented next steps.
- `TradingCalendar.tsx` has desktop legend tooltips, mobile calendar scrolling, and export state.
- `BottomSection.tsx` contains best windows and risk days after the calendar.
- `lib/trading-plan-context.tsx` defaults to `may-2026`.
- Product owner confirmed local-date matching should replace the static default behavior after approval.

### Assumptions

- The target user is the individual trader described in `product/USERS.md`.
- The main user pain is comprehension and next-step uncertainty, not incorrect trading data.
- The product owner wants a current-month UX improvement and has approved local-date-based default selection, real-date today/current focus, and the first-screen action priority.
