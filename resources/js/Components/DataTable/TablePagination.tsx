import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, LucideIcon } from "lucide-react";
import { Link } from "@inertiajs/react";

interface PaginationLinkProps {
    href: string;
    srText: string;
    icon: LucideIcon;
    hiddenOnMd?: boolean;
}

const PaginationLink: React.FC<PaginationLinkProps> = ({ href, srText, icon: Icon, hiddenOnMd }) => (
    <Link
        preserveScroll
        preserveState
        href={href}
        className={`h-8 w-8 p-0 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-background dark:text-white shadow-sm hover:bg-gray-50 ${hiddenOnMd ? 'hidden md:inline-flex' : ''}`}
    >
        <span className="sr-only">{srText}</span>
        <Icon className="h-4 w-4" />
    </Link>
);

interface Meta {
    from: number | null;
    to: number | null;
    total: number;
    current_page: number;
    last_page: number;
}

interface Links {
    first: string;
    prev: string;
    next: string;
    last: string;
}

interface TablePaginationProps {
    links: Links;
    meta: Meta;
}

const TablePagination: React.FC<TablePaginationProps> = ({ links, meta }) => {
    return (
        <div className="flex items-center justify-between bg-background dark:text-white">
            <div className="hidden md:block">
                <p className="text-xs text-nile-blue dark:text-white">
                    Mostrando <span className="font-bold">{meta.from || 0}</span> à <span className="font-bold">{meta.to || 0}</span> de <span className="font-bold">{meta.total}</span> registros
                </p>
            </div>

            <div className="block md:hidden space-x-1">
                <PaginationLink href={links.first} srText="Go to first page" icon={ChevronsLeftIcon} />
                <PaginationLink href={links.prev} srText="Go to previous page" icon={ChevronLeftIcon} />
            </div>

            <div className="text-xs text-gray-900 font-bold dark:text-gray-100">
                {meta.current_page} / {meta.last_page}
            </div>

            <div className="flex items-center space-x-2">
                <PaginationLink href={links.first} srText="Go to first page" icon={ChevronsLeftIcon} hiddenOnMd />
                <PaginationLink href={links.prev} srText="Go to previous page" icon={ChevronLeftIcon} hiddenOnMd />
                <PaginationLink href={links.next} srText="Go to next page" icon={ChevronRightIcon} />
                <PaginationLink href={links.last} srText="Go to last page" icon={ChevronsRightIcon} />
            </div>
        </div>
    );
}

export default TablePagination;
