// import { menuItems, MenuItem } from '@/config/content';
// import { Badge } from '@/components/ui/badge';
// import { Link, usePage } from '@inertiajs/react';

// export default function DashboardSidebarMenu() {
//     const { url } = usePage();
//     const isAdmin = true;


//     return (
//         <div className="flex-1">
//             <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-3">
//                 {menuItems.map((item: MenuItem, index: number) => {
//                     if (item.isAdmin && !isAdmin) return null;

//                     const isActive = url === item.route || url.startsWith(`${item.route}/`);

//                     return (
//                         <Link
//                             key={index}
//                             href={item.route}
//                             className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${isActive ? 'bg-muted text-primary' : ''
//                                 }`}
//                         >
//                             <item.icon className="h-4 w-4" />
//                             {item.name}
//                             {item.badge && (
//                                 <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
//                                     {item.badge}
//                                 </Badge>
//                             )}
//                         </Link>
//                     );
//                 })}
//             </nav>
//         </div>
//     )
// }


import React from 'react';
import { menuItems, MenuItem } from '@/config/content';
import { Badge } from '@/components/ui/badge';
import { Link, usePage } from '@inertiajs/react';

export default function DashboardSidebarMenu() {
    const { url } = usePage();
    const isAdmin = true; // You might want to replace this with actual logic

    const isRouteActive = (itemRoute: string): boolean => {
        // Remove query parameters from the current URL
        const currentPath = url.split('?')[0];

        // Check if the current path starts with the item's route
        return currentPath === itemRoute || currentPath.startsWith(`${itemRoute}/`);
    };

    return (
        <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-3">
                {menuItems.map((item: MenuItem, index: number) => {
                    if (item.isAdmin && !isAdmin) return null;

                    const isActive = isRouteActive(item.route);

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
                                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                    {item.badge}
                                </Badge>
                            )}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
