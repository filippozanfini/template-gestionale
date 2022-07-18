import React, { ForwardRefRenderFunction, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    aria: string;
    name: string;
    label: string;
    ref: string;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, aria, ...otherProps }, ref) => {
    const id = otherProps.id || name;
    const type = otherProps.type || "text";
    return (
        <div className={otherProps.className || "mt-6 w-full"} >
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="mt-1">
                <input id={id} type={type} {...otherProps} aria-label={aria} role="input" name={name} ref={ref} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-white" />
            </div>
        </div>
    );
};

const FormInput = React.forwardRef(Input);

export default FormInput;