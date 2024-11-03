import { cn } from '@/lib/utils';
import {
  InputHTMLAttributes,
  ButtonHTMLAttributes,
  FC,
  LabelHTMLAttributes,
} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  ...props
}) => {
  const variantStyles = {
    primary: {
      bg: 'bg-black hover:bg-gray-900 focus:ring-gray-300',
      text: 'text-white',
    },
    secondary: {
      bg: 'bg-white hover:bg-gray-300 focus:ring-gray-300',
      text: 'text-black',
    },
    danger: {
      bg: 'bg-red-600 hover:bg-red-700 focus:ring-red-300',
      text: 'text-white',
    },
  };

  const { bg, text } = variantStyles[variant];

  return (
    <button
      className={`inline-flex items-center justify-center px-4 py-2 font-medium text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out ${bg} ${text} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  htmlFor: string;
}

export const Label: FC<LabelProps> = ({
  children,
  htmlFor,
  className = '',
  ...props
}) => (
  <label
    htmlFor={htmlFor}
    className={cn(
      'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
      className
    )}
    {...props}
  >
    {children}
  </label>
);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: FC<InputProps> = ({ className = '', ...props }) => (
  <input
    className={cn(
      'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
      className
    )}
    {...props}
  />
);
