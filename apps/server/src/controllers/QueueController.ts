import { Request, Response } from "express"
import { CallAction, Queue, TalkAction } from "@waalaxy-test/fifo"

const DELAY_ACTONS = 1000 * 60 * 2

const queue = new Queue()

setInterval(() => {
  queue.executeFirstAction()
}, DELAY_ACTONS)

export const addToQueue = (req: Request, res: Response) => {
  switch (req.body.type) {
    case "call":
      queue.addToQueue(new CallAction())
      break
    case "talk":
      queue.addToQueue(new TalkAction())
      break
    default:
      return res.status(400).send()
  }

  res.status(201).json({ queue })
}

export const displayQueueAndCredits = (req: Request, res: Response) => {
  res.json({ queue })
}

export const eventEmitter = (req: Request, res: Response) => {
  // Définir les en-têtes appropriés pour EventSource
  res.setHeader("Content-Type", "text/event-stream")
  res.setHeader("Cache-Control", "no-cache")
  res.setHeader("Connection", "keep-alive")

  // Envoyer des mises à jour à l'événement toutes les 2 secondes
  const intervalId = setInterval(() => {
    const payload = {
      timestamp: Date.now(),
      queue: queue,
    }

    res.write(`data: ${JSON.stringify(payload)}\n\n`)
  }, DELAY_ACTONS)

  // Gérer la déconnexion du client
  req.on("close", () => {
    clearInterval(intervalId)
    res.end()
  })
}
