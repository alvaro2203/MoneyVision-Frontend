import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: FC<ButtonProps> = ({
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

export default Button;
