import { GetTransaction } from './Transaction';

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  money: number;
  transactions: GetTransaction[];
}
