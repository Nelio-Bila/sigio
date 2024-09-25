<?php

namespace App\Services;

use App\Models\User;
use App\Facades\DataTable;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;

class UserService
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        $filters = str_replace(
            [
                'status:active',
                'status:inactive',
                'roles:Administrator',
                'roles:Técnico Ortoprotésico',
                'roles:Técnico de Administrativo',
                'roles:Chefe Técnico',
                'roles:Chefe das Proteses',
                'roles:Chefe das Ortoteses',
                'roles:Director do Servico',
                'roles:Dnam',
                'roles:Chefe Administrativo',
            ],
            [
                'deleted_at:NULL',
                'deleted_at:NOT NULL',
                'roles.name:Administrator',
                'roles.name:Técnico Ortoprotésico',
                'roles.name:Técnico de Administrativo',
                'roles.name:Chefe Técnico',
                'roles.name:Chefe das Proteses',
                'roles.name:Chefe das Ortoteses',
                'roles.name:Director do Servico',
                'roles.name:Dnam',
                'roles.name:Chefe Administrativo',
            ],
            request()->query('filters') ?? []
        );

        $result = DataTable::query(User::query())
            ->with(['roles'])
            ->searchable(['name', 'email'])
            ->applyFilters($filters)
            ->allowedFilters([
                'deleted_at:NOT NULL',
                'deleted_at:NULL',
                'roles.name:Administrator',
                'roles.name:Técnico Ortoprotésico',
                'roles.name:Técnico de Administrativo',
                'roles.name:Chefe Técnico',
                'roles.name:Chefe das Proteses',
                'roles.name:Chefe das Ortoteses',
                'roles.name:Director do Servico',
                'roles.name:Dnam',
                'roles.name:Chefe Administrativo',
            ])
            ->allowedSorts(['name', 'email', 'created_at', 'deleted_at'])
            ->make();

        return UserResource::collection($result);
    }

    public function store(array $data)
    {
        $user = User::create([
            'id' => Str::uuid(),
            'name' => $data['name'],
            'email' => $data['email'],
            'orthopedic_center_id' => $data['orthopedic_center_id'],
            'password' => Hash::make($data['password']),
        ]);

        $user->roles()->sync($data['roles']);

        event(new Registered($user));

        return $user;
    }

    public function show($id)
    {
        return User::with(['orthopedic_center', 'roles'])->findOrFail($id);
    }

    public function edit($id)
    {
        $user = User::with('roles')->findOrFail($id);

        $transformed_roles = $user->roles->map(function ($role) {
            return [
                'value' => $role->id,
                'label' => $role->name,
            ];
        });

        $db_roles = Role::select('id', 'name')->get()->map(function ($role) {
            return [
                'value' => $role->id,
                'label' => $role->name,
            ];
        });

        return [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at,
                'status' => $user->deleted_at ? false : true,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
                'roles' => $transformed_roles,
            ],
            'db_roles' => $db_roles,
        ];
    }

    public function update($id, array $data)
    {
        $user = User::findOrFail($id);

        $user->update([
            'name' => $data['name'],
            'email' => $data['email'],
        ]);

        $user->roles()->sync($data['roles']);

        return $user;
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return $user;
    }

    public function restore($id)
    {
        $user = User::withTrashed()->findOrFail($id);
        $user->restore();

        return $user;
    }

    public function forceDestroy($id)
    {
        $user = User::withTrashed()->findOrFail($id);
        $user->forceDelete();

        return true;
    }
}
