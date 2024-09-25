<?php

namespace App\Services;

use App\Models\Role;
use App\Facades\DataTable;
use App\Http\Resources\RoleResource;

class RoleService
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        $filters = str_replace(
            ['guard:web', 'guard:api'],
            ['guard_name:web', 'guard_name:api'],
            request()->query('filters') ?? []
        );

        $result = DataTable::query(Role::query())
            ->searchable(['name'])
            ->applyFilters($filters)
            ->allowedFilters(['guard_name:web', 'guard_name:api'])
            ->allowedSorts(['name'])
            ->make();

        return RoleResource::collection($result);
    }
}
