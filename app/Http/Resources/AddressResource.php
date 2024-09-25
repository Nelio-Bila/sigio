<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Address */
class AddressResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'created_at' => $this->created_at->format('Y-m-d H:i A'),
            'province' => $this->whenLoaded('province', function () {
                return ProvinceResource::collection($this->province);
            }),
            'district' => $this->whenLoaded('district', function () {
                return DistrictResource::collection($this->district);
            }),
            'neighbourhood' => $this->whenLoaded('district', function () {
                return NeighbourhoodResource::collection($this->district);
            }),
            'process' => $this->whenLoaded('process', function () {
                return ProcessResource::collection($this->process);
            }),
        ];
    }
}
