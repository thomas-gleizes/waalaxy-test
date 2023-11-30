import { useState } from "react"

import { ActionType } from "@waalaxy-test/fifo"
import { css } from "../../styled-system/css"
import Card from "./common/Card.tsx"

interface Props {
  actions: ActionType[]
  addToQueue: (action: ActionType) => Promise<void>
}

const styles = {
  actionRow: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid",
    _last: { borderBottom: "none" },
    py: 2,
    mt: 2,
  }),
  button: css({
    border: "1px solid",
    rounded: "md",
    bgColor: "primary",
    shadow: "lg",
    px: 5,
    py: 2,
    color: "white",
    cursor: "pointer",
    transition: "all 100ms ease-in-out",
    _disabled: { opacity: 0.5, cursor: "not-allowed" },
    _hover: { scale: "105%" },
  }),
}

const ActionList: Component<Props> = ({ actions, addToQueue }) => {
  const [mutating, setMutating] = useState<string | null>(null)

  const handleAddToQueue = async (action: ActionType) => {
    setMutating(action.type)
    await addToQueue(action)
    setMutating(null)
  }

  return (
    <Card title="Liste des actions disponnibles">
      <div className={css({ display: "flex", flexDir: "column" })}>
        {actions.map((action, index) => (
          <div key={index} className={styles.actionRow}>
            <div>
              <p>Action: {action.type} </p>
              <p>
                Credits: {action.credits} / {action.maxCredits}
              </p>
            </div>
            <div>
              <button
                disabled={Boolean(mutating)}
                onClick={() => handleAddToQueue(action)}
                className={styles.button}
              >
                {mutating === action.type ? "Chargement" : "Ajouter"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default ActionList
