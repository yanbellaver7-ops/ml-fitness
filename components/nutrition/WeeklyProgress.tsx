'use client'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle } from 'lucide-react'

interface Props {
  days: { day: string; done: boolean }[]
}

export default function WeeklyProgress({ days }: Props) {
  return (
    <div className="flex justify-between mt-4">
      {days.map((d, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
          className="flex flex-col items-center gap-1"
        >
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${d.done ? 'border-[#22C55E]' : 'border-[#EF4444]'}`}>
            {d.done
              ? <CheckCircle className="w-5 h-5 text-[#22C55E]" />
              : <XCircle className="w-5 h-5 text-[#EF4444]" />
            }
          </div>
          <span className={`text-[10px] font-medium ${d.done ? 'text-[#1A1A1A]' : 'text-[#EF4444]'}`}>{d.day}</span>
        </motion.div>
      ))}
    </div>
  )
}
