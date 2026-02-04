/** Filter for listing todos: all, only active (incomplete), or only completed. */
export type TodoStatus = "all" | "active" | "completed";

/** Todo entity with server-generated id and timestamps. */
export interface Todo {
  id: string;
  userId: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Payload to create a new todo. */
export interface CreateTodoDTO {
  userId: string;
  title: string;
}

/** Payload to update an existing todo (all fields optional). */
export interface UpdateTodoDTO {
  title?: string;
  completed?: boolean;
}
