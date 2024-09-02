import GuestLayout from '@/layouts/GuestLayout';
import InputError from '@/components/InputError';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
            <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
                <div className="w-full max-w-md space-y-6 rounded-lg border p-6 shadow-lg dark:border-gray-800 bg-background dark:bg-gray-900">
                    <div className="space-y-2 text-center">
                    <Link href='/' className="text-3xl font-bold tracking-tight dark:text-white">
                            {import.meta.env.VITE_APP_NAME}
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400">
                            Inicia a sessão
                        </p>
                    </div>
                    <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        Esqueceu sua senha? Sem problema. Apenas informe o seu endereço de e-mail e enviaremos um link de redefinição de senha para que você possa escolher uma nova.
                    </div>

                    {status && <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">{status}</div>}

                    <form onSubmit={submit}>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full dark:text-gray-100"
                            onChange={(e: { target: { value: string; }; }) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />

                        <div className="flex items-center justify-end mt-4">
                            <Button className="ms-4" disabled={processing} variant="default">
                            Enviar Link de Redefinição de Senha por E-mail
                            </Button>
                        </div>
                    </form>

                </div>
            </div>
        </GuestLayout>
    );
}
