import { HTMLAttributes, ReactNode } from "react"
import { css } from "../../../styled-system/css"

interface Props extends HTMLAttributes<HTMLSpanElement> {
  color: string

  children: ReactNode
}

const Badge: Component<Props> = ({ children, color, ...props }) => {
  return (
    <span
      className={css({
        display: "inline-block",
        px: 2,
        py: 1,
        rounded: "md",
        shadow: "md",
        bg: color,
        color: "white",
        fontSize: "xs",
      })}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge
