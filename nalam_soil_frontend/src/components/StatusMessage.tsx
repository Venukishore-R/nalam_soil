import type { StatusState } from '../types/status'

interface StatusMessageProps {
  status: StatusState
  prefix: string
}

export default function StatusMessage({ status, prefix }: StatusMessageProps) {
  const { state, message } = status

  if (state === 'idle' || !message) {
    return null
  }

  const baseStyles = 'text-sm rounded-2xl px-3 py-2 font-semibold'
  const stateStyles =
    state === 'success'
      ? 'bg-emerald-100 border border-emerald-300 text-emerald-900'
      : 'bg-rose-100 border border-rose-300 text-rose-900'

  return (
    <p className={`${baseStyles} ${stateStyles}`}>
      <strong>{prefix}:</strong> {message}
    </p>
  )
}
