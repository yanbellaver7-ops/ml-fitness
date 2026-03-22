'use client'
import { Bell } from 'lucide-react'
import { mockUser } from '@/lib/mock-data'

export default function Header() {
  return (
    <div
      className="relative px-5 pt-10 pb-6"
      style={{ background: 'linear-gradient(180deg, #0B201C 0%, #3C5955 55%, #B7C5C5 100%)' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#3C5955] overflow-hidden flex items-center justify-center text-white font-bold text-sm">
            JS
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">{mockUser.name}</p>
            <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full">{mockUser.badge}</span>
          </div>
        </div>
        <div className="relative">
          <Bell className="text-white w-6 h-6" />
          <span className="absolute -top-1.5 -right-1.5 bg-[#EF4444] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">1</span>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-white/60 text-xs">Portal do Paciente</p>
        <p className="text-white font-semibold text-base">Dr. Mateus Louis</p>
      </div>
    </div>
  )
}
