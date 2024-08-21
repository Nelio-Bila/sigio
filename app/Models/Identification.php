<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Identification extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'number', 'archive', 'issue_date', 'expire_date'];

    public function processe()
    {
        return $this->belongsTo(Process::class);
    }
}
