import { useEffect, useState } from "react"
import { ActionType } from "@waalaxy-test/fifo"

import { css } from "../../../styled-system/css"
import ActionList from "../../components/ActionList.tsx"
import Queue from "../../components/Queue.tsx"
import { useAuthStore } from "../../stores/auth.ts"
import { httpClient } from "../../services/api.ts"

const HomePage = () => {
  const [actions, setActions] = useState<ActionType[]>([])
  const [queue, setQueue] = useState<string[]>([])

  const authToken = useAuthStore((state) => state.authToken)

  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")

  useEffect(() => {
    const eventEmitter = new EventSource(`/api/queue/events?authToken=${authToken}`)

    eventEmitter.addEventListener("open", () => {
      console.log("Event stream connected")

      eventEmitter.addEventListener("message", (event) => {
        const data = JSON.parse(event.data)

        setStatus("ready")
        setQueue(data.queue)
        setActions(data.actions)
      })

      eventEmitter.addEventListener("error", () => {
        console.log("Error connecting to event stream")
        setStatus("error")
      })
    })

    return () => {
      eventEmitter.close()
    }
  }, [])

  const handleAddToQueue = async (action: ActionType) => {
    const payload = { action: action.type }
    const response = await httpClient.post("queue", { body: JSON.stringify(payload) }).json()

    console.log("Response", response)
  }

  return (
    <div className={css({ w: "full", display: "flex" })}>
      {status === "ready" ? (
        <div
          className={css({
            display: "flex",
            justifyContent: "space-evenly",
            width: "full",
            my: 20,
          })}
        >
          <div>
            <ActionList actions={actions} addToQueue={handleAddToQueue} />
          </div>
          <div>
            <Queue queue={queue} />
          </div>
        </div>
      ) : status === "loading" ? (
        <div>loading ...</div>
      ) : (
        <div>error</div>
      )}
    </div>
  )
}

export default HomePage
