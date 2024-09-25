import React from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import {
    ArrowDownIcon,
    ArrowUpIcon,
    ChevronsUpDownIcon,
} from "lucide-react";

interface SortIconProps {
    sort: 'asc' | 'desc' | null;
}

const SortIcon: React.FC<SortIconProps> = ({ sort }) => {
    if (sort === "desc") return <ArrowDownIcon className="ml-2 h-3.5 w-3.5" />;
    if (sort === "asc") return <ArrowUpIcon className="ml-2 h-3.5 w-3.5" />;
    return <ChevronsUpDownIcon className="ml-2 h-4 w-4" />;
};

interface TableSortHeaderProps extends ButtonProps {
    className?: string;
    title: string;
    sort: 'asc' | 'desc' | null;
}

const TableSortHeader: React.FC<TableSortHeaderProps> = ({ className, title, sort, ...props }) => {
    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <Button
                variant="ghost"
                size="sm"
                className="flex items-center -ml-0.5 h-8 hover:bg-gray-200 border-none"
                {...props}
            >
                <span>{title}</span>
                <SortIcon sort={sort} />
            </Button>
        </div>
    );
};

export default TableSortHeader;
