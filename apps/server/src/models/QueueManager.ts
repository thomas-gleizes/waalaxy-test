import { Action, Queue } from "../../types/queue"

export class QueueManager {
  private queue: Queue = { actions: [], credits: {} }

  // Ajouter une action à la queue
  addAction(action: Action) {
    this.queue.actions.push(action)
  }

  executeNextAction() {
    if (this.queue.actions.length > 0) {
      const nextAction = this.queue.actions.shift()
      if (nextAction) {
        this.consumeCredit(nextAction.type)
        console.log(`Executing action: ${nextAction.type}`)
        console.log(`Remaining credits: ${JSON.stringify(this.queue.credits)}`)
      }
    } else {
      throw new Error("the queue is empty")
    }
  }

  showQueue() {
    return this.queue
  }

  // Décrémenter les crédits après l'exécution d'une action
  private consumeCredit(actionType: string) {
    if (this.queue.credits[actionType] > 0) {
      this.queue.credits[actionType]--
    }
  }
}
