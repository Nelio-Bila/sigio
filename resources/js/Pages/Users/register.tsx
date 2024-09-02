import { FormEventHandler, useEffect, useState } from 'react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import InputError from '@/components/InputError';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { BreadcrumbResponsive } from '@/components/breadcrumbs';
import { Label } from '@/components/ui/label';
import { Save, Trash } from 'lucide-react';
import { MultiSelect } from '@/components/multi-select';
import axios from 'axios';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from "@/components/ui/use-toast"

const breadcrumbItems = [
    { href: "/dashboard", label: "Inicio" },
    { href: "/users", label: "Utilizadores" },
    { label: "Registro de Utilizador" }
]

export default function Register({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: [],
    });
    const { toast } = useToast();

    const [rolesList, setRolesList] = useState([]);

    useEffect(() => {
        axios.get('/roles/list')
            .then(response => {
                const formattedRoles = response.data.map((role: { id: { toString: () => any; }; name: any; }) => ({
                    value: role.id.toString(),
                    label: role.name,
                }));
                setRolesList(formattedRoles);
            })
            .catch(error => {
                console.error("There was an error fetching the roles!", error);
            });
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('users.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
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
            <Head title="Registro de utilizador" />
            <div className="flex flex-col gap-3">

                <BreadcrumbResponsive items={breadcrumbItems} />
                <div className="flex justify-start">
                    <Link href='/users'><Button variant="outline">Voltar</Button></Link>

                </div>

                <form onSubmit={submit} className='mt-5'>
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
                        <div >
                            <Label htmlFor="password">Palavra-passe</Label>

                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}

                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="password_confirmation">Confirmação de palavra-passe</Label>

                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}

                            />

                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>
                    </div>

                    <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        <div >
                            <Label htmlFor="role">Grupo de utilizador</Label>
                            <MultiSelect
                                options={rolesList}
                                onValueChange={(value: any) => setData('roles', value)}
                                defaultValue={data.roles}
                                placeholder="Selecione os grupos de utilizador"
                                variant="inverted"
                                animation={2}
                                maxCount={3}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button className="ms-4 flex gap-1" variant="outline" disabled={processing} onClick={() => reset()} type='button'>
                            <Trash />
                            Limpar
                        </Button>
                        <Button className="ms-4 flex gap-1" disabled={processing}>
                            {!processing && <Save />}
                            {processing && <Spinner />}
                            Salvar
                        </Button>
                    </div>
                </form>
            </div>

        </AuthenticatedLayout>
    );
}
