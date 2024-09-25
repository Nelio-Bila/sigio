<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateOrthopedicCenterRequest;
use App\Http\Requests\QueryParamsRequest;
use App\Http\Requests\UpdateOrthopedicCenterRequest;
use App\Services\NeighbourhoodService;
use App\Services\OrthopedicCenterService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class OrthopedicCenterController extends Controller
{
    protected $orthopedicCenterService;

    protected $neighbourhoodService;

    public function __construct(OrthopedicCenterService $orthopedicCenterService, NeighbourhoodService $neighbourhoodService)
    {
        $this->orthopedicCenterService = $orthopedicCenterService;
        $this->neighbourhoodService = $neighbourhoodService;
    }

    public function index(QueryParamsRequest $request)
    {
        $orthopedic_centers = $this->orthopedicCenterService->index();

        return inertia('OrthopedicCenters/index', [
            'orthopedic_centers' => $orthopedic_centers,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('OrthopedicCenters/register');
    }

    public function store(CreateOrthopedicCenterRequest $request)
    {
        $validated = $request->validated();

        // If a new neighbourhood name is provided, create it
        if (! empty($validated['neighbourhood_name']) && $validated['neighbourhood_id'] === null) {
            $newNeighbourhood = $this->neighbourhoodService->createNeighbourhood([
                'id' => Str::uuid(),
                'name' => $validated['neighbourhood_name'],
                'cod' => Str::upper(Str::substr($validated['neighbourhood_name'], 0, 3)),
                'district_id' => $validated['district_id'],
            ]);
            $validated['neighbourhood_id'] = $newNeighbourhood->id;
        }

        $this->orthopedicCenterService->store($validated);

        return redirect()->route('orthopedic_centers.index')->with('success', 'Centro Ortopédico criado com sucesso.');
    }

    public function show($id)
    {
        $orthopedicCenter = $this->orthopedicCenterService->show($id);

        return Inertia::render('OrthopedicCenters/show', ['orthopedicCenter' => $orthopedicCenter]);
    }

    public function edit($id)
    {
        $data = $this->orthopedicCenterService->edit($id);

        return Inertia::render('OrthopedicCenters/edit', $data);
    }

    public function update(UpdateOrthopedicCenterRequest $request, $id): RedirectResponse
    {
        $this->orthopedicCenterService->update($id, $request->validated());

        return Redirect::route('orthopedic_centers.index')->with('message', 'Dados do centro ortopédico actualizados com sucesso!');
    }

    public function destroy($id)
    {
        try {
            $this->orthopedicCenterService->destroy($id);

            return Redirect::route('orthopedic_centers.index')->with('message', 'Centro Ortopédico desabilitado com exito!');
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function restore($id)
    {
        try {
            $this->orthopedicCenterService->restore($id);

            return Redirect::route('orthopedic_centers.index')->with('message', 'Centro Ortopédico restaurado com exito!');
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function force_destroy($id)
    {
        try {
            $this->orthopedicCenterService->forceDestroy($id);

            return Redirect::route('orthopedic_centers.index')->with('message', 'Centro Ortopédico removido permanentemente com exito!');
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
