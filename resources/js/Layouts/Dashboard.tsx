// import React, { useEffect } from 'react';
// import { KeyRoundIcon, LayoutDashboard, NewspaperIcon, TagsIcon, Users, XIcon } from "lucide-react";
// import DesktopSidebar from "@/components/dashboard/desktop-sidebar";
// import MobileNavigation from "@/components/dashboard/mobile-navigation";
// import { Toaster } from "@/components/ui/sonner";
// import { toast } from "sonner";
// import { usePage } from "@inertiajs/react";
// import Breadcrumbs from '@/components/dashboard/Breadcrumbs';

// export default function Dashboard({ children, breadcrumbs }) {
//     const { flash } = usePage().props;

//     const navigations = [
//         {
//             group: 'Dashboard',
//             permission: null,
//             role: null,
//             menu: [
//                 {
//                     name: 'Dashboard',
//                     href: route('dashboard'),
//                     icon: <LayoutDashboard className="h-4 w-4 shrink-0 text-gray-600" />,
//                     current: route().current('dashboard'),
//                     permission: null,
//                     role: null,
//                     subs: []
//                 },
//             ],
//         },
//         {
//             group: 'Content',
//             permission: null,
//             role: null,
//             menu: [
//                 {
//                     name: 'Posts',
//                     href: route('posts.index'),
//                     icon: <NewspaperIcon className="h-4 w-4 shrink-0 text-gray-600" />,
//                     current: route().current('posts.*'),
//                     permission: null,
//                     role: null,
//                     subs: []
//                 },
//                 {
//                     name: 'Categories',
//                     href: route('categories.index'),
//                     icon: <TagsIcon className="h-4 w-4 shrink-0 text-gray-600" />,
//                     current: route().current('categories.*'),
//                     permission: null,
//                     role: null,
//                     subs: []
//                 },
//                 {
//                     name: 'Users',
//                     href: route('users.index'),
//                     icon: <Users className="h-4 w-4 shrink-0 text-gray-600" />,
//                     current: route().current('users.*'),
//                     permission: null,
//                     role: null,
//                     subs: []
//                 },
//                 {
//                     name: 'Roles',
//                     href: route('roles.index'),
//                     icon: <KeyRoundIcon className="h-4 w-4 shrink-0 text-gray-600" />,
//                     current: route().current('roles.*'),
//                     permission: null,
//                     role: null,
//                     subs: []
//                 },
//             ],
//         },
//     ];

//     useEffect(() => {
//         flash.type && toast(flash.message, {
//             type: flash.type,
//             duration: 2500,
//             action: {
//                 label: <XIcon className="h-4 w-4 shrink-0" />,
//                 onClick: () => toast.dismiss()
//             }
//         });
//     }, []);

//     return (
//         <div vaul-drawer-wrapper="">
//             <div className="mx-auto">
//                 <div className="min-h-screen bg-gray-50">
//                     <DesktopSidebar navigations={navigations}/>

//                     <main className="lg:pl-72">
//                         <div className="min-h-screen border-l border-transparent bg-gray-50 px-4 pb-4 pr-4 sm:px-4 lg:border-border lg:px-6 lg:pb-6">
//                             <div>
//                                 <MobileNavigation navigations={navigations} />
//                                 {
//                                     breadcrumbs && (
//                                         <Breadcrumbs breadcrumbs={breadcrumbs} />
//                                     )
//                                 }
//                                 {children}

//                                 <Toaster />
//                             </div>
//                         </div>
//                     </main>
//                 </div>
//             </div>
//         </div>
//     )
// }


import React, { useEffect, ReactNode } from 'react';
import {
    KeyRoundIcon, LayoutDashboard, NewspaperIcon, TagsIcon, Users, XIcon
} from "lucide-react";
import DesktopSidebar from "@/components/dashboard/desktop-sidebar";
import MobileNavigation from "@/components/dashboard/mobile-navigation";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { usePage } from "@inertiajs/react";
import Breadcrumbs from '@/components/dashboard/breadcrumbs';
import { PageProps as InertiaPageProps } from '@inertiajs/core';

interface NavigationItem {
    name: string;
    href: string;
    icon: React.ReactNode;
    current: boolean;
    permission: string | null;
    role: string | null;
    subs: NavigationItem[];
}

interface NavigationGroup {
    group: string;
    permission: string | null;
    role: string | null;
    menu: NavigationItem[];
}

interface FlashProps {
    type?: string;
    message?: string;
}



interface PageProps extends InertiaPageProps {
  flash: {
    type: string;
    message: string;
  };
}

interface ExternalToast {
    type: 'success' | 'error' | 'info';
    message: string;
  }

interface DashboardProps {
    children: ReactNode;
    breadcrumbs?: Array<{ title: string; href?: string; label: string; }>;
}

export default function Dashboard({ children, breadcrumbs }: DashboardProps) {
    const { flash } = usePage<PageProps>().props;

    const navigations: NavigationGroup[] = [
        {
            group: 'Dashboard',
            permission: null,
            role: null,
            menu: [
                {
                    name: 'Dashboard',
                    href: route('dashboard'),
                    icon: <LayoutDashboard className="h-4 w-4 shrink-0 text-gray-600" />,
                    current: route().current('dashboard'),
                    permission: null,
                    role: null,
                    subs: []
                },
            ],
        },
        {
            group: 'Content',
            permission: null,
            role: null,
            menu: [
                {
                    name: 'Users',
                    href: route('users.index'),
                    icon: <Users className="h-4 w-4 shrink-0 text-gray-600" />,
                    current: route().current('users.*'),
                    permission: null,
                    role: null,
                    subs: []
                },
                {
                    name: 'Roles',
                    href: route('roles.index'),
                    icon: <KeyRoundIcon className="h-4 w-4 shrink-0 text-gray-600" />,
                    current: route().current('roles.*'),
                    permission: null,
                    role: null,
                    subs: []
                },
            ],
        },
    ];

    useEffect(() => {
        // if (flash.type) {
        //     toast(flash.message, {
        //         type: flash.type,
        //         duration: 2500,
        //         action: {
        //             label: <XIcon className="h-4 w-4 shrink-0" />,
        //             onClick: () => toast.dismiss()
        //         }
        //     });
        // }

        // flash.type && toast(flash.message, {
        //     type: flash.type, // Ensure the type exists in the `ExternalToast`
        //     duration: 2500,
        //     action: {
        //       label: <XIcon className="h-4 w-4 shrink-0" />,
        //       onClick: () => toast.dismiss(),
        //     }
        //   });
    }, [flash]);

    return (
        <div vaul-drawer-wrapper="">
            <div className="mx-auto">
                <div className="min-h-screen bg-gray-50">
                    <DesktopSidebar navigations={navigations} />

                    <main className="lg:pl-72">
                        <div className="min-h-screen border-l border-transparent bg-gray-50 px-4 pb-4 pr-4 sm:px-4 lg:border-border lg:px-6 lg:pb-6">
                            <div>
                                <MobileNavigation navigations={navigations} />
                                {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
                                {children}

                                <Toaster />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
