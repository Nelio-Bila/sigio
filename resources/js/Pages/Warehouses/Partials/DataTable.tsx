import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link, usePage, useForm } from "@inertiajs/react";
import { BadgeAlertIcon, BadgeCheckIcon, Edit, EyeIcon, MoreHorizontal, Trash, ArchiveRestore } from "lucide-react";
import useDebouncedSearch from "@/hooks/useDebouncedSearch";
import useSorting from "@/hooks/useSorting";
import TableSortHeader from "@/components/DataTable/TableSortHeader";
import TablePagination from "@/components/DataTable/TablePagination";
import TableToolbar from "@/components/DataTable/TableToolbar";
import TableFilter from "@/components/DataTable/TableFilter";
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { router } from '@inertiajs/react'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import localeData from 'dayjs/plugin/localeData'

// Extend Day.js with the plugins
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(localeData);

// Import the Portuguese locale
import 'dayjs/locale/pt';
import WarehouseCardLayout from './WarehouseCardLayout';

// Update the locale to Portuguese
dayjs.locale('pt');


interface Warehouse {
    id: number;
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

interface StatusOption {
    value: string;
    label: string;
    icon?: React.ComponentType<{ className: string }>;
}




export default function DataTable() {
    const { warehouses, filters, roles } = usePage<PageProps>().props;
    const { data: warehouseData, links, meta } = warehouses;

    const { params, setParams, setTimeDebounce } = useDebouncedSearch(
        route(route().current() ?? ''),
        filters
    );
    const { sort } = useSorting(filters, setParams);
    const { delete: destroy } = useForm();

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [is_restore_dialog_open, set_is_restore_dialog_open] = useState(false)
    const [warehouse_id_to_destroy, set_warehouse_id_to_destroy] = useState<number | null>(null)
    const [warehouse_id_to_restore, set_warehouse_id_to_restore] = useState<number | null>(null)

    const status: StatusOption[] = [
        {
            value: "active",
            label: "Activo",
            icon: ({ className }: { className: string }) => <BadgeCheckIcon className={className} />
        },
        {
            value: "inactive",
            label: "Inactivo",
            icon: ({ className }: { className: string }) => <BadgeAlertIcon className={className} />
        }
    ];


    const destroy_warehouse = () => {
        // destroy(`warehouses/destroy/${warehouse_id_to_destroy}`);
        router.delete(`warehouses/destroy/${warehouse_id_to_destroy}`);
        router.visit('/warehouses', {
            method: 'get', preserveScroll: true,
        })
    }

    return (
        <>
            <AlertDialog open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Tens certeza que pretendes remover este registro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta ação não pode ser desfeita. Isso excluirá permanentemente este registro.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => destroy_warehouse()}>Sim</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={is_restore_dialog_open}
                onOpenChange={set_is_restore_dialog_open}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Tens certeza que pretendes restaurar este utilizador?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acção habilitará o armazém no sistema de novo.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction><Link as='button' href={`/warehouses/restore/${warehouse_id_to_restore}`} method="post" preserveState={false} preserveScroll>Sim</Link></AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div className="space-y-4">
                <TableToolbar
                    placeholder="Pesquisar utilizador"
                    search={params.search}
                    params={params}
                    setParams={setParams}
                    setTimeDebounce={setTimeDebounce}
                />
                <div className="flex flex-col gap-1 sm:flex-row sm:space-x-1">
                    <TableFilter
                        title="Status"
                        filter="status"
                        options={status}
                        params={params}
                        setParams={setParams}
                        setTimeDebounce={setTimeDebounce}
                    />
                </div>
                <div className="">
                    <WarehouseCardLayout
                        warehouses={warehouseData}
                        onDelete={(id) => {
                            router.delete(`warehouses/destroy/${id}`);
                            router.visit('/warehouses', {
                                method: 'get',
                                preserveScroll: true,
                            });
                        }}
                        onRestore={(id) => {
                            router.post(`warehouses/restore/${id}`);
                            router.visit('/warehouses', {
                                method: 'get',
                                preserveScroll: true,
                            });
                        }}
                    />
                    {/* <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <TableSortHeader
                                        title="Nome"
                                        onClick={() => {
                                            setTimeDebounce(50)
                                            sort('name')
                                        }}
                                        sort={params.col === 'name' ? params.sort : null}
                                    />
                                </TableHead>

                                <TableHead>Estado</TableHead>
                                <TableHead>
                                    <TableSortHeader
                                        title="Registrado"
                                        onClick={() => {
                                            setTimeDebounce(50)
                                            sort('created_at')
                                        }}
                                        sort={params.col === 'created_at' ? params.sort : null}
                                    />
                                </TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                warehouseData.length > 0 ? (
                                    warehouseData.map((warehouse) => (
                                        <TableRow key={warehouse.id} className=" dark:border-slate-800 ">
                                            <TableCell className='dark:text-white'> {warehouse.name}</TableCell>

                                            <TableCell>
                                                {
                                                    warehouse.deleted_at
                                                        ? <Badge className="ring-red-600/10 dark:text-red-900 text-red-700 ring-1 ring-inset bg-red-50 dark:bg-red-300 dark:ring-red-900/10" variant="outline">Desactivado</Badge>
                                                        : <Badge className="text-green-700 dark:text-green-900 ring-1 ring-inset ring-green-600/10 dark:ring-green-900/10 bg-green-50 dark:bg-green-300" variant="outline">Activo</Badge>
                                                }
                                            </TableCell>
                                            <TableCell className='dark:text-white'>{dayjs(warehouse.created_at).fromNow()}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-end gap-2">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Abrir menu de utilizador</span>
                                                                <MoreHorizontal className="h-4 w-4 dark:text-white" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Opções</DropdownMenuLabel>
                                                            {!warehouse.deleted_at && <DropdownMenuItem>
                                                                <Link className="flex gap-1" href={`/warehouses/show/${warehouse.id}`}> <EyeIcon className="me-2 w-4 h-4" />Detalhes</Link>
                                                            </DropdownMenuItem>}
                                                            {!warehouse.deleted_at && <DropdownMenuItem>
                                                                <Link className="flex gap-1" href={`/warehouses/edit/${warehouse.id}`}> <Edit className="me-2 w-4 h-4" />Actualizar dados</Link>
                                                            </DropdownMenuItem>}
                                                            {warehouse.deleted_at && <DropdownMenuItem className="flex gap-1" onClick={() => { set_warehouse_id_to_restore(warehouse.id); set_is_restore_dialog_open(true) }}><ArchiveRestore className="me-2 w-4 h-4" />Restaurar</DropdownMenuItem>}
                                                            {!warehouse.deleted_at && <DropdownMenuItem className="flex gap-1 text-red-500" onClick={() => { set_warehouse_id_to_destroy(warehouse.id); setIsDeleteDialogOpen(true) }}><Trash className="me-2 w-4 h-4" />Remover</DropdownMenuItem>}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            Sem registros.
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table> */}
                </div>
                <TablePagination links={links} meta={meta} />
            </div>
        </>
    )
}
