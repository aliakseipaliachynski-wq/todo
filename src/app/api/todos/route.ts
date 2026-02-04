import { NextRequest, NextResponse } from "next/server";
import { getTodoRepository } from "@/entities/todo/repository/todo-repository";
import { ValidationError, type TodoStatus } from "@/entities/todo";

const repository = getTodoRepository();

function errorResponse(message: string, code: string, status: number): NextResponse {
  return NextResponse.json({ error: message, code }, { status });
}

/**
 * GET /api/todos
 * Query: userId (required), status (optional: "all" | "active" | "completed", default "all").
 * @returns JSON array of todos for the user.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const status = (searchParams.get("status") ?? "all") as TodoStatus;

    if (!userId || userId.length === 0) {
      return errorResponse("userId is required", "VALIDATION_ERROR", 400);
    }
    const validStatuses: TodoStatus[] = ["all", "active", "completed"];
    if (!validStatuses.includes(status)) {
      return errorResponse("status must be all, active, or completed", "VALIDATION_ERROR", 400);
    }

    const todos = await repository.findAll(userId, status);
    return NextResponse.json(todos);
  } catch {
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

/**
 * POST /api/todos
 * Body: { userId: string, title: string }. Both required; title must be non-empty after trim.
 * @returns 201 with created todo (id and timestamps set by server).
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const userId = body?.userId;
    const title = body?.title;

    if (!userId || typeof userId !== "string" || userId.trim().length === 0) {
      return errorResponse("userId is required", "VALIDATION_ERROR", 400);
    }
    if (title === undefined || title === null) {
      return errorResponse("title is required", "VALIDATION_ERROR", 400);
    }
    if (typeof title !== "string" || title.trim().length === 0) {
      return errorResponse("title must be a non-empty string", "VALIDATION_ERROR", 400);
    }

    const todo = await repository.create({ userId: userId.trim(), title: title.trim() });
    return NextResponse.json(todo, { status: 201 });
  } catch (err) {
    if (err instanceof ValidationError) {
      return errorResponse(err.message, "VALIDATION_ERROR", 400);
    }
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}
