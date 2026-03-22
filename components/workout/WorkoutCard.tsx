'use client'
import { motion } from 'framer-motion'
import { Clock, Zap, CheckCircle } from 'lucide-react'

interface Props {
  title: string
  duration: string
  type: string
  status: string
  progress: number
  index: number
}

export default function WorkoutCard({ title, duration, type, status, progress, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
      className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B201C] to-[#3C5955] flex items-center justify-center flex-shrink-0">
        <Zap className="w-6 h-6 text-[#22C55E]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[#1A1A1A] text-sm leading-tight mb-2">{title}</p>
        <div className="flex gap-2">
          <span className="flex items-center gap-1 bg-[#F0F0F0] rounded-full px-2.5 py-1 text-[11px] font-medium text-[#1A1A1A]">
            <Clock className="w-3 h-3 text-[#22C55E]" />{duration}
          </span>
          <span className="flex items-center gap-1 bg-[#F0F0F0] rounded-full px-2.5 py-1 text-[11px] font-medium text-[#1A1A1A]">
            <Zap className="w-3 h-3 text-[#F97316]" />{type}
          </span>
        </div>
      </div>
      <div className="flex-shrink-0">
        {status === 'done' ? (
          <div className="flex items-center gap-1 text-[#22C55E]">
            <CheckCircle className="w-5 h-5" />
            <span className="text-xs font-medium">Concluído</span>
          </div>
        ) : (
          <span className="text-xs font-medium text-[#827F77]">{progress}% Concluído</span>
        )}
      </div>
    </motion.div>
  )
}
