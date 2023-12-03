import { QueueManager } from "@waalaxy-test/fifo"
import { randomMinMax } from "@waalaxy-test/utils"

const actions: Array<{ type: string; credits: number }> = [
  { type: "Sleeping", credits: 20 },
  { type: "Eating", credits: 20 },
  { type: "Working", credits: 60 },
  { type: "Playing", credits: 15 },
  { type: "Studying", credits: 20 },
  { type: "Reading", credits: 40 },
  { type: "Watching", credits: 30 },
  { type: "Coding", credits: 20 },
]

export const createQueueManager = () => {
  const queueManager = new QueueManager()

  for (let i = 0; i < randomMinMax(actions.length * 0.5, actions.length - 1); i++)
    queueManager.addAction(actions[i].type, actions[i].credits)

  for (let i = 0; i < randomMinMax(30, 500); i++)
    queueManager.addToQueue(queueManager.actions[randomMinMax(0, queueManager.actions.length - 1)])

  return queueManager
}
