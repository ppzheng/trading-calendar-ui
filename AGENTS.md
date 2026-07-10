# Trading Calendar Repository Instructions

## Project purpose

This repository contains a personalized trading calendar product.

The product presents monthly and daily trading guidance based on approved Ganzhi and Five Elements analysis.

Core capabilities include:

* Monthly trading calendar
* Daily trading classifications
* Daily trading recommendations
* Monthly analysis and risk windows
* Chinese and English content
* Calendar image export

## Product source of truth

Product documentation is stored under `product/`.

Before product, UI, trading-data, or feature work, read the relevant files in this order:

1. `product/PRODUCT.md`
2. `product/USERS.md`
3. `product/CURRENT_STATE.md`
4. `product/PRODUCT_RULES.md`
5. The relevant file under `product/specs/active/`
6. The relevant file under `product/sprints/active/`

Do not treat roadmap items, ideas, or draft specifications as completed functionality.

If a referenced product file does not exist or lacks required information, report the gap. Do not invent product rules or approved decisions.

## Repository structure

* `app/`: Next.js application entry, routes, layout, and global styles
* `components/`: product and reusable UI components
* `data/`: trading-calendar plans and analysis data
* `lib/`: contexts, locale handling, utilities, and shared logic
* `types/`: shared TypeScript types
* `product/`: product context, rules, specifications, sprints, and decisions
* `.agents/skills/`: repeatable Codex workflows

Inspect the existing implementation before creating replacement files, components, or architecture.

## Task classification

Before editing, classify the task as one of the following:

* Product specification
* Sprint planning
* UI or UX optimization
* Trading-calendar month update
* Bug fix
* Refactor
* Release review

When a matching skill exists under `.agents/skills/`, use that skill.

Available project skills include:

* `add-trading-month`
* `product-spec`
* `sprint-planning`
* `user-love-review`

## Change policy

Before modifying code:

1. Read the relevant product documents.
2. Inspect the existing implementation.
3. Identify the expected files to change.
4. Preserve behavior outside the approved scope.
5. Prefer incremental changes over broad rewrites.
6. Avoid unrelated refactoring.
7. Do not add a production dependency unless the existing stack cannot reasonably satisfy the requirement.

For a large feature or product-behavior change, create or update a specification before implementation.

For a small bug fix, make the smallest safe change and avoid creating unnecessary product documents.

## Protected product behavior

Do not do any of the following without explicit approval:

* Delete an existing trading month
* Replace or overwrite historical calendar data
* Invent missing Ganzhi data
* Silently change trading classifications
* Silently change approved Five Elements rules
* Remove Chinese or English support
* Break mobile calendar behavior
* Break calendar image export
* Replace the existing state architecture without a documented reason
* Modify unrelated files outside the task scope

## Trading-month updates

When adding a new trading month:

1. Read `product/PRODUCT_RULES.md`.
2. Preserve all existing months.
3. Validate the supplied date range.
4. Check for missing and duplicate dates.
5. Use only user-provided or approved Ganzhi data.
6. Do not infer uncertain data.
7. Register the month in all required types, registries, and selectors.
8. Verify Chinese and English content.
9. Run the available validation commands.
10. Update `product/CURRENT_STATE.md`.

## Product documentation

Use these statuses consistently:

* `Idea`: not approved
* `Draft`: being defined
* `Approved`: approved for implementation
* `In Progress`: currently being implemented
* `Completed`: implemented and verified
* `Deprecated`: no longer supported

Store durable product decisions under `product/decisions/`.

Do not record temporary discussion as an approved decision.

After completing an approved feature:

1. Update the specification status.
2. Update the sprint checklist.
3. Update `product/CURRENT_STATE.md`.
4. Move documents to completed folders only after acceptance criteria pass.

## Validation

After relevant code changes, run the available project checks.

At minimum:

```bash
npm run lint
npm run build
```

For trading-calendar or UI changes, also verify:

* Existing months remain available
* Month switching works
* Daily entries render correctly
* Chinese and English modes work
* Desktop and mobile layouts remain usable
* Calendar export remains functional when affected

Do not claim a check passed unless it was actually completed.

If a command cannot run, report the reason.

## Completion report

At the end of a task, report:

* What changed
* Files changed
* Product documents created or updated
* Checks performed
* Checks not performed
* Remaining risks or unresolved issues
