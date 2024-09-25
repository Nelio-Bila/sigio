<?php

namespace App\Http\Requests;

use App\Models\Role;
use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
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
        // dd('Request data:', $this->request->all());

        return [
            'name' => ['required', 'string', 'max:255'],
            'orthopedic_center_id' => ['required', 'uuid'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'roles' => ['required', 'array', 'min:1'],
            'roles.*' => ['required', 'uuid'],
        ];
    }

    // /**
    //  * Get custom messages for validator errors.
    //  */
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
            'uuid' => 'O campo :attribute deve ser um UUID válido.',
            'roles.required' => 'Pelo menos uma função deve ser atribuída.',
            'roles.*.uuid' => 'Um ou mais valores no campo :attribute não são UUIDs válidos.',
            'password' => [
                'min' => 'A :attribute deve ter pelo menos :min caracteres.',
                'mixed' => 'A :attribute deve conter pelo menos uma letra maiúscula e uma minúscula.',
                'letters' => 'A :attribute deve conter pelo menos uma letra.',
                'symbols' => 'A :attribute deve conter pelo menos um símbolo.',
                'numbers' => 'A :attribute deve conter pelo menos um número.',
                'uncompromised' => 'A :attribute fornecida apareceu em um vazamento de dados. Por favor, escolha uma :attribute diferente.',
            ],
        ];
    }

    // /**
    //  * Get custom attributes for validator errors.
    //  */
    public function attributes(): array
    {
        return [
            'name' => 'nome',
            'email' => 'e-mail',
            'orthopedic_center_id' => 'centro ortopédico',
            'password' => 'senha',
            'roles' => 'funções',
        ];
    }
}
