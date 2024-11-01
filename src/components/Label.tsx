// components/ui/Label.tsx
import { FC, LabelHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  htmlFor: string;
}

export const Label: FC<LabelProps> = ({
  children,
  htmlFor,
  className = '',
}) => (
  <label
    htmlFor={htmlFor}
    className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${className}`}
  >
    {children}
  </label>
);
