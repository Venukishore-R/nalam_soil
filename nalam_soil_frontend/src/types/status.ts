export type StatusType = 'idle' | 'pending' | 'success' | 'error'

export interface StatusState {
  state: StatusType
  message?: string
}
