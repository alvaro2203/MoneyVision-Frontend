import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, decimals: number = 2): string {
  // Convertimos el número en una cadena con el número de decimales especificado
  const fixedAmount = amount.toFixed(decimals);

  // Dividimos la parte entera y la parte decimal
  const [integerPart, decimalPart] = fixedAmount.split('.');

  // Formateamos la parte entera usando expresiones regulares para añadir puntos cada 3 dígitos
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    '.'
  );

  // Unimos la parte entera formateada y la decimal con una coma
  return `${formattedIntegerPart},${decimalPart}€`;
}
