export interface User {
  name: string
  password: string
}

export type UserWithoutPassword = Omit<User, "password">
