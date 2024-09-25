<?php

namespace App\Http\Controllers;

use App\Services\NeighbourhoodService;

class NeighbourhoodController extends Controller
{
    protected $neighbourhoodService;

    public function __construct(NeighbourhoodService $neighbourhoodService)
    {
        $this->neighbourhoodService = $neighbourhoodService;
    }

    public function index($districtId)
    {
        return response()->json($this->neighbourhoodService->getNeighbourhoodsForDistrict($districtId));
    }
}
