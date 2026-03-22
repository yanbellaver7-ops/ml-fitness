'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Salad, Sparkles, RefreshCw, Coffee, Sun, Apple, Moon } from 'lucide-react'
import Header from '@/components/ui/Header'
import { mockPlanoAlimentar } from '@/lib/mock-data'

const restricoesOpcoes = ['Sem glúten', 'Sem lactose', 'Baixo sódio', 'Baixo açúcar', 'Vegetariano', 'Vegano']

const refeicaoIcons: Record<string, React.ReactNode> = {
  'Café da manhã': <Coffee className="w-3.5 h-3.5 text-[#F97316]" />,
  'Almoço': <Sun className="w-3.5 h-3.5 text-[#22C55E]" />,
  'Lanche': <Apple className="w-3.5 h-3.5 text-[#3C5955]" />,
  'Jantar': <Moon className="w-3.5 h-3.5 text-[#0B201C]" />,
}

export default function PlanoAlimentarPage() {
  const [selectedDay, setSelectedDay] = useState(0)
  const [restricoes, setRestricoes] = useState<string[]>(mockPlanoAlimentar.perfil.restricoes)
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)

  const toggleRestricao = (r: string) => {
    setRestricoes(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r])
  }

  const handleGerar = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); setGenerated(true) }, 1800)
  }

  const dia = mockPlanoAlimentar.semana[selectedDay]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#F8F8F8]">
      <Header />
      <div className="px-4 -mt-4 pb-24 relative z-10">
        {/* Profile card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
            <Salad className="w-4 h-4 text-[#22C55E]" />
            <span className="font-semibold text-sm text-[#1A1A1A]">Seu Perfil Nutricional</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              { label: 'Peso', value: mockPlanoAlimentar.perfil.peso },
              { label: 'Altura', value: mockPlanoAlimentar.perfil.altura },
              { label: 'Meta calórica', value: `${mockPlanoAlimentar.perfil.calorias} kcal` },
              { label: 'Condição', value: 'Hipertensão + DM2' },
            ].map((item, i) => (
              <div key={i} className="bg-[#F8F8F8] rounded-xl p-2.5">
                <p className="text-[10px] text-[#827F77] uppercase font-semibold">{item.label}</p>
                <p className="text-sm font-bold text-[#1A1A1A]">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#827F77] uppercase font-semibold mb-2">Restrições Alimentares</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {restricoesOpcoes.map((r) => (
              <button
                key={r}
                onClick={() => toggleRestricao(r)}
                className={`text-xs font-medium px-3 py-1 rounded-full border transition-all ${restricoes.includes(r) ? 'bg-[#0B201C] text-white border-[#0B201C]' : 'bg-white text-[#827F77] border-gray-200'}`}
              >
                {r}
              </button>
            ))}
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleGerar}
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-70"
            style={{ background: 'linear-gradient(135deg, #0B201C 0%, #3C5955 100%)' }}
          >
            {loading ? (
              <><RefreshCw className="w-4 h-4 animate-spin" /> Gerando plano com IA...</>
            ) : (
              <><Sparkles className="w-4 h-4" /> {generated ? 'Regenerar Plano' : 'Gerar Plano com IA'}</>
            )}
          </motion.button>
        </motion.div>

        {/* Plan */}
        <AnimatePresence>
          {(generated || true) && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-[#1A1A1A] text-sm">Plano Semanal</h2>
                {generated && (
                  <div className="flex items-center gap-1 text-[#22C55E]">
                    <Sparkles className="w-3 h-3" />
                    <span className="text-[10px] font-medium">Gerado pela IA</span>
                  </div>
                )}
              </div>
              {/* Day tabs */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
                {mockPlanoAlimentar.semana.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedDay(i)}
                    className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedDay === i ? 'bg-[#0B201C] text-white' : 'bg-white text-[#827F77] shadow-sm'}`}
                  >
                    {d.dia}
                  </button>
                ))}
              </div>
              {/* Meals */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedDay}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  {dia.refeicoes.map((r, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="bg-white rounded-2xl p-4 shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {refeicaoIcons[r.tipo]}
                        <span className="text-xs font-semibold text-[#827F77] uppercase">{r.tipo}</span>
                      </div>
                      <p className="text-sm text-[#1A1A1A] leading-relaxed">{r.descricao}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
