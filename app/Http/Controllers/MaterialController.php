<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Services\MaterialService;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\QueryParamsRequest;
use App\Http\Requests\CreateMaterialRequest;
use App\Services\WarehouseService;

class MaterialController extends Controller
{
    protected MaterialService $materialService;
    protected WarehouseService $warehouseService;

    public function __construct(MaterialService $materialService, WarehouseService $warehouseService)
    {
        $this->materialService = $materialService;
        $this->warehouseService = $warehouseService;
    }

    public function index(QueryParamsRequest $request)
    {
        $materials = $this->materialService->index();

        return Inertia::render('Materials/index', [
            'materials' => $materials,
        ]);
    }

    public function create(): Response
    {
        $warehouses = $this->warehouseService->index();

        return Inertia::render('Materials/register',[
            'warehouses' => $warehouses
        ]);
    }

    public function store(CreateMaterialRequest $request): RedirectResponse
    {
        $this->materialService->store($request->validated());

        return redirect()->route('materials.index')->with('message', 'Material registrado com sucesso!');
    }

    public function show($id)
    {
        $material = $this->materialService->show($id);

        return Inertia::render('Materials/show', ['material' => $material]);
    }

    public function edit($id)
    {
        $material = $this->materialService->show($id);

        return Inertia::render('Materials/edit', ['material' => $material]);
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $this->materialService->update($id, $request->validate([
            'designation' => 'required|string',
            'unit_of_measure' => 'nullable|string',
            'code' => 'nullable|string',
            'brand_manufacturer' => 'nullable|string',
            'cabinet' => 'nullable|string',
            'shelf' => 'nullable|string',
            'rack' => 'nullable|string',
            'average_monthly_consumption' => 'nullable|integer',
            'reorder_point' => 'nullable|integer',
            'maximum_stock' => 'nullable|integer',
            'minimum_stock' => 'nullable|integer',
            'warehouse_id' => 'required|uuid',
        ]));

        return redirect()->route('materials.index')->with('message', 'Material updated successfully!');
    }

    public function destroy($id): RedirectResponse
    {
        $this->materialService->destroy($id);

        return redirect()->route('materials.index')->with('message', 'Material deleted successfully!');
    }

    public function restore($id): RedirectResponse
    {
        $this->materialService->restore($id);

        return redirect()->route('materials.index')->with('message', 'Material restored successfully!');
    }

    public function force_destroy($id): RedirectResponse
    {
        $this->materialService->forceDestroy($id);

        return redirect()->route('materials.index')->with('message', 'Material permanently deleted successfully!');
    }
}
