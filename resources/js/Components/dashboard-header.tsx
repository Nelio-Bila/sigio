
import { ThemeToggle } from '@/components/theme-toggle'
import UserMenu from '@/components/user-menu'
import MobileMenu from '@/components/mobile-menu'
import Search from './search'

export default function DashboardHeader() {

  return (
    <header className="flex h-14 items-center gap-4 border-b dark:border-b-slate-800 px-4 lg:h-[60px] lg:px-6 bg-background">
      <MobileMenu />
      <div className="w-full flex gap-2">
        <Search />
      </div>
      <ThemeToggle />
      <UserMenu />
    </header>
  )
}
