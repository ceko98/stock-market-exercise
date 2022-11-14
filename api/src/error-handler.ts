import { NextFunction, Request, Response } from 'express';
import { Errors } from 'typescript-rest';

export const errorHandler = (err: Errors.HttpError, req: Request, res: Response, next: NextFunction) => {
  
  const statusCode = err.statusCode;
  const message = err.message;
  const name = err.name;

  res.status(statusCode).send({ name, message });
  console.error(message);
  console.error(err.stack);
}