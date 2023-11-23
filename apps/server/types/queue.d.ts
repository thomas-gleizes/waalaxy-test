export interface Action {
  type: string
  credits: number
}

export interface Queue {
  actions: Action[]
  credits: { [key: string]: number }
}
