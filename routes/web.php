<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\ProcessController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProvinceController;
use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\NeighbourhoodController;
use App\Http\Controllers\OrthopedicCenterController;
use App\Http\Controllers\StockMovementController;
use App\Http\Controllers\WarehouseController;

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix('roles')->name('roles.')->middleware('auth')->group(function () {
    Route::controller(RoleController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/list', 'list')->name('list');
    });
});

Route::prefix('users')->name('users.')->middleware('auth')->group(function () {
    Route::controller(UsersController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/register', 'create')->name('create');
        Route::post('/register', 'store')->name('store');
        Route::get('/show/{id}', 'show')->name('show');
        Route::get('/edit/{id}', 'edit')->name('edit');
        Route::put('/update/{id}', 'update')->name('update');
        Route::delete('/destroy/{id}', 'destroy')->name('destroy');
        Route::post('/restore/{id}', 'restore')->name('restore');
        Route::delete('/force_destroy/{id}', 'force_destroy')->name('force_destroy');
    });
});

Route::prefix('orthopedic_centers')->name('orthopedic_centers.')->middleware('auth')->group(function () {
    Route::controller(OrthopedicCenterController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/register', 'create')->name('create');
        Route::post('/register', 'store')->name('store');
        Route::get('/show/{id}', 'show')->name('show');
        Route::get('/edit/{id}', 'edit')->name('edit');
        Route::put('/update/{id}', 'update')->name('update');
        Route::delete('/destroy/{id}', 'destroy')->name('destroy');
        Route::post('/restore/{id}', 'restore')->name('restore');
        Route::delete('/force_destroy/{id}', 'force_destroy')->name('force_destroy');
    });
});

Route::prefix('processes')->name('processes.')->middleware('auth')->group(function () {
    Route::controller(ProcessController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/register', 'create')->name('create');
        Route::post('/register', 'store')->name('store');
        Route::get('/show/{id}', 'show')->name('show');
        Route::get('/edit/{id}', 'edit')->name('edit');
        Route::put('/update/{id}', 'update')->name('update');
        Route::delete('/destroy/{id}', 'destroy')->name('destroy');
        Route::post('/restore/{id}', 'restore')->name('restore');
        Route::delete('/force_destroy/{id}', 'force_destroy')->name('force_destroy');
    });
});

Route::prefix('consultations')->name('consultations.')->middleware('auth')->group(function () {
    Route::controller(ConsultationController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/register', 'create')->name('create');
        Route::post('/register', 'store')->name('store');
        Route::get('/show/{id}', 'show')->name('show');
        Route::get('/edit/{id}', 'edit')->name('edit');
        Route::put('/update/{id}', 'update')->name('update');
        Route::delete('/destroy/{id}', 'destroy')->name('destroy');
        Route::post('/restore/{id}', 'restore')->name('restore');
        Route::delete('/force_destroy/{id}', 'force_destroy')->name('force_destroy');
    });
});

Route::prefix('warehouses')->name('warehouses.')->middleware('auth')->group(function () {
    Route::controller(WarehouseController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/register', 'create')->name('create');
        Route::post('/register', 'store')->name('store');
        Route::get('/show/{id}', 'show')->name('show');
        Route::get('/edit/{id}', 'edit')->name('edit');
        Route::put('/update/{id}', 'update')->name('update');
        Route::delete('/destroy/{id}', 'destroy')->name('destroy');
        Route::post('/restore/{id}', 'restore')->name('restore');
        Route::delete('/force_destroy/{id}', 'force_destroy')->name('force_destroy');
    });
});

Route::prefix('materials')->name('materials.')->middleware('auth')->group(function () {
    Route::controller(MaterialController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/register', 'create')->name('create');
        Route::post('/register', 'store')->name('store');
        Route::get('/show/{id}', 'show')->name('show');
        Route::get('/edit/{id}', 'edit')->name('edit');
        Route::put('/update/{id}', 'update')->name('update');
        Route::delete('/destroy/{id}', 'destroy')->name('destroy');
        Route::post('/restore/{id}', 'restore')->name('restore');
        Route::delete('/force_destroy/{id}', 'force_destroy')->name('force_destroy');
    });

    Route::controller(StockMovementController::class)->name('stock_movements.')->group(function () {
        Route::get('/stock_movements', 'index')->name('index');
        Route::get('/stock_movements/register', 'create')->name('create');
        Route::post('/stock_movements/register', 'store')->name('store');
        Route::get('/stock_movements/show/{id}', 'show')->name('show');
        Route::get('/stock_movements/edit/{id}', 'edit')->name('edit');
        Route::put('/stock_movements/update/{id}', 'update')->name('update');
        Route::delete('/stock_movements/destroy/{id}', 'destroy')->name('destroy');
        Route::post('/stock_movements/restore/{id}', 'restore')->name('restore');
        Route::delete('/stock_movements/force_destroy/{id}', 'force_destroy')->name('force_destroy');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('provinces')->name('provinces.')->group(function () {
    // Provinces
    Route::get('/', [ProvinceController::class, 'index'])->name('index');

    // Districts
    Route::get('/{province}/districts', [ProvinceController::class, 'districts'])->name('districts');

    // Neighbourhoods
    Route::get('/districts/{district}/neighbourhoods', [NeighbourhoodController::class, 'index'])->name('districts.neighbourhoods.index');
});

require __DIR__ . '/auth.php';
