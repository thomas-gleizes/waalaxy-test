import { Action } from "./actions"

export class Queue {
  private _actions: Action[]

  constructor() {
    this._actions = []
  }

  addToQueue(action: Action) {
    this._actions.push(action)
  }

  public getFirstAction() {
    return this._actions.at(0)
  }

  public executeFirstAction() {
    const firstAction = this.getFirstAction()
    if (firstAction) {
      this._actions.shift()
    }
  }

  get actions() {
    return this._actions
  }

  public toJSON() {
    return {
      actions: this._actions.map((action) => action.toJSON()),
    }
  }
}
