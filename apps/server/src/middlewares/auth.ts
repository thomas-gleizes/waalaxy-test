import { Request, Response, NextFunction } from "express"

import { UnauthorizedException } from "../exceptions/http/UnauthorizedException"
import { findUserByName } from "../models/user"

export const authHandler = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) next(new UnauthorizedException("Access denied"))
  if (!findUserByName(req.user.name)) next(new UnauthorizedException("Access denied"))

  next()
}
