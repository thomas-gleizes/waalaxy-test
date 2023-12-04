import { Request, Response, NextFunction } from "express"

import { UnauthorizedException } from "../exceptions/http/UnauthorizedException"
import { findUserByName } from "../models/user"

export const authHandler = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new UnauthorizedException("Access denied 1")
  if (!findUserByName(req.user.name)) throw new UnauthorizedException("Access denied 2")

  next()
}
