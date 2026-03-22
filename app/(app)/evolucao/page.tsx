'use client'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, Weight, Heart, FileText } from 'lucide-react'
import Header from '@/components/ui/Header'
import { mockEvolucao } from '@/lib/mock-data'

const statusConfig = {
  melhora: { icon: TrendingUp, color: '#22C55E', bg: '#22C55E15', label: 'Melhora' },
  piora: { icon: TrendingDown, color: '#EF4444', bg: '#EF444415', label: 'Piora' },
  neutro: { icon: Minus, color: '#F97316', bg: '#F9731615', label: 'Estável' },
}

export default function EvolucaoPage() {
  const pesos = mockEvolucao.map(e => e.peso).reverse()
  const minPeso = Math.min(...pesos)
  const maxPeso = Math.max(...pesos)
  const range = maxPeso - minPeso || 1

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#F8F8F8]">
      <Header />

      {/* Weight chart */}
      <div className="mx-4 -mt-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-sm mb-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Weight className="w-4 h-4 text-[#22C55E]" />
            <span className="font-semibold text-sm text-[#1A1A1A]">Evolução do Peso (kg)</span>
          </div>
          <div className="flex items-end gap-3 h-24">
            {pesos.map((p, i) => {
              const h = ((p - minPeso) / range) * 60 + 20
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-[#827F77] font-medium">{p}</span>
                  <motion.div
                    className="w-full rounded-t-lg"
                    style={{ backgroundColor: '#0B201C', height: h }}
                    initial={{ height: 0 }}
                    animate={{ height: h }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
              )
            })}
          </div>
          <div className="flex justify-between mt-1">
            {mockEvolucao.slice().reverse().map((e, i) => (
              <span key={i} className="text-[9px] text-[#827F77] flex-1 text-center">{e.data.split(' ').slice(0,2).join(' ')}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="px-4 pb-24">
        <h2 className="font-semibold text-[#1A1A1A] mb-3 text-sm">Linha do Tempo das Consultas</h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
          {mockEvolucao.map((consulta, i) => {
            const cfg = statusConfig[consulta.status as keyof typeof statusConfig]
            const Icon = cfg.icon
            return (
              <motion.div
                key={consulta.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12 }}
                className="relative flex gap-4 mb-4"
              >
                <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: cfg.bg, border: `2px solid ${cfg.color}` }}>
                  <Icon className="w-4 h-4" style={{ color: cfg.color }} />
                </div>
                <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#827F77]">{consulta.data}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                  </div>
                  <div className="flex gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Weight className="w-3.5 h-3.5 text-[#3C5955]" />
                      <span className="text-sm font-bold text-[#1A1A1A]">{consulta.peso} kg</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-[#EF4444]" />
                      <span className="text-sm font-bold text-[#1A1A1A]">{consulta.pressao}</span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <p className="text-[10px] text-[#827F77] uppercase font-semibold mb-0.5">Sintomas</p>
                    <p className="text-xs text-[#1A1A1A]">{consulta.sintomas}</p>
                  </div>
                  <div className="flex items-start gap-1.5 bg-[#F8F8F8] rounded-xl p-2.5">
                    <FileText className="w-3.5 h-3.5 text-[#3C5955] mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-[#827F77] italic">{consulta.observacoes}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
