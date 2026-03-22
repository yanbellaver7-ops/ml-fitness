'use client'
import { motion } from 'framer-motion'
import { Pill, Clock, Calendar, CheckCircle, XCircle } from 'lucide-react'
import Header from '@/components/ui/Header'
import { mockPrescricoes } from '@/lib/mock-data'

export default function PrescricoesPage() {
  const ativos = mockPrescricoes.filter(p => p.status === 'ativo')
  const encerrados = mockPrescricoes.filter(p => p.status === 'encerrado')

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#F8F8F8]">
      <Header />
      <div className="px-4 -mt-4 pb-24 relative z-10">
        {/* Active count */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-4 shadow-sm mb-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#22C55E15] flex items-center justify-center">
            <Pill className="w-6 h-6 text-[#22C55E]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#1A1A1A]">{ativos.length} <span className="text-base font-normal text-[#827F77]">medicamentos ativos</span></p>
            <p className="text-xs text-[#827F77]">{encerrados.length} encerrados</p>
          </div>
        </motion.div>

        {/* Active */}
        <h2 className="font-semibold text-[#1A1A1A] mb-3 text-sm">Medicamentos Ativos</h2>
        <div className="space-y-3 mb-5">
          {ativos.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-[#22C55E]"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#22C55E]" />
                  <span className="font-bold text-sm text-[#1A1A1A]">{p.medicamento}</span>
                </div>
                <span className="text-xs font-bold text-[#22C55E] bg-[#22C55E15] px-2 py-0.5 rounded-full">{p.dosagem}</span>
              </div>
              <div className="space-y-1 ml-6">
                <div className="flex items-center gap-1.5 text-xs text-[#827F77]">
                  <Clock className="w-3 h-3" /><span>{p.frequencia}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#827F77]">
                  <Calendar className="w-3 h-3" /><span>Início: {p.inicio} · {p.duracao}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ended */}
        <h2 className="font-semibold text-[#827F77] mb-3 text-sm">Histórico — Encerrados</h2>
        <div className="space-y-3">
          {encerrados.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-gray-200 opacity-70"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-[#827F77]" />
                  <span className="font-bold text-sm text-[#827F77]">{p.medicamento}</span>
                </div>
                <span className="text-xs font-bold text-[#827F77] bg-gray-100 px-2 py-0.5 rounded-full">{p.dosagem}</span>
              </div>
              <div className="space-y-1 ml-6">
                <div className="flex items-center gap-1.5 text-xs text-[#827F77]">
                  <Clock className="w-3 h-3" /><span>{p.frequencia}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#827F77]">
                  <Calendar className="w-3 h-3" /><span>Início: {p.inicio} · {p.duracao}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
