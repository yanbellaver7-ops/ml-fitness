'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TrendingUp, FileText, FlaskConical, Pill, Salad, Cross } from 'lucide-react'
import { mockUser } from '@/lib/mock-data'

const navItems = [
  { href: '/evolucao', icon: TrendingUp, label: 'Evolução Clínica' },
  { href: '/historico', icon: FileText, label: 'Histórico Médico' },
  { href: '/exames', icon: FlaskConical, label: 'Exames e Resultados' },
  { href: '/prescricoes', icon: Pill, label: 'Prescrições' },
  { href: '/plano-alimentar', icon: Salad, label: 'Plano Alimentar IA' },
]

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-[280px] bg-white border-r border-gray-100 z-40">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-[#0B201C] rounded-lg flex items-center justify-center">
            <Cross className="w-4 h-4 text-[#22C55E]" />
          </div>
          <div>
            <span className="font-bold text-[#0B201C] text-base">Portal do Paciente</span>
            <p className="text-[10px] text-[#827F77]">Dr. Mateus Louis</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#3C5955] flex items-center justify-center text-white font-bold text-sm">JS</div>
          <div>
            <p className="font-semibold text-[#1A1A1A] text-sm">{mockUser.name}</p>
            <span className="text-[10px] text-[#22C55E] font-medium">{mockUser.badge}</span>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-[#22C55E]/10 text-[#22C55E] border-l-4 border-[#22C55E]' : 'text-[#827F77] hover:bg-gray-50'}`}>
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
