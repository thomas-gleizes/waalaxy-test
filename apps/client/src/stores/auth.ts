import type { UserWithoutPassword } from "@waalaxy-test/utils"
import { create } from "zustand"

const LOCALSTORAGE_KEY = "auth"

export interface AuthStore {
  isAuthenticated: boolean
  authToken: string | null
  user: UserWithoutPassword | null
  login: (authToken: string, user: UserWithoutPassword) => void
  logout: () => void
}

const initialAuthStore = (() => {
  const auth = localStorage.getItem(LOCALSTORAGE_KEY)
  if (auth) {
    const { authToken, user } = JSON.parse(auth)
    return { authToken, user, isAuthenticated: true }
  }
  return { authToken: null, user: null, isAuthenticated: false }
})()

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: initialAuthStore.isAuthenticated,
  authToken: initialAuthStore.authToken,
  user: initialAuthStore.user,
  login: (authToken: string, user: UserWithoutPassword) => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({ authToken, user }))
    set({ authToken, user, isAuthenticated: true })
  },
  logout: () => {
    localStorage.removeItem(LOCALSTORAGE_KEY)
    set({ authToken: null, user: null, isAuthenticated: false })
  },
}))
