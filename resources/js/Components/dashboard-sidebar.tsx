
import { Package2, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import DashboardSidebarMenu from './dashboard-sidebar-menu';

export default function DashboardSidebar() {


  return (
    <div className="hidden border-r md:block bg-background dark:border-r-slate-800">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b dark:border-b-slate-800 px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold dark:text-white">
            <Package2 className="h-6 w-6" />
            <span className="">{import.meta.env.VITE_APP_NAME}</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4 dark:text-white"/>
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <DashboardSidebarMenu />

      </div>
    </div>
  );
}
