import type { CreateTodoDTO, Todo, TodoStatus, UpdateTodoDTO } from "../types";
import { validateCreateTodoDTO, validateUpdateTodoDTO } from "../model/validation";

function generateId(): string {
  if (typeof globalThis !== "undefined" && typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  if (typeof require !== "undefined") {
    return (require("node:crypto") as { randomUUID: () => string }).randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export interface TodoRepository {
  findAll(userId: string, status?: TodoStatus): Promise<Todo[]>;
  findById(id: string): Promise<Todo | null>;
  create(dto: CreateTodoDTO): Promise<Todo>;
  update(id: string, dto: UpdateTodoDTO): Promise<Todo>;
  delete(id: string): Promise<void>;
}

const defaultStore = new Map<string, Todo>();

function filterByStatus(todos: Todo[], status: TodoStatus): Todo[] {
  if (status === "all") return todos;
  if (status === "active") return todos.filter((t) => !t.completed);
  return todos.filter((t) => t.completed);
}

/**
 * Creates an in-memory repository. Pass a Map for tests to get an isolated store.
 */
export function createInMemoryTodoRepository(
  store: Map<string, Todo> = defaultStore
): TodoRepository {
  return {
    async findAll(userId: string, status: TodoStatus = "all"): Promise<Todo[]> {
      const todos = Array.from(store.values()).filter((t) => t.userId === userId);
      return filterByStatus(todos, status);
    },

    async findById(id: string): Promise<Todo | null> {
      return store.get(id) ?? null;
    },

    async create(dto: CreateTodoDTO): Promise<Todo> {
      validateCreateTodoDTO(dto);
      const now = new Date().toISOString();
      const todo: Todo = {
        id: generateId(),
        userId: dto.userId,
        title: dto.title.trim(),
        completed: false,
        createdAt: now,
        updatedAt: now,
      };
      store.set(todo.id, todo);
      return todo;
    },

    async update(id: string, dto: UpdateTodoDTO): Promise<Todo> {
      validateUpdateTodoDTO(dto);
      const existing = store.get(id);
      if (!existing) {
        const err = new Error("Todo not found");
        (err as Error & { code: string }).code = "NOT_FOUND";
        throw err;
      }
      const now = new Date().toISOString();
      const updated: Todo = {
        ...existing,
        ...(dto.title !== undefined && { title: dto.title.trim() }),
        ...(dto.completed !== undefined && { completed: dto.completed }),
        updatedAt: now,
      };
      store.set(id, updated);
      return updated;
    },

    async delete(id: string): Promise<void> {
      if (!store.has(id)) {
        const err = new Error("Todo not found");
        (err as Error & { code: string }).code = "NOT_FOUND";
        throw err;
      }
      store.delete(id);
    },
  };
}

let defaultRepository: TodoRepository | null = null;

/**
 * Returns the default in-memory repository (singleton for API routes).
 */
export function getTodoRepository(): TodoRepository {
  if (!defaultRepository) {
    defaultRepository = createInMemoryTodoRepository();
  }
  return defaultRepository;
}
