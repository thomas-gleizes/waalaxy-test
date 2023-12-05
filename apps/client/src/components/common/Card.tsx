import { ReactNode } from "react"
import { css } from "../../../styled-system/css"

interface Props {
  title: string
  children: ReactNode
}

const Card: Component<Props> = ({ title, children }) => {
  return (
    <div className={css({ shadow: "lg", p: 5, bgColor: "gray.100", rounded: "sm" })}>
      <div className={css({ borderBottom: "1px solid", borderColor: "primary" })}>
        <h2 className={css({ color: "primary", fontWeight: "semibold", fontSize: "xl" })}>
          {title}
        </h2>
      </div>
      <div className={css({ p: 2 })}>{children}</div>
    </div>
  )
}

export default Card
