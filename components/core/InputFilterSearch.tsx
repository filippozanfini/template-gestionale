import { SearchIcon } from "@heroicons/react/solid";
import React from "react";

interface InputFilterSearchProps {
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const InputFilterSearch = ({ onChange, value, className, disabled, icon, placeholder }: InputFilterSearchProps) => {
  return (
    <div className="relative flex w-80 items-center justify-between gap-2 rounded-md bg-white  text-sm peer-focus:border-primary-600">
      <input
        className="peer w-full rounded-md border border-gray-300 bg-transparent py-1.5 pl-3 pr-9 outline-none focus:border-primary-600"
        placeholder={placeholder}
        value={value}
        onChange={(e: any) => onChange(e)}
      />
      <SearchIcon className="absolute right-3 h-4 w-4 text-gray-500 peer-focus:text-primary-600" />
    </div>
  );
};

export default InputFilterSearch;
