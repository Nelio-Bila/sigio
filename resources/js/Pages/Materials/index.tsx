import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import DataTable from './Partials/DataTable';
import { Button } from '@/components/ui/button';
import { BreadcrumbResponsive } from '@/components/breadcrumbs';

const breadcrumbItems = [
    { href: "/dashboard", label: "Inicio" },
    { label: "Materiais" }
]

export default function Index({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Materiais</h2>}
        >
            <Head title="Materiais" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-2">
                    <BreadcrumbResponsive items={breadcrumbItems} />
                    <div className="flex justify-between md:justify-end gap-2">
                        <Link href='/materials/register'><Button variant="default">Registrar material</Button></Link>
                        <Link href='/stock_movements/register'><Button variant="default">Registrar movimento de material</Button></Link>
                    </div>
                    <DataTable />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
