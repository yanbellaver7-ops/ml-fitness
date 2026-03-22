'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Header from '@/components/ui/Header'
import CalendarStrip from '@/components/ui/CalendarStrip'
import TabSwitcher from '@/components/ui/TabSwitcher'
import StatCard from '@/components/workout/StatCard'
import WorkoutCard from '@/components/workout/WorkoutCard'
import ChatCoachButton from '@/components/workout/ChatCoachButton'
import DonutChart from '@/components/nutrition/DonutChart'
import MacroBar from '@/components/nutrition/MacroBar'
import { mockStats, mockWorkouts, mockNutrition } from '@/lib/mock-data'

export default function InicioPage() {
  const [tab, setTab] = useState<'treinos' | 'nutricao'>('treinos')

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#F8F8F8]">
      <div style={{ background: 'linear-gradient(180deg, #0B201C 0%, #3C5955 55%, #B7C5C5 100%)' }}>
        <Header />
        <CalendarStrip />
      </div>
      <div className="bg-white">
        <TabSwitcher active={tab} onChange={setTab} />
      </div>
      <AnimatePresence mode="wait">
        {tab === 'treinos' ? (
          <motion.div key="treinos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
                <Sparkles className="w-4 h-4 text-[#22C55E]" />
                <span className="font-semibold text-sm text-[#1A1A1A]">Resumo IA dos Treinos</span>
              </div>
              {mockStats.map((s, i) => <StatCard key={i} {...s} index={i} />)}
            </div>
            <ChatCoachButton />
            <div>
              <h2 className="font-semibold text-[#1A1A1A] mb-3 text-sm">Meu Treino Ativo</h2>
              <div className="space-y-3">
                {mockWorkouts.map((w, i) => <WorkoutCard key={w.id} {...w} index={i} />)}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="nutricao" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
                <Sparkles className="w-4 h-4 text-[#22C55E]" />
                <span className="font-semibold text-sm text-[#1A1A1A]">Resumo IA da Nutrição</span>
              </div>
              <DonutChart consumed={mockNutrition.consumed} total={mockNutrition.total} target={mockNutrition.target} />
              {mockNutrition.macros.map((m, i) => <MacroBar key={i} {...m} />)}
              <p className="text-sm text-[#827F77] mt-3 italic">{mockNutrition.aiMessage}</p>
            </div>
            <ChatCoachButton />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
