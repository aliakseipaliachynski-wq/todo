import { test, expect } from "@playwright/test";

test.describe("Todo CRUD", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should create a todo and show it in the list", async ({ page }) => {
    const input = page.getByLabel(/new todo title/i);
    const addButton = page.getByRole("button", { name: /add/i });

    await input.fill("E2E test task");
    await addButton.click();

    await expect(page.getByText("E2E test task")).toBeVisible();
  });

  test("should toggle todo completion", async ({ page }) => {
    const input = page.getByLabel(/new todo title/i);
    await input.fill("Task to complete");
    await page.getByRole("button", { name: /add/i }).click();

    await expect(page.getByText("Task to complete")).toBeVisible();
    const checkbox = page.getByRole("checkbox", { name: /mark as complete/i }).first();
    await checkbox.click();
    await expect(page.getByText("Task to complete")).toHaveClass(/line-through/);
  });

  test("should edit todo by double-clicking", async ({ page }) => {
    await page.getByLabel(/new todo title/i).fill("Original title");
    await page.getByRole("button", { name: /add/i }).click();
    await expect(page.getByText("Original title")).toBeVisible();

    await page.getByText("Original title").dblclick();
    const editInput = page.getByLabel(/edit todo title/i);
    await expect(editInput).toBeVisible();
    await editInput.fill("Edited title");
    await editInput.press("Enter");
    await expect(page.getByText("Edited title")).toBeVisible();
  });

  test("should delete todo after confirmation", async ({ page }) => {
    await page.getByLabel(/new todo title/i).fill("Task to delete");
    await page.getByRole("button", { name: /add/i }).click();
    await expect(page.getByText("Task to delete")).toBeVisible();

    await page.getByRole("button", { name: /delete task to delete/i }).click();
    await page.getByRole("button", { name: /^delete$/i }).click();
    await expect(page.getByText("Task to delete")).not.toBeVisible();
  });
});

test.describe("Todo filtering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const input = page.getByLabel(/new todo title/i);

    await input.fill("Active task");
    await page.getByRole("button", { name: /add/i }).click();
    await expect(page.getByText("Active task")).toBeVisible();

    await input.fill("Another active");
    await page.getByRole("button", { name: /add/i }).click();
    await expect(page.getByText("Another active")).toBeVisible();

    const firstCheckbox = page.getByRole("checkbox", { name: /mark as complete/i }).first();
    await firstCheckbox.click();
    await expect(page.getByText("Another active")).toBeVisible();
  });

  test("should filter by Active tab", async ({ page }) => {
    await page.getByRole("tab", { name: /active/i }).click();
    await expect(page.getByText("Another active")).toBeVisible();
    await expect(page.getByText("Active task")).not.toBeVisible();
  });

  test("should filter by Completed tab", async ({ page }) => {
    await page.getByRole("tab", { name: /completed/i }).click();
    await expect(page.getByText("Active task")).toBeVisible();
    await expect(page.getByText("Another active")).not.toBeVisible();
  });

  test("should show All Tasks", async ({ page }) => {
    await page.getByRole("tab", { name: /all tasks/i }).click();
    await expect(page.getByText("Active task")).toBeVisible();
    await expect(page.getByText("Another active")).toBeVisible();
  });
});

test.describe("Todo search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const input = page.getByLabel(/new todo title/i);

    await input.fill("Apple");
    await page.getByRole("button", { name: /add/i }).click();
    await expect(page.getByText("Apple")).toBeVisible();

    await input.fill("Banana");
    await page.getByRole("button", { name: /add/i }).click();
    await expect(page.getByText("Banana")).toBeVisible();

    await input.fill("Cherry");
    await page.getByRole("button", { name: /add/i }).click();
    await expect(page.getByText("Cherry")).toBeVisible();
  });

  test("should filter list by search query", async ({ page }) => {
    const list = page.getByRole("list");
    const search = page.getByLabel(/search tasks/i);
    await search.fill("Banana");
    await expect(list.getByText("Banana")).toBeVisible();
    await expect(list.getByText("Apple")).not.toBeVisible();
    await expect(list.getByText("Cherry")).not.toBeVisible();
  });
});
