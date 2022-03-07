import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportTransactionUseCase } from "./ImportTransactionUseCase";

class ImportTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importTransactionUseCase = container.resolve(ImportTransactionUseCase);

    await importTransactionUseCase.execute(file);

    return response.status(201).send();
  }
}

export { ImportTransactionController };