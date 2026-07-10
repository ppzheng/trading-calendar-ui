# Product Rules

## Trading day types

The implemented signal types are defined in `lib/types.ts`:

- `trend`: 趋势日 / Trend Day
- `follow`: 顺势日 / Follow Day
- `adjust`: 调整日 / Adjust Day
- `risk`: 风险日 / Risk Day

In `data/tradingPlans.ts`, `TradingMonthInput.signal` maps as follows:

- `trend` -> `trend`
- `normal` -> `follow`
- `adjustment` -> `adjust`
- `risk` -> `risk`

## Month data format

Registered plans must provide, directly or through conversion:

- Stable plan ID.
- Month label and selector label.
- Cycle Ganzhi.
- Period/date range.
- Monthly theme, highlights, and risks.
- Calendar array of daily entries.
- Best windows.
- Risk windows.
- Suitable and unsuitable strategies/behaviors.
- Summary, radar data, signal bars, and suggestions.

Each calendar day must include:

- `date`: ISO date string.
- `displayDate`: short display date.
- `ganzhi`: Ganzhi string.
- `type`: one of `trend`, `follow`, `adjust`, `risk`.
- `advice`: Chinese and English text object.

## Historical months

- New month work must preserve all existing registered months.
- Do not delete, overwrite, or silently reorder historical month data unless explicitly approved.
- Month registration must keep `tradingPlans`, `tradingPlanOptions`, and `TradingPlanId` aligned.

## Date integrity

- Dates in a month must be unique.
- Dates must cover the stated period without missing days.
- Display dates must match ISO dates.
- Date ranges must be validated before data is accepted.

## Ganzhi and classification rules

- Do not invent or infer uncertain Ganzhi data.
- Use only user-provided, approved, or otherwise verified Ganzhi data.
- Do not silently change trading classifications.
- If classification logic is not fully documented for a month, mark it as `To be confirmed`.

Verified from current code and data:

- Current product content repeatedly states `喜木火，忌土`.
- Current product content states `天干见戊己，降为调整日`.
- Current product content states `未、戌火土燥化，优先判为风险`.
- Five Elements content identifies `火土燥化` as a high-risk emotional trading state.

To be confirmed:

- Full authoritative Five Elements classification system.
- Full rule set for every stem/branch combination.
- Whether all current July and August classifications were product-approved outside code.

## Localization

- Chinese and English support must be preserved.
- New visible product text must provide both `zh` and `en` unless the field is intentionally locale-neutral.
- Do not rely on Chinese fallback in English mode for approved production content unless explicitly accepted.

## Registration and selectors

When adding a month, update all required places:

- Month data module or `TradingMonthInput`.
- `TradingPlanId`.
- `tradingPlans`.
- `tradingPlanOptions`.
- Any default selected plan only with explicit product approval.
- Product state documents after validation.

## Mobile compatibility

- Do not break small-screen header controls.
- Preserve calendar horizontal scrolling behavior.
- Verify day cards remain readable on mobile.
- Avoid UI changes that hide month selection, language switching, risk labels, or export controls on mobile.

## Calendar export protection

- Export must reflect the selected month and selected locale.
- Export must include daily dates, Ganzhi, signal labels, advice, legend/counts, and period/cycle context.
- Do not remove the export footer disclaimer without approval.
- Changes to calendar layout, labels, or data structures must check export output.

## Backward compatibility

- Existing plan IDs must remain stable unless a migration is approved.
- Existing signal type names must remain stable unless all consuming UI and data are updated.
- Existing Chinese and English locale keys must remain supported.
- Existing months must remain selectable after new month or UI work.

