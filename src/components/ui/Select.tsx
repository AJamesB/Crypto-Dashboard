import { useState, useRef, useEffect } from "react";
import type { FC } from "react";

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  id: string;
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  options: SelectOption[];
  disabled?: boolean;
  className?: string;
}

/**
 * Select - Custom styled dropdown component
 *
 * @param id - Unique identifier for the select element
 * @param label - Optional label text displayed before the select
 * @param value - Currently selected value
 * @param onChange - Callback function when selection changes
 * @param options - Array of options to display
 * @param disabled - Whether the select is disabled
 * @param className - Additional CSS classes for the container
 */
export const Select: FC<SelectProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  disabled = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find the selected option label
  const selectedOption = options.find((opt) => opt.value === value);
  const selectedLabel = selectedOption?.label || "";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionClick = (optionValue: string | number) => {
    if (!disabled) {
      onChange(String(optionValue));
      setIsOpen(false);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}

      <div ref={dropdownRef} className="relative">
        {/* Trigger Button */}
        <button
          id={id}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            min-w-[150px] px-3 py-1.5 text-sm text-left
            bg-slate-100 dark:bg-slate-700
            text-slate-900 dark:text-slate-100
            rounded-md
            hover:bg-slate-200 dark:hover:bg-slate-600
            transition-colors duration-200 flex items-center justify-between gap-2
          `}
        >
          <span className="truncate">{selectedLabel}</span>
          <span
            className={`transition-transform duration-200 inline-block ${
              isOpen ? "-rotate-90" : ""
            }`}
          >
            {"\u25C0"}
          </span>
        </button>

        {/* Dropdown Menu */}
        <div
          className={`
            absolute z-50 mt-1 w-full
            bg-slate-100 dark:bg-slate-700
            rounded-md shadow-lg
            border border-slate-200 dark:border-slate-600
            max-h-60 overflow-auto
            transition-opacity duration-300 ease-in-out
            ${isOpen && !disabled ? "opacity-100" : "opacity-0"}
          `}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionClick(option.value)}
              className={`
                  w-full px-3 py-2 text-sm text-left
                  hover:bg-slate-200 dark:hover:bg-slate-600
                  transition-colors duration-150
                  ${
                    option.value === value
                      ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-medium"
                      : "text-slate-900 dark:text-slate-100"
                  }
                  first:rounded-t-md last:rounded-b-md
                `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
