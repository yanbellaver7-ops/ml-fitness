'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TrendingUp, FileText, FlaskConical, Pill, PersonStanding } from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
  { href: '/evolucao', icon: TrendingUp, label: 'Evolução' },
  { href: '/historico', icon: FileText, label: 'Histórico' },
  { href: '/exames', icon: FlaskConical, label: 'Exames' },
  { href: '/prescricoes', icon: Pill, label: 'Prescrições' },
  { href: '/corpo', icon: PersonStanding, label: 'Corpo' },
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
