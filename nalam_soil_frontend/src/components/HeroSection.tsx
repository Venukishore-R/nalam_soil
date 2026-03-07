import type { ReactNode } from 'react'

interface HeroSectionProps {
  eyebrow?: string
  title: string
  description: string | ReactNode
  actions?: ReactNode
}

export default function HeroSection({
  eyebrow = 'Farmer intake',
  title,
  description,
  actions,
}: HeroSectionProps) {
  return (
    <div className="space-y-3 text-slate-900">
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{eyebrow}</p>
      )}
      <h1 className="text-3xl font-semibold leading-tight">{title}</h1>
      <p className="max-w-3xl text-sm leading-relaxed text-slate-600">{description}</p>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </div>
  )
}
