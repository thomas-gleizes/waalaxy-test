import { randomMinMax } from "@waalaxy-test/utils"

export abstract class Action {
  private readonly _label: string
  private readonly _maxCredits: number
  private _credits: number

  protected constructor(label: string, maxCredits: number) {
    this._label = label
    this._maxCredits = maxCredits
    this._credits = randomMinMax(maxCredits * 0.8, maxCredits)
  }

  protected execute() {
    this.consumeCredit()
  }

  protected consumeCredit() {
    this._credits--
  }

  public toJSON(): ActionType {
    return {
      label: this._label,
      maxCredits: this._maxCredits,
      credits: this._credits,
    }
  }
}

export type ActionType = {
  label: string
  maxCredits: number
  credits: number
}
