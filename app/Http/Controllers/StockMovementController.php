<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateStockMovementRequest;
use App\Services\StockMovementService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StockMovementController extends Controller
{
    protected StockMovementService $stockMovementService;

    public function __construct(StockMovementService $stockMovementService)
    {
        $this->stockMovementService = $stockMovementService;
    }

    public function index(Request $request)
    {
        $stockMovements = $this->stockMovementService->index();

        return Inertia::render('StockMovements/index', [
            'stockMovements' => $stockMovements,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Materials/StockMovements/register');
    }

    public function store(CreateStockMovementRequest $request): RedirectResponse
    {
        $this->stockMovementService->store($request->validated());

        return redirect()->route('stock_movements.index')->with('message', 'Stock movement created successfully!');
    }

    public function show($id)
    {
        $stockMovement = $this->stockMovementService->show($id);

        return Inertia::render('StockMovements/show', ['stockMovement' => $stockMovement]);
    }

    public function edit($id)
    {
        $stockMovement = $this->stockMovementService->show($id);

        return Inertia::render('StockMovements/edit', ['stockMovement' => $stockMovement]);
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $this->stockMovementService->update($id, $request->validate([
            'material_id' => 'required|uuid',
            'date' => 'required|date',
            'movement' => 'required|in:in,out',
            'document_type' => 'nullable|string',
            'document_number' => 'nullable|string',
            'quantity_in' => 'nullable|integer',
            'unit_value_in' => 'nullable|numeric',
            'total_value_in' => 'nullable|numeric',
            'quantity_out' => 'nullable|integer',
            'unit_value_out' => 'nullable|numeric',
            'total_value_out' => 'nullable|numeric',
            'current_stock' => 'required|integer',
            'current_unit_value' => 'nullable|numeric',
            'current_total_value' => 'nullable|numeric',
        ]));

        return redirect()->route('stock_movements.index')->with('message', 'Stock movement updated successfully!');
    }

    public function destroy($id): RedirectResponse
    {
        $this->stockMovementService->destroy($id);

        return redirect()->route('stock_movements.index')->with('message', 'Stock movement deleted successfully!');
    }

    public function restore($id): RedirectResponse
    {
        $this->stockMovementService->restore($id);

        return redirect()->route('stock_movements.index')->with('message', 'Stock movement restored successfully!');
    }

    public function force_destroy($id): RedirectResponse
    {
        $this->stockMovementService->forceDestroy($id);

        return redirect()->route('stock_movements.index')->with('message', 'Stock movement permanently deleted successfully!');
    }
}
