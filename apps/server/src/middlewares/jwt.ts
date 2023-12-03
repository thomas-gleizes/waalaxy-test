import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../services/jwt"
import BadRequestException from "../exceptions/http/BadRequestException"
import { UserWithoutPassword } from "../../types"

export const jwtHandler = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]

  if (token && !Array.isArray(token)) {
    try {
      const [, jwt] = token.split(" ")

      req.user = verifyToken(jwt)
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
