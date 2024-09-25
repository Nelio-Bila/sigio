<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrthopedicCenter extends Model
{
    use HasFactory, SoftDeletes;

    public $incrementing = false;

    protected $keyType = 'string';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'name',
        'address_id',
    ];

    /**
     * Get the address associated with the orthopedic center.
     */
    public function address()
    {
        return $this->belongsTo(Address::class);
    }


    public function users()
    {
        return $this->hasMany(User::class);
    }
}
