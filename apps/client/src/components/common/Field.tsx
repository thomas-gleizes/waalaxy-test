import { forwardRef, InputHTMLAttributes, useId } from "react"
import { css } from "../../../styled-system/css"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Field: Component<Props> = forwardRef<HTMLInputElement, Props>(({ label, ...props }, ref) => {
  const idField = useId()

  return (
    <div className={css({ display: "flex", flexDir: "column" })}>
      <label className={css({ color: "black" })} htmlFor={idField}>
        {label}
      </label>
      <input
        ref={ref}
        className={css({
          borderColor: "gray.200",
          border: "1px solid",
          rounded: "sm",
          outline: "none",
          px: 3,
          py: 1,
          _hover: {
            borderColor: "primary",
          },
          _active: {
            borderColor: "primary",
          },
        })}
        name={idField}
        {...props}
      />
    </div>
  )
})

export default Field
