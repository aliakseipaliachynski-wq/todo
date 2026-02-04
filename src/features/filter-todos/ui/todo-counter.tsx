/** Counts to display: total, active, and completed. */
export interface TodoCounterProps {
  all: number;
  active: number;
  completed: number;
}

/** Displays "N total · N active · N completed" for the current list. */
export function TodoCounter({ all, active, completed }: TodoCounterProps): React.ReactElement {
  return (
    <p className="text-sm text-gray-500" aria-live="polite">
      {all} total · {active} active · {completed} completed
    </p>
  );
}
