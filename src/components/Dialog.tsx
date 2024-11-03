import { FC, ReactNode, useEffect } from 'react';
import { Button } from './Form';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Dialog: FC<DialogProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      role='dialog'
      aria-modal='true'
      onClick={onClose}
    >
      <div
        className='bg-white p-6 rounded-md shadow-md w-full max-w-lg'
        onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer click dentro del diálogo
      >
        {children}
      </div>
    </div>
  );
};

interface DialogHeaderProps {
  children: ReactNode;
}

export const DialogHeader: FC<DialogHeaderProps> = ({ children }) => (
  <div className='border-b p-2 mb-4'>
    <h3 className='text-lg font-medium'>{children}</h3>
  </div>
);

interface DialogContentProps {
  children: ReactNode;
}

export const DialogContent: FC<DialogContentProps> = ({ children }) => (
  <div className='p-2'>{children}</div>
);

interface DialogTriggerProps {
  onClick: () => void;
  children: ReactNode;
}

export const DialogTrigger: FC<DialogTriggerProps> = ({
  onClick,
  children,
}) => <Button onClick={onClick}>{children}</Button>;
