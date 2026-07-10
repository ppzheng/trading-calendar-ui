---
name: product-spec
description: Turn a new feature, product optimization, or behavior change into a formal product specification without modifying business code.
---

# Product Spec

## Trigger

Use this skill when the task asks for a product spec, requirement definition, scope clarification, feature proposal, behavior change, or product optimization plan.

## Read first

- `AGENTS.md`
- `product/PRODUCT.md`
- `product/USERS.md`
- `product/CURRENT_STATE.md`
- `product/PRODUCT_RULES.md`
- `product/specs/SPEC_TEMPLATE.md`
- Relevant implementation files for the affected area.

## Steps

1. Read product context and rules.
2. Inspect current implementation before writing requirements.
3. Separate facts, inferences, assumptions, and `To be confirmed` items.
4. Use `product/specs/SPEC_TEMPLATE.md`.
5. Define user problem and objective.
6. Make Scope and Out of scope explicit.
7. Document current behavior with file references.
8. Define proposed behavior only where supported by the request.
9. Add verifiable acceptance criteria.
10. Save or update the spec under the appropriate `product/specs/` folder.

## Forbidden

- Do not modify business code by default.
- Do not describe Draft specs as approved.
- Do not invent approved product decisions.
- Do not treat roadmap ideas as completed behavior.
- Do not omit open questions when facts cannot be confirmed.

## Output

Report:

- Spec file created or updated.
- Status.
- Scope summary.
- Out-of-scope summary.
- Acceptance criteria summary.
- Open questions and assumptions.
- Files inspected.

