<?php

namespace App\Models;

use App\Traits\HasCustomNid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Process extends Model
{
    use HasCustomNid, HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'nid',
        'user_id',
        'oc_id',
        'address_id',
        'identification_id',
        'marital_state',
        'name',
        'date_of_birth',
        'genre',
        'race',
        'profession',
        'workplace',
        'naturality',
        'phone_number',
        'father_name',
        'mother_name',
    ];

    public $incrementing = false;

    protected $keyType = 'string';

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_of_birth' => 'date',
        'marital_state' => 'string',
        'genre' => 'string',
        'race' => 'string',
    ];

    /**
     * Get the user associated with the process.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the address associated with the process.
     */
    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    /**
     * Get the identification associated with the process.
     */
    public function identification()
    {
        return $this->belongsTo(Identification::class);
    }
}
