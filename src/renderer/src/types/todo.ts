export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export interface TodoStats {
  total: number
  completed: number
  pending: number
}
