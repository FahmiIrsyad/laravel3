<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\manager\EventController;
use App\Http\Controllers\manager\EventFormController;
use Illuminate\Support\Facades\Route;
use App\Models\Event;
use Illuminate\Support\Facades\Artisan;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/sports/running', function () {
    $events = Event::all();
    return view('running', compact('events'));
});

Route::get('/event/{id}', [EventController::class, 'show'])->name('event.show');

Route::view('/sports/football', 'sports.football');
Route::view('/sports/hockey', 'sports.hockey');
Route::view('/sports/rugby', 'sports.rugby');
Route::view('/sports/netball', 'sports.netball');
Route::view('/sports/all', 'sports.all');

Route::get('/link-storage', function () {
    Artisan::call('storage:link');
    return '✅ Storage link created successfully!';
});


// Group all manager auth routes
Route::prefix('manager')->group(function () {
    
    // Register
    Route::get('/register', [RegisterController::class, 'showRegistrationForm'])->name('manager.register');
    Route::post('/register', [RegisterController::class, 'register'])->name('manager.register.send');

    // Login
    Route::get('/login', [LoginController::class, 'showLoginForm'])->name('manager.login');
    Route::post('/login', [LoginController::class, 'login'])->name('manager.login.send');

    // Logout
    Route::post('/logout', [LoginController::class, 'logout'])->name('manager.logout');

    // Dashboard (protected)
    Route::get('/dashboard', function () {
        return view('manager.dashboard.index');
    })->middleware('auth')->name('manager.dashboard');

    Route::middleware('auth')->group(function () {
        // Events CRUD
        Route::resource('events', EventController::class)->except(['show'])->names('manager.events');

        Route::get('/events/list', [EventController::class, 'listEvent'])->name('manager.events.list');


        // Custom form builder
        Route::get('/events/{event}/form-builder', [EventFormController::class, 'create'])->name('manager.event.form.builder');
        Route::post('/events/{event}/form-builder', [EventFormController::class, 'store'])->name('manager.event.form.store');

        Route::get('/events/{event}/register', [EventFormController::class, 'showForm'])->name('manager.form.show');
        Route::post('/events/{event}/register', [EventFormController::class, 'submitForm'])->name('manager.form.submit');

    });
});




