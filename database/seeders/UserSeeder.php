<?php

namespace Database\Seeders;

use App\Models\OrthopedicCenter;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $orthopedic_centers = OrthopedicCenter::all();

        DB::table('users')->insert([
            [
                'id'=> Str::uuid(),
                'name' => 'Admin User',
                'orthopedic_center_id' => $orthopedic_centers->random()->id,
                'email' => 'admin@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password'), // Hash the password
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id'=> Str::uuid(),
                'name' => 'John Doe',
                'orthopedic_center_id' => $orthopedic_centers->random()->id,
                'email' => 'john.doe@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id'=> Str::uuid(),
                'name' => 'Jane Doe',
                'orthopedic_center_id' => $orthopedic_centers->random()->id,
                'email' => 'jane.doe@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Ensure there are districts to associate neighbourhoods with
        if (\App\Models\OrthopedicCenter::count() === 0) {
            $this->command->error('No orthopedic centers found. Please seed orthopedic centers first.');

            return;
        }

        // Generate 50 neighbourhoods
        User::factory()->count(50)->create();
    }
}
