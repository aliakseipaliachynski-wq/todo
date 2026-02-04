import { forwardRef } from "react";

/** Visual style of the button. */
export type ButtonVariant = "primary" | "secondary" | "danger";
/** Size of the button. */
export type ButtonSize = "sm" | "md";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-2 py-1 text-xs",
  md: "px-4 py-2 text-sm",
};

/** Props for Button. Extends native button attributes. */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** When true, shows a spinner and disables the button. */
  isLoading?: boolean;
}

/** Reusable button with variant, size, and optional loading state. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className = "", variant = "primary", size = "md", isLoading, disabled, children, ...props },
  ref
) {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variantClass = variantClasses[variant];
  const sizeClass = sizeClasses[size];
  return (
    <button
      ref={ref}
      className={`${base} ${sizeClass} ${variantClass} ${className}`.trim()}
      disabled={disabled ?? isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
});
