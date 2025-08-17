
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-stone-300 mb-1">
        {label}
      </label>
      <input
        id={id}
        className="w-full bg-stone-800 border border-stone-600 rounded-md px-3 py-2 text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        {...props}
      />
    </div>
  );
};

export default Input;
