<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Address;
use App\Models\Process;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\Identification;
use App\Services\ProcessService;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ProcessRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\QueryParamsRequest;

class ProcessController extends Controller
{
    private ProcessService $processService;

    public function __construct(
        ProcessService $processService
    ) {
        $this->processService = $processService;
    }

    public function index(QueryParamsRequest $request)
    {
        $processes = $this->processService->index();

        return inertia('Processes/index', [
            'processes' => $processes,
        ]);
    }

    // public function index(QueryParamsRequest $request)
    // {
    //     $filters = $request->validated('filters', []);

    //     $processes = $this->processService->index($filters);

    //     return inertia('Processes/index', [
    //         'processes' => $processes,
    //         'filters' => $filters,
    //     ]);
    // }

    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Processes/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    // public function store(ProcessRequest $request): RedirectResponse
    // {
    //     // try {
    //     $validatedData = $request->validated();

    //     DB::beginTransaction();

    //     // Create the address
    //     $address = Address::create([
    //         'id' => Str::uuid(),
    //         'province_id' => $validatedData['province_id'],
    //         'district_id' => $validatedData['district_id'],
    //         'neighbourhood_id' => $validatedData['neighbourhood_id'],
    //     ]);

    //     // Create the identification
    //     $identification = Identification::create([
    //         'id' => Str::uuid(),
    //         'number' => $validatedData['number'],
    //         'archive' => $validatedData['archive'],
    //         'issue_date' => $validatedData['issue_date'],
    //         'expire_date' => $validatedData['expire_date'],
    //     ]);

    //     $latest_nid = Process::max('nid');
    //     $nid = $validatedData['nid'] ?? ($latest_nid ? $latest_nid + 1 : 1);

    //     // Create the process
    //     $process = Process::create(
    //         [
    //             'id' => Str::uuid(),
    //             'nid' => $nid,
    //             'user_id' => Auth::user()->id,
    //             'oc_id' => User::with(['orthopedic_center'])->find(Auth::user()->id)->orthopedic_center->id,
    //             'address_id' => $address->id,
    //             'identification_id' => $identification->id,
    //             'marital_state' => $validatedData['marital_state'],
    //             'name' => $validatedData['name'],
    //             'date_of_birth' => $validatedData['date_of_birth'],
    //             'genre' => $validatedData['genre'],
    //             'race' => $validatedData['race'],
    //             'profession' => $validatedData['profession'],
    //             'workplace' => $validatedData['workplace'],
    //             'naturality' => $validatedData['naturality'],
    //             'phone_number' => $validatedData['phone_number'],
    //             'father_name' => $validatedData['father_name'],
    //             'mother_name' => $validatedData['mother_name'],

    //         ]
    //     );

    //     DB::commit();

    //     return redirect(route('processes.index', absolute: false));

    //     // } catch (\Exception $e) {
    //     //     DB::rollBack();

    //     //     return response()->json([
    //     //         'message' => 'Erro ao criar o processo.',
    //     //         'error' => $e->getMessage(),
    //     //     ], 500);
    //     // }
    // }
    public function store(ProcessRequest $request)
    {
        try {
            $validatedData = $request->validated();
            $process = $this->processService->store($validatedData);
            return redirect(route('processes.index', absolute: false));
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao criar o processo.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function show($id)
    // {
    //     return Inertia::render('Processes/show', [
    //         'user' => User::find($id),
    //     ]);
    // }
    public function show($id)
    {
        $process = $this->processService->show($id);

        return Inertia::render('Processes/show', ['process' => $process]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::with('roles')->find($id);

        // Create a transformed version of the user's roles
        $transformed_roles = $user->roles->map(function ($role) {
            return [
                'value' => $role->id,
                'label' => $role->name,
            ];
        });

        // Fetch all roles for the dropdown or multi-select
        $db_roles = Role::select('id', 'name')->get()->map(function ($role) {
            return [
                'value' => $role->id,
                'label' => $role->name,
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
                'roles' => $transformed_roles,
            ],
            'db_roles' => $db_roles,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
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
