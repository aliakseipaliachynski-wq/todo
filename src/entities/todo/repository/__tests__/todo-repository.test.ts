import {
  createInMemoryTodoRepository,
  type TodoRepository,
} from "../todo-repository";
import type { CreateTodoDTO } from "../../types";

describe("TodoRepository", () => {
  let repo: TodoRepository;
  const userId = "user-1";

  beforeEach(() => {
    repo = createInMemoryTodoRepository(new Map());
  });

  describe("create and findAll", () => {
    it("should create todo and find it by userId", async () => {
      const dto: CreateTodoDTO = { userId, title: "First task" };
      const created = await repo.create(dto);
      expect(created.id).toBeDefined();
      expect(created.userId).toBe(userId);
      expect(created.title).toBe("First task");
      expect(created.completed).toBe(false);
      expect(created.createdAt).toBeDefined();
      expect(created.updatedAt).toBeDefined();

      const all = await repo.findAll(userId);
      expect(all).toHaveLength(1);
      expect(all[0]).toEqual(created);
    });

    it("should filter by status active", async () => {
      await repo.create({ userId, title: "A" });
      const b = await repo.create({ userId, title: "B" });
      await repo.update(b.id, { completed: true });
      const active = await repo.findAll(userId, "active");
      expect(active).toHaveLength(1);
      expect(active[0]?.title).toBe("A");
    });

    it("should filter by status completed", async () => {
      const a = await repo.create({ userId, title: "A" });
      await repo.create({ userId, title: "B" });
      await repo.update(a.id, { completed: true });
      const completed = await repo.findAll(userId, "completed");
      expect(completed).toHaveLength(1);
      expect(completed[0]?.title).toBe("A");
    });

    it("should not return another user todos", async () => {
      await repo.create({ userId, title: "Mine" });
      await repo.create({ userId: "user-2", title: "Theirs" });
      const mine = await repo.findAll(userId);
      expect(mine).toHaveLength(1);
      expect(mine[0]?.title).toBe("Mine");
    });
  });

  describe("findById", () => {
    it("should return todo by id", async () => {
      const created = await repo.create({ userId, title: "Find me" });
      const found = await repo.findById(created.id);
      expect(found).toEqual(created);
    });

    it("should return null for unknown id", async () => {
      const found = await repo.findById("non-existent");
      expect(found).toBeNull();
    });
  });

  describe("update", () => {
    it("should update title", async () => {
      const created = await repo.create({ userId, title: "Original" });
      const updated = await repo.update(created.id, { title: "Updated" });
      expect(updated.title).toBe("Updated");
      expect(updated.completed).toBe(false);
    });

    it("should update completed", async () => {
      const created = await repo.create({ userId, title: "Task" });
      const updated = await repo.update(created.id, { completed: true });
      expect(updated.completed).toBe(true);
    });

    it("should throw NOT_FOUND for unknown id", async () => {
      await expect(repo.update("unknown", { title: "X" })).rejects.toMatchObject({
        code: "NOT_FOUND",
      });
    });
  });

  describe("delete", () => {
    it("should delete todo", async () => {
      const created = await repo.create({ userId, title: "To delete" });
      await repo.delete(created.id);
      const found = await repo.findById(created.id);
      expect(found).toBeNull();
    });

    it("should throw NOT_FOUND for unknown id", async () => {
      await expect(repo.delete("unknown")).rejects.toMatchObject({ code: "NOT_FOUND" });
    });
  });
});
