# Testing

## Strategy

- **Unit tests**: Domain (validation, entity), repository, utilities. No React.
- **Component tests**: React Testing Library for feature and shared UI components.
- **Integration tests**: API route handlers with real repository (in-memory).
- **E2E tests**: Playwright for critical user flows (create, edit, delete, filter, search).

Target: **80%+ coverage** for branches, functions, lines, and statements (see `jest.config.ts`).

## Running Tests

**E2E note:** Playwright browsers must be installed in the same environment where you run `test:e2e`. Run `npm run playwright:install` once in your local terminal; then `npm run test:e2e`. If the executable is not found, run `npx playwright install chromium` again in that terminal.

```bash
# All unit/integration tests
npm run test

# Watch mode (re-run on file changes)
npm run test:watch

# Coverage report
npm run test:coverage

# E2E (Playwright). Run in your local terminal (not in sandboxed environments).
npm run playwright:install   # one-time: download Chromium for your OS/arch
npm run test:e2e            # starts dev server if not running, then runs E2E
```

## TDD Workflow

1. **Red**: Write a failing test for the desired behavior.
2. **Green**: Implement the minimum code to pass the test.
3. **Refactor**: Improve code while keeping tests green.

Example for domain validation:

```typescript
// 1. Red: test first
it("should throw for empty title", () => {
  expect(() => validateCreateTodoDTO({ userId: "u1", title: "" })).toThrow();
});

// 2. Green: implement
export function validateCreateTodoDTO(dto: unknown): asserts dto is CreateTodoDTO {
  if (!isNonEmptyString((dto as Record<string, unknown>).title)) {
    throw new ValidationError("title is required and must be a non-empty string");
  }
  // ...
}

// 3. Refactor: extract helpers, clarify names
```

## Test Locations

- **Domain**: `src/entities/todo/__tests__/todo.test.ts`
- **Repository**: `src/entities/todo/repository/__tests__/todo-repository.test.ts`
- **API**: `src/app/api/todos/__tests__/route.test.ts`
- **Features**: `src/features/<feature>/__tests__/`
- **E2E**: `e2e/*.spec.ts`

## Writing Tests

### Domain / Repository

- Use `describe`/`it`; no React. Mock nothing for in-memory repo; each test can use a fresh `createInMemoryTodoRepository()`.

### Components

- Use `@testing-library/react` and `@testing-library/user-event`.
- Query by role/label when possible; avoid relying on class names.
- Example:

```tsx
render(<CreateTodoForm onSubmit={onSubmit} />);
const input = screen.getByLabelText(/new todo title/i);
await userEvent.type(input, "New task");
await userEvent.click(screen.getByRole("button", { name: /add/i }));
expect(onSubmit).toHaveBeenCalledWith("New task");
```

### E2E (Playwright)

- Use `page.goto("/")` for the app; use role-based selectors.
- Keep tests independent (no shared state); use `test.beforeEach` for setup.
- Run with `npm run test:e2e`; ensure dev server is running or let Playwright start it (see `playwright.config.ts`).

## Coverage Requirements

Configured in `jest.config.ts`:

- branches: 80%
- functions: 80%
- lines: 80%
- statements: 80%

Run `npm run test:coverage` and open `coverage/lcov-report/index.html` for a report.
