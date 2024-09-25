<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
// use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            'Técnico Ortoprotésico',
            'Técnico de Administrativo',
            'Chefe Técnico',
            'Chefe das Proteses',
            'Chefe das Ortoteses',
            'Director do Servico',
            'Dnam',
            'Chefe Administrativo',
        ];

        foreach ($roles as $role) {
            Role::create(['name' => $role]);
        }
    }
}
