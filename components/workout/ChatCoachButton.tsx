'use client'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function ChatCoachButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
      style={{ background: 'linear-gradient(135deg, #0B201C 0%, #3C5955 100%)' }}
    >
      <MessageCircle className="w-4 h-4" />
      Falar com seu coach
    </motion.button>
  )
}
