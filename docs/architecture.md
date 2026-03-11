# Project Architecture

This document describes the high-level architecture of `markmr4-journal-api`.

## Architectural Pattern

The application follows a **Modular Monolith** architecture using the **NestJS** framework. Usage of modules allows for logical separation of features while keeping the codebase in a single repository and deployable unit.

### Core Layers

1. **Controllers (Presentation Layer):** Handle incoming HTTP requests, validate input (DTOs), and return responses. They differ business logic to Services.
2. **Services (Business Logic Layer):** Contain the core business rules and orchestration. They interact with the Data Access Layer.
3. **Data Access Layer (Repository/ORM):** Uses **Prisma ORM** to interact with the PostgreSQL database. `PrismaService` acts as the primary abstraction for database operations.

## Module Structure

### Application Root

- **AppModule:** The root module that aggregates all feature modules.
- **ConfigModule:** Configured globally to manage environment variables via `.env`.

### Feature Modules

Each major domain entity has its own module:

- **AuthModule:** Handles authentication (JWT), authorization guards, and role management.
- **UserModule:** Manages user data and profiles.
- **PostModule:** Manages blog posts (CRUD).
- **PostCommentModule:** Manages comments on posts.
- **PostTagModule:** Manages tags for categorizing posts.
- **HealthModule:** Provides health check endpoints (via `@nestjs/terminus`) for monitoring.

### Shared Modules

- **PrismaModule:** Exports `PrismaService` to be used by other modules for database access.

## Data Flow

1. **Request:** HTTP request hits a Controller endpoint.
2. **Guard:** (Depends on Rules) Authentication/Authorization guards intercept the request (e.g., `AuthGuard`, `RolesGuard`).
3. **Validation:** Pipes validation (using `class-validator`) ensures DTOs are correct.
4. **Service:** Controller calls a Service method.
5. **Database:** Service uses `PrismaService` to query or update the PostgreSQL database.
6. **Response:** Data flows back up to the Controller and is returned as a JSON response.

## Database

- **PostgreSQL** is used as the relational database.
- **Prisma** is used for schema definition (`schema.prisma`), migrations, and type-safe database queries.
- **Connection Pooling:** The application uses `pg` connection pooling with `@prisma/adapter-pg` for efficient database connections.

## Security

- **Authentication:** Implemented using JWT (JSON Web Tokens).
- **Authorization:** Role-based access control (RBAC) via Decorators and Guards.
- **Protection:** `helmet` is used for setting secure HTTP headers.
