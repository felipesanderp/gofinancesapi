import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { Transaction } from '../../entities/Transaction';
import { ITransactionRepository } from "../../repositories/ITransactionsRepository";

@injectable()
class ListTransactionsUseCase {
  constructor(
    @inject("TransactionRepository")
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute(): Promise<Transaction[]> {
   const transactions = await this.transactionRepository.list();

   if (!transactions) {
     throw new AppError('No transactions Found!')
   }

   return transactions;
  }
}

export { ListTransactionsUseCase }