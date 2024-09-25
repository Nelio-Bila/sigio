<?php

namespace App\Services;

use App\Facades\DataTable;
use App\Http\Resources\ProvinceResource;
use App\Models\Province;

class ProvinceService
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        $result = DataTable::query(Province::query())
            ->with(['districts'])
            ->searchable(['name', 'district.name'])
            ->allowedSorts(['name', 'district.name'])
            ->make();

        return ProvinceResource::collection($result);
    }

    public function show($id)
    {
        return Province::with(['districts', 'addresses'])->findOrFail($id);
    }

    public function getAllProvinces()
    {
        return Province::all();
    }

    public function getDistrictsForProvince($provinceId)
    {
        $province = Province::findOrFail($provinceId);

        return $province->districts;
    }
}

