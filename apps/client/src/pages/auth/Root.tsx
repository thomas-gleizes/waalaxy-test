import { Navigate, Outlet } from "react-router-dom"

import { useAuthStore } from "../../stores/auth.ts"

const AuthRoot: Component = () => {
  const isAuthenticated = useAuthStore((store) => store.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return <Outlet />
}

export default AuthRoot
