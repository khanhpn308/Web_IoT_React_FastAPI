# Project Instructions

These instructions apply to all work in the React_FastAPI project. They ensure consistency, traceability, and maintainability across the entire codebase.

## Changelog Documentation

**Every change must be documented** in [docs/changelogs.md](docs/changelogs.md) following the established format.

### Format Rules

1. **Date grouping**: Group changes by date using UTC format `## YYYY-MM-DD` (newest at top)
2. **Categories**: Use category headers with bold formatting: `- **Category**`
   - Valid categories: `Docs`, `Backend`, `Frontend`, `Docker`, `Database`, `Deployment`, `Infrastructure`, `Mã nguồn (comment / docstring)`
   - Use English or Vietnamese consistently
   - Add new categories only if existing ones don't fit
3. **Entries**: Write detailed bullet points describing WHAT changed and WHY
   - Format: `- **Sub-item**: Description of change`
   - Include affected files/paths: `` `file/path.ext` ``
   - Link to related docs when applicable: `[link text](path/to/doc.md)`
   - Be specific: "Added `GET /api/endpoint`: description" not just "Added endpoint"

### Examples

✅ **Good**:

```
## 2026-04-08

- **Backend**
  - `PATCH /api/devices/{id}`: added validation for device status updates
  - Fixed missing import in `app_service/backend/app/schemas/devices.py` (line 5)
- **Docs**
  - Updated `docs/api/api-documentation.md`: added endpoint parameters section
```

❌ **Avoid**:

```
## 04-08-2026  ← Wrong date format
- Changed some files  ← Too vague
- Fixed bug  ← No category, not specific enough
```

### When to Update

Update the changelog **immediately** when:

- Creating or modifying features
- Fixing bugs
- Refactoring code
- Adding/updating documentation
- Changing configuration or deployment setup
- Adding comments, docstrings, or JSDoc

### Related Documents

When making changes, consider these related docs:

- **API changes** → Update [docs/api/api-documentation.md](docs/api/api-documentation.md) or [docs/api/openapi-like.yaml](docs/api/openapi-like.yaml)
- **Architecture changes** → Update [docs/architecture/](docs/architecture/)
- **Setup/deployment** → Update [docs/deployment/](docs/deployment/) or [docs/setup/](docs/setup/)
- **Guidelines/patterns** → Update [docs/guidelines/](docs/guidelines/)
- **Code comments** → Add JSDoc or module docstrings (see [docs/guidelines/](docs/guidelines/) for style)

## Code Quality Standards

### Backend (FastAPI/Python)

- Follow [docs/guidelines/backend-guidelines.md](docs/guidelines/backend-guidelines.md)
- Add docstrings to modules, functions, and classes
- Use type hints for function parameters and returns
- Document complex logic with inline comments

### Frontend (React/TypeScript)

- Follow [docs/guidelines/frontend-guidelines.md](docs/guidelines/frontend-guidelines.md)
- Add JSDoc comments to components and utility functions
- Use TypeScript types over `PropTypes`
- Keep components small and focused

### Version Control

- Follow [docs/guidelines/git-github-teamwork.md](docs/guidelines/git-github-teamwork.md)
- Use descriptive commit messages
- Reference related issues in commit messages
- Keep branches focused on single features/fixes

## Deployment & Configuration

- Docker setup: Use [docs/deployment/docker-linux-deployment.md](docs/deployment/docker-linux-deployment.md)
- HTTPS: Refer to [docs/deployment/https-setup.md](docs/deployment/https-setup.md)
- Environment variables and configuration: See [docs/architecture/codebase-walkthrough.md](docs/architecture/codebase-walkthrough.md#environment-variables)

---

**Last Updated**: 2026-04-08  
**Scope**: All work in this repository
