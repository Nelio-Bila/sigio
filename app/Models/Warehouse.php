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
        'id',
        'name',
        'orthopedic_center_id',
    ];

    public $incrementing = false;

    protected $keyType = 'string';

    /**
     * Get the orthopedic center associated with the warehouse.
     */
    public function orthopedic_center()
    {
        return $this->belongsTo(OrthopedicCenter::class, 'orthopedic_center_id');
    }
}
