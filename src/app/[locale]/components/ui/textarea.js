'use client';

// components/ui/textarea.js
import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Textarea = forwardRef(
  (
    {
      className,
      placeholder,
      value,
      onChange,
      readOnly,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      'w-full rounded-md bg-white dark:bg-gray-100 p-2 text-gray-900',
      'placeholder:text-gray-400 dark:placeholder:text-gray-500',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
      'resize-none',
      readOnly && 'opacity-50 cursor-not-allowed',
      className
    );

    return (
      <textarea
        ref={ref}
        className={baseClasses}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        rows={rows}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
