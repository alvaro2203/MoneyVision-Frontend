import { TYPE_OF_TRANSACTION_ENUM } from '../consts';
import { Category } from './Category';

export interface Transaction {
  _id?: string;
  title: string;
  description?: string;
  amount: number;
  typeOfTransaction: TYPE_OF_TRANSACTION_ENUM;
  user: string;
  category: Category;
  date?: string | number | Date;
}
