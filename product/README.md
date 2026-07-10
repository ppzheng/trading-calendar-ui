# Product Workspace

`product/` is the source of truth for product facts, product rules, feature requirements, durable decisions, and execution plans for the trading calendar.

This workspace must reflect the repository's real implementation. Do not record roadmap ideas, assumptions, or draft discussions as completed product behavior.

## Files and directories

- `PRODUCT.md`: product definition, value, current scope, excluded scope, modules, and success criteria.
- `USERS.md`: user assumptions, use cases, core tasks, expectations, pain points, and usage limits.
- `CURRENT_STATE.md`: audited implementation state, supported months, architecture, pages, components, language support, export behavior, known issues, and approved backlog.
- `PRODUCT_RULES.md`: rules that must be preserved during product, UI, and trading-data work.
- `ROADMAP.md`: planning structure for Now, Next, Later, Ideas, and Not planned.
- `decisions/`: durable product decisions only.
- `specs/active/`: approved or in-progress specifications.
- `specs/completed/`: accepted specifications whose acceptance criteria passed.
- `specs/SPEC_TEMPLATE.md`: template for product specifications.
- `sprints/active/`: active implementation plans.
- `sprints/completed/`: completed implementation plans.
- `sprints/SPRINT_TEMPLATE.md`: template for sprint execution plans.
- `workflows/`: repeatable product workflows for month updates, feature development, and UI optimization.

## Update rules

- Update product documents when implementation, approved rules, supported data, or accepted scope changes.
- Record only behavior verified from code as `Completed`.
- Mark unclear or unverified information as `To be confirmed`.
- Store durable decisions in `product/decisions/`; do not treat temporary discussion as a decision.
- Do not move specs or sprints to completed folders until acceptance criteria and QA checks pass.
- Keep product documents in sync with `.agents/skills/` workflows when workflow expectations change.

## Status meanings

- `Completed`: implemented and verified in the current repository.
- `In Progress`: actively being implemented or validated.
- `Planned`: approved or intentionally queued, but not yet implemented.
- `Approved`: approved for implementation, usually at specification level.
- `Draft`: being defined; not approved for development.
- `Idea`: possible future direction; not approved.
- `Deprecated`: no longer supported.

