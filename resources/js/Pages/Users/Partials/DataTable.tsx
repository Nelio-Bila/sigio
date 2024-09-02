import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link, usePage, useForm } from "@inertiajs/react";
import { BadgeAlertIcon, BadgeCheckIcon, Edit, EyeIcon, MoreHorizontal, Trash, ArchiveRestore } from "lucide-react";
import useDebouncedSearch from "@/hooks/useDebouncedSearch";
import useSorting from "@/hooks/useSorting";
import TableSortHeader from "@/Components/DataTable/TableSortHeader";
import TablePagination from "@/Components/DataTable/TablePagination";
import TableToolbar from "@/Components/DataTable/TableToolbar";
import TableFilter from "@/Components/DataTable/TableFilter";
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
import { router } from '@inertiajs/react'


interface User {
    id: number;
    name: string;
    email: string;
    roles: { id: number; name: string }[];
    is_verified_email: boolean;
    created_at: string;
    deleted_at: string | null;
}

interface Role {
    name: string;
}

interface PageProps extends InertiaPageProps {
    users: {
        data: User[];
        links: any;
        meta: any;
    };
    filters: any;
    roles: Role[];
    [key: string]: any;
}

interface StatusOption {
    value: string;
    label: string;
    icon?: React.ComponentType<{ className: string }>;
}




export default function DataTable() {
    const { users, filters, roles } = usePage<PageProps>().props;
    const { data: userData, links, meta } = users;

    const { params, setParams, setTimeDebounce } = useDebouncedSearch(
        route(route().current() ?? ''),
        filters
    );
    const { sort } = useSorting(filters, setParams);
    const { delete: destroy } = useForm();

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [is_restore_dialog_open, set_is_restore_dialog_open] = useState(false)
    const [user_id_to_destroy, set_user_id_to_destroy] = useState<number | null>(null)
    const [user_id_to_restore, set_user_id_to_restore] = useState<number | null>(null)

    const status: StatusOption[] = [
        {
            value: "verified",
            label: "Verificado",
            icon: ({ className }: { className: string }) => <BadgeCheckIcon className={className} />
        },
        {
            value: "unverified",
            label: "Não verificado",
            icon: ({ className }: { className: string }) => <BadgeAlertIcon className={className} />
        }
    ];

    const rolesOptions: StatusOption[] = roles.map((role) => ({
        value: role.name,
        label: role.name
    }));

    const destroy_user = () => {
        destroy(`users/destroy/${user_id_to_destroy}`);
        router.visit('/users', {
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
                        <AlertDialogAction onClick={() => destroy_user()}>Sim</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={is_restore_dialog_open}
                onOpenChange={set_is_restore_dialog_open}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Tens certeza que pretendes restaurar este utilizador?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acção habilitará o utilizador a usar o sistema de novo.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction><Link as='button' href={`/users/restore/${user_id_to_restore}`} method="post" preserveState={false} preserveScroll>Sim</Link></AlertDialogAction>
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
                    <TableFilter
                        title="Grupos de usuários"
                        filter="roles"
                        options={rolesOptions}
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
                                        title="Nome"
                                        onClick={() => {
                                            setTimeDebounce(50)
                                            sort('name')
                                        }}
                                        sort={params.col === 'name' ? params.sort : null}
                                    />
                                </TableHead>
                                <TableHead>
                                    <TableSortHeader
                                        title="Email"
                                        onClick={() => {
                                            setTimeDebounce(50)
                                            sort('email')
                                        }}
                                        sort={params.col === 'email' ? params.sort : null}
                                    />
                                </TableHead>
                                <TableHead>Roles</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>
                                    <TableSortHeader
                                        title="Registrado aos"
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
                                userData.length > 0 ? (
                                    userData.map((user) => (
                                        <TableRow key={user.id} className="">
                                            <TableCell className='dark:text-white'> {user.name}</TableCell>
                                            <TableCell className='dark:text-white'>{user.email}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {
                                                        user.roles.map((role) => (
                                                            <span key={role.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:text-white">
                                                                {role.name}
                                                            </span>
                                                        ))
                                                    }
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    user.is_verified_email
                                                        ? <span className="inline-flex items-center rounded bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Verificado</span>
                                                        : <span className="inline-flex items-center rounded bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Não Verificado</span>
                                                }
                                            </TableCell>
                                            <TableCell className='dark:text-white'>{user.created_at}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-end gap-2">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Abrir menu de utilizador</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Opções</DropdownMenuLabel>
                                                            {!user.deleted_at && <DropdownMenuItem>
                                                                <Link className="flex gap-1" href={`/users/${user.id}`}> <EyeIcon className="me-2 w-4 h-4" />Detalhes</Link>
                                                            </DropdownMenuItem>}
                                                            {!user.deleted_at && <DropdownMenuItem>
                                                                <Link className="flex gap-1" href={`/users/edit/${user.id}`}> <Edit className="me-2 w-4 h-4" />Actualizar dados</Link>
                                                            </DropdownMenuItem>}
                                                            {user.deleted_at && <DropdownMenuItem className="flex gap-1" onClick={() => { set_user_id_to_restore(user.id); set_is_restore_dialog_open(true) }}><ArchiveRestore className="me-2 w-4 h-4" />Restaurar</DropdownMenuItem>}
                                                            {!user.deleted_at && <DropdownMenuItem className="flex gap-1 text-red-500" onClick={() => { set_user_id_to_destroy(user.id); setIsDeleteDialogOpen(true) }}><Trash className="me-2 w-4 h-4" />Remover</DropdownMenuItem>}
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
                    </Table>
                </div>
                <TablePagination links={links} meta={meta} />
            </div>
        </>
    )
}
