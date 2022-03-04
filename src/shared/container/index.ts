import { container } from "tsyringe";

import { TransactionRepository } from "../../modules/transactions/repositories/implementations/TransactionRepository";
import { ITransactionRepository } from "../../modules/transactions/repositories/ITransactionsRepository";

container.registerSingleton<ITransactionRepository>(
  "TransactionRepository",
  TransactionRepository
);
