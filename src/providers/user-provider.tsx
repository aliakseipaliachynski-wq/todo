"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getOrCreateUserId } from "@/shared/lib/user-id";

interface UserContextValue {
  userId: string;
  isReady: boolean;
}

const UserContext = createContext<UserContextValue | null>(null);

/**
 * Provides the current userId (from localStorage) to the tree.
 * isReady is false until after mount so SSR and first client render don't rely on localStorage.
 */
export function UserProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [userId, setUserId] = useState<string>("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setUserId(getOrCreateUserId());
    setIsReady(true);
  }, []);

  const value = useMemo<UserContextValue>(
    () => ({ userId, isReady }),
    [userId, isReady]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserId(): UserContextValue {
  const ctx = useContext(UserContext);
  if (ctx == null) {
    throw new Error("useUserId must be used within UserProvider");
  }
  return ctx;
}
