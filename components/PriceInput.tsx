import React, { ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

interface PriceInputProps extends InputHTMLAttributes<HTMLInputElement> {
  aria: string;
  name: string;
  label: string;
  valuta?: string;
  errorMessage?: string;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, PriceInputProps> = (
  { label, aria, valuta = "€", errorMessage = "", name, className = "mt-6 w-full", ...otherProps },
  ref
) => {
  const id = otherProps.id || name;
  const type = otherProps.type || "text";
  const hasError = errorMessage.length > 0;
  const inputClassName =
    "rounded-md shadow-sm block w-full sm:text-sm pl-7 " +
    (hasError
      ? "pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
      : "focus:ring-primary-500 focus:border-primary-500 border-gray-200");

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">{valuta}</span>
        </div>
        <input
          id={id}
          type="number"
          pattern="[0-9]+([\.,][0-9]+)?"
          step="0.1"
          name={name}
          min="0.1"
          aria-label={aria}
          role="input"
          ref={ref}
          className={inputClassName}
          {...otherProps}
        />
        {hasError ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        ) : null}
      </div>
      {hasError && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
const PriceInput = React.forwardRef(Input);
export default PriceInput;
