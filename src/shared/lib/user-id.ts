const STORAGE_KEY = "todo_user_id";

/**
 * Returns the current user id from localStorage, or creates and stores a new UUID.
 * Returns empty string when run on the server (SSR).
 */
export function getOrCreateUserId(): string {
  if (typeof window === "undefined") {
    return "";
  }
  let userId = localStorage.getItem(STORAGE_KEY);
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, userId);
  }
  return userId;
}
