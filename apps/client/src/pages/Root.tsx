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
        py: 5,
      })}
    >
      <Outlet />
      <div className={css({ pos: "absolute", w: "screen", top: 0, left: 0 })}>
        <div
          className={css({
            px: 5,
            py: 2,
            backdropFilter: "auto",
            backdropBlur: "sm",
          })}
        >
          <button
            className={css({
              bg: "primary",
              color: "white",
              px: 2,
              py: 0.5,
              rounded: "sm",
              cursor: "pointer",
            })}
            onClick={handleClear}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default Root
