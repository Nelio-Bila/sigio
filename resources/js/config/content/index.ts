import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { Home, ShoppingCart, Package, Users, LineChart, LucideProps, HardHat, ReceiptText, Archive, Warehouse } from 'lucide-react';
export interface MenuItem {
    route: string;
    name: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    isAdmin: boolean;
    badge?: number;
}

export interface MetricsCardsItem {
    route: string;
    title: string;
    value: number;
    content: string | undefined;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

export const menuItems: MenuItem[] = [
    {
        route: '/dashboard',
        name: 'Inicio',
        icon: Home,
        isAdmin: false,
    },
    {
        route: '/processes',
        name: 'Processos',
        icon: Archive,
        isAdmin: false,
        // badge: 6,
    },
    {
        route: '/consultations',
        name: 'Consultas',
        icon: ReceiptText,
        isAdmin: false
    },
    {
        route: '/materials',
        name: 'Materials',
        icon: Package,
        isAdmin: false,
    },
    {
        route: '/warehouses',
        name: 'Armazéns',
        icon: Warehouse,
        isAdmin: false,
    },
    {
        route: '/ortoprosthe',
        name: 'Ortoprotésicos',
        icon: HardHat,
        isAdmin: true,
    },
    {
        route: '/users',
        name: 'Utilizadores',
        icon: Users,
        isAdmin: true,
    },
    {
        route: '/analytics',
        name: 'Relatórios',
        icon: LineChart,
        isAdmin: false,
    },
];

export const metricsCardsItems_en: MetricsCardsItem[] = [
    {
        route: '/requests',
        title: 'Requests',
        value: 0,
        content: '',
        icon: ShoppingCart,
    },
    {
        route: '/cutsheets',
        title: 'Cutsheets',
        value: 0,
        content: '',
        icon: ReceiptText,
    },
    {
        route: '/materials',
        title: 'Materials',
        value: 0,
        content: '',
        icon: Package,
    },
    {
        route: '/workers',
        title: 'Workers',
        value: 0,
        content: '',
        icon: HardHat,
    },
    {
        route: '/users',
        title: 'Users',
        value: 0,
        content: '',
        icon: Users,
    },
];

export const metricsCardsItems_pt: MetricsCardsItem[] = [
    {
        route: '/requests',
        title: 'Requisições',
        value: 0,
        content: '',
        icon: ShoppingCart,
    },
    {
        route: '/cutsheets',
        title: 'Folhas de corte',
        value: 0,
        content: '',
        icon: ReceiptText,
    },
    {
        route: '/materials',
        title: 'Materiais',
        value: 0,
        content: '',
        icon: Package,
    },
    {
        route: '/workers',
        title: 'Operários',
        value: 0,
        content: '',
        icon: HardHat,
    },
    {
        route: '/users',
        title: 'Usuários',
        value: 0,
        content: '',
        icon: Users,
    },
];

export const menuItems_pt: MenuItem[] = [
    {
        route: '/dashboard',
        name: 'Painel',
        icon: Home,
        isAdmin: false,
    },
    {
        route: '/requests',
        name: 'Requisições',
        icon: ShoppingCart,
        isAdmin: false,
        // badge: 6,
    },
    {
        route: '/cutsheets',
        name: 'Folhas de corte',
        icon: ReceiptText,
        isAdmin: false,
    },
    {
        route: '/materials',
        name: 'Materiais',
        icon: Package,
        isAdmin: false,
    },
    {
        route: '/workers',
        name: 'Operários',
        icon: HardHat,
        isAdmin: true,
    },
    {
        route: '/users',
        name: 'Usuários',
        icon: Users,
        isAdmin: true,
    },
    {
        route: '/analytics',
        name: 'Relatórios/Analises',
        icon: LineChart,
        isAdmin: false,
    },
];
