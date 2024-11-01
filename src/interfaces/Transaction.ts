import { TYPE_OF_TRANSACTION_ENUM } from '../consts';
import { Category } from './Category';

export interface CreateTransaction {
  _id?: string;
  description: string;
  amount: number;
  typeOfTransaction: TYPE_OF_TRANSACTION_ENUM;
  user: string;
  category: string;
  createdAt?: string | number | Date;
}

export interface GetTransaction {
  _id?: string;
  description: string;
  amount: number;
  typeOfTransaction: TYPE_OF_TRANSACTION_ENUM;
  user: string;
  category: Category;
  createdAt?: string | number | Date;
}
