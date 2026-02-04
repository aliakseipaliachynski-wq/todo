/** Props for the error message block. */
export interface ErrorMessageProps {
  message: string;
  /** When provided, shows a "Try again" button that calls this. */
  onRetry?: () => void;
}

/** Displays an error message with optional retry action. */
export function ErrorMessage({ message, onRetry }: ErrorMessageProps): React.ReactElement {
  return (
    <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-800" role="alert">
      <p className="text-sm font-medium">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 text-sm font-medium text-red-700 underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
        >
          Try again
        </button>
      )}
    </div>
  );
}
