<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StockMovement extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'stock_movements';

    // Define the fillable fields
    protected $fillable = [
        'material_id',
        'date',
        'movement',
        'document_type',
        'document_number',
        'quantity_in',
        'unit_value_in',
        'total_value_in',
        'quantity_out',
        'unit_value_out',
        'total_value_out',
        'current_stock',
        'current_unit_value',
        'current_total_value',
        'user_id',
    ];

    // Define default values for certain attributes
    protected $attributes = [
        'movement' => 'out',
        'quantity_in' => 0,
        'quantity_out' => 0,
    ];

    // Relationship with the Material model
    public function material(): BelongsTo
    {
        return $this->belongsTo(Material::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
