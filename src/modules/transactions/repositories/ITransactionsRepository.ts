import { ICreateTransactionDTO } from '../dtos/ICreateTransactionDTO';
import { Transaction } from '../entities/Transaction';

interface ITransactionRepository {
  create(data: ICreateTransactionDTO): Promise<void>;
  findById(id: string): Promise<Transaction>;
  findCategory(category: string): Promise<Transaction>;
}

export { ITransactionRepository }

