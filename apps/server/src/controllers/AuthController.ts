import { NextFunction, Request, Response } from "express"

import { authSchema, AuthSchema } from "@waalaxy-test/utils"
import { addUser, findUserByName } from "../models/user"
import { comparePassword, hashPassword } from "../services/crypto"
import BadRequestException from "../exceptions/http/BadRequestException"
import { signToken } from "../services/jwt"
import { validateBody } from "../middlewares/validation"

export const login = [
  validateBody(authSchema),
  async (req: Request<unknown, unknown, AuthSchema>, res: Response, next: NextFunction) => {
    const user = findUserByName(req.body.username)

    if (!user) return next(new BadRequestException("Login or password incorrect"))

    if (!(await comparePassword(req.body.password, user.password)))
      return next(new BadRequestException("Login or password incorrect"))

    delete user.password

    return res.json({ user, token: await signToken(user) })
  },
]

export const register = [
  validateBody(authSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    if (findUserByName(req.body.username))
      return next(new BadRequestException("User already exists"))

    const user = addUser({
      name: req.body.username,
      password: await hashPassword(req.body.password),
    })

    delete user.password

    return res.status(201).json({ user, token: await signToken(user) })
  },
]
