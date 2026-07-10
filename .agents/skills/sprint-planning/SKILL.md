---
name: sprint-planning
description: Break an approved product specification into an executable sprint plan without modifying business code.
---

# Sprint Planning

## Trigger

Use this skill when the task asks to create, update, or break down a sprint from a product specification.

## Read first

- `AGENTS.md`
- `product/PRODUCT.md`
- `product/CURRENT_STATE.md`
- `product/PRODUCT_RULES.md`
- Relevant approved spec under `product/specs/`
- `product/sprints/SPRINT_TEMPLATE.md`

## Steps

1. Confirm the related spec is `Approved`, or that the product owner explicitly approved it.
2. Read the spec and current product state.
3. Use `product/sprints/SPRINT_TEMPLATE.md`.
4. Split work into Product, Design, Frontend, Data, Localization, and QA tasks.
5. Give every task a concrete artifact.
6. Mark dependencies, risks, and Definition of done.
7. Save or update the sprint under `product/sprints/`.

## Forbidden

- Do not create implementation tasks from vague requirements.
- Do not treat Draft specs as approved.
- Do not modify business code by default.
- Do not omit QA, localization, or data tasks when affected.
- Do not hide dependencies or unresolved risks.

## Output

Report:

- Sprint file created or updated.
- Related spec and approval basis.
- Sprint goal.
- Task groups created.
- Dependencies.
- Risks.
- Definition of done.

