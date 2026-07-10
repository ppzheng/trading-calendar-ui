---
name: add-trading-month
description: Add a new trading-calendar month while preserving all existing months, product rules, localization, mobile behavior, and calendar export.
---

# Add Trading Month

## Trigger

Use this skill when the task asks to add, register, validate, or update a trading-calendar month.

## Read first

- `AGENTS.md`
- `product/PRODUCT_RULES.md`
- `product/workflows/add-trading-month.md`
- `product/CURRENT_STATE.md`
- `data/tradingPlans.ts`
- Existing month data files under `data/`
- `lib/types.ts`
- `lib/trading-plan-context.tsx`
- Calendar and selector UI in `components/dashboard/`

## Steps

1. Confirm the supplied raw month data and date range.
2. Inspect existing month structure and registration pattern.
3. Validate complete daily coverage, duplicate dates, display dates, Ganzhi, signal type, advice, and localization fields.
4. Refuse to infer uncertain Ganzhi data.
5. Preserve all historical months.
6. Add the month using the existing data pattern.
7. Update `TradingPlanId`, `tradingPlans`, `tradingPlanOptions`, and any affected selectors.
8. Check Chinese and English output.
9. Verify desktop, mobile, and calendar export when affected.
10. Run `npm run lint` and `npm run build`.
11. Update `product/CURRENT_STATE.md` after validation.

## Forbidden

- Do not delete or overwrite existing months.
- Do not invent Ganzhi data.
- Do not silently change trading classifications.
- Do not remove Chinese or English support.
- Do not break mobile calendar behavior.
- Do not break calendar export.
- Do not add unrelated refactors or dependencies.

## Output

Report:

- Month added.
- Files changed.
- Date range and day count validation.
- Missing or duplicate dates, if any.
- Localization status.
- Export/mobile verification.
- Checks run.
- Product documents updated.
- Remaining risks or `To be confirmed` items.

