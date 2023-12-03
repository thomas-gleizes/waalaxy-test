import crypto from "node:crypto"

export const hashPassword = async (password: string) => {
  const hash = crypto.createHash("sha512")

  hash.update(password)
  const hashedPassword = hash.digest("hex")
  hash.end()

  return hashedPassword
}

export const comparePassword = async (password: string, hashedPassword: string) => {
  return hashedPassword === (await hashPassword(password))
}
