import { NextRequest, NextResponse } from "next/server";
import { getTodoRepository } from "@/entities/todo/repository/todo-repository";
import { ValidationError } from "@/entities/todo";

const repository = getTodoRepository();

function errorResponse(message: string, code: string, status: number): NextResponse {
  return NextResponse.json({ error: message, code }, { status });
}

/**
 * PATCH /api/todos/[id]
 * Body: { title?: string, completed?: boolean }. At least one field; title must be non-empty if provided.
 * @returns Updated todo, or 404 if not found.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    if (!id) {
      return errorResponse("Todo id is required", "VALIDATION_ERROR", 400);
    }

    const body = await request.json();
    const dto: { title?: string; completed?: boolean } = {};
    if (body?.title !== undefined) {
      if (typeof body.title !== "string" || body.title.trim().length === 0) {
        return errorResponse(
          "title must be a non-empty string when provided",
          "VALIDATION_ERROR",
          400
        );
      }
      dto.title = body.title.trim();
    }
    if (body?.completed !== undefined) {
      if (typeof body.completed !== "boolean") {
        return errorResponse("completed must be a boolean when provided", "VALIDATION_ERROR", 400);
      }
      dto.completed = body.completed;
    }

    const todo = await repository.update(id, dto);
    return NextResponse.json(todo);
  } catch (err) {
    if (err instanceof ValidationError) {
      return errorResponse(err.message, "VALIDATION_ERROR", 400);
    }
    const code = (err as Error & { code?: string }).code;
    if (code === "NOT_FOUND") {
      return errorResponse("Todo not found", "NOT_FOUND", 404);
    }
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

/**
 * DELETE /api/todos/[id]
 * @returns 204 on success, or 404 if todo not found.
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    if (!id) {
      return errorResponse("Todo id is required", "VALIDATION_ERROR", 400);
    }

    await repository.delete(id);
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    const code = (err as Error & { code?: string }).code;
    if (code === "NOT_FOUND") {
      return errorResponse("Todo not found", "NOT_FOUND", 404);
    }
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}
