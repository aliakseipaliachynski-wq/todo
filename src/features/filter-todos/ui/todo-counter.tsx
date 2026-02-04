export interface TodoCounterProps {
  all: number;
  active: number;
  completed: number;
}

export function TodoCounter({ all, active, completed }: TodoCounterProps): React.ReactElement {
  return (
    <p className="text-sm text-gray-500" aria-live="polite">
      {all} total · {active} active · {completed} completed
    </p>
  );
}
