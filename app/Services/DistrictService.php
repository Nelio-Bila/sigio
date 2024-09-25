<?php

namespace App\Services;

use App\Models\District;

class DistrictService
{
    public function getNeighborhoodsForDistrict($districtId)
    {
        $district = District::findOrFail($districtId);

        return $district->neighbourhoods;
    }
}
