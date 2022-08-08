import React, { ForwardRefRenderFunction, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  aria: string;
  name: string;
  label: string;
  description?: string;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, description, aria, ...otherProps }, ref) => {
  const id = otherProps.id || name;
  return (
    <div className={otherProps.className || "mt-6 w-full"}>
      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            {...otherProps}
            id={id}
            name={name}
            type="checkbox"
            aria-label={aria}
            role="input"
            ref={ref}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="comments" className="font-medium text-gray-700">
            {label}
          </label>
          {description && <p className="text-gray-500">{description}</p>}
        </div>
      </div>
    </div>
  );
};

const CheckboxInput = React.forwardRef(Input);

export default CheckboxInput;
