<?php

namespace App\Services;

use App\Models\District;
use App\Models\Neighbourhood;
use Illuminate\Database\Eloquent\Collection;

class NeighbourhoodService
{
    /**
     * Get all neighbourhoods.
     */
    public function getAllNeighbourhoods(): Collection
    {
        return Neighbourhood::all();
    }

    /**
     * Get a specific neighbourhood by ID.
     */
    public function getNeighbourhood(string $id): Neighbourhood
    {
        return Neighbourhood::findOrFail($id);
    }

    /**
     * Get all neighbourhoods for a specific district.
     */
    public function getNeighbourhoodsForDistrict(string $districtId): Collection
    {
        $district = District::findOrFail($districtId);

        return $district->neighbourhoods;
    }

    /**
     * Create a new neighbourhood.
     */
    public function createNeighbourhood(array $data): Neighbourhood
    {
        return Neighbourhood::create($data);
    }

    /**
     * Update an existing neighbourhood.
     */
    public function updateNeighbourhood(string $id, array $data): Neighbourhood
    {
        $neighbourhood = $this->getNeighbourhood($id);
        $neighbourhood->update($data);

        return $neighbourhood;
    }

    /**
     * Delete a neighbourhood.
     */
    public function deleteNeighbourhood(string $id): bool
    {
        $neighbourhood = $this->getNeighbourhood($id);

        return $neighbourhood->delete();
    }
}
