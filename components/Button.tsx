import React, { FC, InputHTMLAttributes } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    aria: string;
}

const Button: React.FC<ButtonProps> = ({ title, aria, type="button", className = "py-4 w-full", ...props }) => {
    return (
      <button role="button" type={type} aria-label={aria} className={ "focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 " + className }{...props}>
        {title}
      </button>
    );
  };
export default Button;