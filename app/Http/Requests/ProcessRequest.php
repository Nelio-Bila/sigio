<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProcessRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            // Process fields
            'nid' => ['nullable','numeric'],
            'marital_state' => ['nullable', Rule::in(['single', 'married', 'divorced', 'widowed'])],
            'name' => ['required', 'string', 'max:255'],
            'date_of_birth' => ['required', 'date'],
            'genre' => ['required', Rule::in(['male', 'female', 'other'])],
            'race' => ['required', Rule::in(['black', 'white', 'mixed', 'asian', 'other'])],
            'profession' => ['nullable', 'string', 'max:255'],
            'workplace' => ['nullable', 'string', 'max:255'],
            'naturality' => ['required', 'string', 'max:255'],
            'phone_number' => ['required', 'string', 'max:20'],
            'father_name' => ['required', 'string', 'max:255'],
            'mother_name' => ['required', 'string', 'max:255'],

            // Address fields
            'province_id' => ['required', 'uuid', 'exists:provinces,id'],
            'district_id' => ['required', 'uuid', 'exists:districts,id'],
            'neighbourhood_id' => ['required', 'uuid', 'exists:neighbourhoods,id'],

            // Identification fields
            'number' => ['required', 'string', 'max:255'],
            'archive' => ['required', 'string', 'max:255'],
            'issue_date' => ['required', 'date'],
            'expire_date' => ['required', 'date', 'after:identification.issue_date'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'required' => 'O campo :attribute é obrigatório.',
            'string' => 'O campo :attribute deve ser uma string.',
            'max' => 'O campo :attribute não pode ter mais que :max caracteres.',
            'date' => 'O campo :attribute deve ser uma data válida.',
            'uuid' => 'O campo :attribute deve ser um UUID válido.',
            'exists' => 'O :attribute selecionado é inválido.',
            'in' => 'O :attribute selecionado é inválido.',
            'after' => 'O campo :attribute deve ser uma data posterior a :date.',

            'oc_id.required' => 'O ID do centro ortopédico é obrigatório.',
            'name.required' => 'O nome é obrigatório.',
            'date_of_birth.required' => 'A data de nascimento é obrigatória.',
            'genre.required' => 'O gênero é obrigatório.',
            'race.required' => 'A raça é obrigatória.',
            'naturality.required' => 'A naturalidade é obrigatória.',
            'phone_number.required' => 'O número de telefone é obrigatório.',
            'father_name.required' => 'O nome do pai é obrigatório.',
            'mother_name.required' => 'O nome da mãe é obrigatório.',

            'province_id.required' => 'A província é obrigatória.',
            'district_id.required' => 'O distrito é obrigatório.',
            'neighbourhood_id.required' => 'O bairro é obrigatório.',

            'number.required' => 'O número da identificação é obrigatório.',
            'archive.required' => 'O arquivo da identificação é obrigatório.',
            'issue_date.required' => 'A data de emissão da identificação é obrigatória.',
            'expire_date.required' => 'A data de validade da identificação é obrigatória.',
            'expire_date.after' => 'A data de validade deve ser posterior à data de emissão.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes()
    {
        return [
            'nid' => 'numero de identificação do doente',
            'marital_state' => 'estado civil',
            'date_of_birth' => 'data de nascimento',
            'genre' => 'gênero',
            'race' => 'raça',
            'profession' => 'profissão',
            'workplace' => 'local de trabalho',
            'naturality' => 'naturalidade',
            'phone_number' => 'número de telefone',
            'father_name' => 'nome do pai',
            'mother_name' => 'nome da mãe',
            'province_id' => 'província',
            'district_id' => 'distrito',
            'neighbourhood_id' => 'bairro',
            'number' => 'número da identificação',
            'archive' => 'arquivo da identificação',
            'issue_date' => 'data de emissão',
            'expire_date' => 'data de validade',
        ];
    }
}
