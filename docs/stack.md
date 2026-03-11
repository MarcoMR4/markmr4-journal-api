# Technology Stack

This document outlines the current technology stack and key libraries used in the markmr4-journal-api project.

## Core Framework

- **Framework:** [NestJS](https://nestjs.com/) (v11.x)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (v5.x)
- **Runtime:** Node.js

## Database & Data Access

- **Database:** PostgreSQL
- **ORM:** [Prisma](https://www.prisma.io/) (v7.x)
- **Client:** `@prisma/client`
- **Driver:** `pg` (PostgreSQL client)

## Authentication & Security

- **Authentication:** JWT Strategy (`@nestjs/jwt`, `passport-jwt` via strategy implementation)
- **Password Hashing:** `bcryptjs`
- **Security Headers:** `helmet`
- **Validation:** `class-validator`, `class-transformer`

## API Documentation

- **Specification:** OpenAPI (Swagger)
- **Tools:** `@nestjs/swagger`, `swagger-ui-express`

## Testing

- **Unit & Integration:** [Jest](https://jestjs.io/)
- **E2E Testing:** `supertest`
- **Utilities:** `@nestjs/testing`

## Configuration & Utilities

- **Configuration:** `@nestjs/config` for environment variable management
- **Health Checks:** `@nestjs/terminus`
- **Reactive Programming:** `rxjs`
- **Date/Time:** (Native JS Date objects currently used, possibly `date-fns` or similar if added later)

## Code Quality & Tooling

- **Linter:** ESLint (`@typescript-eslint/*`)
- **Formatter:** Prettier
- **CLI:** Nest CLI (`@nestjs/cli`)

## Project Structure

- **Architecture:** Modular Monolith (NestJS Modules)
- **Design Pattern:** Controller-Service-Repository (Prisma as repository layer)
