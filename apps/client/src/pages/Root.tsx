import { css } from "../../styled-system/css"
import { Outlet } from "react-router-dom"

const Root = () => {
  return (
    <div
      className={css({
        minH: "screen",
        w: "screen",
        bgColor: "gray.800",
        display: "flex",
      })}
    >
      <Outlet />
    </div>
  )
}

export default Root
