import { Transaction } from './Transaction';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  money: number;
  transactions: Transaction[];
}
