import { randomMinMax } from "@waalaxy-test/utils"

export class Action {
  private readonly _type: string
  private readonly _maxCredits: number
  private _initialCredits: number
  private _credits: number

  constructor(type: string, maxCredits: number) {
    this._type = type
    this._maxCredits = maxCredits
    this.initCredits()
  }

  public initCredits() {
    this._credits = randomMinMax(this._maxCredits * 0.8, this._maxCredits)
    this._initialCredits = this._credits
  }

  get type() {
    return this._type
  }

  get credits() {
    return this._credits
  }

  public consumeCredits() {
    console.log("Executing action", this._type, "with", this._credits, "credits")
    this._credits--
  }

  public toJSON() {
    return {
      type: this._type,
      maxCredits: this._maxCredits,
      initialCredits: this._initialCredits,
      credits: this._credits,
    }
  }
}
