'use client';

import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Button = forwardRef(
  (
    {
      variant = 'default',
      size = 'default',
      className,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      'disabled:opacity-50 disabled:pointer-events-none',
      asChild ? '' : 'px-4 py-2',
      {
        'bg-blue-500 text-white hover:bg-blue-600': variant === 'default',
        'bg-red-500 text-white hover:bg-red-600': variant === 'destructive',
        'bg-transparent border border-gray-200 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800': variant === 'outline',
        'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700': variant === 'secondary',
        'bg-transparent text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800': variant === 'ghost',
        'text-blue-500 hover:underline': variant === 'link',
        'h-8 px-3': size === 'sm',
        'h-10 px-4': size === 'default',
        'h-11 px-6': size === 'lg',
        'h-9 w-9 p-0': size === 'icon',
      },
      className
    );

    if (asChild) {
      return <>{children}</>;
    }

    return (
      <button ref={ref} className={baseClasses} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
