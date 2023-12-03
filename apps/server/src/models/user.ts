import { QueueManager } from "@waalaxy-test/fifo"
import { User } from "../../types"
import { createQueueManager } from "../services/queueManager"

const userDb: Map<User, QueueManager> = new Map()

export const findUserByName = (name: string) => {
  return Array.from(userDb.keys()).find((user) => user.name === name)
}

export const addUser = (user: User): User => {
  userDb.set(user, createQueueManager())

  return user
}

export const removeUser = (user: User): User => {
  userDb.delete(user)

  return user
}

export const getUserQueueManagerByUserName = (name: string) => {
  return userDb.get(findUserByName(name))
}
