import React, { ForwardRefRenderFunction, InputHTMLAttributes } from "react";

export interface ComboBoxElement {
  value: number;
  label: string;
}

interface ComboBoxProps extends InputHTMLAttributes<HTMLSelectElement> {
  aria: string;
  name: string;
  label: string;
  elements: ComboBoxElement[];
}

const ComboBoxInputElement: ForwardRefRenderFunction<HTMLSelectElement, ComboBoxProps> = (
  { name, label, aria, elements, ...otherProps },
  ref
) => {
  const id = otherProps.id || name;
  return (
    <div className={otherProps.className || "mt-6 w-full"}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1">
        <select
          id={id}
          {...otherProps}
          aria-label={aria}
          role="input"
          name={name}
          ref={ref}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        >
          {elements &&
            elements.map((item: ComboBoxElement) => (
              <option key={name + "-" + item.value} value={item.value} selected={otherProps.value === item.value}>
                {" "}
                {item.label}{" "}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

const ComboBox = React.forwardRef(ComboBoxInputElement);

export default ComboBox;
