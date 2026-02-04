import { forwardRef } from "react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ className = "", label, id, ...props }, ref) {
    const inputId =
      id ?? (label ? `checkbox-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);
    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          className={`
            h-4 w-4 rounded border-gray-300 text-blue-600
            focus:ring-2 focus:ring-blue-500 focus:ring-offset-0
            disabled:opacity-50
            ${className}
          `.trim()}
          aria-checked={props.checked}
          {...props}
        />
        {label && (
          <label htmlFor={inputId} className="text-sm text-gray-700 cursor-pointer">
            {label}
          </label>
        )}
      </div>
    );
  }
);
