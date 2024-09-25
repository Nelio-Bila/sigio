<?php

namespace Database\Factories;

use App\Models\District;
use App\Models\Neighbourhood;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class NeighbourhoodFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Neighbourhood::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'id' => Str::uuid(),
            'name' => $this->faker->unique()->streetName,
            'cod' => $this->faker->unique()->numerify('###'),
            'district_id' => District::inRandomOrder()->first()->id,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
