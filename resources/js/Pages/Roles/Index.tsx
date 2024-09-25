import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import DataTable from './Partials/DataTable';

export default function RolesPage({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Grupos de utilizadores</h2>}
        >
            <Head title="Grupos de utilizadores" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <DataTable />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
