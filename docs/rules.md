# Business Rules

This document outlines the business logic and access control rules for the MarkMr4 Journal API.

## 1. Authentication & Roles

- **Roles:** The system defines three primary roles:
  - `admin`: Has full access to all resources and management features.
  - `author`: Can create posts and manage their own content.
  - `user`: Standard authenticated user, can interact via comments.
- **Access:**
  - **Public:** Unauthenticated users can read published posts, approved comments, and tags.
  - **Authenticated:** Creating or modifying content requires a valid JWT token.

## 2. Posts (Blog Entries)

- **Creation:** Restricted to users with `admin` or `author` roles.
- **Modification (Update/Delete):**
  - **Authors:** Can only update or delete _their own_ posts.
  - **Admins:** Can update or delete _any_ post regardless of ownership.
- **Visibility:**
  - `published`: Visible to all users (public).
  - `draft` / `archived`: Visible only to the post's author and admins.
- **Constraints:**
  - `slug`: Must be unique system-wide (generated from title).
  - A post belongs to a single author (`User`).

## 3. Comments

- **Creation:** Any authenticated user (including `author` and `admin`) can create comments on posts.
- **Modification:**
  - **Users:** Can update or delete _their own_ comments (e.g., to fix typos or remove).
  - **Admins:** Can update or delete _any_ comment (moderation).
- **Status Workflow:**
  - `pending`: Default status for new comments. Visible only to the comment's author and admins.
  - `approved`: Visible to the public.
  - `rejected` / `spam` / `deleted`: Hidden from public view.
- **Cascading:** If a post is deleted, its associated comments are also deleted.

## 4. Tags

- **Creation & Management:** Restricted to `admin` and `author` roles.
- **Association:**
  - Tags can be assigned to posts during creation or update.
  - A post can have multiple tags.
- **Uniqueness:** Tag names must be unique.

## 5. Users

- **Identity:** Uniqueness is enforced on `email` and `nickname`.
- **Profile:** Authenticated users can access their own profile details.
- **Role Assignment:** Users can be assigned multiple roles (Many-to-Many relation).
