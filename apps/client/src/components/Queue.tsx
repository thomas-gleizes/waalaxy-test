import { css } from "../../styled-system/css"

interface Props {
  queue: string[]
}
const Queue: Component<Props> = ({ queue }) => {
  return (
    <div className={css({ shadow: "lg", p: 5 })}>
      <div className={css({ borderBottom: "1px solid" })}>
        <h2 className={css({ color: "primary", fontWeight: "semibold", fontSize: "xl" })}>
          Liste des action prévue ({queue.length})
        </h2>
      </div>
      <div className={css({ display: "flex", flexDir: "column", maxH: 700, overflowY: "auto" })}>
        {queue.map((action, index) => (
          <div
            key={index}
            className={css({
              display: "flex",
              justifyContent: "space-between",
              _odd: { bg: "gray.100" },
              _even: { bg: "gray.200" },
              py: 2,
              px: 4,
            })}
          >
            <div># {index + 1} </div>
            <div>{action}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Queue
