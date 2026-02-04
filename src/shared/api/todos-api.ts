import type { CreateTodoDTO, Todo, TodoStatus, UpdateTodoDTO } from "@/entities/todo";

const BASE = "/api/todos";

export interface ApiError {
  error: string;
  code: string;
}

async function handleResponse<T>(res: Response): Promise<T> {
  const text = await res.text();
  if (!res.ok) {
    let body: ApiError;
    try {
      body = JSON.parse(text) as ApiError;
    } catch {
      body = { error: res.statusText, code: "UNKNOWN" };
    }
    throw new Error(body.error || res.statusText);
  }
  if (text.length === 0) return undefined as T;
  return JSON.parse(text) as T;
}

/**
 * Fetches todos for a user, optionally filtered by status.
 * @param userId - Unique user identifier
 * @param status - Filter: "all" | "active" | "completed"
 * @returns List of todos
 * @throws Error when the request fails or returns non-OK status
 */
export async function fetchTodos(userId: string, status: TodoStatus = "all"): Promise<Todo[]> {
  const params = new URLSearchParams({ userId, status });
  const res = await fetch(`${BASE}?${params.toString()}`);
  return handleResponse<Todo[]>(res);
}

/**
 * Creates a new todo.
 * @param dto - { userId, title }
 * @returns Created todo with generated id and timestamps
 * @throws Error when validation fails or request fails
 */
export async function createTodo(dto: CreateTodoDTO): Promise<Todo> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  return handleResponse<Todo>(res);
}

/**
 * Updates an existing todo.
 */
export async function updateTodo(id: string, dto: UpdateTodoDTO): Promise<Todo> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  return handleResponse<Todo>(res);
}

/**
 * Deletes a todo.
 * @param id - Todo id
 * @throws Error when todo not found or request fails
 */
export async function deleteTodo(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const text = await res.text();
    let body: ApiError;
    try {
      body = JSON.parse(text) as ApiError;
    } catch {
      body = { error: res.statusText, code: "UNKNOWN" };
    }
    throw new Error(body.error || res.statusText);
  }
}
