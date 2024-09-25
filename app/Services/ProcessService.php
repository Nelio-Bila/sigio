<?php

namespace App\Services;

use App\Models\User;
use App\Models\Address;
use App\Models\Process;
use App\Facades\DataTable;
use Illuminate\Support\Str;
use App\Models\Identification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ProcessResource;

class ProcessService
{

    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        $filters = str_replace(
            [
                'marital_state:single',
                'marital_state:married',
                'marital_state:divorced',
                'marital_state:widowed',
                'genre:male',
                'genre:female',
                'genre:other',
                'status:active',
                'status:inactive',
            ],
            [
                'marital_state:single',
                'marital_state:married',
                'marital_state:divorced',
                'marital_state:widowed',
                'genre:male',
                'genre:female',
                'genre:other',
                'deleted_at:NULL',
                'deleted_at:NOT NULL',
            ],
            request()->query('filters') ?? []
        );

        $query = Process::query()->with(['user', 'address', 'identification']);

        $result = DataTable::query($query)
            ->searchable(['nid', 'name', 'date_of_birth', 'genre', 'marital_state', 'phone_number', 'user.name', 'address.province.name', 'address.district.name', 'identification.number'])
            ->applyFilters($filters)
            ->allowedFilters([
                'deleted_at:NOT NULL',
                'deleted_at:NULL',
                'marital_state:single',
                'marital_state:married',
                'marital_state:divorced',
                'marital_state:widowed',
                'genre:male',
                'genre:female',
                'genre:other',
            ])
            ->allowedSorts(['nid', 'name', 'date_of_birth', 'genre', 'marital_state', 'created_at', 'deleted_at'])
            ->make();

        return ProcessResource::collection($result);
    }

    public function store(array $validatedData)
    {
        DB::beginTransaction();

        try {
            // Create the address
            $address = Address::create([
                'id' => Str::uuid(),
                'province_id' => $validatedData['province_id'],
                'district_id' => $validatedData['district_id'],
                'neighbourhood_id' => $validatedData['neighbourhood_id'],
            ]);

            // Create the identification
            $identification = Identification::create([
                'id' => Str::uuid(),
                'number' => $validatedData['number'],
                'archive' => $validatedData['archive'],
                'issue_date' => $validatedData['issue_date'],
                'expire_date' => $validatedData['expire_date'],
            ]);

            $latest_nid = Process::max('nid');
            $nid = $validatedData['nid'] ?? ($latest_nid ? $latest_nid + 1 : 1);

            $user = User::with(['orthopedic_center'])->find(Auth::id());

            // Create the process
            $process = Process::create([
                'id' => Str::uuid(),
                'nid' => $nid,
                'user_id' => Auth::id(),
                'oc_id' => $user->orthopedic_center->id,
                'address_id' => $address->id,
                'identification_id' => $identification->id,
                'marital_state' => $validatedData['marital_state'],
                'name' => $validatedData['name'],
                'date_of_birth' => $validatedData['date_of_birth'],
                'genre' => $validatedData['genre'],
                'race' => $validatedData['race'],
                'profession' => $validatedData['profession'],
                'workplace' => $validatedData['workplace'],
                'naturality' => $validatedData['naturality'],
                'phone_number' => $validatedData['phone_number'],
                'father_name' => $validatedData['father_name'],
                'mother_name' => $validatedData['mother_name'],
            ]);

            DB::commit();

            return $process;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function show($id)
    {
        return Process::with(['user', 'address', 'identification'])->findOrFail($id);
    }

    public function edit($id)
    {
        $process = Process::with(['user', 'address', 'identification'])->findOrFail($id);

        return [
            'process' => [
                'id' => $process->id,
                'name' => $process->name,
                'date_of_birth' => $process->date_of_birth,
                'genre' => $process->genre,
                'marital_state' => $process->marital_state,
                'phone_number' => $process->phone_number,
                'status' => $process->deleted_at ? false : true,
                'created_at' => $process->created_at,
                'updated_at' => $process->updated_at,
                'user' => $process->user,
                'address' => $process->address,
                'identification' => $process->identification,
            ],
        ];
    }

    public function update($id, array $data)
    {
        DB::beginTransaction();

        try {
            $process = Process::findOrFail($id);

            $process->update([
                'name' => $data['name'],
                'date_of_birth' => $data['date_of_birth'],
                'genre' => $data['genre'],
                'marital_state' => $data['marital_state'],
                'phone_number' => $data['phone_number'],
                'user_id' => $data['user_id'],
                // Update other fields as necessary
            ]);

            // Update related models
            $process->address->update($data['address']);
            $process->identification->update($data['identification']);

            DB::commit();
            return $process;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function destroy($id)
    {
        $process = Process::findOrFail($id);
        $process->delete();

        return $process;
    }

    public function restore($id)
    {
        $process = Process::withTrashed()->findOrFail($id);
        $process->restore();

        return $process;
    }

    public function forceDestroy($id)
    {
        DB::beginTransaction();

        try {
            $process = Process::withTrashed()->findOrFail($id);

            // Delete related models
            $process->address()->delete();
            $process->identification()->delete();

            $process->forceDelete();

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
