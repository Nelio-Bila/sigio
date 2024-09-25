<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Material */
class MaterialResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'designation' => $this->designation,
            'unit_of_measure' => $this->unit_of_measure,
            'code' => $this->code,
            'brand_manufacturer' => $this->brand_manufacturer,
            'cabinet' => $this->cabinet,
            'shelf' => $this->shelf,
            'rack' => $this->rack,
            'average_monthly_consumption' => $this->average_monthly_consumption,
            'reorder_point' => $this->reorder_point,
            'maximum_stock' => $this->maximum_stock,
            'minimum_stock' => $this->minimum_stock,
            'current_stock' => $this->current_stock,
            'warehouse_id' => $this->warehouse_id,
            'warehouse' => $this->warehouse,
            'user_id' => $this->user_id,
            'created_at' => $this->created_at->format('Y-m-d H:i A'),

        ];
    }
}
