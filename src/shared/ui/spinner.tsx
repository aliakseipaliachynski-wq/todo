export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  "aria-label"?: string;
}

const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-4",
};

export function Spinner({
  size = "md",
  "aria-label": ariaLabel = "Loading",
}: SpinnerProps): React.ReactElement {
  return (
    <div
      className={`animate-spin rounded-full border-gray-300 border-t-blue-600 ${sizeClasses[size]}`}
      role="status"
      aria-label={ariaLabel}
    />
  );
}
