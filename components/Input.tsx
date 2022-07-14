import React, { ForwardRefRenderFunction, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    aria: string;
    name: string;
    label: string;
    ref: string;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, aria, ...otherProps }, ref) => {
    const id = otherProps.id || name;
    return (
        <div>
            <label htmlFor={id} className="text-sm font-medium leading-none text-gray-800">{label}</label>
            <input id={id} {...otherProps} aria-label={aria} role="input" name={name} ref={ref} className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
        </div>
    );
};

const FormInput = React.forwardRef(Input);

export default FormInput;