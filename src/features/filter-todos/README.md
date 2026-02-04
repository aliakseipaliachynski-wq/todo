# Filter Todos Feature

Tabs (All / Active / Completed) and search input. Parent controls state and applies filters.

## Usage

```tsx
<TodoFilters
  activeStatus={status}
  onStatusChange={setStatus}
  searchQuery={searchQuery}
  onSearchChange={setSearchQuery}
/>
<TodoCounter all={all} active={active} completed={completed} />
```

## Files

- `ui/todo-filters.tsx` – Tabs + search
- `ui/todo-counter.tsx` – Count display
- `index.ts` – Public exports
