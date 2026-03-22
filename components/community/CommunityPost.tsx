'use client'
import { motion } from 'framer-motion'
import { BadgeCheck, MoreVertical, Eye, Heart, MessageCircle, Bookmark, Clock } from 'lucide-react'
import { mockPost } from '@/lib/mock-data'

export default function CommunityPost() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0B201C] to-[#3C5955] flex items-center justify-center text-white font-bold text-xs">MK</div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-sm text-[#1A1A1A]">{mockPost.user}</span>
                <BadgeCheck className="w-4 h-4 text-[#22C55E]" />
              </div>
              <span className="text-[11px] text-[#827F77]">{mockPost.time}</span>
            </div>
          </div>
          <MoreVertical className="w-5 h-5 text-[#827F77]" />
        </div>
        <p className="text-sm text-[#1A1A1A] mb-2 leading-relaxed">{mockPost.text}</p>
        <div className="flex gap-2 mb-3">
          {mockPost.hashtags.map((h, i) => (
            <span key={i} className="text-xs text-[#3C5955] font-medium">{h}</span>
          ))}
        </div>
      </div>
      <div className="relative bg-gradient-to-br from-[#0B201C] to-[#3C5955] aspect-video flex items-end p-3">
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-8 h-8 bg-white/20 rounded-lg" />
            ))}
          </div>
        </div>
        <div className="relative flex gap-2">
          {[{ icon: Clock, text: mockPost.stats.duration }, { icon: Heart, text: mockPost.stats.kcal }, { icon: Eye, text: mockPost.stats.points }].map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-1 bg-black/40 rounded-full px-2 py-1">
              <Icon className="w-3 h-3 text-white" />
              <span className="text-[10px] text-white font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <div className="flex gap-4">
          {[{ icon: Eye, text: mockPost.engagement.views }, { icon: Heart, text: mockPost.engagement.likes }, { icon: MessageCircle, text: mockPost.engagement.comments }].map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-1">
              <Icon className="w-4 h-4 text-[#827F77]" />
              <span className="text-xs text-[#827F77]">{text}</span>
            </div>
          ))}
        </div>
        <Bookmark className="w-4 h-4 text-[#827F77]" />
      </div>
    </motion.div>
  )
}
