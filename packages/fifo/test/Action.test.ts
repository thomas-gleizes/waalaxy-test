import { describe, expect, test } from "vitest"
import { Action } from "../src"
import { randomMinMax } from "@waalaxy-test/utils"

describe("Action", async () => {
  test("should init", async () => {
    const action = new Action("A", 10)
    expect(action).toBeDefined()
  })

  test("should have correctly credits", async () => {
    const action = new Action("A", 10)

    console.log("Action.credits", action.credits)

    expect(action.credits).toBeLessThanOrEqual(10)
    expect(action.credits).toBeGreaterThanOrEqual(8)
  })

  test("should consume credits correctly", async () => {
    const action = new Action("A", 10)

    const initialCredits = action.credits
    action.consumeCredits()
    expect(action.credits).toBe(initialCredits - 1)
  })

  test("should reset credits correctly", async () => {
    const action = new Action("A", 10)

    action.consumeCredits()

    action.resetCredits()

    expect(action.credits).toBeLessThanOrEqual(10)
    expect(action.credits).toBeGreaterThanOrEqual(8)
  })

  test("should throw error if no credits left", async () => {
    const action = new Action("A", 1)

    action.consumeCredits()

    expect(() => action.consumeCredits()).toThrowError("No credits left to action A")
  })

  test("should throw error when maxCredits is negative", async () => {
    expect(() => new Action("A", -1)).toThrowError("Max credits must be greater than 0")
  })
})
