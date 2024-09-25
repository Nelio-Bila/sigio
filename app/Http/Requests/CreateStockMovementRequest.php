<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateStockMovementRequest extends FormRequest
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
            'material_id' => ['required', 'uuid', 'exists:materials,id'],
            'date' => ['required', 'date'],
            'movement' => ['required', 'in:in,out'],
            'document_type' => ['nullable', 'string', 'max:255'],
            'document_number' => ['nullable', 'string', 'max:255'],
            'quantity_in' => ['nullable', 'integer'],
            'unit_value_in' => ['nullable', 'numeric'],
            'total_value_in' => ['nullable', 'numeric'],
            'quantity_out' => ['nullable', 'integer'],
            'unit_value_out' => ['nullable', 'numeric'],
            'total_value_out' => ['nullable', 'numeric'],
            'current_stock' => ['required', 'integer'],
            'current_unit_value' => ['nullable', 'numeric'],
            'current_total_value' => ['nullable', 'numeric'],
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
            'numeric' => 'O campo :attribute deve ser um número.',
            'date' => 'O campo :attribute deve ser uma data válida.',
            'uuid' => 'O campo :attribute deve ser um UUID válido.',
            'in' => 'O campo :attribute deve ser um dos valores permitidos: in ou out.',
            'exists' => 'O :attribute selecionado é inválido.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     */
    public function attributes(): array
    {
        return [
            'material_id' => 'ID do material',
            'date' => 'data',
            'movement' => 'movimento',
            'document_type' => 'tipo de documento',
            'document_number' => 'número do documento',
            'quantity_in' => 'quantidade de entrada',
            'unit_value_in' => 'valor unitário de entrada',
            'total_value_in' => 'valor total de entrada',
            'quantity_out' => 'quantidade de saída',
            'unit_value_out' => 'valor unitário de saída',
            'total_value_out' => 'valor total de saída',
            'current_stock' => 'estoque atual',
            'current_unit_value' => 'valor unitário atual',
            'current_total_value' => 'valor total atual',
        ];
    }
}
