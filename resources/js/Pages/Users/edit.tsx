import React from 'react'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/components/InputError';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, StepBack } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/multi-select';
import { BreadcrumbResponsive } from '@/components/breadcrumbs';
import { useToast } from "@/components/ui/use-toast"

type Role = {
    value: string;
    label: string;
};

type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles: Role[];
};

type UserPageProps = PageProps<{
    user: User;
    db_roles: Role[];
}>;

const breadcrumbItems = [
    { href: "/dashboard", label: "Inicio" },
    { href: "/users", label: "Utilizadores" },
    { label: "Edição de dados de Utilizador" }
];

export default function Edit({ auth, db_roles, user }: UserPageProps) {
    const { data, setData, processing, errors, put } = useForm({
        name: user.name,
        email: user.email,
        roles: user.roles.map(role => role.value),
    });
    const { toast } = useToast();

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/users/update/${user.id}`, {
            onSuccess: () => {
                toast({
                    title: "Dados do utilizador salvados com sucesso"
                  })
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Utilizadores</h2>}
        >
            <Head title={`Editar dados de ${data.name}`} />
            <div className="flex flex-col gap-3">
                <BreadcrumbResponsive items={breadcrumbItems} />
                <div className="flex justify-start">
                    <Link href='/users'><Button variant="outline">Voltar</Button></Link>
                </div>
                <form onSubmit={submit}>
                    <h1 className='font-bold text-center my-3'>Registro de utilizador do sistema</h1>
                    <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <Label htmlFor="name">Nome</Label>
                            <Input
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>
                    </div>
                    <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        <div>
                            <Label htmlFor="role">Grupo de utilizador</Label>
                            <MultiSelect
                                options={db_roles}
                                onValueChange={(value) => setData('roles', value)}
                                defaultValue={data.roles}
                                placeholder="Selecione os grupos de utilizador"
                                variant="inverted"
                                animation={2}
                                maxCount={3}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        <Link href='/users'>
                            <Button className="ms-4 flex gap-1" variant="outline" type='button'>
                                <StepBack />
                                Cancelar
                            </Button>
                        </Link>
                        <Button className="ms-4 flex gap-1" disabled={processing}>
                            {!processing && <Save />}
                            {processing && <Spinner />}
                            Salvar
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}
