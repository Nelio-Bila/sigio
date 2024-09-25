<?php

namespace App\Http\Controllers;

use App\Services\ProvinceService;

class ProvinceController extends Controller
{
    protected ProvinceService $provinceService;

    public function __construct(ProvinceService $provinceService)
    {
        $this->provinceService = $provinceService;
    }

    public function index()
    {
        return $this->provinceService->getAllProvinces();
    }

    public function districts($provinceId)
    {
        return $this->provinceService->getDistrictsForProvince($provinceId);
    }
}
