import type { CreateTodoDTO, Todo, UpdateTodoDTO } from "../types";
import {
  validateCreateTodoDTO,
  validateTodo,
  validateUpdateTodoDTO,
} from "../model/validation";

describe("Todo Entity", () => {
  const validTodo: Todo = {
    id: "id-1",
    userId: "user-1",
    title: "Learn TDD",
    completed: false,
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  };

  it("should accept valid todo shape", () => {
    expect(() => validateTodo(validTodo)).not.toThrow();
  });

  it("should reject todo with missing id", () => {
    const invalid = { ...validTodo, id: undefined } as unknown as Todo;
    expect(() => validateTodo(invalid)).toThrow();
  });

  it("should reject todo with missing userId", () => {
    const invalid = { ...validTodo, userId: undefined } as unknown as Todo;
    expect(() => validateTodo(invalid)).toThrow();
  });

  it("should reject todo with empty title", () => {
    const invalid = { ...validTodo, title: "" };
    expect(() => validateTodo(invalid)).toThrow();
  });

  it("should reject todo with non-string title", () => {
    const invalid = { ...validTodo, title: 123 } as unknown as Todo;
    expect(() => validateTodo(invalid)).toThrow();
  });

  it("should reject todo with missing completed", () => {
    const invalid = { ...validTodo, completed: undefined } as unknown as Todo;
    expect(() => validateTodo(invalid)).toThrow();
  });

  it("should reject todo with missing timestamps", () => {
    const noCreated = { ...validTodo, createdAt: undefined } as unknown as Todo;
    expect(() => validateTodo(noCreated)).toThrow();
    const noUpdated = { ...validTodo, updatedAt: undefined } as unknown as Todo;
    expect(() => validateTodo(noUpdated)).toThrow();
  });
});

describe("validateCreateTodoDTO", () => {
  it("should accept valid DTO", () => {
    const dto: CreateTodoDTO = { userId: "user-1", title: "New task" };
    expect(() => validateCreateTodoDTO(dto)).not.toThrow();
  });

  it("should throw for missing userId", () => {
    const dto = { title: "New task" } as unknown as CreateTodoDTO;
    expect(() => validateCreateTodoDTO(dto)).toThrow();
  });

  it("should throw for empty userId", () => {
    const dto: CreateTodoDTO = { userId: "", title: "New task" };
    expect(() => validateCreateTodoDTO(dto)).toThrow();
  });

  it("should throw for missing title", () => {
    const dto = { userId: "user-1" } as unknown as CreateTodoDTO;
    expect(() => validateCreateTodoDTO(dto)).toThrow();
  });

  it("should throw for empty title", () => {
    const dto: CreateTodoDTO = { userId: "user-1", title: "" };
    expect(() => validateCreateTodoDTO(dto)).toThrow();
  });

  it("should throw for whitespace-only title", () => {
    const dto: CreateTodoDTO = { userId: "user-1", title: "   " };
    expect(() => validateCreateTodoDTO(dto)).toThrow();
  });

  it("should throw for non-string title", () => {
    const dto = { userId: "user-1", title: 42 } as unknown as CreateTodoDTO;
    expect(() => validateCreateTodoDTO(dto)).toThrow();
  });
});

describe("validateUpdateTodoDTO", () => {
  it("should accept empty DTO (partial update)", () => {
    const dto: UpdateTodoDTO = {};
    expect(() => validateUpdateTodoDTO(dto)).not.toThrow();
  });

  it("should accept valid partial title", () => {
    const dto: UpdateTodoDTO = { title: "Updated title" };
    expect(() => validateUpdateTodoDTO(dto)).not.toThrow();
  });

  it("should accept valid completed", () => {
    const dto: UpdateTodoDTO = { completed: true };
    expect(() => validateUpdateTodoDTO(dto)).not.toThrow();
  });

  it("should throw for empty title when title is provided", () => {
    const dto: UpdateTodoDTO = { title: "" };
    expect(() => validateUpdateTodoDTO(dto)).toThrow();
  });

  it("should throw for whitespace-only title", () => {
    const dto: UpdateTodoDTO = { title: "   " };
    expect(() => validateUpdateTodoDTO(dto)).toThrow();
  });

  it("should throw for non-string title", () => {
    const dto = { title: 123 } as unknown as UpdateTodoDTO;
    expect(() => validateUpdateTodoDTO(dto)).toThrow();
  });

  it("should throw for non-boolean completed", () => {
    const dto = { completed: "yes" } as unknown as UpdateTodoDTO;
    expect(() => validateUpdateTodoDTO(dto)).toThrow();
  });
});
