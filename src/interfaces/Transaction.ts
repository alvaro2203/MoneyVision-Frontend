import { TYPE_OF_TRANSACTION_ENUM } from '../consts';
import { Category } from './Category';
import { User } from './User';

export interface Transaction {
  date: string | number | Date;
  id: string;
  title: string;
  description?: string;
  amount: number;
  typeOfTransaction: TYPE_OF_TRANSACTION_ENUM;
  user: User;
  category: Category;
}
