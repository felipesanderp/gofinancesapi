import { Category } from "../entities/Category";

interface ICreateTransactionDTO {
  id?: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category?: string;
}

export { ICreateTransactionDTO }