import { FormEventHandler, useEffect, useState } from 'react';
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
import { useToast } from "@/components/ui/use-toast"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Page } from '@inertiajs/core';
import ErrorAlert from '@/components/error-alert';
import axios from 'axios';
import { PhoneInput } from '@/components/ui/phone-input';

interface ProcessData {
    nid: number;
    marital_state: string;
    name: string;
    date_of_birth: string;
    genre: string;
    race: string;
    profession: string;
    workplace: string;
    naturality: string;
    phone_number: string;
    father_name: string;
    mother_name: string;
    province_id: string;
    district_id: string;
    neighbourhood_id: string;
    neighbourhood_name: string;
    number: string;
    archive: string;
    issue_date: string;
    expire_date: string;
}


interface ProcessPageProps extends PageProps {
    process: ProcessData;
}

const breadcrumbItems = [
    { href: "/dashboard", label: "Inicio" },
    { href: "/processes", label: "Processos" },
    { label: "Registro de Processo" }
]

export default function Register({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset, setError, clearErrors } = useForm<ProcessData>({
        nid: 0,
        marital_state: '',
        name: '',
        date_of_birth: '',
        genre: '',
        race: '',
        profession: '',
        workplace: '',
        naturality: '',
        phone_number: '',
        father_name: '',
        mother_name: '',
        province_id: '',
        district_id: '',
        neighbourhood_id: '',
        neighbourhood_name: '',
        number: '',
        archive: '',
        issue_date: '',
        expire_date: ''
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

    const mozambiqueIdRegex = /^[0-9]{12}[A-Z]$/;

    const validateIdNumber = (value: string) => {
        if (!mozambiqueIdRegex.test(value)) {
          setError('number', 'Numero do BI Inválido');
        } else {
          clearErrors('number');
        }
      };

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



    const validateExpireDateFn = (value: string) => {
        const issueDate = new Date(data.issue_date);
        const expireDate = new Date(value);
        const minExpireDate = new Date(issueDate);
        minExpireDate.setFullYear(minExpireDate.getFullYear() + 4);

        if (expireDate <= issueDate) {
            setError('expire_date', 'Expiry date must be after the issue date');
        } else if (expireDate < minExpireDate) {
            setError('expire_date', 'Expiry date must be at least 4 years after the issue date');
        } else {
            clearErrors('expire_date');
        }
    };



    const handleExpireDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData('expire_date', value);
        validateExpireDateFn(value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('processes.store'), {
            onSuccess: (page) => {
                toast({
                    title: `Processo criado com sucesso`
                });
                reset();
            },
            onError: () => {
                toast({
                    title: `Ocorreu um erro ao registrar o Processo`
                });
            },

        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Processos</h2>}
        >
            <Head title="Registro de processo" />
            <div className="flex flex-col gap-3">

                <BreadcrumbResponsive items={breadcrumbItems} />
                <div className="flex justify-start">
                    <Link href='/users'><Button variant="outline" className='dark:text-white'><ChevronLeft />Voltar</Button></Link>

                </div>

                <form onSubmit={submit} className='mt-5'>
                    <h1 className='font-bold text-center my-1 dark:text-white'>Registro de Processo do Paciente</h1>
                    <ErrorAlert errors={errors} />
                    <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                            <Label className='dark:text-white' htmlFor="nid">NID (opcional)</Label>
                            <Input
                                id="nid"
                                name="nid"
                                type="number"
                                placeholder='Número de Identificação do Doente'
                                value={data.nid}
                                className="mt-1 block w-full dark:text-white"
                                onChange={(e) => setData('nid', Number(e.target.value))}
                            />
                            <InputError message={errors.nid} className="mt-2" />
                        </div>

                        <div>
                            <Label className='dark:text-white' htmlFor="name">Nome</Label>

                            <Input
                                id="name"
                                name="name"
                                placeholder='Nome do paciente'
                                value={data.name}
                                className="mt-1 block w-full dark:text-white"
                                autoComplete="name"
                                onChange={(e) => setData('name', e.target.value)}

                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>


                        <div>
                            <Label className='dark:text-white' htmlFor="date_of_birth">Data de nascimento</Label>

                            <Input
                                id="date_of_birth"
                                type="date"
                                name="date_of_birth"
                                placeholder='Data de nascimento do paciente'
                                value={data.date_of_birth}
                                className="mt-1 block w-full dark:text-white"
                                autoComplete="date_of_birth"
                                onChange={(e) => setData('date_of_birth', e.target.value)}
                                max={new Date().toJSON().slice(0, 10)}

                            />

                            <InputError message={errors.date_of_birth} className="mt-2" />
                        </div>
                    </div>

                    <div className="grid w-full grid-cols-1 md:grid-cols-4 gap-3 mt-3">
                        <div >
                            <Label className='dark:text-white' htmlFor="genre">Genero</Label>

                            <Select onValueChange={(value: any) => setData('genre', value)} defaultValue={data.genre}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o Genêro" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Masculino</SelectItem>
                                    <SelectItem value="female">Feminino</SelectItem>
                                    <SelectItem value="other">Outro</SelectItem>
                                </SelectContent>
                            </Select>

                            <InputError message={errors.genre} className="mt-2" />
                        </div>

                        <div>
                            <Label className='dark:text-white' htmlFor="marital_state">Estado civil</Label>

                            <Select onValueChange={(value: any) => setData('marital_state', value)} defaultValue={data.marital_state}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o Estado civil" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="single">Solteira(o)</SelectItem>
                                    <SelectItem value="married">Casada(o)</SelectItem>
                                    <SelectItem value="divorced">Divorciada(o)</SelectItem>
                                    <SelectItem value="widowed">Viuva(o)</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.marital_state} className="mt-2" />
                        </div>

                        <div>
                            <Label className='dark:text-white' htmlFor="race">Raça</Label>

                            <Select onValueChange={(value: any) => setData('race', value)} defaultValue={data.race}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione a raça do paciente" defaultValue={data.race} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="black">Negra</SelectItem>
                                    <SelectItem value="white">Branca</SelectItem>
                                    <SelectItem value="mixed">Mista</SelectItem>
                                    <SelectItem value="asian">Asiatica</SelectItem>
                                    <SelectItem value="other">Outra</SelectItem>
                                </SelectContent>
                            </Select>

                            <InputError message={errors.race} className="mt-2" />
                        </div>

                        <div>
                            <Label className='dark:text-white' htmlFor="naturality">Naturalidade</Label>

                            <Input
                                id="naturality"
                                name="naturality"
                                placeholder='Naturalidade do paciente'
                                value={data.naturality}
                                className="block w-full dark:text-white"
                                autoComplete="naturality"
                                onChange={(e) => setData('naturality', e.target.value)}

                            />

                            <InputError message={errors.naturality} className="mt-2" />
                        </div>
                    </div>

                    <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        <div >
                            <Label className='dark:text-white' htmlFor="father_name">Nome do pai</Label>

                            <Input
                                id="father_name"
                                name="father_name"
                                placeholder='Nome do pai do paciente'
                                value={data.father_name}
                                className="mt-1 block w-full dark:text-white"
                                autoComplete="father_name"
                                onChange={(e) => setData('father_name', e.target.value)}

                            />

                            <InputError message={errors.father_name} className="mt-2" />
                        </div>
                        <div >
                            <Label className='dark:text-white' htmlFor="mother_name">Nome do mãe</Label>

                            <Input
                                id="mother_name"
                                name="mother_name"
                                placeholder='Nome da mãe do paciente'
                                value={data.mother_name}
                                className="mt-1 block w-full dark:text-white"
                                autoComplete="mother_name"
                                onChange={(e) => setData('mother_name', e.target.value)}

                            />

                            <InputError message={errors.mother_name} className="mt-2" />
                        </div>
                    </div>

                    <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                        <div >
                            <Label className='dark:text-white' htmlFor="profession">Profissão</Label>

                            <Input
                                id="profession"
                                name="profession"
                                placeholder='profissão do paciente'
                                value={data.profession}
                                className="mt-1 block w-full dark:text-white"
                                autoComplete="profession"
                                onChange={(e) => setData('profession', e.target.value)}

                            />

                            <InputError message={errors.profession} className="mt-2" />
                        </div>
                        <div >
                            <Label className='dark:text-white' htmlFor="workplace">Local de trabalho</Label>

                            <Input
                                id="workplace"
                                name="workplace"
                                placeholder='Local de trabalho do paciente'
                                value={data.workplace}
                                className="mt-1 block w-full dark:text-white"
                                autoComplete="workplace"
                                onChange={(e) => setData('workplace', e.target.value)}

                            />

                            <InputError message={errors.workplace} className="mt-2" />
                        </div>

                        <div>
                            <Label className='dark:text-white' htmlFor="phone_number">Nr de telefone</Label>

                            <PhoneInput
                                id="phone_number"
                                name="phone_number"
                                placeholder='Telefone do paciente'
                                value={data.phone_number}
                                className="mt-1 w-full dark:text-white"
                                onChange={(value) => setData('phone_number', value)}
                                defaultCountry='MZ'
                            />

                            <InputError message={errors.phone_number} className="mt-2" />
                        </div>
                    </div>


                    <h2 className='font-semibold mt-4 dark:text-white'>Endereço</h2>
                    <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-3 mt-3">
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

                    <h2 className='font-semibold mt-4 dark:text-white'>Identificação</h2>
                    <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        <div>
                            <Label className='dark:text-white' htmlFor="identification_number">Número do Bilhete Identificação</Label>
                            <Input
                                placeholder='Número do BI'
                                id="identification_number"
                                name="number"
                                value={data.number}
                                className="mt-1 block w-full dark:text-white"
                                onChange={(e) => {
                                    setData('number', e.target.value);
                                    validateIdNumber(e.target.value);
                                }}
                            />
                            <InputError message={errors['number']} className="mt-2" />
                        </div>
                        <div>
                            <Label className='dark:text-white' htmlFor="identification_archive">Arquivo de Identificação</Label>
                            <Input
                                id="identification_archive"
                                name="archive"
                                placeholder='Arquivo de Identificação'
                                className="mt-1 block w-full dark:text-white"
                                onChange={(e) => setData('archive', e.target.value)}
                            />
                            <InputError message={errors['archive']} className="mt-2" />
                        </div>
                    </div>
                    <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        <div>
                            <Label className='dark:text-white' htmlFor="identification_issue_date">Data de Emissão</Label>
                            <Input
                                id="identification_issue_date"
                                name="identification.issue_date"
                                type="date"
                                value={data.issue_date}
                                className="mt-1 block w-full dark:text-white"
                                onChange={(e) => setData('issue_date', e.target.value)}
                                max={new Date().toISOString().split('T')[0]}
                            />
                            <InputError message={errors['issue_date']} className="mt-2" />
                        </div>
                        <div>
                            <Label className='dark:text-white' htmlFor="identification_expire_date">Data de Validade</Label>
                            <Input
                                id="identification_expire_date"
                                name="expire_date"
                                type="date"
                                value={data.expire_date}
                                className="mt-1 block w-full dark:text-white"
                                // onChange={(e) => setData('expire_date', e.target.value)}
                                onChange={handleExpireDateChange}
                                min={data.issue_date}
                            />
                            <InputError message={errors['expire_date']} className="mt-2" />
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
