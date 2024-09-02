<?php

namespace App\Http\Controllers;

use App\Http\Requests\QueryParamsRequest;
use App\Http\Resources\RoleResource;
use App\Services\UserService;
use Spatie\Permission\Models\Role;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;

class UsersController extends Controller
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
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

    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Users/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->roles()->sync($request->roles);

        event(new Registered($user));

        return redirect(route('users.index', absolute: false));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Inertia::render('Users/show', [
            'user' => User::find($id),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function edit($id)
    // {
        // $db_roles = Role::select('id', 'name')->get();
        // return Inertia::render('Users/edit', [
        //     'user' => User::with('roles')->find($id),
        //     'db_roles' => $db_roles->map(function ($item, $key) {
        //         return ['value' => $item->id, 'label' => $item->name];
        //     })
        // ]);
    public function edit($id)
        {
            $user = User::with('roles')->find($id);

            // Create a transformed version of the user's roles
            $transformed_roles = $user->roles->map(function ($role) {
                return [
                    'value' => $role->id,
                    'label' => $role->name
                ];
            });

            // Fetch all roles for the dropdown or multi-select
            $db_roles = Role::select('id', 'name')->get()->map(function ($role) {
                return [
                    'value' => $role->id,
                    'label' => $role->name
                ];
            });

            return Inertia::render('Users/edit', [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'email_verified_at' => $user->email_verified_at,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                    'roles' => $transformed_roles
                ],
                'db_roles' => $db_roles
            ]);
        }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        $user->name = $request->name;
        $user->email = $request->email;

        $user->save();

        $user->roles()->sync($request->roles);

        return Redirect::route('users.index')->with('message', 'Dados do utilizador actualizados com exito!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $user = User::find($id);
            $user->delete();
            return Redirect::route('users.index')->with('message', 'Utilizador desabilitado com exito!');
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function restore($id)
    {
        try {
            $user = User::withTrashed()->find($id);
            $user->restore();
            return Redirect::route('users.index')->with('message', 'Utilizador restaurado com exito!');
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function force_destroy($id)
    {
        try {
            User::where('id', $id)->forceDelete();
            return Redirect::route('users.index')->with('message', 'Utilizador removido permanentemente com exito!');
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
