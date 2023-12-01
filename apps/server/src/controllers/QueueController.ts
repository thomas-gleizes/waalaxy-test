import { Request, Response } from "express"
import { QueueManager } from "@waalaxy-test/fifo"

import { queueManager } from "../models/queue"

export const addToQueue = (req: Request, res: Response) => {
  const { action: actionType } = req.body

  const action = queueManager.actions.find((action) => action.type === actionType)

  if (!action) return res.status(404).json({ message: "Action not found" })

  queueManager.addToQueue(action)

  res.status(201).json(queueManager)
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
  }, QueueManager.DELAY_ACTONS)

  // Gérer la déconnexion du client
  req.on("close", () => {
    clearInterval(intervalId)
    res.end()
  })
}
