<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            ProvinceSeeder::class,
            DistrictSeeder::class,
            NeighbourhoodSeeder::class,
            AddressSeeder::class,
            OrthopedicCenterSeeder::class,
            UserSeeder::class,
            RoleSeeder::class,
        ]);
    }
}
