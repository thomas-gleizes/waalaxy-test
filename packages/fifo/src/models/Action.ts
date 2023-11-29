import { randomMinMax } from "@waalaxy-test/utils"

export interface ActionType {
  type: string
  maxCredits: number
  initialCredits: number
  credits: number
}

export class Action {
  private readonly _type: string
  private readonly _maxCredits: number
  private _initialCredits: number
  private _credits: number

  constructor(type: string, maxCredits: number) {
    if (maxCredits <= 0) throw new Error("Max credits must be greater than 0")

    this._type = type
    this._maxCredits = maxCredits

    this.initCredits()
  }

  private initCredits() {
    this._credits = randomMinMax(Math.ceil(this._maxCredits * 0.8), this._maxCredits)
    this._initialCredits = this._credits
  }

  public resetCredits() {
    this.initCredits()
  }

  get type() {
    return this._type
  }

  get credits() {
    return this._credits
  }

  public consumeCredits() {
    if (this._credits === 0) throw new Error(`No credits left to action ${this._type}`)

    console.log("Executing action", this._type, "with", this._credits, "credits")
    this._credits--
  }

  public toJSON(): ActionType {
    return {
      type: this._type,
      maxCredits: this._maxCredits,
      initialCredits: this._initialCredits,
      credits: this._credits,
    }
  }
}
