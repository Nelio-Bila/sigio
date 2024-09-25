<?php

namespace App\Http\Controllers;

use App\Services\DistrictService;

class DistrictController extends Controller
{
    protected DistrictService $districtService;

    public function __construct(DistrictService $districtService)
    {
        $this->districtService = $districtService;
    }

    public function neighbourhoods($districtId)
    {
        return $this->districtService->getNeighborhoodsForDistrict($districtId);
    }
}
