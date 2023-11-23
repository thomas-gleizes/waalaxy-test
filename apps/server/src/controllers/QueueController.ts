import { Request, Response } from "express"
import { QueueManager } from "../models/QueueManager"

const queueManager = new QueueManager()

export const addToQueue = (req: Request, res: Response) => {
  const { type, credits } = req.body

  const action = { type, credits }
  queueManager.addAction(action)
  res.status(200).json({ message: "Action added to the queue" })
}

export const displayQueueAndCredits = (req: Request, res: Response) => {
  const queue = queueManager.showQueue()
  res.status(200).json({ queue })
}
