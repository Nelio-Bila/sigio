<?php

namespace App\Services;

use App\Facades\DataTable;
use App\Http\Resources\OrthopedicCenterResource;
use App\Models\Address;
use App\Models\OrthopedicCenter;
use Illuminate\Support\Str;

class OrthopedicCenterService
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
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

        $result = DataTable::query(OrthopedicCenter::query())
            ->with(['address'])
            ->searchable(['name', 'address.province.name', 'address.district.name'])
            ->applyFilters($filters)
            ->allowedFilters([
                'deleted_at:NOT NULL',
                'deleted_at:NULL'
            ])
            ->allowedSorts(['name', 'address.province.name', 'address.district.name', 'created_at', 'deleted_at'])
            ->make();

        return OrthopedicCenterResource::collection($result);
    }

    public function store(array $data)
    {
        $address = Address::create([
            'id' => Str::uuid(),
            'province_id' => $data['province_id'],
            'district_id' => $data['district_id'],
            'neighbourhood_id' => $data['neighbourhood_id'],
        ]);

        return OrthopedicCenter::create([
            'id' => Str::uuid(),
            'name' => $data['name'],
            'address_id' => $address->id,
        ]);
    }

    public function show($id)
    {
        return OrthopedicCenter::with(['address.province', 'address.district', 'address.neighbourhood'])->findOrFail($id);
    }

    public function edit($id)
    {
        $orthopedicCenter = OrthopedicCenter::with(['address'])->findOrFail($id);

        return [
            'center' => [
                'id' => $orthopedicCenter->id,
                'name' => $orthopedicCenter->name,
                'address' => $orthopedicCenter->address,
            ],
        ];
    }

    public function update($id, array $data)
    {
        $orthopedicCenter = OrthopedicCenter::findOrFail($id);

        // Retrieve the current address for comparison
        $currentAddress = $orthopedicCenter->address;

        // Check if any address attributes have changed
        $addressChanged = $currentAddress->province_id !== $data['province_id'] ||
            $currentAddress->district_id !== $data['district_id'] ||
            $currentAddress->neighbourhood_id !== $data['neighbourhood_id'];

        if ($addressChanged) {
            // Create a new address if changes are detected
            $address = Address::create([
                'id' => Str::uuid(),
                'province_id' => $data['province_id'],
                'district_id' => $data['district_id'],
                'neighbourhood_id' => $data['neighbourhood_id'],
            ]);

            // Update the orthopedic center with the new address ID
            $orthopedicCenter->update([
                'name' => $data['name'],
                'address_id' => $address->id,
            ]);
        } else {
            // Just update the orthopedic center name if address hasn't changed
            $orthopedicCenter->update([
                'name' => $data['name'],
            ]);
        }

        return $orthopedicCenter;
    }

    public function destroy($id)
    {
        $orthopedicCenter = OrthopedicCenter::findOrFail($id);
        $orthopedicCenter->delete();

        return $orthopedicCenter;
    }

    public function restore($id)
    {
        $orthopedicCenter = OrthopedicCenter::withTrashed()->findOrFail($id);
        $orthopedicCenter->restore();

        return $orthopedicCenter;
    }

    public function forceDestroy($id)
    {
        $orthopedicCenter = OrthopedicCenter::withTrashed()->findOrFail($id);
        $orthopedicCenter->forceDelete();

        return true;
    }
}
