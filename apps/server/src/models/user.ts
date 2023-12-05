import { QueueManager } from "@waalaxy-test/fifo"
import { User } from "@waalaxy-test/utils"
import { createQueueManager } from "../services/queueManager"
import { EventQueue } from "../services/event"
import Exception from "../exceptions/Exception"

type ItemDB = {
  queueManager: QueueManager
  event: EventQueue
}

const userDb: Map<User, ItemDB> = new Map()

const searchUser = (username: string) => {
  return Array.from(userDb.keys()).find((user) => user.name === username)
}

export const findUserByName = (name: string) => {
  const user = searchUser(name)

  if (!user) return undefined

  return { ...user }
}

export const addUser = (user: User): User => {
  if (searchUser(user.name)) throw new Exception("User already exists")

  const queueManager = createQueueManager()
  const event = new EventQueue()

  userDb.set(user, { queueManager, event })

  setInterval(() => {
    queueManager.executeFirstAction()
    event.emit("update")
  }, 1000 * 3)

  return { ...user }
}

export const getUserQueueManagerByUserName = (name: string) => {
  return userDb.get(searchUser(name)).queueManager
}

export const getUserEventByUserName = (name: string) => {
  return userDb.get(searchUser(name)).event
}
