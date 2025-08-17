
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ label, id, children, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-stone-300 mb-1">
        {label}
      </label>
      <select
        id={id}
        className="w-full bg-stone-800 border border-stone-600 rounded-md px-3 py-2 text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
