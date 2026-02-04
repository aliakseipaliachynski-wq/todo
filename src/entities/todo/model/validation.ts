import type { CreateTodoDTO, Todo, UpdateTodoDTO } from "../types";

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

/**
 * Validates a Todo entity. Throws ValidationError if invalid.
 * @param todo - Value to validate
 * @throws ValidationError when id, userId, title, completed, createdAt, or updatedAt are missing or invalid
 */
export function validateTodo(todo: unknown): asserts todo is Todo {
  if (todo == null || typeof todo !== "object") {
    throw new ValidationError("Todo must be an object");
  }
  const t = todo as Record<string, unknown>;
  if (typeof t.id !== "string" || t.id.length === 0) {
    throw new ValidationError("Todo id is required and must be a non-empty string");
  }
  if (typeof t.userId !== "string" || t.userId.length === 0) {
    throw new ValidationError("Todo userId is required and must be a non-empty string");
  }
  if (!isNonEmptyString(t.title)) {
    throw new ValidationError("Todo title is required and must be a non-empty string");
  }
  if (!isBoolean(t.completed)) {
    throw new ValidationError("Todo completed must be a boolean");
  }
  if (typeof t.createdAt !== "string" || t.createdAt.length === 0) {
    throw new ValidationError("Todo createdAt is required and must be a non-empty string");
  }
  if (typeof t.updatedAt !== "string" || t.updatedAt.length === 0) {
    throw new ValidationError("Todo updatedAt is required and must be a non-empty string");
  }
}

/**
 * Validates CreateTodoDTO. Throws ValidationError if invalid.
 * @param dto - Value to validate
 * @throws ValidationError when userId or title are missing, empty, or not a non-empty string
 */
export function validateCreateTodoDTO(dto: unknown): asserts dto is CreateTodoDTO {
  if (dto == null || typeof dto !== "object") {
    throw new ValidationError("CreateTodoDTO must be an object");
  }
  const d = dto as Record<string, unknown>;
  if (typeof d.userId !== "string" || d.userId.length === 0) {
    throw new ValidationError("userId is required and must be a non-empty string");
  }
  if (!isNonEmptyString(d.title)) {
    throw new ValidationError("title is required and must be a non-empty string");
  }
}

/**
 * Validates UpdateTodoDTO (partial). Throws ValidationError if invalid.
 * Empty object is valid; when title or completed are present they are validated.
 * @param dto - Value to validate
 * @throws ValidationError when title is empty string or completed is not boolean (when provided)
 */
export function validateUpdateTodoDTO(dto: unknown): asserts dto is UpdateTodoDTO {
  if (dto == null || typeof dto !== "object") {
    throw new ValidationError("UpdateTodoDTO must be an object");
  }
  const d = dto as Record<string, unknown>;
  if ("title" in d && d.title !== undefined) {
    if (!isNonEmptyString(d.title)) {
      throw new ValidationError("title must be a non-empty string when provided");
    }
  }
  if ("completed" in d && d.completed !== undefined) {
    if (!isBoolean(d.completed)) {
      throw new ValidationError("completed must be a boolean when provided");
    }
  }
}
