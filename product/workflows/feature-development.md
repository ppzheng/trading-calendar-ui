# Workflow: Feature Development

Use this workflow for new features, product optimizations, or behavior changes.

## Flow

Read product context -> check current implementation -> define user problem -> create or update Spec -> User Love Review -> human approval of scope -> create Sprint -> implement -> QA -> update product state.

## Required sequence

1. Read `product/PRODUCT.md`, `product/USERS.md`, `product/CURRENT_STATE.md`, and `product/PRODUCT_RULES.md`.
2. Inspect the current code before defining changes.
3. Write the user problem in concrete terms.
4. Create or update a spec using `product/specs/SPEC_TEMPLATE.md`.
5. Run a User Love Review for comprehension, trust, motivation, and repeated-use value.
6. Get explicit approval for scope before implementation.
7. Create a sprint using `product/sprints/SPRINT_TEMPLATE.md`.
8. Implement only the approved scope.
9. QA affected desktop, mobile, Chinese, English, and export behavior.
10. Update `product/CURRENT_STATE.md`, relevant spec, and sprint checklist after completion.

## Rule

A Draft spec is not approved development scope. Do not implement a Draft spec unless the product owner explicitly approves the scope.

