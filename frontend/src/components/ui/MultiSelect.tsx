'use client';

import React from 'react';

interface MultiSelectProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: boolean;
}

export function MultiSelect({ options, value, onChange, error }: MultiSelectProps) {
  const toggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div
      className={[
        'flex flex-wrap gap-2 rounded-lg border p-3',
        error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white',
      ].join(' ')}
    >
      {options.map((option) => {
        const selected = value.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => toggle(option)}
            className={[
              'rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-150 border',
              selected
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-600',
            ].join(' ')}
          >
            {selected && <span className="mr-1">✓</span>}
            {option}
          </button>
        );
      })}
    </div>
  );
}
