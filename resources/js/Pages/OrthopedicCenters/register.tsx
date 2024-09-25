
import React, { useState, useEffect, FormEventHandler } from 'react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import InputError from '@/components/InputError';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, Link, useForm } from '@inertiajs/react';
import { District, Neighbourhood, PageProps, Province } from '@/types';
import { BreadcrumbResponsive } from '@/components/breadcrumbs';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Save, Trash } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from "@/components/ui/use-toast";
import axios from 'axios';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ErrorAlert from '@/components/error-alert';

const breadcrumbItems = [
    { href: "/dashboard", label: "Inicio" },
    { href: "/orthopedic_centers", label: "Centros Ortopédicos" },
    { label: "Registro de Centro Ortopédico" }
];

export default function Register({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        province_id: '',
        district_id: '',
        neighbourhood_id: '',
        neighbourhood_name: '',
    });
    const { toast } = useToast();

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [neighbourhoods, setNeighbourhoods] = useState<Neighbourhood[]>([]);
    const [isNewNeighbourhood, setIsNewNeighbourhood] = useState(false);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios.get('/provinces', { cancelToken: source.token })
            .then(response => setProvinces(response.data))
            .catch(err => {
                if (!axios.isCancel(err)) {
                    console.error(err);
                    toast({ title: "Error fetching provinces", variant: "destructive" });
                }
            });
        return () => source.cancel();
    }, []);

    useEffect(() => {
        if (data.province_id) {
            const source = axios.CancelToken.source();
            axios.get(`/provinces/${data.province_id}/districts`, { cancelToken: source.token })
                .then(response => {
                    setDistricts(response.data);
                    setData(prevData => ({
                        ...prevData,
                        district_id: '',
                        neighbourhood_id: '',
                        neighbourhood_name: '',
                    }));
                    setIsNewNeighbourhood(false);
                })
                .catch(err => {
                    if (!axios.isCancel(err)) {
                        console.error(err);
                        toast({ title: "Error fetching districts", variant: "destructive" });
                    }
                });
            return () => source.cancel();
        }
    }, [data.province_id]);

    useEffect(() => {
        if (data.district_id) {
            const source = axios.CancelToken.source();
            axios.get(`/provinces/districts/${data.district_id}/neighbourhoods`, { cancelToken: source.token })
                .then(response => {
                    setNeighbourhoods(response.data);
                    setData(prevData => ({
                        ...prevData,
                        neighbourhood_id: '',
                        neighbourhood_name: '',
                    }));
                    setIsNewNeighbourhood(false);
                })
                .catch(err => {
                    if (!axios.isCancel(err)) {
                        console.error(err);
                        toast({ title: "Error fetching neighbourhoods", variant: "destructive" });
                    }
                });
            return () => source.cancel();
        }
    }, [data.district_id]);

    const handleNeighbourhoodChange = (value: string) => {
        if (value === 'new') {
            setIsNewNeighbourhood(true);
            setData(prevData => ({
                ...prevData,
                neighbourhood_id: '',
                neighbourhood_name: '',
            }));
        } else {
            setIsNewNeighbourhood(false);
            const selectedNeighbourhood = neighbourhoods.find(n => n.id === value);
            setData(prevData => ({
                ...prevData,
                neighbourhood_id: value,
                neighbourhood_name: selectedNeighbourhood?.name || '',
            }));
        }
    };

    const handleNewNeighbourhoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('neighbourhood_name', e.target.value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('orthopedic_centers.store'), {
            onSuccess: () => {
                reset();
                setIsNewNeighbourhood(false);
                toast({ title: "Dados do centro ortopédico salvos com sucesso" });
            },
            onError: () => {
                toast({ title: "Erro ao salvar dados", variant: "destructive" });
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Centros Ortopédicos</h2>}
        >
            <Head title="Registro de Centro Ortopédico" />
            <div className="flex flex-col gap-3">
                <BreadcrumbResponsive items={breadcrumbItems} />
                <div className="flex justify-start">
                    <Link href='/orthopedic_centers'>
                        <Button variant="outline" className='dark:text-white'>
                            <ChevronLeft />Voltar
                        </Button>
                    </Link>
                </div>

                <form onSubmit={submit} className='mt-5'>
                    <h1 className='font-bold text-center my-3 dark:text-white'>Registro de Centro Ortopédico</h1>
                    <ErrorAlert errors={errors} />
                    <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <Label className='dark:text-white' htmlFor="name">Nome</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder='Nome do Centro Ortopédico'
                                value={data.name}
                                className="block w-full dark:text-white"
                                autoComplete="name"
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <Label className='dark:text-white' htmlFor="province_id">Província</Label>
                            <Select
                                onValueChange={(value: string) => setData('province_id', value)}
                                value={data.province_id}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione a província" />
                                </SelectTrigger>
                                <SelectContent className="overflow-y-auto max-h-[10rem]">
                                    {provinces.map((province: Province) => (
                                        <SelectItem key={province.id} value={province.id}>{province.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.province_id} className="mt-2" />
                        </div>

                        <div>
                            <Label className='dark:text-white' htmlFor="district_id">Distrito</Label>
                            <Select
                                disabled={!data.province_id}
                                onValueChange={(value: string) => setData('district_id', value)}
                                value={data.district_id}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o distrito" />
                                </SelectTrigger>
                                <SelectContent className="overflow-y-auto max-h-[10rem]">
                                    {districts.map((district: District) => (
                                        <SelectItem key={district.id} value={district.id}>{district.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.district_id} className="mt-2" />
                        </div>

                        <div>
                            <Label className='dark:text-white' htmlFor="neighbourhood_id">Bairro</Label>
                            <Select
                                disabled={!data.district_id}
                                onValueChange={handleNeighbourhoodChange}
                                value={isNewNeighbourhood ? 'new' : data.neighbourhood_id}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o bairro" />
                                </SelectTrigger>
                                <SelectContent className="overflow-y-auto max-h-[10rem]">
                                    {neighbourhoods.map((neighbourhood: Neighbourhood) => (
                                        <SelectItem key={neighbourhood.id} value={neighbourhood.id}>{neighbourhood.name}</SelectItem>
                                    ))}
                                    <SelectItem value="new">Adicionar novo bairro</SelectItem>
                                </SelectContent>
                            </Select>
                            {isNewNeighbourhood && (
                                <Input
                                    className="mt-2 block w-full dark:text-white"
                                    placeholder="Nome do novo bairro"
                                    value={data.neighbourhood_name}
                                    onChange={handleNewNeighbourhoodChange}
                                />
                            )}
                            <InputError message={errors.neighbourhood_id} className="mt-2" />
                            <InputError message={errors.neighbourhood_name} className="mt-2" />
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button
                            className="ms-4 flex gap-1 dark:text-white"
                            variant="outline"
                            disabled={processing}
                            onClick={() => {
                                reset();
                                setIsNewNeighbourhood(false);
                            }}
                            type="button"
                        >
                            <Trash />
                            Limpar
                        </Button>
                        <Button className="ms-4 flex gap-1" type="submit" disabled={processing}>
                            {processing ? <Spinner className="mr-2" /> : <Save />}
                            Salvar
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
