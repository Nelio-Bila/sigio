import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Link, router } from "@inertiajs/react";
import { BadgeCheckIcon, BadgeAlertIcon, Edit, EyeIcon, MoreHorizontal, Trash, ArchiveRestore } from "lucide-react";
import dayjs from 'dayjs';

interface Warehouse {
    id: number;
    name: string;
    created_at: string;
    deleted_at: string | null;
}

interface WarehouseCardLayoutProps {
    warehouses: Warehouse[];
    onDelete: (id: number) => void;
    onRestore: (id: number) => void;
}

const WarehouseCardLayout: React.FC<WarehouseCardLayoutProps> = ({ warehouses, onDelete, onRestore }) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState<boolean>(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);

    const handleDelete = () => {
        if (selectedWarehouse) {
            onDelete(selectedWarehouse.id);
            setIsDeleteDialogOpen(false);
        }
    };

    const handleRestore = () => {
        if (selectedWarehouse) {
            onRestore(selectedWarehouse.id);
            setIsRestoreDialogOpen(false);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {warehouses.map((warehouse) => (
                    <Card key={warehouse.id} onClick={() => router.visit(`warehouses/show/${warehouse.id}`, {
                        method: 'get'
                    })} className='cursor-pointer hover:bg-opacity-75'>
                        <CardHeader>
                            <CardTitle>{warehouse.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center">
                                <Badge variant={warehouse.deleted_at ? "destructive" : "default"}>
                                    {warehouse.deleted_at ? (
                                        <><BadgeAlertIcon className="mr-1" /> Inactivo</>
                                    ) : (
                                        <><BadgeCheckIcon className="mr-1" /> Activo</>
                                    )}
                                </Badge>
                                <span className="text-sm text-gray-500">
                                    Criado {dayjs(warehouse.created_at).fromNow()}
                                </span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="ml-auto">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Opções</DropdownMenuLabel>
                                    {!warehouse.deleted_at && (
                                        <>
                                            <DropdownMenuItem>
                                                <Link href={`/warehouses/show/${warehouse.id}`} className="flex items-center">
                                                    <EyeIcon className="mr-2 h-4 w-4" /> Detalhes
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link href={`/warehouses/edit/${warehouse.id}`} className="flex items-center">
                                                    <Edit className="mr-2 h-4 w-4" /> Actualizar dados
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => { setSelectedWarehouse(warehouse); setIsDeleteDialogOpen(true); }}>
                                                <Trash className="mr-2 h-4 w-4" /> Remover
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                    {warehouse.deleted_at && (
                                        <DropdownMenuItem onClick={() => { setSelectedWarehouse(warehouse); setIsRestoreDialogOpen(true); }}>
                                            <ArchiveRestore className="mr-2 h-4 w-4" /> Restaurar
                                        </DropdownMenuItem>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Tens certeza que pretendes remover este registro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta ação não pode ser desfeita. Isso excluirá permanentemente este registro.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Sim</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={isRestoreDialogOpen} onOpenChange={setIsRestoreDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Tens certeza que pretendes restaurar este armazém?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acção habilitará o armazém no sistema de novo.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleRestore}>Sim</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default WarehouseCardLayout;
