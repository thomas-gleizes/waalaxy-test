import { Request, Response } from "express"

import { getUserEventByUserName, getUserQueueManagerByUserName } from "../models/user"

export const addToQueue = (req: Request, res: Response) => {
  const { action: actionType } = req.body

  const queueManager = getUserQueueManagerByUserName(req.user.name)
  const event = getUserEventByUserName(req.user.name)

  const action = queueManager.actions.find((action) => action.type === actionType)

  if (!action) return res.status(404).json({ message: "Action not found" })

  queueManager.addToQueue(action)

  res.status(201).json(queueManager)
}

export const displayQueue = (req: Request, res: Response) => {
  const queueManager = getUserQueueManagerByUserName(req.user.name)

  res.json({
    queue: queueManager.queue,
    actions: queueManager.actions,
  })
}

export const eventEmitter = (req: Request, res: Response) => {
  const queueManager = getUserQueueManagerByUserName(req.user.name)
  const event = getUserEventByUserName(req.user.name)

  // Définir les en-têtes appropriés pour EventSource
  res.setHeader("Content-Type", "text/event-stream")
  res.setHeader("Cache-Control", "no-cache")
  res.setHeader("Connection", "keep-alive")

  res.write(`data: ${JSON.stringify(queueManager)}\n\n`)

  event.on("update", () => {
    console.log("Event catch")
    res.write(`data: ${JSON.stringify(queueManager)}\n\n`)
  })

  req.on("close", () => {
    res.end()
  })
}
