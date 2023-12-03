import { Request, Response } from "express"

import { addUser, findUserByName, removeUser } from "../models/user"
import { comparePassword, hashPassword } from "../services/crypto"
import BadRequestException from "../exceptions/http/BadRequestException"
import { signToken } from "../services/jwt"

export const login = async (req: Request, res: Response) => {
  const user = findUserByName(req.body.username)

  if (await comparePassword(user.password, req.body.password))
    throw new BadRequestException("Login or password incorrect")

  delete user.password

  return res.json({ user, token: await signToken(user) })
}

export const register = async (req: Request, res: Response) => {
  if (findUserByName(req.body.username)) throw new BadRequestException("User already exists")

  const user = addUser({
    name: req.body.username,
    password: await hashPassword(req.body.password),
  })

  delete user.password

  return res.status(201).json({ user: { name: req.body.username }, token: await signToken(user) })
}

export const logout = (req: Request, res: Response) => {
  // todo fix req.user
  // @ts-ignore
  removeUser(req.user)

  return res.status(204).redirect("/connexion")
}
