import { FC, ChangeEvent } from 'react';

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  options: Option[];
  onChange: (value: string | number) => void;
  className?: string;
}

export const Select: FC<SelectProps> = ({
  options,
  onChange,
  className = '',
  ...props
}) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className='relative'>
      <select
        className={`block w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 transition duration-150 ease-in-out ${className}`}
        onChange={handleChange}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
