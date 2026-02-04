# Create Todo Feature

Adds a form to create a new todo. Submits the title to the parent via `onSubmit(title)`. Handles validation (non-empty title) and loading state.

## Usage

```tsx
<CreateTodoForm onSubmit={createTodo} isLoading={isCreating} />
```

## Files

- `ui/create-todo-form.tsx` – Form component
- `index.ts` – Public exports
