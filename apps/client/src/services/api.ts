import ky from "ky"
import { LOCALSTORAGE_KEY } from "./constants.ts"

export const httpClient = ky.create({
  prefixUrl: "/api",
  hooks: {
    beforeRequest: [
      (request) => {
        const storage = localStorage.getItem(LOCALSTORAGE_KEY)
        if (storage) {
          const { authToken } = JSON.parse(storage)
          if (authToken) request.headers.set("Authorization", authToken)
        }
      },
      (request) => {
        if (["POST", "PATCH", "PUT"].includes(request.method)) {
          request.headers.set("Content-Type", "application/json")
        }
      },
    ],
    afterResponse: [
      async (__, _, response) => {
        if (response.status === 401) {
          localStorage.removeItem(LOCALSTORAGE_KEY)
        }
      },
    ],
  },
})
