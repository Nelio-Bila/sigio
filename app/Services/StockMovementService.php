<?php

namespace App\Services;

use App\Models\StockMovement;

class StockMovementService
{
    public function index()
    {
        $filters = request()->query('filters') ?? [];

        $result = StockMovement::query()
            ->with('material') // Eager load material relationship
            ->searchable(['document_type', 'document_number']) // Fields to search in
            ->applyFilters($filters) // Custom filters
            ->allowedFilters([
                'movement',
                'date',
                'material_id',
                'user_id',
            ])
            ->allowedSorts(['date', 'current_stock', 'created_at'])
            ->paginate(10); // Paginate for large datasets

        return $result;
    }

    public function store(array $data)
    {
        $stockMovement = StockMovement::create([
            'material_id' => $data['material_id'],
            'date' => $data['date'],
            'movement' => $data['movement'],
            'document_type' => $data['document_type'] ?? null,
            'document_number' => $data['document_number'] ?? null,
            'quantity_in' => $data['quantity_in'] ?? 0,
            'unit_value_in' => $data['unit_value_in'] ?? 0,
            'total_value_in' => $data['total_value_in'] ?? 0,
            'quantity_out' => $data['quantity_out'] ?? 0,
            'unit_value_out' => $data['unit_value_out'] ?? 0,
            'total_value_out' => $data['total_value_out'] ?? 0,
            'current_stock' => $data['current_stock'],
            'current_unit_value' => $data['current_unit_value'] ?? 0,
            'current_total_value' => $data['current_total_value'] ?? 0,
        ]);

        return $stockMovement;
    }

    public function show($id)
    {
        return StockMovement::findOrFail($id);
    }

    public function update($id, array $data)
    {
        $stockMovement = StockMovement::findOrFail($id);

        $stockMovement->update($data);

        return $stockMovement;
    }

    public function destroy($id)
    {
        $stockMovement = StockMovement::findOrFail($id);
        $stockMovement->delete();

        return $stockMovement;
    }

    public function restore($id)
    {
        $stockMovement = StockMovement::withTrashed()->findOrFail($id);
        $stockMovement->restore();

        return $stockMovement;
    }

    public function forceDestroy($id)
    {
        $stockMovement = StockMovement::withTrashed()->findOrFail($id);
        $stockMovement->forceDelete();

        return true;
    }
}
