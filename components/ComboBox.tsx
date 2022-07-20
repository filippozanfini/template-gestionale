import React, { ForwardRefRenderFunction, InputHTMLAttributes } from 'react';

export interface ComboBoxElement{
    value: number;
    label: string;
}

interface ComboBoxProps extends InputHTMLAttributes<HTMLSelectElement> {
    aria: string;
    name: string;
    label: string;
    elements: ComboBoxElement[];
}

const ComboBoxInputElement: ForwardRefRenderFunction<HTMLSelectElement, ComboBoxProps> = ({ name, label, aria, elements, ...otherProps }, ref) => {
    const id = otherProps.id || name;
    console.log( elements )
    return (<div className={otherProps.className || "mt-6 w-full"} >
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
                <div className="mt-1 relative">
                    <select
                    id={id} {...otherProps} aria-label={aria} role="input" name={name} ref={ref}
                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                    {elements && elements.map( (item:ComboBoxElement) => (<option key={ name + "-" + item.value} value={item.value} selected={otherProps.value=== item.value}> {item.label} </option>) ) }
                    </select>
                </div>
            </div>);
};

const ComboBox = React.forwardRef(ComboBoxInputElement);

export default ComboBox;