'use client'
import { motion } from 'framer-motion'

interface Props {
  label: string
  value: string
  meta: string
  metaUnit: string
  index: number
}

export default function StatCard({ label, value, meta, metaUnit, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
    >
      <div>
        <p className="text-[36px] font-bold text-[#1A1A1A] leading-none">{value}</p>
        <p className="text-[#827F77] text-sm mt-1">{label}</p>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-8 bg-[#F97316] rounded-full" />
        <div className="text-right">
          <p className="text-[11px] text-[#827F77] font-medium">{label === 'Treinos Concluídos' ? 'Treinos' : label}</p>
          <p className="text-[11px] text-[#F97316] font-semibold">Meta: {meta} {metaUnit}</p>
        </div>
      </div>
    </motion.div>
  )
}
