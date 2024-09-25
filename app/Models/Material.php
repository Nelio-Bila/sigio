<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Material extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'materials';

    public $incrementing = false;

    protected $keyType = 'string';

    // Automatically cast the id to a UUID string when creating
    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    // Define the fillable fields
    protected $fillable = [
        'designation',
        'unit_of_measure',
        'code',
        'brand_manufacturer',
        'cabinet',
        'shelf',
        'rack',
        'average_monthly_consumption',
        'reorder_point',
        'maximum_stock',
        'minimum_stock',
        'current_stock',
        'warehouse_id',
        'user_id',
    ];

    // Relation to the warehouse
    public function warehouse(): BelongsTo
    {
        return $this->belongsTo(Warehouse::class);
    }

    // Relation to the warehouse
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
