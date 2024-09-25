import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { ChevronLeft, User, Calendar, Phone, Briefcase, MapPin, Heart, Flag } from 'lucide-react';
import { BreadcrumbResponsive } from '@/components/breadcrumbs';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

type Process = {
    id: string;
    name: string;
    date_of_birth: string;
    genre: 'male' | 'female' | 'other';
    race: 'black' | 'white' | 'mixed' | 'asian' | 'other';
    marital_state: 'single' | 'married' | 'divorced' | 'widowed';
    profession: string | null;
    workplace: string | null;
    naturality: string;
    phone_number: string;
    father_name: string;
    mother_name: string;
};

type ProcessDetailsProps = PageProps<{
    process: Process;
}>;

const breadcrumbItems = [
    { href: "/dashboard", label: "Inicio" },
    { href: "/processes", label: "Processos" },
    { label: "Detalhes do Processo" }
];

export default function ShowProcess({ auth, process }: ProcessDetailsProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Processos</h2>}
        >
            <Head title={`Detalhes do Processo de ${process.name}`} />
            <div className="flex flex-col gap-3">
                <BreadcrumbResponsive items={breadcrumbItems} />
                <div className="flex justify-start">
                    <Link href='/processes'>
                        <Button variant="outline" className='dark:text-white'>
                            <ChevronLeft />Voltar
                        </Button>
                    </Link>
                </div>
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    <h1 className='text-center text-2xl font-bold mb-6 dark:text-white'>
                        Detalhes do Processo: {process.name}
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-3">
                            <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nome</p>
                                <p className="text-lg font-semibold dark:text-white">{process.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Data de Nascimento</p>
                                <p className="text-lg font-semibold dark:text-white">
                                    {new Date(process.date_of_birth).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Flag className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Naturalidade</p>
                                <p className="text-lg font-semibold dark:text-white">{process.naturality}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Número de Telefone</p>
                                <p className="text-lg font-semibold dark:text-white">{process.phone_number}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Briefcase className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Profissão</p>
                                <p className="text-lg font-semibold dark:text-white">
                                    {process.profession || 'Não especificada'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Local de Trabalho</p>
                                <p className="text-lg font-semibold dark:text-white">
                                    {process.workplace || 'Não especificado'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Heart className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Estado Civil</p>
                                <p className="text-lg font-semibold dark:text-white">{process.marital_state}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pai</p>
                                <p className="text-lg font-semibold dark:text-white">{process.father_name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Mãe</p>
                                <p className="text-lg font-semibold dark:text-white">{process.mother_name}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <Link href={`/processes/edit/${process.id}`}>
                        <Button className="ms-4 flex gap-1 dark:text-white" variant="link">
                            Editar Processo
                        </Button>
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
