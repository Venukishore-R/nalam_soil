import type { Farmer } from '../types/farmer'

interface FarmerCardProps {
  farmer: Farmer
}

export default function FarmerCard({ farmer }: FarmerCardProps) {
  return (
    <div className="space-y-1 rounded-2xl border border-indigo-200 bg-indigo-50 p-4 text-sm text-slate-900 shadow-sm">
      <p>
        <strong>Farmer:</strong> {farmer.name}
      </p>
      <p>
        <strong>Village:</strong> {farmer.village}
      </p>
      <p>
        <strong>District:</strong> {farmer.district}
      </p>
      <p>
        <strong>ID:</strong> {farmer.id}
      </p>
    </div>
  )
}
