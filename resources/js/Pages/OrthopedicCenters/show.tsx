import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { ChevronLeft, MapPin, Calendar, Edit, Building, Globe, Landmark, Home } from 'lucide-react';
import { BreadcrumbResponsive } from '@/components/breadcrumbs';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

type Address = {
    id: string;
    province: { id: string; name: string };
    district: { id: string; name: string };
    neighbourhood: { id: string; name: string };
};

type OrthopedicCenter = {
    id: string;
    name: string;
    created_at: string;
    address: Address;
};

type OrthopedicCenterDetailsProps = PageProps<{
    orthopedicCenter: OrthopedicCenter;
}>;

const breadcrumbItems = [
    { href: "/dashboard", label: "Inicio" },
    { href: "/orthopedic_centers", label: "Centros Ortopédicos" },
    { label: "Detalhes do Centro Ortopédico" }
];

export default function Show({ auth, orthopedicCenter }: OrthopedicCenterDetailsProps) {
    const { address } = orthopedicCenter;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Centros Ortopédicos</h2>}
        >
            <Head title={`Detalhes de ${orthopedicCenter.name}`} />
            <div className="flex flex-col gap-3">
                <BreadcrumbResponsive items={breadcrumbItems} />
                <div className="flex justify-start">
                    <Link href='/orthopedic-centers'>
                        <Button variant="outline" className='dark:text-white'>
                            <ChevronLeft /> Voltar
                        </Button>
                    </Link>
                </div>
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    <h1 className='text-center text-2xl font-bold mb-6 dark:text-white'>
                        Detalhes do Centro Ortopédico: {orthopedicCenter.name}
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Center Name */}
                        <div className="flex items-center gap-3">
                            <Building className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nome</p>
                                <p className="text-lg font-semibold dark:text-white">{orthopedicCenter.name}</p>
                            </div>
                        </div>

                        {/* Location: Province */}
                        <div className="flex items-center gap-3">
                            <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Província</p>
                                <p className="text-lg font-semibold dark:text-white">{address.province.name}</p>
                            </div>
                        </div>

                        {/* Location: District */}
                        <div className="flex items-center gap-3">
                            <Landmark className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Distrito</p>
                                <p className="text-lg font-semibold dark:text-white">{address.district.name}</p>
                            </div>
                        </div>

                        {/* Location: Neighbourhood */}
                        <div className="flex items-center gap-3">
                            <Home className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Bairro</p>
                                <p className="text-lg font-semibold dark:text-white">{address.neighbourhood.name}</p>
                            </div>
                        </div>

                        {/* Creation Date */}
                        <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Data de Criação</p>
                                <p className="text-lg font-semibold dark:text-white">
                                    {new Date(orthopedicCenter.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Button */}
                <div className="flex justify-end mt-4">
                    <Link href={`/orthopedic-centers/edit/${orthopedicCenter.id}`}>
                        <Button className="ms-4 flex gap-1 dark:text-white" variant="link">
                            <Edit />
                            Editar Centro Ortopédico
                        </Button>
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
