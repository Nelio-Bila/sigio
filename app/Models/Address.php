<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Address extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'province_id', 'district_id', 'neighbourhood_id'];

    public $incrementing = false;

    protected $keyType = 'string';

    /**
     * Get the processes for the address.
     */
    public function process(): HasMany
    {
        return $this->hasMany(Process::class);
    }

    /**
     * Get the province that owns the address.
     */
    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class, 'province_id', 'id');
    }

    /**
     * Get the district that owns the address.
     */
    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class, 'district_id', 'id');
    }

    /**
     * Get the neighbourhood that owns the address.
     */
    public function neighbourhood(): BelongsTo
    {
        return $this->belongsTo(Neighbourhood::class, 'neighbourhood_id', 'id');
    }

    /**
     * Get the orthopedic centers for the address.
     */
    public function orthopedic_centers(): HasMany
    {
        return $this->hasMany(OrthopedicCenter::class);
    }
}
