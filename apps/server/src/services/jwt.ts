import jwt from "jsonwebtoken"
import { UserWithoutPassword } from "@waalaxy-test/utils"
import { JWT_SECRET } from "./constants"
export const signToken = (user: UserWithoutPassword) => {
  return jwt.sign({ user }, JWT_SECRET, { expiresIn: "1d" })
}

export const verifyToken = (token: string): UserWithoutPassword => {
  const payload = jwt.verify(token, JWT_SECRET)

  return payload.user as UserWithoutPassword
}
