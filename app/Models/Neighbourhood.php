<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Neighbourhood extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'name', 'cod', 'district_id'];

    public $incrementing = false;

    protected $keyType = 'string';

    public function district()
    {
        return $this->belongsTo(District::class, 'district_id', 'id');
    }

    public function adresses()
    {
        return $this->hasMany(Address::class);
    }
}
