import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { ChevronLeft, User, Mail, Calendar, Shield, Edit, Hospital } from 'lucide-react';
import { BreadcrumbResponsive } from '@/components/breadcrumbs';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

type Role = {
    id: string;
    name: string;
};

type User = {
    id: number;
    name: string;
    email: string;
    orthopedic_center: {
        name: string;
    };
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles: Role[];
};

type UserDetailsProps = PageProps<{
    user: User;
}>;

const breadcrumbItems = [
    { href: "/dashboard", label: "Inicio" },
    { href: "/users", label: "Utilizadores" },
    { label: "Detalhes do Utilizador" }
];

export default function Show({ auth, user }: UserDetailsProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Utilizadores</h2>}
        >
            <Head title={`Detalhes de ${user.name}`} />
            <div className="flex flex-col gap-3">
                {/* <Head title={`Detalhes de ${user.name}`} /> */}
                <BreadcrumbResponsive items={breadcrumbItems} />
                <div className="flex justify-start">
                    <Link href='/users'>
                        <Button variant="outline" className='dark:text-white'>
                            <ChevronLeft />Voltar
                        </Button>
                    </Link>
                </div>
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    <h1 className='text-center text-2xl font-bold mb-6 dark:text-white'>
                        Detalhes do utilizador: {user.name}
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-3">
                            <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nome</p>
                                <p className="text-lg font-semibold dark:text-white">{user.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                                <p className="text-lg font-semibold dark:text-white">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Hospital className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Centro Ortopédico</p>
                                <p className="text-lg font-semibold dark:text-white">{user.orthopedic_center.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Data de Criação</p>
                                <p className="text-lg font-semibold dark:text-white">
                                    {new Date(user.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Shield className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Papeis</p>
                                <p className="text-lg font-semibold dark:text-white">
                                    {user.roles.map(role => role.name).join(', ')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <Link href={`/users/edit/${user.id}`}>
                        <Button className="ms-4 flex gap-1 dark:text-white" variant="link">
                            <Edit/>
                            Editar Utilizador
                        </Button>
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
