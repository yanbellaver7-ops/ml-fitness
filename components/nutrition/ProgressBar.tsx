'use client'
import { motion } from 'framer-motion'

interface Props {
  label: string
  percent: number
  current: number
  max: number
}

export default function ProgressBar({ label, percent, current, max }: Props) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-[#1A1A1A]">{label}</span>
        <span className="text-sm text-[#827F77]">{percent}% ({current}/{max}kcal)</span>
      </div>
      <div className="h-2.5 bg-[#E5E7EB] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #22C55E 0%, #0B201C 100%)' }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
