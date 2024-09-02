// import { useState, useEffect } from 'react';

// export default function useOpenSubMenu(navigations) {
//     const [openMenuIndex, setOpenMenuIndex] = useState(null);

//     useEffect(() => {
//         const initialOpenMenuIndex = navigations.reduce((acc, nav, navIdx) => {
//             const menuIdx = nav.menu.findIndex(menu => menu.current);
//             if (menuIdx !== -1 && nav.menu[menuIdx].subs.length > 0 && navIdx !== 0) {
//                 // If the current menu is not in the first navigation group and has sub-menus, set the index
//                 return menuIdx;
//             }
//             return acc;
//         }, null);

//         setOpenMenuIndex(initialOpenMenuIndex);
//     }, [navigations]);

//     const handleMenuClick = (index) => {
//         setOpenMenuIndex(prevIndex => (prevIndex === index ? null : index));
//     };

//     return {
//         openMenuIndex,
//         handleMenuClick
//     };
// };


import { useState, useEffect } from 'react';

interface SubMenu {
    // Add properties as needed
    [key: string]: any;
}

interface MenuItem {
    current: boolean;
    subs: SubMenu[];
    // Add other properties as needed
    [key: string]: any;
}

interface Navigation {
    menu: MenuItem[];
    // Add other properties as needed
    [key: string]: any;
}

export default function useOpenSubMenu(navigations: Navigation[]) {
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

    useEffect(() => {
        const initialOpenMenuIndex = navigations.reduce((acc: number | null, nav: Navigation, navIdx: number) => {
            const menuIdx = nav.menu.findIndex(menu => menu.current);
            if (menuIdx !== -1 && nav.menu[menuIdx].subs.length > 0 && navIdx !== 0) {
                // If the current menu is not in the first navigation group and has sub-menus, set the index
                return menuIdx;
            }
            return acc;
        }, null);

        setOpenMenuIndex(initialOpenMenuIndex);
    }, [navigations]);

    const handleMenuClick = (index: number) => {
        setOpenMenuIndex(prevIndex => (prevIndex === index ? null : index));
    };

    return {
        openMenuIndex,
        handleMenuClick
    };
}
