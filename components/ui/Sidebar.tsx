'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Dumbbell, UtensilsCrossed, Users, Settings, Zap } from 'lucide-react'
import { mockUser } from '@/lib/mock-data'

const navItems = [
  { href: '/inicio', icon: Home, label: 'Início' },
  { href: '/treino', icon: Dumbbell, label: 'Treino' },
  { href: '/refeicao', icon: UtensilsCrossed, label: 'Refeição' },
  { href: '/comunidade', icon: Users, label: 'Comunidade' },
  { href: '/config', icon: Settings, label: 'Config' },
]

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-[280px] bg-white border-r border-gray-100 z-40">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-[#0B201C] rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-[#22C55E]" />
          </div>
          <span className="font-bold text-[#0B201C] text-lg">ML Fitness</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#3C5955] flex items-center justify-center text-white font-bold text-sm">JJ</div>
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
