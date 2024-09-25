import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePage } from '@inertiajs/react'
import { menuItems, MenuItem } from '@/config/content'
import { Badge } from '@/components/ui/badge'
import { Link } from '@inertiajs/react'

export default function MobileMenu() {
    const { url } = usePage()
    const isAdmin = true

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5 dark:text-white" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                    {menuItems.map((item: MenuItem, index: number) => {
                        if (item.isAdmin && !isAdmin) return null
                        const isActive = url === item.route
                        return (
                            <Link
                                key={index}
                                href={item.route}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                                    isActive ? 'bg-muted text-primary' : ''
                                }`}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                                {item.badge && (
                                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full dark:text-white">
                                        {item.badge}
                                    </Badge>
                                )}
                            </Link>
                        )
                    })}
                </nav>
            </SheetContent>
        </Sheet>
    )
}
