'use client'
import { motion } from 'framer-motion'

interface Props {
  active: 'treinos' | 'nutricao'
  onChange: (tab: 'treinos' | 'nutricao') => void
}

export default function TabSwitcher({ active, onChange }: Props) {
  return (
    <div className="flex bg-white px-5 border-b border-gray-100">
      {(['treinos', 'nutricao'] as const).map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`relative py-3 px-4 text-sm font-medium ${active === tab ? 'text-[#0B201C]' : 'text-[#827F77]'}`}
        >
          {tab === 'treinos' ? 'Treinos' : 'Nutrição'}
          {active === tab && (
            <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0B201C]" />
          )}
        </button>
      ))}
    </div>
  )
}
