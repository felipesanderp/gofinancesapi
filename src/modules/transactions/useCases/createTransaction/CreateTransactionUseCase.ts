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
    const categoryExists = await this.transactionRepository.findCategory(category);

    let categoryTitle = categoryExists.category;

    if (categoryExists) {
      this.transactionRepository.create({
        title,
        type,
        value,
        category: categoryTitle
      });
    } else {
      this.transactionRepository.create({
        title,
        type,
        value,
        category,
      });
    }
  }
}

export { CreateTransactionUseCase }