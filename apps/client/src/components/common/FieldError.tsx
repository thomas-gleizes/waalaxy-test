import { css } from "../../../styled-system/css"
import { FieldError as RHFFieldError } from "react-hook-form"

interface Props {
  error: RHFFieldError | undefined
}

const FieldError: Component<Props> = ({ error }) => {
  if (!error) return null

  return <div className={css({ color: "red", fontSize: "sm" })}>{error.message}</div>
}

export default FieldError
