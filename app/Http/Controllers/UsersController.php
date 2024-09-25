<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Services\UserService;
use Spatie\Permission\Models\Role;
use App\Http\Resources\RoleResource;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\QueryParamsRequest;
use App\Services\OrthopedicCenterService;

class UsersController extends Controller
{
    protected UserService $userService;
    protected OrthopedicCenterService $orthopedicCenterService;

    public function __construct(UserService $userService, OrthopedicCenterService $orthopedicCenterService)
    {
        $this->userService = $userService;
        $this->orthopedicCenterService = $orthopedicCenterService;
    }

    public function index(QueryParamsRequest $request)
    {
        $users = $this->userService->index();
        $roles = Role::all();

        RoleResource::withoutWrapping();

        return inertia('Users/index', [
            'users' => $users,
            'roles' => RoleResource::collection($roles),
        ]);
    }

    public function create(): Response
    {
        $orthopedic_centers = $this->orthopedicCenterService->index();

        return Inertia::render('Users/register',[
            'orthopedic_centers' => $orthopedic_centers
        ]);
    }

    public function store(CreateUserRequest $request): RedirectResponse
    {
        $this->userService->store($request->validated());

        return redirect(route('users.index', absolute: false));
    }

    public function show($id)
    {
        $user = $this->userService->show($id);

        return Inertia::render('Users/show', ['user' => $user]);
    }

    public function edit($id)
    {
        $data = $this->userService->edit($id);

        return Inertia::render('Users/edit', $data);
    }

    public function update(UpdateUserRequest $request, $id): RedirectResponse
    {
        $this->userService->update($id, $request->validated());

        return Redirect::route('users.index')->with('message', 'Dados do utilizador atualizados com sucesso!');
    }

    public function destroy($id)
    {
        dd($id);
        try {
            $this->userService->destroy($id);

            return Redirect::route('users.index')->with('message', 'Utilizador desabilitado com exito!');
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function restore($id)
    {
        try {
            $this->userService->restore($id);

            return Redirect::route('users.index')->with('message', 'Utilizador restaurado com exito!');
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function force_destroy($id)
    {
        try {
            $this->userService->forceDestroy($id);

            return Redirect::route('users.index')->with('message', 'Utilizador removido permanentemente com exito!');
        } catch (\Throwable $th) {
            throw $th;
        }

    }
}
