<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'name', 'cod'];

    public function districts()
    {
        return $this->hasMany(District::class);
    }

    public function adresses()
    {
        return $this->hasMany(Address::class);
    }
}
