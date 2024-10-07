import { TYPE_OF_TRANSACTION_ENUM } from '../consts';

export interface Transaction {
  _id?: string;
  title: string;
  description?: string;
  amount: number;
  typeOfTransaction: TYPE_OF_TRANSACTION_ENUM;
  user: string;
  category: string;
  createdAt?: string | number | Date;
}
