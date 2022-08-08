import React, { FC, InputHTMLAttributes } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  aria: string;
}

const Button: React.FC<ButtonProps> = ({ title, aria, type = "button", className = "py-4 w-full", ...props }) => {
  return (
    <button
      role="button"
      type={type}
      aria-label={aria}
      className={[
        "rounded border bg-primary-700 text-sm font-semibold leading-none text-white focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2 enabled:hover:bg-primary-600 ",
        className,
        props.disabled ? "cursor-not-allowed opacity-50" : "",
      ].join(" ")}
      {...props}
    >
      {title}
    </button>
  );
};
export default Button;
