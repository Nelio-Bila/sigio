<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Warehouse extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'oc_id',
    ];

    /**
     * Get the orthopedic center associated with the warehouse.
     */
    public function orthopedicCenter()
    {
        return $this->belongsTo(OrthopedicCenter::class, 'oc_id');
    }
}
