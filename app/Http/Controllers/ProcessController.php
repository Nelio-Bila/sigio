<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\QueryParamsRequest;

class ProcessController extends Controller
{
    private ProcessService $processService;

    public function __construct(
        ProcessService $processService
    )
    {
        $this->processService = $processService;
    }

    public function index(QueryParamsRequest $request)
    {
        $processes = $this->processService->index();

        return inertia('Processes/Index', [
            'processes' => $processes,
        ]);
    }
}
