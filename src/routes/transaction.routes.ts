import { Router } from "express";
import multer from 'multer';

import { ListTransactionsController } from '../modules/transactions/useCases/listTransactions/ListTransactionsController';
import { CreateTransactionController } from "../modules/transactions/useCases/createTransaction/CreateTransactionController";
import { ImportTransactionController } from '../modules/transactions/useCases/importTransaction/ImportTransactionController';

const upload = multer({
  dest: "./tmp",
});

const transactionRoutes = Router();

const createTransactionController = new CreateTransactionController();
const listTransactionsController = new ListTransactionsController();
const importTransactionController = new ImportTransactionController();


transactionRoutes.get('/', listTransactionsController.handle);
transactionRoutes.post('/', createTransactionController.handle);
transactionRoutes.post(
  '/import',
  upload.single('file'),
  importTransactionController.handle
);

export { transactionRoutes }