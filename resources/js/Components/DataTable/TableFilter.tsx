import React, { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CheckIcon, CirclePlusIcon } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface Option {
    value: string;
    label: string;
    icon?: React.ComponentType<{ className: string }>;
}

interface Params {
    filters?: string[];
}

interface FilterBadgesProps {
    selectedValues: string[];
    options: Option[];
}

const FilterBadges: React.FC<FilterBadgesProps> = ({ selectedValues, options }) => (
    <>
        <Separator orientation="vertical" className="mx-2 h-4" />
        <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
            {selectedValues.length}
        </Badge>
        <div className="hidden space-x-1 lg:flex">
            {selectedValues.length > 2 ? (
                <Badge variant="secondary" className="rounded-sm px-1 font-normal bg-gray-200/50">
                    {selectedValues.length} selecionados
                </Badge>
            ) : (
                options.filter(option => selectedValues.includes(option.value)).map(option => (
                    <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal bg-gray-200/50"
                    >
                        {option.label}
                    </Badge>
                ))
            )}
        </div>
    </>
);

interface FilterOptionsProps {
    options: Option[];
    params: Params;
    filter: string;
    onSelectFilter: (value: string) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ options, params, filter, onSelectFilter }) => (
    <CommandList>
        <CommandEmpty>No filters found.</CommandEmpty>
        <CommandGroup>
            {options.map((option) => {
                const isSelected = params.filters?.includes(`${filter}:${option.value}`);
                return (
                    <CommandItem key={option.value} value={option.value} onSelect={() => onSelectFilter(option.value)}>
                        <div className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected ? "bg-gray-900 text-white" : "opacity-50 [&_svg]:invisible"
                        )}>
                            <CheckIcon className={cn("h-4 w-4")} />
                        </div>
                        {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                        <span>{option.label}</span>
                    </CommandItem>
                );
            })}
        </CommandGroup>
    </CommandList>
);

interface ClearFiltersProps {
    clearFilters: () => void;
}

const ClearFilters: React.FC<ClearFiltersProps> = ({ clearFilters }) => (
    <>
        <CommandSeparator />
        <CommandGroup>
            <CommandItem onSelect={clearFilters} className="justify-center text-center">
                Apagar filtros
            </CommandItem>
        </CommandGroup>
    </>
);

interface TableFilterProps {
    params: Params;
    setParams: (params: Params) => void;
    setTimeDebounce: (time: number) => void;
    title: string;
    filter: string;
    options: Option[];
}

const TableFilter: React.FC<TableFilterProps> = ({ params, setParams, setTimeDebounce, title, filter, options }) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const onSelectFilter = (value: string) => {
        const newFilter = `${filter}:${value}`;
        let filters = params?.filters ? [...params.filters] : [];

        filters = filters.includes(newFilter)
            ? filters.filter(filter => filter !== newFilter)
            : [...filters, newFilter];

        setTimeDebounce(50);
        setParams({ ...params, filters });
    };

    const clearFilters = () => {
        setSelectedValues([]);
        setParams({ ...params, filters: params.filters?.filter(f => !f.startsWith(`${filter}:`)) || [] });
    };

    useEffect(() => {
        if (params.filters) {
            setSelectedValues(params.filters.filter(f => f.startsWith(`${filter}:`)).map(f => f.split(':')[1]));
        }
    }, [params.filters, filter]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="w-full md:w-auto h-8 border-dashed border-gray-400 text-xs hover:bg-gray-200/50 dark:text-white">
                    <CirclePlusIcon className="mr-2 h-4 w-4" />
                    {title}
                    {selectedValues.length > 0 && <FilterBadges selectedValues={selectedValues} options={options} />}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full md:w-[200px] p-0 dark:text-white" align="start">
                <Command>
                    <CommandInput placeholder={title} />
                    <FilterOptions options={options} params={params} filter={filter} onSelectFilter={onSelectFilter} />
                    {selectedValues.length > 0 && <ClearFilters clearFilters={clearFilters} />}
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default TableFilter;
