'use client'
import { motion } from 'framer-motion'
import { AlertCircle, Scissors, Users, Droplets, Ruler, Weight } from 'lucide-react'
import Header from '@/components/ui/Header'
import { mockHistorico } from '@/lib/mock-data'

interface SectionProps { title: string; icon: React.ReactNode; children: React.ReactNode; delay?: number }
function Section({ title, icon, children, delay = 0 }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-2xl p-4 shadow-sm mb-4"
    >
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
        {icon}
        <span className="font-semibold text-sm text-[#1A1A1A]">{title}</span>
      </div>
      {children}
    </motion.div>
  )
}

function Tag({ text, color = '#0B201C', bg = '#0B201C15' }: { text: string; color?: string; bg?: string }) {
  return (
    <span className="inline-block text-xs font-medium px-3 py-1 rounded-full mr-2 mb-2" style={{ color, backgroundColor: bg }}>
      {text}
    </span>
  )
}

export default function HistoricoPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#F8F8F8]">
      <Header />
      <div className="px-4 -mt-4 pb-24 relative z-10">
        <Section title="Dados Clínicos" icon={<Droplets className="w-4 h-4 text-[#EF4444]" />} delay={0.05}>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Tipo Sanguíneo', value: mockHistorico.dadosClinicos.tipoSanguineo, icon: <Droplets className="w-3.5 h-3.5 text-[#EF4444]" /> },
              { label: 'Altura', value: mockHistorico.dadosClinicos.altura, icon: <Ruler className="w-3.5 h-3.5 text-[#3C5955]" /> },
              { label: 'Peso Atual', value: mockHistorico.dadosClinicos.peso, icon: <Weight className="w-3.5 h-3.5 text-[#3C5955]" /> },
              { label: 'IMC', value: mockHistorico.dadosClinicos.imc, icon: <AlertCircle className="w-3.5 h-3.5 text-[#F97316]" /> },
            ].map((item, i) => (
              <div key={i} className="bg-[#F8F8F8] rounded-xl p-3">
                <div className="flex items-center gap-1 mb-1">{item.icon}<span className="text-[10px] text-[#827F77] uppercase font-semibold">{item.label}</span></div>
                <p className="font-bold text-[#1A1A1A] text-base">{item.value}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Doenças Pré-existentes" icon={<AlertCircle className="w-4 h-4 text-[#F97316]" />} delay={0.1}>
          <div>{mockHistorico.doencas.map((d, i) => <Tag key={i} text={d} color="#F97316" bg="#F9731615" />)}</div>
        </Section>

        <Section title="Alergias" icon={<AlertCircle className="w-4 h-4 text-[#EF4444]" />} delay={0.15}>
          <div>{mockHistorico.alergias.map((a, i) => <Tag key={i} text={a} color="#EF4444" bg="#EF444415" />)}</div>
        </Section>

        <Section title="Cirurgias Anteriores" icon={<Scissors className="w-4 h-4 text-[#3C5955]" />} delay={0.2}>
          <div className="space-y-2">
            {mockHistorico.cirurgias.map((c, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm text-[#1A1A1A]">{c.nome}</span>
                <span className="text-xs text-[#827F77] font-medium">{c.ano}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Antecedentes Familiares" icon={<Users className="w-4 h-4 text-[#3C5955]" />} delay={0.25}>
          <div>{mockHistorico.antecedenteFamiliar.map((a, i) => <Tag key={i} text={a} color="#3C5955" bg="#3C595515" />)}</div>
        </Section>
      </div>
    </motion.div>
  )
}
