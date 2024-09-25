<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;

trait HasCustomNid
{
    protected static function bootHasCustomNid()
    {
        static::creating(function ($model) {
            if (empty($model->nid)) {
                $model->nid = static::getNextNid();
            }
        });
    }

    protected static function getNextNid()
    {
        return DB::table((new static)->getTable())->max('nid') + 1;
    }
}
