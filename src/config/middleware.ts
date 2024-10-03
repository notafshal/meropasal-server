import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  if (err.name === "CastError") {
    return res.status(400).json({ error: "malformated id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  } else if (err.name === "JSONWebTokenError") {
    return res.status(400).json({ error: err.message });
  }
  next(err);
};
export default errorHandler;
