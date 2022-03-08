import { container } from "tsyringe";

import { TransactionRepository } from "../../modules/transactions/repositories/implementations/TransactionRepository";
import { ITransactionRepository } from "../../modules/transactions/repositories/ITransactionsRepository";

import { CategoriesRepository } from "../../modules/transactions/repositories/implementations/CategoriesRepository";
import { ICategoriesRepository } from "../../modules/transactions/repositories/ICategoriesRepository";


container.registerSingleton<ITransactionRepository>(
  "TransactionRepository",
  TransactionRepository
);

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

