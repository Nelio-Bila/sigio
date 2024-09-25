<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'name', 'cod'];

    public $incrementing = false;

    protected $keyType = 'string';

    public function districts()
    {
        return $this->hasMany(District::class, 'province_id', 'id');
    }

    public function adresses()
    {
        return $this->hasMany(Address::class);
    }
}
