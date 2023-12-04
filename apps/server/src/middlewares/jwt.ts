import { Request, Response, NextFunction } from "express"
import { UserWithoutPassword } from "@waalaxy-test/utils"

import { verifyToken } from "../services/jwt"
import BadRequestException from "../exceptions/http/BadRequestException"

export const jwtHandler = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"] ?? (req.query["authToken"] as string | undefined)

  if (typeof token === "string") {
    try {
      req.user = verifyToken(token)
    } catch (error: unknown) {
      throw new BadRequestException("Invalid token")
    }
  }

  next()
}

declare global {
  namespace Express {
    export interface Request {
      user?: UserWithoutPassword
    }
  }
}
