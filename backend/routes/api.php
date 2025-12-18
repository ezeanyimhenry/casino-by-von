<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CasinoTableController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\MembershipTierController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Public data routes (can be accessed without auth if needed)
Route::get('/tables', [CasinoTableController::class, 'index']);
Route::get('/tables/{id}', [CasinoTableController::class, 'show']);
Route::get('/events', [EventController::class, 'index']);
Route::get('/events/featured', [EventController::class, 'featured']);
Route::get('/events/upcoming', [EventController::class, 'upcoming']);
Route::get('/events/{id}', [EventController::class, 'show']);
Route::get('/membership/tiers', [MembershipTierController::class, 'tiers']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', [AuthController::class, 'user']);
    Route::put('/auth/profile', [AuthController::class, 'updateProfile']);

    // Tables
    Route::get('/tables/available', [CasinoTableController::class, 'available']);

    // Bookings
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings/user', [BookingController::class, 'userBookings']);
    Route::get('/bookings/{id}', [BookingController::class, 'show']);
    Route::post('/bookings/{id}/cancel', [BookingController::class, 'cancel']);

    // Membership
    Route::get('/membership/current', [MembershipTierController::class, 'current']);
    Route::get('/membership/progress', [MembershipTierController::class, 'progress']);
});