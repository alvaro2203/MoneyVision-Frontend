import { TYPE_OF_TRANSACTION_ENUM } from '../conts/CONTS';
import { Category } from './Category';
import { User } from './User';

export interface Transaction {
  id: string;
  title: string;
  description?: string;
  amount: number;
  typeOftransaction: TYPE_OF_TRANSACTION_ENUM;
  user: User;
  category: Category;
}
