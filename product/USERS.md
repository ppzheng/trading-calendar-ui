# Users

## Primary user

Assumption: the primary user is an individual trader who uses personalized Bazi, Ganzhi, and Five Elements context to plan discretionary trading behavior.

Evidence from code:

- Personal profile data is hardcoded for a Ding Fire, fire-dominant, high-aggression trading persona.
- The interface emphasizes trading windows, risk days, emotional risk, and behaviors to avoid.
- The application supports Chinese and English UI text.

## Use cases

- Review the current registered trading month before planning trades.
- Check whether a specific day is trend, follow, adjust, or risk.
- Identify high-risk days that require lower frequency, lower size, or avoidance.
- Review best trading windows for trend or momentum strategies.
- Read personal Bazi and Five Elements context to understand trading behavior risks.
- Export a selected month calendar for reference.

## Core tasks

- Select a month from the month selector.
- Switch between Chinese and English.
- Scan the monthly overview and signal distribution.
- Inspect daily calendar cards.
- Read best windows, high-risk days, and monthly suggestions.
- Open Bazi or Five Elements analysis modals.
- Export the calendar.

## User expectations

- The month selector shows all available months.
- Daily signal labels are consistent across calendar, legend, and analysis.
- Risk days are visually distinct and easy to notice.
- Advice is concise enough for scanning.
- The mobile calendar remains readable even when horizontally scrollable.
- Export output matches the selected month and language.

## Pain points

Assumptions to validate:

- Users may not understand how trading classifications are derived.
- Users may need stronger clarity about whether guidance is personal planning, not investment advice.
- Users may struggle to trust generated or fallback English text if it is not fully localized.
- Users may need today/current-date behavior to match the selected month instead of static dates.

## Usage limits

- Current data is static and repository-defined.
- Current market/event mock data exists in `lib/mock-data.ts`, but related market/event components are not part of the current main page.
- The product does not execute trades.
- The product does not fetch live prices.
- The product does not validate future Ganzhi data automatically.
- The product should be treated as planning/reference content, not financial advice.

