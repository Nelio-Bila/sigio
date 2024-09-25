<?php

namespace Database\Seeders;

use App\Models\Neighbourhood;
use Illuminate\Database\Seeder;

class NeighbourhoodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure there are districts to associate neighbourhoods with
        if (\App\Models\District::count() === 0) {
            $this->command->error('No districts found. Please seed districts first.');

            return;
        }

        // Generate 50 neighbourhoods
        Neighbourhood::factory()->count(500)->create();
    }
}
