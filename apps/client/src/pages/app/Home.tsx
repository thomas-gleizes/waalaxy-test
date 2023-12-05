import { useEffect, useState } from "react"
import { ActionType } from "@waalaxy-test/fifo"

import { css } from "../../../styled-system/css"
import ActionList from "../../components/ActionList.tsx"
import WaitingList from "../../components/WaitingList.tsx"
import { useAuthStore } from "../../stores/auth.ts"
import { httpClient } from "../../services/api.ts"

const HomePage = () => {
  const [actions, setActions] = useState<ActionType[]>([])
  const [queue, setQueue] = useState<string[]>([])

  const authToken = useAuthStore((state) => state.authToken)

  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")

  useEffect(() => {
    const eventSource = new EventSource(`/api/queue/events?authToken=${authToken}`)

    eventSource.addEventListener("open", () => {
      console.log("Event stream connected")

      eventSource.addEventListener("message", (event) => {
        const data = JSON.parse(event.data)

        setStatus("ready")
        setQueue(data.queue)
        setActions(data.actions)
      })

      eventSource.addEventListener("error", () => {
        console.log("Error connecting to event stream")
        setStatus("error")
      })
    })

    return () => {
      eventSource.close()
    }
  }, [])

  const handleAddToQueue = async (action: ActionType) => {
    const payload = { action: action.type }
    const data = (await httpClient
      .post("queue", { body: JSON.stringify(payload) })
      .json()) satisfies { queue: string[]; actions: ActionType[] }

    setQueue(data.queue)
    setActions(data.actions)
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
            <WaitingList queue={queue} />
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
