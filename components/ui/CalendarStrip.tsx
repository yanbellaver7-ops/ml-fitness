'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { mockCalendarDays } from '@/lib/mock-data'

export default function CalendarStrip() {
  return (
    <div className="px-5 py-3 -mt-4 relative z-10">
      <div className="flex items-center justify-between mb-3">
        <ChevronLeft className="text-white w-5 h-5 cursor-pointer" />
        <span className="text-white font-semibold text-sm">Fevereiro 2022</span>
        <ChevronRight className="text-white w-5 h-5 cursor-pointer" />
      </div>
      <div className="flex gap-1 justify-between">
        {mockCalendarDays.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className={`text-[10px] font-medium ${d.active ? 'text-[#22C55E]' : 'text-white/70'}`}>{d.day}</span>
            <div className={`w-9 h-9 rounded-full flex items-center justify-center ${d.active ? 'bg-[#0B201C]' : 'bg-white/20'}`}>
              <span className={`text-sm font-bold ${d.active ? 'text-white' : 'text-white'}`}>{d.num}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
