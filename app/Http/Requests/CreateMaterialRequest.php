<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateMaterialRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'designation' => ['required', 'string', 'max:255', Rule::unique('materials')->where(function ($query) {
                return $query->where('warehouse_id', $this->warehouse_id);
            })],
            'unit_of_measure' => ['nullable', 'string', 'max:255'],
            'code' => ['nullable', 'string', 'max:255'],
            'brand_manufacturer' => ['nullable', 'string', 'max:255'],
            'cabinet' => ['nullable', 'string', 'max:255'],
            'shelf' => ['nullable', 'string', 'max:255'],
            'rack' => ['nullable', 'string', 'max:255'],
            'average_monthly_consumption' => ['nullable', 'integer'],
            'reorder_point' => ['nullable', 'integer'],
            'maximum_stock' => ['nullable', 'integer'],
            'minimum_stock' => ['nullable', 'integer'],
            'current_stock' => ['required', 'integer'],
            'warehouse_id' => ['required', 'uuid', 'exists:warehouses,id'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'required' => 'O campo :attribute é obrigatório.',
            'string' => 'O campo :attribute deve ser uma string.',
            'max' => 'O campo :attribute não pode ter mais de :max caracteres.',
            'integer' => 'O campo :attribute deve ser um número inteiro.',
            'uuid' => 'O campo :attribute deve ser um UUID válido.',
            'exists' => 'O :attribute selecionado é inválido.',
            'designation.unique' => 'Este material já existe neste armazém, em contrapartida registra movimento.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     */
    public function attributes(): array
    {
        return [
            'designation' => 'designação',
            'unit_of_measure' => 'unidade de medida',
            'code' => 'código',
            'brand_manufacturer' => 'marca/fabricante',
            'cabinet' => 'armário',
            'shelf' => 'prateleira',
            'rack' => 'estante',
            'average_monthly_consumption' => 'consumo mensal médio',
            'reorder_point' => 'ponto de reposição',
            'maximum_stock' => 'estoque máximo',
            'minimum_stock' => 'estoque mínimo',
            'warehouse_id' => 'Armazém',
        ];
    }
}
