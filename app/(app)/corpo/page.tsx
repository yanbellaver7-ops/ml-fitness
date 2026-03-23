'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react'
import Header from '@/components/ui/Header'
import { mockCorpo } from '@/lib/mock-data'

type Regiao = typeof mockCorpo.regioes[0]

function getFatColor(gordura: number): string {
  if (gordura >= 75) return '#EF4444'
  if (gordura >= 50) return '#F97316'
  if (gordura >= 30) return '#EAB308'
  return '#22C55E'
}

function getFatOpacity(gordura: number): number {
  return 0.25 + (gordura / 100) * 0.65
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

// SVG Body Map Component
function BodySVG({ regioes, selected, onSelect }: {
  regioes: typeof mockCorpo.regioes
  selected: string | null
  onSelect: (id: string) => void
}) {
  const getRegiao = (id: string) => regioes.find(r => r.id === id)

  const regionStyle = (id: string): React.CSSProperties => {
    const r = getRegiao(id)
    if (!r) return {}
    return {
      fill: getFatColor(r.gordura),
      fillOpacity: getFatOpacity(r.gordura),
      stroke: selected === id ? '#0B201C' : getFatColor(r.gordura),
      strokeWidth: selected === id ? 2.5 : 1,
      cursor: 'pointer',
      transition: 'all 0.2s',
    }
  }

  return (
    <svg viewBox="0 0 200 480" className="w-full max-w-[220px] mx-auto drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
      {/* Body outline - base */}
      <g fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1">
        {/* Head */}
        <ellipse cx="100" cy="38" rx="26" ry="30" />
        {/* Neck */}
        <rect x="88" y="64" width="24" height="16" rx="4" />
        {/* Torso */}
        <path d="M65 80 Q55 82 52 100 L48 180 Q48 190 60 192 L140 192 Q152 190 152 180 L148 100 Q145 82 135 80 Z" />
        {/* Left arm */}
        <path d="M65 82 Q50 86 44 110 L38 170 Q36 182 44 184 L58 184 Q64 182 64 170 L68 110 Z" />
        {/* Right arm */}
        <path d="M135 82 Q150 86 156 110 L162 170 Q164 182 156 184 L142 184 Q136 182 136 170 L132 110 Z" />
        {/* Left forearm */}
        <path d="M38 172 Q34 186 36 210 L40 245 Q40 252 46 252 L56 252 Q62 252 62 245 L62 210 Q62 186 58 172 Z" />
        {/* Right forearm */}
        <path d="M162 172 Q166 186 164 210 L160 245 Q160 252 154 252 L144 252 Q138 252 138 245 L138 210 Q138 186 142 172 Z" />
        {/* Hips */}
        <path d="M52 190 Q44 192 42 210 L40 240 Q40 250 60 252 L140 252 Q160 250 160 240 L158 210 Q156 192 148 190 Z" />
        {/* Left thigh */}
        <path d="M60 250 Q48 254 46 280 L44 330 Q44 340 56 342 L82 342 Q90 340 90 330 L92 280 Q92 254 82 250 Z" />
        {/* Right thigh */}
        <path d="M140 250 Q152 254 154 280 L156 330 Q156 340 144 342 L118 342 Q110 340 110 330 L108 280 Q108 254 118 250 Z" />
        {/* Left leg */}
        <path d="M46 338 Q44 356 46 390 L48 430 Q48 440 58 440 L78 440 Q86 440 86 430 L84 390 Q84 356 80 338 Z" />
        {/* Right leg */}
        <path d="M154 338 Q156 356 154 390 L152 430 Q152 440 142 440 L122 440 Q114 440 114 430 L116 390 Q116 356 120 338 Z" />
        {/* Left foot */}
        <ellipse cx="64" cy="452" rx="18" ry="10" />
        {/* Right foot */}
        <ellipse cx="136" cy="452" rx="18" ry="10" />
      </g>

      {/* Colored fat regions - overlaid and clickable */}

      {/* Abdomen */}
      <path
        d="M68 130 L132 130 L134 185 L66 185 Z"
        style={regionStyle('abdomen')}
        onClick={() => onSelect('abdomen')}
      />

      {/* Peito */}
      <path
        d="M68 82 L132 82 L134 128 L66 128 Z"
        style={regionStyle('peito')}
        onClick={() => onSelect('peito')}
      />

      {/* Braço esquerdo */}
      <path
        d="M40 86 L66 90 L64 180 L38 176 Z"
        style={regionStyle('braco_esq')}
        onClick={() => onSelect('braco_esq')}
      />

      {/* Braço direito */}
      <path
        d="M134 90 L160 86 L162 176 L136 180 Z"
        style={regionStyle('braco_dir')}
        onClick={() => onSelect('braco_dir')}
      />

      {/* Quadril */}
      <path
        d="M52 188 L148 188 L156 248 L44 248 Z"
        style={regionStyle('quadril')}
        onClick={() => onSelect('quadril')}
      />

      {/* Coxa esquerda */}
      <path
        d="M48 250 L90 250 L88 338 L44 338 Z"
        style={regionStyle('coxa_esq')}
        onClick={() => onSelect('coxa_esq')}
      />

      {/* Coxa direita */}
      <path
        d="M110 250 L152 250 L156 338 L112 338 Z"
        style={regionStyle('coxa_dir')}
        onClick={() => onSelect('coxa_dir')}
      />

      {/* Perna esquerda */}
      <path
        d="M46 340 L82 340 L80 438 L48 438 Z"
        style={regionStyle('perna_esq')}
        onClick={() => onSelect('perna_esq')}
      />

      {/* Perna direita */}
      <path
        d="M118 340 L154 340 L152 438 L120 438 Z"
        style={regionStyle('perna_dir')}
        onClick={() => onSelect('perna_dir')}
      />

      {/* Selection pulse ring */}
      {selected && (
        <circle cx="100" cy="240" r="0" fill="none" stroke="#0B201C" strokeWidth="0" />
      )}
    </svg>
  )
}

export default function CorpoPage() {
  const [selected, setSelected] = useState<string | null>('abdomen')
  const selectedRegiao = mockCorpo.regioes.find(r => r.id === selected) as Regiao | undefined

  const handleSelect = (id: string) => {
    setSelected(prev => prev === id ? null : id)
  }

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

        <div className="flex gap-4">
          {/* Body SVG */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-4 shadow-sm flex-shrink-0 w-[160px]"
          >
            <p className="text-[10px] text-[#827F77] uppercase font-semibold text-center mb-2">Toque para detalhes</p>
            <BodySVG regioes={mockCorpo.regioes} selected={selected} onSelect={handleSelect} />
          </motion.div>

          {/* Region list + detail */}
          <div className="flex-1 space-y-2">
            {mockCorpo.regioes.map((r, i) => (
              <motion.button
                key={r.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleSelect(r.id)}
                className={`w-full flex items-center gap-2 p-2.5 rounded-xl border transition-all text-left ${selected === r.id ? 'border-[#0B201C] bg-[#0B201C]/5' : 'border-gray-100 bg-white'}`}
              >
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: getFatColor(r.gordura) }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#1A1A1A] truncate">{r.label}</p>
                  <p className="text-[10px] text-[#827F77]">{r.circunferencia}</p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-10 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${r.gordura}%`, backgroundColor: getFatColor(r.gordura) }}
                    />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {selectedRegiao && (
            <motion.div
              key={selectedRegiao.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`mt-4 rounded-2xl p-4 border ${getRiscoBg(selectedRegiao.risco)}`}
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

        {/* Evolução da gordura */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-4 shadow-sm mt-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="w-4 h-4 text-[#22C55E]" />
            <span className="font-semibold text-sm text-[#1A1A1A]">Evolução da Gordura Total</span>
          </div>
          <div className="flex items-end gap-3 h-16">
            {mockCorpo.historico.map((h, i) => {
              const maxVal = 30
              const height = (h.gorduraTotal / maxVal) * 100
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
