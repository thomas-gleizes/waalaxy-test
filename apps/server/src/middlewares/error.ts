import { NextFunction, Request, Response } from "express"

import HttpException from "../exceptions/http/HttpException"
import Exception from "../exceptions/Exception"
import { NODE_ENV } from "../services/constants"

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpException) {
    return res.status(err.status).json({ message: err.message })
  }

  if ((err instanceof Exception || err instanceof Error) && NODE_ENV !== "production") {
    console.log("Exception", err)
    return res.status(500).json({ message: err.message })
  }

  return res.status(500).json({ message: "Internal server error" })
}
