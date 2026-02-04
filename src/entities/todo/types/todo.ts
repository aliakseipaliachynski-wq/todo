export type TodoStatus = "all" | "active" | "completed";
export interface Todo {
  id: string;
  userId: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface CreateTodoDTO {
  userId: string;
  title: string;
}
export interface UpdateTodoDTO {
  title?: string;
  completed?: boolean;
}
