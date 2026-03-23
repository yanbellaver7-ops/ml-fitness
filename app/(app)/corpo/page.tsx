'use client'
import { useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react'
import Header from '@/components/ui/Header'
import { mockCorpo } from '@/lib/mock-data'

const BodyCanvas = lazy(() => import('@/components/ui/BodyCanvas'))

type Regiao = typeof mockCorpo.regioes[0]

function getFatColor(gordura: number): string {
  if (gordura >= 75) return '#EF4444'
  if (gordura >= 50) return '#F97316'
  if (gordura >= 30) return '#EAB308'
  return '#22C55E'
}

function getRiscoIcon(risco: string) {
  if (risco === 'alto') return <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
  if (risco === 'moderado') return <Info className="w-4 h-4 text-[#F97316]" />
  return <CheckCircle className="w-4 h-4 text-[#22C55E]" />
}

function getRiscoBg(risco: string) {
  if (risco === 'alto') return 'bg-red-50 border-red-200'
  if (risco === 'moderado') return 'bg-orange-50 border-orange-200'
  return 'bg-green-50 border-green-200'
}

export default function CorpoPage() {
  const [selected, setSelected] = useState<string | null>('abdomen')
  const selectedRegiao = mockCorpo.regioes.find(r => r.id === selected) as Regiao | undefined

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#F8F8F8]">
      <Header />

      <div className="px-4 -mt-2 pb-24 relative z-10">
        {/* IMC summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-sm mb-4"
        >
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <p className="text-xl font-bold text-[#1A1A1A]">{mockCorpo.peso}<span className="text-xs font-normal text-[#827F77]"> kg</span></p>
              <p className="text-[10px] text-[#827F77] uppercase font-semibold">Peso</p>
            </div>
            <div className="text-center border-x border-gray-100">
              <p className="text-xl font-bold text-[#1A1A1A]">{mockCorpo.imc}</p>
              <p className="text-[10px] text-[#827F77] uppercase font-semibold">IMC</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#F97316]">{mockCorpo.gorduraTotal}<span className="text-xs font-normal text-[#827F77]">%</span></p>
              <p className="text-[10px] text-[#827F77] uppercase font-semibold">Gordura</p>
            </div>
          </div>
        </motion.div>

        {/* 3D Body */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl overflow-hidden shadow-sm mb-4 relative"
          style={{ background: '#0a0f1e', height: 420 }}
        >
          <div className="absolute inset-0 z-10 pointer-events-none">
            {[
              { top: '18%', left: '48%' },
              { top: '35%', left: '52%' },
              { top: '55%', left: '45%' },
            ].map((h, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  top: h.top, left: h.left,
                  background: 'rgba(100,220,255,0.9)',
                  border: '2px solid white',
                  boxShadow: '0 0 10px rgba(100,220,255,0.8)',
                  animation: `pulse 2s ${i * 0.4}s infinite`,
                }}
              />
            ))}
          </div>

          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-white/50 text-sm">Carregando modelo 3D...</p>
            </div>
          }>
            <BodyCanvas />
          </Suspense>

          <style>{`
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.4); opacity: 0.6; }
            }
          `}</style>
        </motion.div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mb-4">
          {[
            { color: '#22C55E', label: 'Baixo' },
            { color: '#EAB308', label: 'Normal' },
            { color: '#F97316', label: 'Moderado' },
            { color: '#EF4444', label: 'Alto' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[10px] text-[#827F77]">{label}</span>
            </div>
          ))}
        </div>

        {/* Region list */}
        <div className="space-y-2 mb-4">
          {mockCorpo.regioes.map((r, i) => (
            <motion.button
              key={r.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(prev => prev === r.id ? null : r.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${selected === r.id ? 'border-[#0B201C] bg-[#0B201C]/5' : 'border-gray-100 bg-white'}`}
            >
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: getFatColor(r.gordura) }} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#1A1A1A]">{r.label}</p>
                <p className="text-[10px] text-[#827F77]">{r.circunferencia}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${r.gordura}%`, backgroundColor: getFatColor(r.gordura) }} />
                </div>
                <span className="text-[10px] font-bold" style={{ color: getFatColor(r.gordura) }}>{r.gordura}%</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {selectedRegiao && (
            <motion.div
              key={selectedRegiao.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`rounded-2xl p-4 border mb-4 ${getRiscoBg(selectedRegiao.risco)}`}
            >
              <div className="flex items-center gap-2 mb-2">
                {getRiscoIcon(selectedRegiao.risco)}
                <span className="font-bold text-sm text-[#1A1A1A]">{selectedRegiao.label}</span>
                <span className="ml-auto text-xs font-bold" style={{ color: getFatColor(selectedRegiao.gordura) }}>
                  {selectedRegiao.gordura}% gordura
                </span>
              </div>
              <p className="text-xs text-[#827F77] leading-relaxed">{selectedRegiao.dica}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Evolução */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="w-4 h-4 text-[#22C55E]" />
            <span className="font-semibold text-sm text-[#1A1A1A]">Evolução da Gordura Total</span>
          </div>
          <div className="flex items-end gap-3 h-16">
            {mockCorpo.historico.map((h, i) => {
              const height = (h.gorduraTotal / 30) * 100
              const isLast = i === mockCorpo.historico.length - 1
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] font-bold" style={{ color: isLast ? '#22C55E' : '#827F77' }}>{h.gorduraTotal}%</span>
                  <motion.div
                    className="w-full rounded-t-lg"
                    style={{ backgroundColor: isLast ? '#22C55E' : '#D1D5DB' }}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.6, ease: 'easeOut' }}
                  />
                  <span className="text-[9px] text-[#827F77]">{h.data}</span>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
