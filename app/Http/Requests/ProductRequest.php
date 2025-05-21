<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:2000'],
            'description' => ['nullable', 'string'],
            'pricing' => ['required', 'numeric'],
            'image' => ['nullable', 'image', 'max:5120'], // حتى 5MB
            'image_positions' => ['nullable', 'array'],
            'categories' => ['nullable', 'array'],
        ];
    }
}
