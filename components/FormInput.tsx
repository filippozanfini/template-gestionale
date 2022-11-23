import React, { ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  aria: string;
  name: string;
  label: string;
  errorMessage?: string;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, aria, errorMessage = "", name, className = "mt-6 w-full", ...otherProps },
  ref
) => {
  const id = otherProps.id || name;
  const disabled = otherProps.disabled;
  const type = otherProps.type || "text";
  const hasError = errorMessage.length > 0;
  const inputClassName =
    "rounded-md shadow-sm block w-full sm:text-sm" +
    (hasError
      ? "pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
      : "focus:ring-primary-500 focus:border-primary-500 border-gray-200");

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className={["relative mt-1", disabled && "opacity-60"].join(" ")}>
        <input id={id} type={type} name={name} aria-label={aria} role="input" ref={ref} className={inputClassName} {...otherProps} />
        {hasError && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>
      {hasError && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
const FormInput = React.forwardRef(Input);
export default FormInput;
