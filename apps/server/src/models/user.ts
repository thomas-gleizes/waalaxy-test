import { QueueManager } from "@waalaxy-test/fifo"
import { User } from "@waalaxy-test/utils"
import { createQueueManager } from "../services/queueManager"
import { EventQueue } from "../services/event"

type ItemDB = {
  queueManager: QueueManager
  event: EventQueue
}

const userDb: Map<User, ItemDB> = new Map()

export const findUserByName = (name: string) => {
  return Array.from(userDb.keys()).find((user) => user.name === name)
}

export const addUser = (user: User): User => {
  const queueManager = createQueueManager()
  const event = new EventQueue()

  userDb.set(user, { queueManager, event })

  setInterval(() => {
    queueManager.executeFirstAction()
    event.emit("update")
  }, 1000 * 3)

  return user
}

export const removeUser = (user: User): User => {
  userDb.delete(user)

  return user
}

export const getUserQueueManagerByUserName = (name: string) => {
  return userDb.get(findUserByName(name)).queueManager
}

export const getUserEventByUserName = (name: string) => {
  return userDb.get(findUserByName(name)).event
}
