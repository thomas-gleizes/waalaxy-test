import { Action } from "./Action"

export class TalkAction extends Action {
  constructor() {
    super("talk", 10)
  }
  execute() {
    console.log("TalkAction executed")
  }
}
