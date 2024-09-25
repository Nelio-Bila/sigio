import { FormEventHandler} from 'react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import InputError from '@/components/InputError';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { BreadcrumbResponsive } from '@/components/breadcrumbs';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Save, Trash } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from "@/components/ui/use-toast";
import ErrorAlert from '@/components/error-alert';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Warehouse {
    id: string;
    name: string;
    created_at: string;
    deleted_at: string | null;
}

interface PageProps extends InertiaPageProps {
    warehouses: {
        data: Warehouse[];
        links: any;
        meta: any;
    };
    filters: any;
    [key: string]: any;
}

const breadcrumbItems = [
    { href: "/dashboard", label: "Inicio" },
    { href: "/materials", label: "Materiais" },
    { label: "Registro de Material" }
];

export default function RegisterMaterial({ auth, warehouses }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        designation: '',
        unit_of_measure: '',
        code: '',
        brand_manufacturer: '',
        cabinet: '',
        shelf: '',
        rack: '',
        average_monthly_consumption: '',
        reorder_point: '',
        maximum_stock: '',
        minimum_stock: '',
        current_stock: '',
        warehouse_id: '',
    });
    const { toast } = useToast();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('materials.store'), {
            onSuccess: () => {
                toast({
                    title: "Material registrado com sucesso"
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Materiais</h2>}
        >
            <Head title="Registro de Material" />
            <div className="flex flex-col gap-3">
                <BreadcrumbResponsive items={breadcrumbItems} />
                <div className="flex justify-start">
                    <Link href='/materials'><Button variant="outline" className='dark:text-white'><ChevronLeft />Voltar</Button></Link>
                </div>

                <form onSubmit={submit} className='mt-5'>
                    <h1 className='font-bold text-center my-3'>Registro de Material</h1>
                    <p><span className='text-red-500'>*</span> - campos obrigatórios</p>
                    <ErrorAlert errors={errors} />
                    <div className="grid w-full grid-cols-1 md:grid-cols-4 gap-3">
                        <div>
                            <Label className='dark:text-white' htmlFor="designation">Designação <span className='text-red-500'>*</span></Label>
                            <Input
                                id="designation"
                                name="designation"
                                placeholder='Designação do material'
                                value={data.designation}
                                className="block w-full dark:text-white"
                                onChange={(e) => setData('designation', e.target.value)}
                            />
                            <InputError message={errors.designation} className="mt-2" />
                        </div>

                        <div>
                            <Label className='dark:text-white' htmlFor="unit_of_measure">Unidade de Medida <span className='text-red-500'>*</span></Label>

                            <Select onValueChange={(value: any) => setData('unit_of_measure', value)} defaultValue={data.unit_of_measure}>
                                <SelectTrigger className="w-full dark:text-white">
                                    <SelectValue placeholder="Selecione a Unidade de Medida" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Massa</SelectLabel>
                                        <SelectItem value="kg">Kg</SelectItem>
                                        <SelectItem value="g">Gramas</SelectItem>
                                        <SelectItem value="mg">Miligramas</SelectItem>
                                        <SelectItem value="ton">Toneladas</SelectItem>
                                    </SelectGroup>

                                    <SelectGroup>
                                        <SelectLabel>Volume</SelectLabel>
                                        <SelectItem value="liters">Litros</SelectItem>
                                        <SelectItem value="ml">Mililitros</SelectItem>
                                        <SelectItem value="m3">Metros Cúbicos</SelectItem>
                                    </SelectGroup>

                                    <SelectGroup>
                                        <SelectLabel>Comprimento</SelectLabel>
                                        <SelectItem value="m">Metros</SelectItem>
                                        <SelectItem value="cm">Centímetros</SelectItem>
                                        <SelectItem value="mm">Milímetros</SelectItem>
                                        <SelectItem value="km">Quilômetros</SelectItem>
                                    </SelectGroup>

                                    <SelectGroup>
                                        <SelectLabel>Unidades</SelectLabel>
                                        <SelectItem value="pieces">Peças</SelectItem>
                                        <SelectItem value="units">Unidades</SelectItem>
                                        <SelectItem value="box">Caixas</SelectItem>
                                        <SelectItem value="pack">Pacotes</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.unit_of_measure} className="mt-2" />
                        </div>

                        <div>
                            <Label className='dark:text-white' htmlFor="code">Código</Label>
                            <Input
                                id="code"
                                name="code"
                                placeholder='Código do material'
                                value={data.code}
                                className="block w-full dark:text-white"
                                onChange={(e) => setData('code', e.target.value)}
                            />
                            <InputError message={errors.code} className="mt-2" />
                        </div>

                        <div>
                            <Label className='dark:text-white' htmlFor="brand_manufacturer">Marca/Fabricante</Label>
                            <Input
                                id="brand_manufacturer"
                                name="brand_manufacturer"
                                placeholder='Marca ou fabricante'
                                value={data.brand_manufacturer}
                                className="block w-full dark:text-white"
                                onChange={(e) => setData('brand_manufacturer', e.target.value)}
                            />
                            <InputError message={errors.brand_manufacturer} className="mt-2" />
                        </div>
                    </div>

                    <div className="grid w-full grid-cols-1 md:grid-cols-4 gap-3 mt-3">
                        <div>
                            <Label className='dark:text-white' htmlFor="warehouse_id">Armazém <span className='text-red-500'>*</span></Label>

                            <Select onValueChange={(value: any) => setData('warehouse_id', value)} defaultValue={data.warehouse_id} >
                                <SelectTrigger className=" dark:text-white">
                                    <SelectValue placeholder="Selecione o Armazém" />
                                </SelectTrigger>
                                <SelectContent>
                                    {warehouses.data.map((warehouse: Warehouse) => (
                                        <SelectItem key={warehouse.id} value={warehouse.id}>{warehouse.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.warehouse_id} className="mt-2" />
                        </div>

                        <div>
                            <Label className='dark:text-white' htmlFor="cabinet">Armário</Label>
                            <Input
                                id="cabinet"
                                name="cabinet"
                                placeholder='Armário'
                                value={data.cabinet}
                                className="block w-full dark:text-white"
                                onChange={(e) => setData('cabinet', e.target.value)}
                            />
                            <InputError message={errors.cabinet} className="mt-2" />
                        </div>

                        <div>
                            <Label className='dark:text-white' htmlFor="shelf">Prateleira</Label>
                            <Input
                                id="shelf"
                                name="shelf"
                                placeholder='Prateleira'
                                value={data.shelf}
                                className="block w-full dark:text-white"
                                onChange={(e) => setData('shelf', e.target.value)}
                            />
                            <InputError message={errors.shelf} className="mt-2" />
                        </div>

                        <div>
                            <Label className='dark:text-white' htmlFor="rack">Estante</Label>
                            <Input
                                id="rack"
                                name="rack"
                                placeholder='Estante'
                                value={data.rack}
                                className="block w-full dark:text-white"
                                onChange={(e) => setData('rack', e.target.value)}
                            />
                            <InputError message={errors.rack} className="mt-2" />
                        </div>
                    </div>

                    <div className="grid w-full grid-cols-1 md:grid-cols-5 gap-3 mt-3">
                        <div>
                            <Label className='dark:text-white' htmlFor="average_monthly_consumption">Consumo Mensal Médio</Label>
                            <Input
                                id="average_monthly_consumption"
                                name="average_monthly_consumption"
                                placeholder='Consumo Mensal Médio'
                                value={data.average_monthly_consumption}
                                className="mt-1 block w-full dark:text-white"
                                onChange={(e) => setData('average_monthly_consumption', e.target.value)}
                            />
                            <InputError message={errors.average_monthly_consumption} className="mt-2" />
                        </div>

                        <div>
                            <Label className='dark:text-white' htmlFor="reorder_point">Ponto de Encomenda</Label>
                            <Input
                                id="reorder_point"
                                name="reorder_point"
                                placeholder='Ponto de Encomenda'
                                value={data.reorder_point}
                                className="mt-1 block w-full dark:text-white"
                                onChange={(e) => setData('reorder_point', e.target.value)}
                            />
                            <InputError message={errors.reorder_point} className="mt-2" />
                        </div>

                        <div>
                            <Label className='dark:text-white' htmlFor="maximum_stock">Stock Máximo</Label>
                            <Input
                                id="maximum_stock"
                                name="maximum_stock"
                                placeholder='Stock Máximo'
                                value={data.maximum_stock}
                                className="mt-1 block w-full dark:text-white"
                                onChange={(e) => setData('maximum_stock', e.target.value)}
                            />
                            <InputError message={errors.maximum_stock} className="mt-2" />
                        </div>

                        <div>
                            <Label className='dark:text-white' htmlFor="minimum_stock">Stock Mínimo</Label>
                            <Input
                                id="minimum_stock"
                                name="minimum_stock"
                                placeholder='Stock Mínimo'
                                value={data.minimum_stock}
                                className="mt-1 block w-full dark:text-white"
                                onChange={(e) => setData('minimum_stock', e.target.value)}
                            />
                            <InputError message={errors.minimum_stock} className="mt-2" />
                        </div>

                        <div>
                            <Label className='dark:text-white' htmlFor="current_stock">Stock actual <span className='text-red-500'>*</span></Label>
                            <Input
                                id="current_stock"
                                name="current_stock"
                                placeholder='Stock Actual'
                                value={data.current_stock}
                                className="mt-1 block w-full dark:text-white"
                                onChange={(e) => setData('current_stock', e.target.value)}
                            />
                            <InputError message={errors.current_stock} className="mt-2" />
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
