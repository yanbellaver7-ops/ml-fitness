'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import Header from '@/components/ui/Header'
import CalendarStrip from '@/components/ui/CalendarStrip'
import TabSwitcher from '@/components/ui/TabSwitcher'
import WorkoutCard from '@/components/workout/WorkoutCard'
import CommunityPost from '@/components/community/CommunityPost'
import { mockWorkouts } from '@/lib/mock-data'

export default function TreinoPage() {
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
            <div>
              <h2 className="font-semibold text-[#1A1A1A] mb-3 text-sm">Meu Treino Ativo</h2>
              <div className="space-y-3">
                {mockWorkouts.map((w, i) => <WorkoutCard key={w.id} {...w} index={i} />)}
              </div>
              <button className="flex items-center gap-1 text-[#22C55E] text-sm font-medium mt-3">
                Ver Todos os Treinos Ativos <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h2 className="font-semibold text-[#1A1A1A] mb-3 text-sm">Última Postagem</h2>
              <CommunityPost />
            </div>
          </motion.div>
        ) : (
          <motion.div key="nutricao" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4">
            <p className="text-[#827F77] text-sm text-center mt-8">Vá para a aba Nutrição para ver mais detalhes.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
