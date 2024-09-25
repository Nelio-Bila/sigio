<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateWarehouseRequest;
use App\Http\Requests\QueryParamsRequest;
use App\Http\Requests\UpdateWarehouseRequest;
use App\Services\WarehouseService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class WarehouseController extends Controller
{
    protected WarehouseService $warehouseService;

    public function __construct(WarehouseService $warehouseService)
    {
        $this->warehouseService = $warehouseService;
    }

    public function index(QueryParamsRequest $request)
    {
        $warehouses = $this->warehouseService->index();

        return inertia('Warehouses/index', [
            'warehouses' => $warehouses,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Warehouses/register');
    }

    public function store(CreateWarehouseRequest $request): RedirectResponse
    {
        $this->warehouseService->store($request->validated());

        return redirect(route('warehouses.index', absolute: false));
    }

    public function show($id)
    {
        $warehouse = $this->warehouseService->show($id);

        return Inertia::render('Warehouses/show', ['warehouse' => $warehouse]);
    }

    public function edit($id)
    {
        $data = $this->warehouseService->edit($id);

        return Inertia::render('Warehouses/edit', $data);
    }

    public function update(UpdateWarehouseRequest $request, $id): RedirectResponse
    {
        $this->warehouseService->update($id, $request->validated());

        return Redirect::route('warehouses.index')->with('message', 'Dados do armazém atualizados com sucesso!');
    }

    public function destroy($id)
    {
        dd($id);
        try {
            $this->warehouseService->destroy($id);

            return Redirect::route('warehouses.index')->with('message', 'Armazém desabilitado com exito!');
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function restore($id)
    {
        try {
            $this->warehouseService->restore($id);

            return Redirect::route('warehouses.index')->with('message', 'Armazém restaurado com exito!');
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function force_destroy($id)
    {
        try {
            $this->warehouseService->forceDestroy($id);

            return Redirect::route('warehouses.index')->with('message', 'Armazém removido permanentemente com exito!');
        } catch (\Throwable $th) {
            throw $th;
        }

    }
}
