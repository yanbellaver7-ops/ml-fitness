'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FlaskConical, CheckCircle, Clock, ChevronDown, ChevronUp, FileText } from 'lucide-react'
import Header from '@/components/ui/Header'
import { mockExames } from '@/lib/mock-data'

export default function ExamesPage() {
  const [expanded, setExpanded] = useState<number | null>(null)
  const concluidos = mockExames.filter(e => e.status === 'concluido').length
  const pendentes = mockExames.filter(e => e.status === 'pendente').length

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#F8F8F8]">
      <Header />
      <div className="px-4 -mt-4 pb-24 relative z-10">
        {/* Summary */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#22C55E15] flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-[#22C55E]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1A1A1A]">{concluidos}</p>
              <p className="text-[11px] text-[#827F77]">Concluídos</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F9731615] flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#F97316]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1A1A1A]">{pendentes}</p>
              <p className="text-[11px] text-[#827F77]">Pendentes</p>
            </div>
          </div>
        </motion.div>

        <h2 className="font-semibold text-[#1A1A1A] mb-3 text-sm">Todos os Exames</h2>
        <div className="space-y-3">
          {mockExames.map((exame, i) => (
            <motion.div
              key={exame.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setExpanded(expanded === exame.id ? null : exame.id)}
                className="w-full flex items-center gap-3 p-4"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${exame.status === 'concluido' ? 'bg-[#22C55E15]' : 'bg-[#F9731615]'}`}>
                  <FlaskConical className={`w-5 h-5 ${exame.status === 'concluido' ? 'text-[#22C55E]' : 'text-[#F97316]'}`} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-sm text-[#1A1A1A]">{exame.nome}</p>
                  <p className="text-xs text-[#827F77]">{exame.data}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${exame.status === 'concluido' ? 'bg-[#22C55E15] text-[#22C55E]' : 'bg-[#F9731615] text-[#F97316]'}`}>
                    {exame.status === 'concluido' ? 'Concluído' : 'Pendente'}
                  </span>
                  {exame.resultado && (expanded === exame.id ? <ChevronUp className="w-4 h-4 text-[#827F77]" /> : <ChevronDown className="w-4 h-4 text-[#827F77]" />)}
                </div>
              </button>
              <AnimatePresence>
                {expanded === exame.id && exame.resultado && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      <div className="flex items-start gap-2 bg-[#F8F8F8] rounded-xl p-3">
                        <FileText className="w-4 h-4 text-[#3C5955] mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-[#1A1A1A] leading-relaxed">{exame.resultado}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
