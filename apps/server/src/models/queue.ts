import { QueueManager } from "@waalaxy-test/fifo"
import { randomMinMax } from "@waalaxy-test/utils"

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
}, QueueManager.DELAY_ACTONS)

export { queueManager }
