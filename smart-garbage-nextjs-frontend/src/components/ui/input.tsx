import React, { FC } from "react";

interface InputProps {
  label?: string;
  type?: string;
  name: string;
  placeholder?: string;
  register?: any; // Adjust the type according to your form handling library
  [key: string]: any; // This allows additional props to be passed down
}

const Input: FC<InputProps> = ({
  label,
  type,
  name,
  placeholder,
  register,
  ...rest
}) => (
  <div className="">
    {label && (
      <label htmlFor={name} className="text-neutral-600 max-sm:text-sm">
        {label}
      </label>
    )}
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      {...(register ? register(name) : {})} // Apply the register function if it exists
      {...rest} // Spread any additional props
      className="w-full px-3 py-2 border border-gray-400 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 text-black"
    />
  </div>
);

export default Input;
