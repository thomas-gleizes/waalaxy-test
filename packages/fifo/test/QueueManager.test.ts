import { expect, describe, test, beforeEach } from "vitest"
import { FifoException, QueueManager } from "../src"

describe("QueueManager", async () => {
  let queueManager: QueueManager

  beforeEach(() => {
    queueManager = new QueueManager()
  })

  test("should init", async () => {
    expect(queueManager).toBeDefined()
  })

  test("should add action correctly", async () => {
    const action = queueManager.addAction("A", 10)

    expect(action).toBeDefined()
    expect(action.type).toBe("A")
    expect(action.credits).toBeLessThanOrEqual(10)
    expect(action.credits).toBeGreaterThanOrEqual(8)
  })

  test("should add many action correctly", async () => {
    const actionA = queueManager.addAction("A", 10)
    const actionB = queueManager.addAction("B", 10)

    expect(queueManager.actions.length).toBe(2)
    expect(queueManager.actions).toContain(actionA)
    expect(queueManager.actions).toContain(actionB)
  })

  test("should add action to queue correctly", async () => {
    const actionA = queueManager.addAction("A", 10)
    const actionB = queueManager.addAction("B", 10)

    const initialCreditsA = actionA.credits
    const initialCreditsB = actionB.credits

    queueManager.addToQueue(actionA)
    queueManager.addToQueue(actionA)
    queueManager.addToQueue(actionB)

    expect(queueManager.queue.length).toBe(3)

    queueManager.executeFirstAction()

    expect(queueManager.queue.length).toBe(2)
    expect(actionA.credits).toBe(initialCreditsA - 1)
    expect(actionB.credits).toBe(initialCreditsB)

    queueManager.executeFirstAction()
    queueManager.executeFirstAction()

    expect(queueManager.queue.length).toBe(0)
    expect(actionA.credits).toBe(initialCreditsA - 2)
    expect(actionB.credits).toBe(initialCreditsB - 1)
  })

  test("shouldn't add same type of action twice", async () => {
    queueManager.addAction("A", 10)

    expect(() => queueManager.addAction("A", 10)).toThrowError(FifoException)
    expect(() => queueManager.addAction("A", 20)).toThrowError(FifoException)
  })
})
