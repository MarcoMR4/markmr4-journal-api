# Copilot Instructions

- This repository contains a NestJS backend API for a blog application.
- The project uses NestJS, Prisma ORM, and PostgreSQL.
- Project architecture is documented in `docs/architecture.md`.
- Business rules are documented in `docs/rules.md`.
- The project stack, tools, and versions are documented in `docs/stack.md`.

- Before suggesting changes, understand the existing module structure and follow the current project organization.
- Keep controllers thin and place business logic in services.
- Use DTOs for request validation and data transfer.
- Before suggesting database changes, review `prisma/schema.prisma` for the current schema, relations, and constraints.
- Do not suggest Prisma schema changes unless they are necessary and clearly justified.
- When changing behavior related to authentication, authorization, posts, comments, or tags, preserve current module boundaries and existing patterns.
- Prefer changes that are consistent with the current codebase over introducing new patterns without strong justification.
- When relevant, suggest how to validate the change with linting, tests, or manual verification steps.
