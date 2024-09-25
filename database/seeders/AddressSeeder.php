<?php

namespace Database\Seeders;

use App\Models\District;
use App\Models\Neighbourhood;
use App\Models\Province;
use Illuminate\Database\Seeder; // Assuming you have a Province model
use Illuminate\Support\Facades\DB; // Assuming you have a District model
use Illuminate\Support\Str; // Assuming you have a Neighbourhood model

class AddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch existing provinces, districts, and neighbourhoods
        $provinces = Province::all();
        $districts = District::all();
        $neighbourhoods = Neighbourhood::all();

        if ($provinces->isEmpty() || $districts->isEmpty() || $neighbourhoods->isEmpty()) {
            $this->command->error('No provinces, districts, or neighbourhoods found. Please seed them first.');

            return;
        }

        // Seed addresses with random provinces, districts, and neighbourhoods
        DB::table('addresses')->insert([
            [
                'id' => Str::uuid(),
                'province_id' => $provinces->random()->id,
                'district_id' => $districts->random()->id,
                'neighbourhood_id' => $neighbourhoods->random()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'province_id' => $provinces->random()->id,
                'district_id' => $districts->random()->id,
                'neighbourhood_id' => $neighbourhoods->random()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'province_id' => $provinces->random()->id,
                'district_id' => $districts->random()->id,
                'neighbourhood_id' => $neighbourhoods->random()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
