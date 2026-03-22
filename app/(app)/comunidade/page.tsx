'use client'
import { motion } from 'framer-motion'
import Header from '@/components/ui/Header'
import CalendarStrip from '@/components/ui/CalendarStrip'
import CommunityPost from '@/components/community/CommunityPost'

export default function ComunidadePage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#F8F8F8]">
      <div style={{ background: 'linear-gradient(180deg, #0B201C 0%, #3C5955 55%, #B7C5C5 100%)' }}>
        <Header />
        <CalendarStrip />
      </div>
      <div className="p-4 space-y-4">
        <h2 className="font-semibold text-[#1A1A1A] text-sm">Feed da Comunidade</h2>
        {[0, 1].map((i) => <CommunityPost key={i} />)}
      </div>
    </motion.div>
  )
}
