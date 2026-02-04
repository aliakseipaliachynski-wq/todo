"use client";

import { useState, useCallback } from "react";
import type { Todo } from "@/entities/todo";
import { Checkbox, Button } from "@/shared/ui";

/** Props for a single todo row: todo data and callbacks for update and delete. */
export interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, updates: { title?: string; completed?: boolean }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

/** One todo row: checkbox, editable title (double-click), and delete with confirm. */
export function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps): React.ReactElement {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleToggle = useCallback(() => {
    void onUpdate(todo.id, { completed: !todo.completed });
  }, [todo.id, todo.completed, onUpdate]);

  const handleStartEdit = useCallback(() => {
    setEditTitle(todo.title);
    setIsEditing(true);
  }, [todo.title]);

  const handleSaveEdit = useCallback(async () => {
    const trimmed = editTitle.trim();
    if (!trimmed) {
      return;
    }
    if (trimmed !== todo.title) {
      await onUpdate(todo.id, { title: trimmed });
    }
    setIsEditing(false);
  }, [editTitle, todo.id, todo.title, onUpdate]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        void handleSaveEdit();
      }
      if (e.key === "Escape") {
        setEditTitle(todo.title);
        setIsEditing(false);
      }
    },
    [handleSaveEdit, todo.title]
  );

  const handleDeleteClick = useCallback(() => {
    setShowConfirm(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      await onDelete(todo.id);
      setShowConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  }, [todo.id, onDelete]);

  const handleCancelDelete = useCallback(() => {
    setShowConfirm(false);
  }, []);

  return (
    <li
      className="group flex items-center gap-3 rounded-md border border-gray-200 bg-white px-4 py-3 shadow-sm"
      data-testid={`todo-item-${todo.id}`}
    >
      <Checkbox
        checked={todo.completed}
        onChange={handleToggle}
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
      />
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={() => void handleSaveEdit()}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded border border-gray-300 px-2 py-1 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1"
          autoFocus
          aria-label="Edit todo title"
        />
      ) : (
        <>
          <span
            className={`flex-1 cursor-pointer text-gray-900 ${todo.completed ? "line-through text-gray-500" : ""}`}
            onDoubleClick={handleStartEdit}
          >
            {todo.title}
          </span>
          {showConfirm ? (
            <span className="flex gap-2">
              <Button
                variant="danger"
                size="sm"
                onClick={() => void handleConfirmDelete()}
                disabled={isDeleting}
              >
                Delete
              </Button>
              <Button variant="secondary" size="sm" onClick={handleCancelDelete}>
                Cancel
              </Button>
            </span>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDeleteClick}
              className="opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label={`Delete ${todo.title}`}
            >
              Delete
            </Button>
          )}
        </>
      )}
    </li>
  );
}
