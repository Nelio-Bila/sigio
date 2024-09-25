import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Edit, Box, Calendar, FileText } from 'lucide-react';
import { BreadcrumbResponsive } from '@/components/breadcrumbs';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';


const unitOfMeasureMap: { [key: string]: string } = {
    kg: 'Kg',
    g: 'Gramas',
    mg: 'Miligramas',
    ton: 'Toneladas',
    liters: 'Litros',
    ml: 'Mililitros',
    m3: 'Metros Cúbicos',
    m: 'Metros',
    cm: 'Centímetros',
    mm: 'Milímetros',
    km: 'Quilômetros',
    pieces: 'Peças',
    units: 'Unidades',
    box: 'Caixas',
    pack: 'Pacotes',
    hours: 'Horas',
    days: 'Dias',
};

type Material = {
    id: string;
    designation: string;
    unit_of_measure: string | null;
    brand_manufacturer: string | null;
    current_stock: number;
    stock_movements: {
        id: number;
        date: string;
        movement: 'in' | 'out';
        document_type: string | null;
        document_number: string | null;
        quantity_in: number;
        quantity_out: number;
        current_stock: number;
    }[];
};


type MaterialDetailsProps = PageProps<{
    material: Material;
}>;

const breadcrumbItems = [
    { href: "/dashboard", label: "Inicio" },
    { href: "/materials", label: "Materiais" },
    { label: "Detalhes do Material" }
];

export default function Show({ auth, material }: MaterialDetailsProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Materiais</h2>}
        >
            <Head title={`Detalhes de ${material.designation}`} />
            <div className="flex flex-col gap-3">
                <BreadcrumbResponsive items={breadcrumbItems} />
                <div className="flex justify-start">
                    <Link href='/materials'>
                        <Button variant="outline" className='dark:text-white'>
                            <ChevronLeft /> Voltar
                        </Button>
                    </Link>
                </div>

                {/* Material Details */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    <h1 className='text-center text-2xl font-bold mb-6 dark:text-white'>
                        Detalhes do Material: {material.designation}
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-3">
                            <Box className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Designação</p>
                                <p className="text-lg font-semibold dark:text-white">{material.designation}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Unidade de Medida</p>
                                <p className="text-lg font-semibold dark:text-white">{unitOfMeasureMap[material.unit_of_measure as string] || material.unit_of_measure || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Box className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Marca/Fabricante</p>
                                <p className="text-lg font-semibold dark:text-white">{material.brand_manufacturer || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Box className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Stock Actual</p>
                                <p className="text-lg font-semibold dark:text-white">{material.current_stock}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stock Movements */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-6">
                    <h2 className="text-xl font-bold mb-4 dark:text-white">Movimentos de Stock</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Data
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Movimento
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Tipo de Documento
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Quantidade Entrada/Saída
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Stock Atual
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                {material.stock_movements.map((movement) => (
                                    <tr key={movement.id}>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(movement.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {movement.movement === 'in' ? 'Entrada' : 'Saída'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {movement.document_type || 'N/A'} ({movement.document_number || 'N/A'})
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {movement.movement === 'in' ? movement.quantity_in : movement.quantity_out}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {movement.current_stock}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-end mt-4">
                    <Link href={`/materials/edit/${material.id}`}>
                        <Button className="ms-4 flex gap-1 dark:text-white" variant="link">
                            <Edit />
                            Editar Material
                        </Button>
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
