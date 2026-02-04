"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { TodoStatus } from "@/entities/todo";
import * as todosApi from "@/shared/api/todos-api";
import { useUserId } from "@/providers/user-provider";

const QUERY_KEY = "todos";

/**
 * Hook for todo list and mutations. Uses TanStack Query for server state and invalidates cache on mutations.
 * Requires UserProvider (userId) to be available.
 * @param status - Filter: "all" | "active" | "completed"
 * @returns { todos, isLoading, error, refetch, createTodo, updateTodo, deleteTodo, isCreating, isUpdating, isDeleting }
 */
export function useTodos(status: TodoStatus = "all") {
  const { userId, isReady } = useUserId();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEY, userId, status],
    queryFn: () => todosApi.fetchTodos(userId, status),
    enabled: isReady && userId.length > 0,
  });

  const createMutation = useMutation({
    mutationFn: (title: string) =>
      todosApi.createTodo({ userId, title }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY, userId] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      title,
      completed,
    }: {
      id: string;
      title?: string;
      completed?: boolean;
    }) => todosApi.updateTodo(id, { title, completed }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY, userId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => todosApi.deleteTodo(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY, userId] });
    },
  });

  return {
    todos: query.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
    createTodo: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateTodo: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deleteTodo: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}
