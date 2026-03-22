'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Dumbbell, UtensilsCrossed, Users, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
  { href: '/inicio', icon: Home, label: 'Início' },
  { href: '/treino', icon: Dumbbell, label: 'Treino' },
  { href: '/refeicao', icon: UtensilsCrossed, label: 'Refeição' },
  { href: '/comunidade', icon: Users, label: 'Comunidade' },
  { href: '/config', icon: Settings, label: 'Config' },
]

export default function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50">
      <div className="flex">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href} className="flex-1 flex flex-col items-center py-2 gap-0.5">
              <motion.div whileTap={{ scale: 1.15 }}>
                <Icon className={`w-5 h-5 ${active ? 'text-[#22C55E]' : 'text-[#827F77]'}`} />
              </motion.div>
              <span className={`text-[10px] font-medium ${active ? 'text-[#22C55E]' : 'text-[#827F77]'}`}>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
