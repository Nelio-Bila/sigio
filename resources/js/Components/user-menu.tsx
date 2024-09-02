import { Link, usePage } from '@inertiajs/react';
import { CircleUser, LogOutIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu'

interface User {
    name: string;
}

interface PageProps {
    auth: {
        user: User;
    };
    [key: string]: any;
}

export default function UserMenu() {
    const { auth } = usePage<PageProps>().props;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                <DropdownMenuLabel>{auth.user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link href="/profile">Perfil</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href="/support">Suporte</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href="/logout" method="post" as="button" type="button" className='inline-flex w-full'>
                        <LogOutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                        <span>Terminar sessão</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
