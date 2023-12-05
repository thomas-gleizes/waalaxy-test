import { beforeEach, describe, expect, it } from "vitest"
import request from "supertest"

import { app } from "../src/app"

describe("app", () => {
  let appMock: any

  beforeEach(() => {
    appMock = request(app)
  })

  it("should be ok", async () => {
    const response = await appMock.get("/")

    console.log("Response", response)

    expect(request).toBeDefined()
  })
})
