'use client'
import { ChevronRight } from 'lucide-react'

interface Props {
  name: string
  kcal: number
  date: string
}

export default function NutritionHistoryItem({ name, kcal, date }: Props) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="w-8 h-8 rounded-full bg-[#22C55E]/20 flex items-center justify-center flex-shrink-0">
        <div className="w-4 h-4 rounded-full bg-[#22C55E]" />
      </div>
      <div className="flex-1">
        <p className="font-bold text-sm text-[#1A1A1A]">{kcal}kcal</p>
        <p className="text-xs text-[#827F77]">{name}</p>
      </div>
      <div className="flex items-center gap-1 text-[#827F77]">
        <span className="text-xs">{date}</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  )
}
