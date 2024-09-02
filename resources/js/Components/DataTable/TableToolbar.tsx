import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RowsPerPageSelectProps {
    limit: string;
    setLimit: (value: string) => void;
    setParams: (params: any) => void;
    params: any;
    setTimeDebounce: (value: number) => void;
}

const RowsPerPageSelect: React.FC<RowsPerPageSelectProps> = ({ limit, setLimit, setParams, params, setTimeDebounce }) => (
    <Select
        value={limit}
        onValueChange={(value) => {
            setLimit(value);
            setTimeDebounce(50);
            setParams({ ...params, limit: value });
        }}
    >
        <SelectTrigger className="mr-2 h-8 w-[70px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="10" />
        </SelectTrigger>
        <SelectContent side="bottom">
            {[10, 25, 50, 100].map((limit) => (
                <SelectItem key={limit} value={`${limit}`} className="focus:bg-gray-200/50 cursor-pointer">
                    {limit}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);

interface SearchInputProps {
    placeholder?: string;
    search: string;
    setParams: (params: any) => void;
    params: any;
    setTimeDebounce: (value: number) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, search, setParams, params, setTimeDebounce }) => (
    <Input
        placeholder={placeholder || 'Search'}
        className="h-8 w-full lg:w-[250px] text-xs"
        value={search || ''}
        onChange={(e) => {
            setParams({ ...params, search: e.target.value });
            setTimeDebounce(500);
        }}
    />
);

interface TableToolbarProps {
    placeholder?: string;
    params: any;
    setParams: (params: any) => void;
    setTimeDebounce: (value: number) => void;
    search: string;
}

const TableToolbar: React.FC<TableToolbarProps> = ({ placeholder, params, setParams, setTimeDebounce, search }) => {
    const [limit, setLimit] = useState((params.limit || 10).toString());

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <p className="text-xs font-medium hidden mr-1 sm:block">Registros por página</p>
                <RowsPerPageSelect
                    limit={limit}
                    setLimit={setLimit}
                    setParams={setParams}
                    params={params}
                    setTimeDebounce={setTimeDebounce}
                />
            </div>

            <div className="flex-grow md:flex-grow-0">
                <SearchInput
                    placeholder={placeholder}
                    search={search}
                    setParams={setParams}
                    params={params}
                    setTimeDebounce={setTimeDebounce}
                />
            </div>
        </div>
    );
};

export default TableToolbar;
