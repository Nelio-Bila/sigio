<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;

class UpdateOrthopedicCenterRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'province_id' => ['required', 'exists:provinces,id'],
            'district_id' => ['required', 'exists:districts,id'],
            'neighbourhood_id' => ['nullable', 'exists:neighbourhoods,id'],
            'neighbourhood_name' => [
                'required_without:neighbourhood_id',
                'string',
                'max:255',
                Rule::unique('neighbourhoods', 'name')->where(function ($query) {
                    return $query->where('district_id', $this->district_id);
                })->ignore($this->neighbourhood_id),
            ],
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
            'max' => [
                'string' => 'O campo :attribute não pode ter mais de :max caracteres.',
            ],
            'email' => 'O campo :attribute deve ser um endereço de e-mail válido.',
            'unique' => 'Já existe um bairro com este nome neste distrito.',
            'confirmed' => 'A confirmação do campo :attribute não corresponde.',
            'min' => [
                'array' => 'O campo :attribute deve ter pelo menos :min item.',
            ],
            'exists' => 'O :attribute selecionado é inválido.',
            'required_without' => 'O campo :attribute é obrigatório quando :other não está presente.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     */
    public function attributes(): array
    {
        return [
            'name' => 'nome',
            'province_id' => 'província',
            'district_id' => 'distrito',
            'neighbourhood_id' => 'bairro',
            'neighbourhood_name' => 'nome do bairro',
        ];
    }
}
