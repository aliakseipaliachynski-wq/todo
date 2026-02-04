# API Documentation

Base URL: same origin (e.g. `http://localhost:3000`). All endpoints are under `/api/todos`.

## Authentication

There is no HTTP authentication. The client sends a `userId` (generated on first visit and stored in localStorage). All todo operations are scoped by this `userId`.

---

## Endpoints

### GET /api/todos

Retrieve todos for a user, optionally filtered by status.

**Query parameters**

| Name   | Type   | Required | Description                          |
|--------|--------|----------|--------------------------------------|
| userId | string | Yes      | User identifier                      |
| status | string | No       | `all` \| `active` \| `completed`. Default: `all` |

**Example**

```http
GET /api/todos?userId=abc-123&status=active
```

**Response**

- **200 OK** – JSON array of todos.

```json
[
  {
    "id": "uuid",
    "userId": "abc-123",
    "title": "Learn TDD",
    "completed": false,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]
```

**Errors**

- **400** – Missing or invalid `userId` or `status`. Body: `{ "error": "...", "code": "VALIDATION_ERROR" }`.
- **500** – Server error. Body: `{ "error": "Internal server error", "code": "INTERNAL_ERROR" }`.

---

### POST /api/todos

Create a new todo.

**Request body**

```json
{
  "userId": "abc-123",
  "title": "New task"
}
```

| Field   | Type   | Required | Description        |
|---------|--------|----------|--------------------|
| userId  | string | Yes      | Non-empty string   |
| title   | string | Yes      | Non-empty string   |

**Example**

```http
POST /api/todos
Content-Type: application/json

{"userId": "abc-123", "title": "New task"}
```

**Response**

- **201 Created** – Created todo (same shape as in GET).

**Errors**

- **400** – Invalid body (e.g. missing or empty `userId`/`title`). Body: `{ "error": "...", "code": "VALIDATION_ERROR" }`.
- **500** – Server error.

---

### PATCH /api/todos/[id]

Update an existing todo. All body fields are optional.

**Request body**

```json
{
  "title": "Updated title",
  "completed": true
}
```

| Field     | Type    | Required | Description                          |
|-----------|---------|----------|--------------------------------------|
| title     | string  | No       | Non-empty string when provided       |
| completed | boolean | No       | Completion state when provided       |

**Example**

```http
PATCH /api/todos/uuid-here
Content-Type: application/json

{"completed": true}
```

**Response**

- **200 OK** – Updated todo (same shape as in GET).

**Errors**

- **400** – Invalid body (e.g. empty `title` or non-boolean `completed`). Body: `{ "error": "...", "code": "VALIDATION_ERROR" }`.
- **404 Not Found** – Todo not found. Body: `{ "error": "Todo not found", "code": "NOT_FOUND" }`.
- **500** – Server error.

---

### DELETE /api/todos/[id]

Delete a todo.

**Example**

```http
DELETE /api/todos/uuid-here
```

**Response**

- **204 No Content** – Empty body.

**Errors**

- **404 Not Found** – Todo not found. Body: `{ "error": "Todo not found", "code": "NOT_FOUND" }`.
- **500** – Server error.

---

## Error format

All error responses are JSON:

```json
{
  "error": "Human-readable message",
  "code": "CODE"
}
```

Common codes: `VALIDATION_ERROR`, `NOT_FOUND`, `INTERNAL_ERROR`.
