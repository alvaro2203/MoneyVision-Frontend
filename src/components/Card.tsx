import { cn } from '@/lib/utils';
import { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className = '', ...props }) => (
  <div
    className={cn(
      'bg-white max-w-sm rounded overflow-hidden shadow',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader: FC<CardProps> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={cn('p-4', className)} {...props}>
    {children}
  </div>
);

export const CardTitle: FC<CardProps> = ({
  children,
  className = '',
  ...props
}) => (
  <h2 className={cn('text-xl font-semibold', className)} {...props}>
    {children}
  </h2>
);

export const CardDescription: FC<CardProps> = ({
  children,
  className = '',
  ...props
}) => (
  <p className={cn('text-sm text-muted-foreground', className)} {...props}>
    {children}
  </p>
);

export const CardContent: FC<CardProps> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={cn('p-4', className)} {...props}>
    {children}
  </div>
);

export const CardFooter: FC<CardProps> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={cn('flex items-center p-6 pt-0', className)} {...props}>
    {children}
  </div>
);
