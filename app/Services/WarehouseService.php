<?php

namespace App\Services;

use App\Models\Warehouse;
use App\Facades\DataTable;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\WarehouseResource;
use App\Models\OrthopedicCenter;

class WarehouseService
{
    // public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    // {
    //     $user = auth()->user();

    //     $filters = str_replace(
    //         [
    //             'status:active',
    //             'status:inactive',
    //         ],
    //         [
    //             'deleted_at:NULL',
    //             'deleted_at:NOT NULL',
    //         ],
    //         request()->query('filters') ?? []
    //     );

    //     $result = DataTable::query(Warehouse::query())
    //         ->with(['orthopedic_center'])
    //         ->where('orthopedic_center_id', $user->orthopedic_center_id)
    //         ->searchable(['name'])
    //         ->applyFilters($filters)
    //         ->allowedFilters([
    //             'deleted_at:NOT NULL',
    //             'deleted_at:NULL',
    //         ])
    //         ->allowedSorts(['name','created_at', 'deleted_at'])
    //         ->make();

    //     return WarehouseResource::collection($result);
    // }
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        $user = auth()->user();  // Get the authenticated user
        $filters = str_replace(
            [
                'status:active',
                'status:inactive',
            ],
            [
                'deleted_at:NULL',
                'deleted_at:NOT NULL',
            ],
            request()->query('filters') ?? []
        );

        // Apply the where clause before passing it to DataTable
        $query = Warehouse::query()
            ->with(['orthopedic_center'])
            ->where('orthopedic_center_id', $user->orthopedic_center_id); // Filter by the user's orthopedic center

        // Pass the filtered query to DataTable
        $result = DataTable::query($query)
            ->searchable(['name'])
            ->applyFilters($filters)
            ->allowedFilters([
                'deleted_at:NOT NULL',
                'deleted_at:NULL',
            ])
            ->allowedSorts(['name', 'created_at', 'deleted_at'])
            ->make();

        return WarehouseResource::collection($result);
    }


    public function store(array $data)
    {
        $authenticated_user = Auth::user();
        $authenticated_user->load(['orthopedic_center']);

        $warehouse = Warehouse::create([
            'id' => Str::uuid(),
            'name' => $data['name'],
            'orthopedic_center_id' => $authenticated_user->orthopedic_center->id,
        ]);

        return $warehouse;
    }

    public function show($id)
    {
        return Warehouse::with(['orthopedic_center'])->findOrFail($id);
    }

    public function edit($id)
    {
        $warehouse = Warehouse::with('orthopedic_center')->findOrFail($id);

        return $warehouse;
    }

    public function update($id, array $data)
    {
        $warehouse = Warehouse::findOrFail($id);

        $warehouse->update([
            'name' => $data['name'],
        ]);

        return $warehouse;
    }

    public function destroy($id)
    {
        $warehouse = Warehouse::findOrFail($id);
        $warehouse->delete();

        return $warehouse;
    }

    public function restore($id)
    {
        $warehouse = Warehouse::withTrashed()->findOrFail($id);
        $warehouse->restore();

        return $warehouse;
    }

    public function forceDestroy($id)
    {
        $warehouse = Warehouse::withTrashed()->findOrFail($id);
        $warehouse->forceDelete();

        return true;
    }
}
