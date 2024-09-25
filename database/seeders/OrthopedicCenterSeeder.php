<?php

namespace Database\Seeders;

use App\Models\Address;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str; // Assuming you have an Address model

class OrthopedicCenterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch an address to associate with the orthopedic center.
        $addresses = Address::all();

        if ($addresses->isEmpty()) {
            $this->command->error('No addresses found. Please seed the addresses table first.');

            return;
        }

        // Seed orthopedic centers with random addresses
        DB::table('orthopedic_centers')->insert([
            [
                'id' => Str::uuid(),
                'name' => 'Ortopédico Centro A',
                'address_id' => $addresses->random()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Ortopédico Centro B',
                'address_id' => $addresses->random()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Ortopédico Centro C',
                'address_id' => $addresses->random()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
