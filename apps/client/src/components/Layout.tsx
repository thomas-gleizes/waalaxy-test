import { ReactNode } from "react"
import { css } from "../../styled-system/css"

interface Props {
  children: ReactNode
}

const Layout: Component<Props> = ({ children }) => {
  return (
    <div
      className={css({
        minH: "screen",
        w: "screen",
        bgColor: "gray.800",
        display: "flex",
      })}
    >
      {children}
    </div>
  )
}

export default Layout
