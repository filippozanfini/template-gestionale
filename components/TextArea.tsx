import React, { ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  aria: string;
  name: string;
  label: string;
  errorMessage?: string;
  ref: string;
}

const Input: ForwardRefRenderFunction<HTMLTextAreaElement, InputProps> = ({ name, label, aria, errorMessage = "", ...otherProps }, ref) => {
  const id = otherProps.id || name;
  const type = otherProps.type || "text";

  const hasError = errorMessage.length > 0;

  return (
    <div className={otherProps.className || "mt-6 w-full"}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1">
        <textarea
          id={id}
          type={type}
          {...otherProps}
          aria-label={aria}
          role="input"
          name={name}
          ref={ref}
          className={
            "min-h-[38px] rounded-md shadow-sm" +
            (hasError
              ? "block w-full border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
              : "block w-full border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm")
          }
        />

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

const Textarea = React.forwardRef(Input);

export default Textarea;
