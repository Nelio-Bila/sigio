<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class QueryParamsRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'search' => ['nullable', 'string'],
            'limit' => ['nullable', 'integer'],
            'col' => ['nullable', 'string'],
            'sort' => ['nullable', 'string', 'in:asc,desc'],
            'filters' => ['nullable', 'array'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}

// namespace App\Http\Requests;

// use Illuminate\Foundation\Http\FormRequest;
// use Illuminate\Validation\Rule;

// class QueryParamsRequest extends FormRequest
// {
//     public function rules(): array
//     {
//         return [
//             'search' => ['nullable', 'string'],
//             'limit' => ['nullable', 'integer'],
//             'col' => ['nullable', 'string'],
//             'sort' => ['nullable', 'string', 'in:asc,desc'],
//             'filters' => ['nullable', 'array'],
//             'filters.marital_state' => ['nullable', Rule::in(['single', 'married', 'divorced', 'widowed'])],
//             'filters.genre' => ['nullable', Rule::in(['male', 'female', 'other'])],
//             'filters.race' => ['nullable', Rule::in(['black', 'white', 'mixed', 'asian', 'other'])],
//         ];
//     }

//     public function authorize(): bool
//     {
//         return true;
//     }
// }
