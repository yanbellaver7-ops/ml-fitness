'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Header from '@/components/ui/Header'
import CalendarStrip from '@/components/ui/CalendarStrip'
import TabSwitcher from '@/components/ui/TabSwitcher'
import DonutChart from '@/components/nutrition/DonutChart'
import MacroBar from '@/components/nutrition/MacroBar'
import ProgressBar from '@/components/nutrition/ProgressBar'
import WeeklyProgress from '@/components/nutrition/WeeklyProgress'
import NutritionHistoryItem from '@/components/nutrition/NutritionHistoryItem'
import ChatCoachButton from '@/components/workout/ChatCoachButton'
import { mockNutrition } from '@/lib/mock-data'

export default function RefeicaoPage() {
  const [tab, setTab] = useState<'treinos' | 'nutricao'>('nutricao')

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
        {tab === 'nutricao' ? (
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
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-[#1A1A1A] text-sm">Meta Nutricional</h2>
                <button className="text-xs text-[#22C55E] font-medium">Ver Tudo</button>
              </div>
              <p className="text-2xl font-bold text-[#1A1A1A] mb-1">{mockNutrition.goal.toLocaleString('pt-BR')} calorias</p>
              <p className="text-xs text-[#827F77] mb-4">Com base no seu estado de saúde, recomendamos que você consuma {mockNutrition.goal}cal diariamente.</p>
              <h3 className="font-semibold text-sm text-[#1A1A1A] mb-3">Progresso de Hoje</h3>
              <ProgressBar label="Calorias" percent={mockNutrition.todayProgress.percent} current={mockNutrition.todayProgress.calories} max={mockNutrition.todayProgress.max} />
              <WeeklyProgress days={mockNutrition.weeklyProgress} />
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-[#1A1A1A] text-sm">Histórico Nutricional</h2>
                <button className="text-xs text-[#22C55E] font-medium">Ver Tudo</button>
              </div>
              {mockNutrition.history.map((h) => <NutritionHistoryItem key={h.id} name={h.name} kcal={h.kcal} date={h.date} />)}
            </div>
          </motion.div>
        ) : (
          <motion.div key="treinos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4">
            <p className="text-[#827F77] text-sm text-center mt-8">Selecione a aba Nutrição para ver suas refeições.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
