import { FC, LabelHTMLAttributes, ReactNode } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  className?: string;
}

export const Label: FC<LabelProps> = ({ children, className, ...props }) => {
  const defaultStyle = 'block text-sm text-gray-600 dark:text-gray-200';
  const combinedStyles = `${defaultStyle} ${className}`;

  return (
    <label className={combinedStyles} {...props}>
      {children}
    </label>
  );
};
