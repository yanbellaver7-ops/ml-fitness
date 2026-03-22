'use client'
import Sidebar from '@/components/ui/Sidebar'
import BottomNav from '@/components/ui/BottomNav'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F8F8F8]">
      <Sidebar />
      <div className="flex-1 lg:ml-[280px] flex flex-col">
        <main className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
