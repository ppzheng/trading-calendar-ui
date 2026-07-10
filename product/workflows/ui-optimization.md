# Workflow: UI Optimization

Use this workflow for UI or UX changes.

## Steps

1. Identify the user problem.
2. Distinguish visual changes from behavior changes.
3. Inspect the existing components and state flow.
4. Check desktop behavior.
5. Check mobile behavior, especially calendar scrolling and header controls.
6. Check Chinese and English text.
7. Check calendar export if calendar layout, labels, or data display changes.
8. Check visual hierarchy and information density.
9. Avoid unnecessary component rewrites.
10. Verify that product rules, signal labels, month selection, and export behavior remain intact.

## Guardrails

- Do not change trading classifications as part of UI optimization.
- Do not hide risk days or weaken warning visibility.
- Do not remove locale support.
- Do not rewrite shared architecture without documented reason.
- Do not treat aesthetic preference as product approval for behavior changes.

