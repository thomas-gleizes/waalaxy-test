import { useEffect, useState } from "react"
import { css } from "../styled-system/css"

const App = () => {
  const [events, setEvents] = useState<string[]>([])
  const [connected, setConnected] = useState<boolean>(false)

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8080/api/queue/events")

    eventSource.onmessage = (event) => {
      console.log("new message on event source", event)

      setEvents((events) => [...events, event.data])
    }

    eventSource.onopen = () => {
      setConnected(true)
    }

    eventSource.onerror = () => {
      setConnected(false)
    }

    console.log("EventSources", eventSource)
  }, [])

  const handleClick = async () => {
    const data = await fetch("/api/queue").then((resp) => resp.json())
    console.log("Data", data)
  }

  return (
    <div>
      Status: {connected ? "Online" : "Offline"}
      <div>
        Events: {events.length}
        <ul>
          {events.map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ul>
      </div>
      <div>
        <button className={css()} onClick={handleClick}>
          Click me
        </button>
      </div>
    </div>
  )
}

export default App
