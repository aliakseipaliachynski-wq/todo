"use client";

import { useCallback, useMemo, useState } from "react";
import type { TodoStatus } from "@/entities/todo";
import { CreateTodoForm } from "@/features/create-todo";
import { TodoFilters, TodoCounter } from "@/features/filter-todos";
import { TodoItem } from "@/features/update-todo";
import { useTodos } from "@/shared/hooks/use-todos";
import { ErrorMessage, Spinner } from "@/shared/ui";

/** Returns a mask of which titles match the search query (case-insensitive). */
function filterBySearch(titles: string[], query: string): boolean[] {
  const lower = query.trim().toLowerCase();
  if (!lower) {
    return titles.map(() => true);
  }
  return titles.map((t) => t.toLowerCase().includes(lower));
}

/** Main todo list: create form, status filters, search, counter, and list of todo items. */
export function TodoListWidget(): React.ReactElement {
  const [status, setStatus] = useState<TodoStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { todos, isLoading, error, refetch, createTodo, isCreating, updateTodo, deleteTodo } =
    useTodos(status);

  const filteredTodos = useMemo(() => {
    const titles = todos.map((t) => t.title);
    const mask = filterBySearch(titles, searchQuery);
    return todos.filter((_, i) => mask[i]);
  }, [todos, searchQuery]);

  const onStatusChange = useCallback((s: TodoStatus) => {
    setStatus(s);
  }, []);

  const onSearchChange = useCallback((q: string) => {
    setSearchQuery(q);
  }, []);

  const counts = useMemo(() => {
    const active = todos.filter((t) => !t.completed).length;
    const completed = todos.filter((t) => t.completed).length;
    return { all: todos.length, active, completed };
  }, [todos]);

  const handleCreateTodo = useCallback(
    async (title: string): Promise<void> => {
      await createTodo(title);
    },
    [createTodo]
  );

  const handleUpdateTodo = useCallback(
    async (id: string, updates: { title?: string; completed?: boolean }): Promise<void> => {
      await updateTodo({ id, ...updates });
    },
    [updateTodo]
  );

  if (error) {
    return (
      <ErrorMessage
        message={error instanceof Error ? error.message : "Something went wrong"}
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <CreateTodoForm onSubmit={handleCreateTodo} isLoading={isCreating} />

      <TodoFilters
        activeStatus={status}
        onStatusChange={onStatusChange}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />

      <TodoCounter {...counts} />

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Spinner size="lg" aria-label="Loading todos" />
        </div>
      ) : (
        <ul className="space-y-2" role="list">
          {filteredTodos.length === 0 ? (
            <li className="rounded-md border border-dashed border-gray-300 py-8 text-center text-gray-500">
              {todos.length === 0 ? "No tasks yet. Add one above." : "No tasks match your search."}
            </li>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={handleUpdateTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </ul>
      )}
    </div>
  );
}
