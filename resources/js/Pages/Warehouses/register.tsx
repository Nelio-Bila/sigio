import { FormEventHandler, useEffect, useState } from 'react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import InputError from '@/components/InputError';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { BreadcrumbResponsive } from '@/components/breadcrumbs';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Save, Trash } from 'lucide-react';
import { MultiSelect } from '@/components/multi-select';
import axios from 'axios';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from "@/components/ui/use-toast"
import ErrorAlert from '@/components/error-alert';

const breadcrumbItems = [
    { href: "/dashboard", label: "Inicio" },
    { href: "/warehouses", label: "Armazéns" },
    { label: "Registro de Armazém" }
]

export default function Register({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });
    const { toast } = useToast();





    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('warehouses.store'), {
            onSuccess: () => {
                toast({
                    title: "Dados do armazém salvados com sucesso"
                })
            },

        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Armazéns</h2>}
        >
            <Head title="Registro de utilizador" />
            <div className="flex flex-col gap-3">

                <BreadcrumbResponsive items={breadcrumbItems} />
                <div className="flex justify-start">
                    <Link href='/warehouses'><Button variant="outline" className='dark:text-white'><ChevronLeft />Voltar</Button></Link>

                </div>

                <form onSubmit={submit} className='mt-5'>
                    <h1 className='font-bold text-center my-3'>Registro de armazém no sistema</h1>
                    <ErrorAlert errors={errors} />
                    <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <Label className='dark:text-white' htmlFor="name">Nome</Label>

                            <Input
                                id="name"
                                name="name"
                                placeholder='Nome do utilizador'
                                value={data.name}
                                className="mt-1 block w-full dark:text-white"
                                autoComplete="name"
                                onChange={(e) => setData('name', e.target.value)}

                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>


                    </div>


                    <div className="flex items-center justify-end mt-4">
                        <Button className="ms-4 flex gap-1 dark:text-white" variant="outline" disabled={processing} onClick={() => reset()} type='button'>
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
