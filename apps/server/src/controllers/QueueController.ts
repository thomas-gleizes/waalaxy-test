import { Request, Response } from "express"
import { QueueManager } from "@waalaxy-test/fifo"

const DELAY_ACTONS = 1000 * 2

const queueManager = new QueueManager()

queueManager.addAction("A", 5)
queueManager.addAction("B", 30)
queueManager.addAction("C", 40)

queueManager.addToQueue(queueManager.actions()[0])
queueManager.addToQueue(queueManager.actions()[0])
queueManager.addToQueue(queueManager.actions()[0])
queueManager.addToQueue(queueManager.actions()[0])
queueManager.addToQueue(queueManager.actions()[0])
queueManager.addToQueue(queueManager.actions()[1])
queueManager.addToQueue(queueManager.actions()[1])
queueManager.addToQueue(queueManager.actions()[1])
queueManager.addToQueue(queueManager.actions()[0])
queueManager.addToQueue(queueManager.actions()[1])

setInterval(() => {
  try {
    queueManager.executeFirstAction()
  } catch (error) {
    console.error(error.message)
    queueManager.resetQueue()
  }
}, DELAY_ACTONS)

export const addToQueue = (req: Request, res: Response) => {
  const { action: actionType } = req.body

  const action = queueManager.actions().find((action) => action.type === actionType)

  if (!action) return res.status(404).json({ message: "Action not found" })

  queueManager.addToQueue(action)

  res.status(201).json({ queue: queueManager })
}

export const displayActions = (req: Request, res: Response) => {
  res.json({ actions: queueManager.actions() })
}

export const displayQueueAndCredits = (req: Request, res: Response) => {
  res.json({ queue: queueManager })
}

export const eventEmitter = (req: Request, res: Response) => {
  // Définir les en-têtes appropriés pour EventSource
  res.setHeader("Content-Type", "text/event-stream")
  res.setHeader("Cache-Control", "no-cache")
  res.setHeader("Connection", "keep-alive")

  res.write(`data: ${JSON.stringify(queueManager)}\n\n`)

  // Envoyer des mises à jour à l'événement toutes les 2 secondes
  const intervalId = setInterval(() => {
    res.write(`data: ${JSON.stringify(queueManager)}\n\n`)
  }, DELAY_ACTONS)

  // Gérer la déconnexion du client
  req.on("close", () => {
    clearInterval(intervalId)
    res.end()
  })
}
