<?php

namespace App\Http\Controllers;

use App\Services\RoleService;
use App\Http\Requests\QueryParamsRequest;

class RoleController extends Controller
{
    private RoleService $roleService;

    public function __construct(RoleService $roleService)
    {
        $this->roleService = $roleService;
    }

    public function index(QueryParamsRequest $request)
    {
        $roles = $this->roleService->index();

        return inertia('Roles/Index', [
            'roles' => $roles
        ]);
    }

    public function list(QueryParamsRequest $request)
    {
        $roles = $this->roleService->index();
        return response()->json($roles);
    }
}
