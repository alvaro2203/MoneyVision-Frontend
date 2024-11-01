import { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white shadow-md rounded-lg ${className}`}>{children}</div>
);

interface CardHeaderProps {
  children: ReactNode;
}

export const CardHeader: FC<CardHeaderProps> = ({ children }) => (
  <div className='p-4 border-b border-gray-200'>{children}</div>
);

interface CardTitleProps {
  children: ReactNode;
}

export const CardTitle: FC<CardTitleProps> = ({ children }) => (
  <h2 className='text-xl font-semibold'>{children}</h2>
);

interface CardContentProps {
  children: ReactNode;
}

export const CardContent: FC<CardContentProps> = ({ children }) => (
  <div className='p-4'>{children}</div>
);
