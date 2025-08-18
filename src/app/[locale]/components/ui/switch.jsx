import React from 'react';
import { cn } from '@/lib/utils';

const Switch = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      type="button"
      role="switch"
      ref={ref}
      className={cn(
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        props.checked ? 'bg-blue-600' : 'bg-gray-200',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          props.checked ? 'translate-x-5' : 'translate-x-0'
        )}
      />
    </button>
  );
});

Switch.displayName = 'Switch';

export { Switch }; 