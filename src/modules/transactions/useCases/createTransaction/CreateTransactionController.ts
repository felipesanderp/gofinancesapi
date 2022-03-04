import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateTransactionUseCase } from "./CreateTransactionUseCase";

class CreateTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, type, value, category } = request.body;

    const createTransactionUseCase = container.resolve(CreateTransactionUseCase);

    await createTransactionUseCase.execute({
      title,
      value,
      type,
      category
    })

    return response.status(201).send();
  }
}

export { CreateTransactionController }