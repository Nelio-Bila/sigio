import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link, usePage, useForm } from "@inertiajs/react";
import { Edit, EyeIcon, MoreHorizontal, Trash, ArchiveRestore } from "lucide-react";
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

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(localeData);

import 'dayjs/locale/pt';

dayjs.locale('pt');

interface Process {
    id: string;
    nid: number;
    name: string;
    date_of_birth: string;
    genre: string;
    marital_state: string;
    phone_number: string;
    created_at: string;
    deleted_at: string | null;
}

interface PageProps extends InertiaPageProps {
    processes: {
        data: Process[];
        links: any;
        meta: any;
    };
    filters: any;
    [key: string]: any;
}

interface StatusOption {
    value: string;
    label: string;
}

const translateGenre = (genre: string): string => {
    const genreMap: { [key: string]: string } = {
        'male': 'Masculino',
        'female': 'Feminino',
        'other': 'Outro'
    };
    return genreMap[genre] || genre;
};

const translateMaritalState = (state: string): string => {
    const stateMap: { [key: string]: string } = {
        'single': 'Solteiro',
        'married': 'Casado',
        'divorced': 'Divorciado',
        'widowed': 'Viúvo'
    };
    return stateMap[state] || state;
};

export default function ProcessDataTable() {
    const { processes, filters } = usePage<PageProps>().props;
    const { data: processData, links, meta } = processes;

    const { params, setParams, setTimeDebounce } = useDebouncedSearch(
        route(route().current() ?? ''),
        filters
    );
    const { sort } = useSorting(filters, setParams);
    const { delete: destroy } = useForm();

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false)
    const [processIdToDestroy, setProcessIdToDestroy] = useState<string | null>(null)
    const [processIdToRestore, setProcessIdToRestore] = useState<string | null>(null)

    const maritalStates: StatusOption[] = [
        { value: "single", label: "Solteiro" },
        { value: "married", label: "Casado" },
        { value: "divorced", label: "Divorciado" },
        { value: "widowed", label: "Viúvo" }
    ];

    const genres: StatusOption[] = [
        { value: "male", label: "Masculino" },
        { value: "female", label: "Feminino" },
        { value: "other", label: "Outro" }
    ];

    const destroyProcess = () => {
        destroy(`processes/destroy/${processIdToDestroy}`);
        router.visit('/processes', {
            method: 'get', preserveScroll: true,
        })
    }

    return (
        <>
            <AlertDialog open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Tens certeza que pretendes remover este processo?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta ação não pode ser desfeita. Isso excluirá permanentemente este processo.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => destroyProcess()}>Sim</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={isRestoreDialogOpen}
                onOpenChange={setIsRestoreDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Tens certeza que pretendes restaurar este processo?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acção reativará o processo no sistema.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction><Link as='button' href={`/processes/restore/${processIdToRestore}`} method="post" preserveState={false} preserveScroll>Sim</Link></AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div className="space-y-4">
                <TableToolbar
                    placeholder="Pesquisar processo"
                    search={params.search}
                    params={params}
                    setParams={setParams}
                    setTimeDebounce={setTimeDebounce}
                />
                <div className="flex flex-col gap-1 sm:flex-row sm:space-x-1">
                    <TableFilter
                        title="Estado Civil"
                        filter="marital_state"
                        options={maritalStates}
                        params={params}
                        setParams={setParams}
                        setTimeDebounce={setTimeDebounce}
                    />
                    <TableFilter
                        title="Gênero"
                        filter="genre"
                        options={genres}
                        params={params}
                        setParams={setParams}
                        setTimeDebounce={setTimeDebounce}
                    />
                </div>
                <div className="">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <TableSortHeader
                                        title="NID"
                                        onClick={() => {
                                            setTimeDebounce(50)
                                            sort('nid')
                                        }}
                                        sort={params.col === 'nid' ? params.sort : null}
                                    />
                                </TableHead>
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
                                <TableHead>Data de Nascimento</TableHead>
                                <TableHead>Gênero</TableHead>
                                <TableHead>Estado Civil</TableHead>
                                <TableHead>Telefone</TableHead>
                                <TableHead>
                                    <TableSortHeader
                                        title="Criado em"
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
                                processData.length > 0 ? (
                                    processData.map((process) => (
                                        <TableRow key={process.id} className="dark:border-slate-800">
                                            <TableCell className='dark:text-white'>{process.nid}</TableCell>
                                            <TableCell className='dark:text-white'>{process.name}</TableCell>
                                            <TableCell className='dark:text-white'>{dayjs(process.date_of_birth).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell className='dark:text-white'>{translateGenre(process.genre)}</TableCell>
                                            <TableCell className='dark:text-white'>{translateMaritalState(process.marital_state)}</TableCell>
                                            <TableCell className='dark:text-white'>{process.phone_number}</TableCell>
                                            <TableCell className='dark:text-white'>{dayjs(process.created_at).fromNow()}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-end gap-2">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Abrir menu de processo</span>
                                                                <MoreHorizontal className="h-4 w-4 dark:text-white" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Opções</DropdownMenuLabel>
                                                            {!process.deleted_at && <DropdownMenuItem>
                                                                <Link className="flex gap-1" href={`/processes/show/${process.id}`}> <EyeIcon className="me-2 w-4 h-4" />Detalhes</Link>
                                                            </DropdownMenuItem>}
                                                            {!process.deleted_at && <DropdownMenuItem>
                                                                <Link className="flex gap-1" href={`/processes/edit/${process.id}`}> <Edit className="me-2 w-4 h-4" />Actualizar dados</Link>
                                                            </DropdownMenuItem>}
                                                            {process.deleted_at && <DropdownMenuItem className="flex gap-1" onClick={() => { setProcessIdToRestore(process.id); setIsRestoreDialogOpen(true) }}><ArchiveRestore className="me-2 w-4 h-4" />Restaurar</DropdownMenuItem>}
                                                            {!process.deleted_at && <DropdownMenuItem className="flex gap-1 text-red-500" onClick={() => { setProcessIdToDestroy(process.id); setIsDeleteDialogOpen(true) }}><Trash className="me-2 w-4 h-4" />Remover</DropdownMenuItem>}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} className="h-24 text-center">
                                            Sem registros.
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </div>
                <TablePagination links={links} meta={meta} />
            </div>
        </>
    )
}
