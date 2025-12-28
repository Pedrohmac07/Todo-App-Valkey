import { type ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> { }

export function Input(props: InputProps) {
  return (
    <input {...props}
      className={`
      w-full
      px-4 py-2
      border border-gray-400 rounded-lg
      bg-zinc-500
      focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
      transition-all duration-200
      mt-1.5
      text-amber-50
      ${props.className}`}
    />
  );
}
