import { css } from "../../styled-system/css"
import Card from "./common/Card.tsx"
import Badge from "./common/Badge.tsx"

interface Props {
  queue: string[]
}
const Queue: Component<Props> = ({ queue }) => {
  return (
    <Card title={`Liste d'attentes (${queue.length})`}>
      <div
        className={css({
          display: "flex",
          minW: 250,
          flexDir: "column",
          maxH: 700,
          overflowY: "auto",
        })}
      >
        {queue.length ? (
          queue.map((action, index) => (
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
              <div>
                <Badge color="primary">{action}</Badge>
              </div>
            </div>
          ))
        ) : (
          <div className={css({ fontStyle: "italic" })}>Aucune action en attente</div>
        )}
      </div>
    </Card>
  )
}

export default Queue
