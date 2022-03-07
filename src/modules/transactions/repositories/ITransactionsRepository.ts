import { ICreateTransactionDTO } from '../dtos/ICreateTransactionDTO';
import { Transaction } from '../entities/Transaction';

interface ITransactionRepository {
  create(data: ICreateTransactionDTO): Promise<void>;
  findById(id: string): Promise<Transaction>;
  list(): Promise<Transaction[]>;
  save(transaction: Transaction): Promise<Transaction>;
}

export { ITransactionRepository }

