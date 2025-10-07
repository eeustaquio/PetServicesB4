import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className = "", ...props }) => (
  <input
    className={`px-3 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    {...props}
  />
);
