import { inject, injectable } from "tsyringe";

//import { AppError } from "../../../../errors/AppError";
import { ICreateTransactionDTO } from "../../dtos/ICreateTransactionDTO";
import { ITransactionRepository } from "../../repositories/ITransactionsRepository";

//import { ICreateCategoryDTO } from '../../dtos/ICreateCategoryDTO';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'
@injectable()
class CreateTransactionUseCase {
  constructor(
    @inject("TransactionRepository")
    private transactionRepository: ITransactionRepository,

    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({
    title,
    type,
    value,
    category
  }: ICreateTransactionDTO): Promise<void> {
    let transactionCategory = await this.categoriesRepository.findByName(category);

    if(transactionCategory) {
      const categoryName = transactionCategory.name;

      await this.transactionRepository.create({
        title,
        type,
        value,
        category: categoryName
      }) 
    } else {
      const categoryCreated = await this.categoriesRepository.create({
        name: category
      });

      let categoryName = categoryCreated.name;

      await this.transactionRepository.create({
        title,
        type,
        value,
        category: categoryName,
      });
    }
  }
}

export { CreateTransactionUseCase }