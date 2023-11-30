import { useEffect, useState } from "react"
import axios from "axios"

import { ActionType } from "@waalaxy-test/fifo"
import { css } from "../styled-system/css"
import ActionList from "./components/ActionList.tsx"
import Queue from "./components/Queue.tsx"

const App = () => {
  const [actions, setActions] = useState<ActionType[]>([])
  const [queue, setQueue] = useState<string[]>([])

  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")

  useEffect(() => {
    const eventEmitter = new EventSource("/api/queue/events")

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
    const response = await axios.post("/api/queue", { action: action.type })

    setQueue(response.data.queue)
  }

  return (
    <div
      data-theme="dark"
      className={css({
        minH: "screen",
        w: "screen",
        bgColor: "gray.800",
        display: "flex",
      })}
    >
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

export default App
