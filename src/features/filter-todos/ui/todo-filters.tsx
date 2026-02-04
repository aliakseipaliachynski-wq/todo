"use client";

import type { TodoStatus } from "@/entities/todo";
import { Tabs, SearchInput } from "@/shared/ui";

const TAB_ITEMS: { id: TodoStatus; label: string }[] = [
  { id: "all", label: "All Tasks" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
];

export interface TodoFiltersProps {
  activeStatus: TodoStatus;
  onStatusChange: (status: TodoStatus) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function TodoFilters({
  activeStatus,
  onStatusChange,
  searchQuery,
  onSearchChange,
}: TodoFiltersProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Tabs
        tabs={TAB_ITEMS}
        activeId={activeStatus}
        onSelect={(id) => onStatusChange(id as TodoStatus)}
        aria-label="Filter tasks by status"
      />
      <div className="w-full sm:w-64">
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search tasks…"
          aria-label="Search tasks"
        />
      </div>
    </div>
  );
}
