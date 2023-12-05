import { describe, it, expect } from "vitest"
import { comparePassword, hashPassword } from "../../src/services/crypto"

describe("crypto", async () => {
  it("should hash password with the good size", async () => {
    const hashedPassword = await hashPassword("zerfzfergzfzfzef")
    expect(hashedPassword).toHaveLength(128)

    const hashedPassword2 = await hashPassword("zefzeferghzffzgergrge")
    expect(hashedPassword2).toHaveLength(128)
  })

  it("should hash password with the good value", async () => {
    const password = "password"

    const hashedPassword = await hashPassword(password)
    const hashedPassword2 = await hashPassword(password)

    expect(hashedPassword).toBe(hashedPassword2)
  })

  it("should compare password", async () => {
    const password = "password"

    const hashedPassword = await hashPassword(password)

    expect(await comparePassword(password, hashedPassword)).toBeTruthy()
  })

  it("should not compare password", async () => {
    const password = "password"
    const password2 = "password2"

    const hashedPassword = await hashPassword(password)

    expect(await comparePassword(password2, hashedPassword)).toBeFalsy()
  })
})
