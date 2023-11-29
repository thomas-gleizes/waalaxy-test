import { Action } from "./Action"

export class QueueManager {
  private readonly _queue: string[]
  private _actions: Map<string, Action>
  private _lastActionTime: number

  constructor() {
    this._queue = []
    this._actions = new Map<string, Action>()
    this._lastActionTime = Date.now()
  }

  public addAction(type: string, maxCredits: number): Action {
    if (this._actions.has(type)) throw new Error("Action already exists")

    const action = new Action(type, maxCredits)

    this._actions.set(type, action)

    return action
  }

  public addToQueue(action: Action) {
    if (!this._actions.has(action.type))
      throw new Error(
        "this action doesn't exist in this instance of queue manager. Please add it with method addAction",
      )

    this._queue.push(action.type)
  }

  public executeFirstAction() {
    // on vérifie qu'il reste des actions dans la queue
    if (this._queue.length === 0) throw new Error("No actions in queue")

    // on récupère l'action a executé
    const firstAction = this._actions.get(this._queue[0])!

    // on execute l'action
    firstAction.consumeCredits()

    // puis, on la supprime de la queue
    this._queue.shift()

    // on met à jour la date de la dernière action
    this._lastActionTime = Date.now()
  }

  get actions() {
    return Array.from(this._actions.values())
  }

  get queue() {
    return this._queue
  }

  public resetQueue() {
    // on vérifie si la dernière action a été effectuée il y a plus de 5 minutes
    if (Date.now() - this._lastActionTime > 1000 * 20)
      this._actions.forEach((action) => action.resetCredits())
  }

  public toJSON() {
    return {
      queue: this._queue,
      actions: Array.from(this._actions.values()),
    }
  }
}
