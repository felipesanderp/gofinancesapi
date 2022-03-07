import { inject, injectable } from "tsyringe";
import { parse as csvParse } from 'csv-parse';
import fs from 'fs';

import { ITransactionRepository } from "../../repositories/ITransactionsRepository";

interface IImportTransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

@injectable()
class ImportTransactionUseCase {
  constructor(
    @inject("TransactionRepository")
    private transactionRepository: ITransactionRepository,
  ) {}
  
  loadTransactions(file: Express.Multer.File): Promise<IImportTransaction[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const transactions: IImportTransaction[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [title, type, value, category] = line;

          transactions.push({
            title,
            type,
            value,
            category,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(transactions);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }


  async execute(file: Express.Multer.File): Promise<void> {
    const transactions = await this.loadTransactions(file);

    transactions.map(async (transaction) => {
      const { title, type, value, category } = transaction;

      await this.transactionRepository.create({
        title,
        type,
        value,
        category,
      });
    });
  }
}

export { ImportTransactionUseCase }