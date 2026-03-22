'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  consumed: number
  total: number
  target: number
}

export default function DonutChart({ consumed, total, target }: Props) {
  const [progress, setProgress] = useState(0)
  const r = 70
  const circ = 2 * Math.PI * r
  const pct = total / target

  useEffect(() => {
    const t = setTimeout(() => setProgress(pct), 100)
    return () => clearTimeout(t)
  }, [pct])

  return (
    <div className="flex items-center justify-center gap-6 py-4">
      <div className="text-center">
        <p className="text-2xl font-bold text-[#1A1A1A]">{consumed}</p>
        <p className="text-xs text-[#827F77]">consumidas</p>
      </div>
      <div className="relative">
        <svg width="160" height="160" className="-rotate-90">
          <circle cx="80" cy="80" r={r} fill="none" stroke="#E5E7EB" strokeWidth="10" />
          <motion.circle
            cx="80" cy="80" r={r} fill="none"
            stroke="#0B201C" strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ * (1 - progress) }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-[#1A1A1A]">{total.toLocaleString('pt-BR')}</p>
          <p className="text-xs text-[#827F77]">kcal total</p>
        </div>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-[#1A1A1A]">{target.toLocaleString('pt-BR')}</p>
        <p className="text-xs text-[#827F77]">meta</p>
      </div>
    </div>
  )
}
