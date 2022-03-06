import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreateTransactionDTO } from "../../dtos/ICreateTransactionDTO";
import { ITransactionRepository } from "../../repositories/ITransactionsRepository";

@injectable()
class CreateTransactionUseCase {
  constructor(
    @inject("TransactionRepository")
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute({
    title,
    type,
    value,
    category
  }: ICreateTransactionDTO): Promise<void> {
   await this.transactionRepository.create({
        title,
        type,
        value,
        category,
    })
  }
}

export { CreateTransactionUseCase }