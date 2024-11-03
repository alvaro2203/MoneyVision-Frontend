import React, { useState, ReactNode } from 'react';

interface AccordionProps {
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  className?: string;
  children: React.ReactElement<AccordionItemProps>[];
}

interface AccordionItemProps {
  value: string;
  children: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

interface AccordionTriggerProps {
  children: ReactNode;
  onToggle?: () => void;
}

interface AccordionContentProps {
  children: ReactNode;
  isOpen?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({
  type = 'single',
  collapsible = false,
  className = '',
  children,
}) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (value: string) => {
    setOpenItems((prevOpenItems) => {
      if (type === 'single') {
        return prevOpenItems.includes(value) && collapsible ? [] : [value];
      } else {
        return prevOpenItems.includes(value)
          ? prevOpenItems.filter((item) => item !== value)
          : [...prevOpenItems, value];
      }
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              isOpen: openItems.includes(child.props.value),
              onToggle: () => toggleItem(child.props.value),
            } as Partial<AccordionItemProps>)
          : child
      )}
    </div>
  );
};

export const AccordionItem: React.FC<AccordionItemProps> = ({
  isOpen = false,
  onToggle,
  children,
}) => (
  <div className='border rounded-md'>
    {React.Children.map(children, (child) =>
      React.isValidElement(child)
        ? React.cloneElement(child, { isOpen, onToggle } as Partial<
            AccordionTriggerProps & AccordionContentProps
          >)
        : child
    )}
  </div>
);

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  children,
  onToggle,
}) => (
  <button
    onClick={onToggle}
    className='w-full px-4 py-2 text-left font-semibold text-gray-700 bg-gray-200 rounded-t-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
  >
    {children}
  </button>
);

export const AccordionContent: React.FC<AccordionContentProps> = ({
  children,
  isOpen,
}) => (
  <div
    className={`px-4 py-2 text-gray-700 bg-white transition-all duration-300 ${
      isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
    }`}
  >
    {isOpen && children}
  </div>
);
