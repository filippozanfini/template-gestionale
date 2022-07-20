import React, { ForwardRefRenderFunction, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    aria: string;
    name: string;
    label: string;
    description?: string;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, description, aria, ...otherProps }, ref) => {
    const id = otherProps.id || name;
    return (
        <div className={otherProps.className || "mt-6 w-full"} >
<div className="relative flex items-start">
<div className="flex items-center h-5">
  <input
  {...otherProps}
    id={id}
    name={name}
    type="checkbox"
    aria-label={aria}
    role="input"
    ref={ref}
    className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
  />
</div>
<div className="ml-3 text-sm">
  <label htmlFor="comments" className="font-medium text-gray-700">
    {label}
  </label>
  { description && <p className="text-gray-500">{description}</p> }
</div>
</div>
</div>
    );
};

const CheckboxInput = React.forwardRef(Input);

export default CheckboxInput;