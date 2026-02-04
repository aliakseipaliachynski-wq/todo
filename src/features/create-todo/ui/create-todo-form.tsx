"use client";

import { useState, useCallback } from "react";
import { Button, Input } from "@/shared/ui";

/** Props for the create-todo form. onSubmit is called with the trimmed title. */
export interface CreateTodoFormProps {
  onSubmit: (title: string) => Promise<void>;
  isLoading?: boolean;
}

/** Form to add a new todo: single text input and submit button. */
export function CreateTodoForm({
  onSubmit,
  isLoading = false,
}: CreateTodoFormProps): React.ReactElement {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = title.trim();
      if (!trimmed) {
        setError("Title is required");
        return;
      }
      setError(null);
      try {
        await onSubmit(trimmed);
        setTitle("");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create todo");
      }
    },
    [title, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="flex-1">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          aria-label="New todo title"
          error={error ?? undefined}
          disabled={isLoading}
        />
      </div>
      <Button type="submit" isLoading={isLoading}>
        Add
      </Button>
    </form>
  );
}
