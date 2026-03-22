'use client'
import { motion } from 'framer-motion'
import { User, Bell, Shield, HelpCircle, LogOut } from 'lucide-react'
import Header from '@/components/ui/Header'

const items = [
  { icon: User, label: 'Perfil', desc: 'Editar informações pessoais' },
  { icon: Bell, label: 'Notificações', desc: 'Gerenciar alertas' },
  { icon: Shield, label: 'Privacidade', desc: 'Controle de dados' },
  { icon: HelpCircle, label: 'Ajuda', desc: 'Suporte e FAQ' },
  { icon: LogOut, label: 'Sair', desc: 'Encerrar sessão', danger: true },
]

export default function ConfigPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#F8F8F8]">
      <div style={{ background: 'linear-gradient(180deg, #0B201C 0%, #3C5955 55%, #B7C5C5 100%)' }}>
        <Header />
      </div>
      <div className="p-4 space-y-3 mt-2">
        <h2 className="font-semibold text-[#1A1A1A]">Configurações</h2>
        {items.map(({ icon: Icon, label, desc, danger }, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="w-full flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm text-left"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${danger ? 'bg-red-50' : 'bg-[#0B201C]/10'}`}>
              <Icon className={`w-5 h-5 ${danger ? 'text-[#EF4444]' : 'text-[#0B201C]'}`} />
            </div>
            <div>
              <p className={`font-semibold text-sm ${danger ? 'text-[#EF4444]' : 'text-[#1A1A1A]'}`}>{label}</p>
              <p className="text-xs text-[#827F77]">{desc}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
