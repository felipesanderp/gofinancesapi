import { getRepository, Repository } from "typeorm";

import { Transaction } from "../../entities/Transaction";
import { ICreateTransactionDTO } from "../../dtos/ICreateTransactionDTO";
import { ITransactionRepository } from "../ITransactionsRepository";

class TransactionRepository implements ITransactionRepository {
  private repository: Repository<Transaction>;

  constructor() {
    this.repository = getRepository(Transaction);
  }

  async create({ title, value, type, category }: ICreateTransactionDTO): Promise<void> {
    const transaction = this.repository.create({      
      title,
      value,
      type,
      category
    });

    await this.repository.save(transaction);
  }

  async findById(id: string): Promise<Transaction> {
    const transaction = await this.repository.findOne(id);

    return transaction;
  }

  async findCategory(category: string): Promise<Transaction> {
    const categoryFind = await this.repository.findOne({category});

    return categoryFind;
  }
}

export { TransactionRepository }