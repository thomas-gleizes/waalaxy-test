import { describe, expect, test } from "vitest"
import { QueueManager } from "@waalaxy-test/fifo"

import { createQueueManager } from "../../src/services/queueManager"

describe("queueManager services", () => {
  test("should be instanced as QueueManager", () => {
    const queueManager = createQueueManager()

    expect(queueManager).toBeDefined()
    expect(queueManager.actions).toBeInstanceOf(QueueManager)
  })
})
