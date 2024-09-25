<?php

namespace App\Services;

use App\Models\Material;
use App\Facades\DataTable;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\MaterialResource;

class MaterialService
{
    public function index()
    {
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

        $result = DataTable::query(Material::query()->with(['warehouse']))
            ->searchable(['designation', 'brand_manufacturer', 'code', 'warehouse.name'])
            ->applyFilters($filters)
            ->allowedFilters([
                'unit_of_measure',
                'cabinet',
                'shelf',
                'rack',
                'warehouse_id',
            ])
            ->allowedSorts(['designation', 'current_stock', 'warehouse.name', 'brand_manufacturer', 'current_stock', 'created_at', 'updated_at'])
            ->make();

        return MaterialResource::collection($result);
    }

    public function store(array $data)
    {
        $material = Material::create([
            'id' => Str::uuid(),
            'designation' => $data['designation'],
            'unit_of_measure' => $data['unit_of_measure'] ?? null,
            'code' => $data['code'] ?? null,
            'brand_manufacturer' => $data['brand_manufacturer'] ?? null,
            'cabinet' => $data['cabinet'] ?? null,
            'shelf' => $data['shelf'] ?? null,
            'rack' => $data['rack'] ?? null,
            'average_monthly_consumption' => $data['average_monthly_consumption'] ?? 0,
            'reorder_point' => $data['reorder_point'] ?? 0,
            'maximum_stock' => $data['maximum_stock'] ?? 0,
            'minimum_stock' => $data['minimum_stock'] ?? 0,
            'current_stock' => $data['current_stock'],
            'warehouse_id' => $data['warehouse_id'],
            'user_id' => Auth::user()->id,
        ]);

        return $material;
    }

    public function show($id)
    {
        return Material::with(['warehouse','stock_movements'])->findOrFail($id);
    }

    public function update($id, array $data)
    {
        $material = Material::findOrFail($id);

        $material->update($data);

        return $material;
    }

    public function destroy($id)
    {
        $material = Material::findOrFail($id);
        $material->delete();

        return $material;
    }

    public function restore($id)
    {
        $material = Material::withTrashed()->findOrFail($id);
        $material->restore();

        return $material;
    }

    public function forceDestroy($id)
    {
        $material = Material::withTrashed()->findOrFail($id);
        $material->forceDelete();

        return true;
    }
}
