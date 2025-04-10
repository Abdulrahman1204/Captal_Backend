import { Request, Response, NextFunction } from "express";

// Extend Error interface to include optional status property
interface CustomError extends Error {
  status?: number;
}

// Not Found Middleware
const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error: CustomError = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

// Error Handler Middleware
const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    message: err.message,
  });
};


export { notFound, errorHandler };

// res.status(statusCode).json({
//     message: err.message,
//     stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
//   });