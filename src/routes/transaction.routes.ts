import { Router } from "express";

import { ListTransactionsController } from '../modules/transactions/useCases/listTransactions/ListTransactionsController';
import { CreateTransactionController } from "../modules/transactions/useCases/createTransaction/CreateTransactionController";

const transactionRoutes = Router();

const createTransactionController = new CreateTransactionController();
const listTransactionsController = new ListTransactionsController();


transactionRoutes.get('/', listTransactionsController.handle);
transactionRoutes.post('/', createTransactionController.handle);

export { transactionRoutes }