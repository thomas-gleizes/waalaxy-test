import { Request, Response } from "express"
import { QueueManager } from "@waalaxy-test/fifo"
import { randomMinMax } from "@waalaxy-test/utils"

const DELAY_ACTONS = 1000 * 5

const queueManager = new QueueManager()

queueManager.addAction("Calling", 20)
queueManager.addAction("Meeting", 25)
queueManager.addAction("Talking", 30)
queueManager.addAction("Spelling", 30)
queueManager.addAction("Coding", 40)
queueManager.addAction("Writing", 50)
queueManager.addAction("Reading", 60)
queueManager.addAction("Thinking", 70)
queueManager.addAction("Sleeping", 80)
queueManager.addAction("Eating", 90)

for (let i = 0; i < randomMinMax(30, 500); i++)
  queueManager.addToQueue(queueManager.actions[randomMinMax(0, queueManager.actions.length - 1)])

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

  const action = queueManager.actions.find((action) => action.type === actionType)

  if (!action) return res.status(404).json({ message: "Action not found" })

  queueManager.addToQueue(action)

  res.status(201).json({ queue: queueManager })
}

export const displayQueue = (req: Request, res: Response) => {
  res.json({
    queue: queueManager.queue,
    actions: queueManager.actions,
  })
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
