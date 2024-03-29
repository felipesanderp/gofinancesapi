import express, { Request, Response, NextFunction } from "express";
import cors from 'cors';
import "express-async-errors";
import "reflect-metadata";
//import swaggerUI from "swagger-ui-express";

import { AppError } from "./errors/AppError";
import { router } from "./routes";
// import swaggerFile from "./swagger.json";

import "./database";
import "./shared/container";

const app = express();

app.use(express.json());
app.use(cors());

//app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(4000, () => console.log("Server is running!"));