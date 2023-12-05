import { css } from "../../styled-system/css"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/auth.ts"

const Root = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleClear = () => {
    if (isAuthenticated) {
      logout()
    }

    localStorage.clear()
    navigate("/connexion")
  }

  return (
    <div
      className={css({
        pos: "relative",
        minH: "screen",
        w: "screen",
        bgColor: "gray.800",
        display: "flex",
      })}
    >
      <Outlet />
      <div className={css({ pos: "absolute", bottom: "0", left: 0 })}>
        <div className={css({ px: 5, py: 2 })}>
          <button onClick={handleClear}>Clear</button>
        </div>
      </div>
    </div>
  )
}

export default Root
