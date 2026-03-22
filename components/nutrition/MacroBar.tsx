'use client'
import { motion } from 'framer-motion'

interface Props {
  label: string
  current: number
  max: number
  unit: string
  color: string
}

export default function MacroBar({ label, current, max, unit, color }: Props) {
  const pct = Math.min((current / max) * 100, 100)
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-xs font-medium text-[#1A1A1A]">{label}</span>
        <span className="text-xs text-[#827F77]">{current}/{max}{unit}</span>
      </div>
      <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
