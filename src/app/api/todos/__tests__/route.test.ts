/**
 * @jest-environment node
 */
import { GET, POST } from "../route";
import type { NextRequest } from "next/server";

function buildRequest(
  url: string,
  init?: { method?: string; headers?: HeadersInit; body?: string }
): NextRequest {
  return new Request(url, init) as NextRequest;
}

describe("GET /api/todos", () => {
  it("should return 400 when userId is missing", async () => {
    const req = buildRequest("http://localhost/api/todos");
    const res = await GET(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.code).toBe("VALIDATION_ERROR");
    expect(body.error).toContain("userId");
  });

  it("should return 400 when status is invalid", async () => {
    const req = buildRequest("http://localhost/api/todos?userId=u1&status=invalid");
    const res = await GET(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.code).toBe("VALIDATION_ERROR");
  });

  it("should return 200 and array for valid userId", async () => {
    const req = buildRequest("http://localhost/api/todos?userId=user-get-1");
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
  });
});

describe("POST /api/todos", () => {
  it("should return 201 with created todo", async () => {
    const req = buildRequest("http://localhost/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "user-post-1", title: "New task" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.id).toBeDefined();
    expect(body.userId).toBe("user-post-1");
    expect(body.title).toBe("New task");
    expect(body.completed).toBe(false);
    expect(body.createdAt).toBeDefined();
    expect(body.updatedAt).toBeDefined();
  });

  it("should return 400 for invalid data", async () => {
    const req = buildRequest("http://localhost/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "u1", title: "" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.code).toBe("VALIDATION_ERROR");
  });
});
