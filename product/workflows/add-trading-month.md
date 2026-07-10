# Workflow: Add Trading Month

Use this workflow when adding a new trading-calendar month.

## Steps

1. Read `product/PRODUCT_RULES.md`.
2. Review the user-provided raw month data.
3. Validate the stated date range.
4. Check for missing dates and duplicate dates.
5. Check every day for ISO date, display date, Ganzhi, type/classification, advice, and Chinese/English fields.
6. Inspect current type definitions, plan shape, existing month data, registries, and selectors.
7. Preserve all historical months.
8. Add the new month data using the existing repository pattern.
9. Update required registrations and selectors, including `TradingPlanId`, `tradingPlans`, and `tradingPlanOptions`.
10. Verify desktop, mobile, Chinese mode, English mode, and calendar export when UI or data is affected.
11. Run `npm run lint` and `npm run build` after code/data changes.
12. Update `product/CURRENT_STATE.md` with the new completed month only after verification.

## Forbidden

- Do not delete existing months.
- Do not overwrite historical calendar data.
- Do not infer uncertain Ganzhi data.
- Do not silently change existing classifications.
- Do not remove Chinese or English support.
- Do not break mobile calendar behavior.
- Do not break calendar export.
- Do not update `CURRENT_STATE.md` as completed before validation passes.

## Completion standard

- New month has complete, unique daily coverage for the approved date range.
- Existing months remain selectable.
- Daily entries render correctly.
- Chinese and English modes are usable.
- Calendar export includes the new month correctly.
- Lint and build results are recorded.
- Product state is updated.

