"use client";

import { useCallback, useEffect, useState } from "react";
import { Input } from "./input";

/** Props for SearchInput. Value is controlled; onChange is called after debounce. */
export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  "aria-label"?: string;
}

/**
 * Search input with debounced onChange. Value is controlled; onChange is called after debounce.
 */
export function SearchInput({
  value,
  onChange,
  placeholder = "Search…",
  debounceMs = 300,
  "aria-label": ariaLabel = "Search",
}: SearchInputProps): React.ReactElement {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [localValue, debounceMs, onChange]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  }, []);

  return (
    <Input
      type="search"
      value={localValue}
      onChange={handleChange}
      placeholder={placeholder}
      aria-label={ariaLabel}
    />
  );
}
