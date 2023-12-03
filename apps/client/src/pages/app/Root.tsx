import { useAuthStore } from "../../stores/auth.ts"
import { Navigate, Outlet } from "react-router-dom"

const AppRoot: Component = () => {
  const isAuthenticated = useAuthStore((store) => store.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/connexion" />
  }

  return <Outlet />
}

export default AppRoot
