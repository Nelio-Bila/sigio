<?php

namespace App\Http\Requests;

use App\Models\Role;
use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Ou implemente sua lógica de autorização aqui
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
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->route('id')),
            ],
            // 'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
            'roles' => ['required', 'array', 'min:1'],
            'roles.*' => ['required', Rule::exists(Role::class, 'uuid')],
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
            'unique' => 'O :attribute já está em uso.',
            'confirmed' => 'A confirmação do campo :attribute não corresponde.',
            'min' => [
                'array' => 'O campo :attribute deve ter pelo menos :min item.',
            ],
            'exists' => 'O :attribute selecionado é inválido.',
            'roles.required' => 'Pelo menos uma função deve ser atribuída.',
            'roles.*.exists' => 'Uma ou mais funções selecionadas não existem.',
            // 'password' => [
            //     'min' => 'A :attribute deve ter pelo menos :min caracteres.',
            //     'mixed' => 'A :attribute deve conter pelo menos uma letra maiúscula e uma minúscula.',
            //     'letters' => 'A :attribute deve conter pelo menos uma letra.',
            //     'symbols' => 'A :attribute deve conter pelo menos um símbolo.',
            //     'numbers' => 'A :attribute deve conter pelo menos um número.',
            //     'uncompromised' => 'A :attribute fornecida apareceu em um vazamento de dados. Por favor, escolha uma :attribute diferente.',
            // ],
        ];
    }

    /**
     * Get custom attributes for validator errors.
     */
    public function attributes(): array
    {
        return [
            'name' => 'nome',
            'email' => 'e-mail',
            'password' => 'senha',
            'roles' => 'funções',
        ];
    }
}
