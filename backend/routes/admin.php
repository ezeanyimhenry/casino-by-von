<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // Dashboard
    Route::get('/dashboard', [AdminController::class, 'dashboard']);

    // User Management
    Route::get('/users', [AdminController::class, 'getUsers']);
    Route::put('/users/{id}', [AdminController::class, 'updateUser']);
    Route::delete('/users/{id}', [AdminController::class, 'deleteUser']);

    // Table Management
    Route::post('/tables', [AdminController::class, 'createTable']);
    Route::put('/tables/{id}', [AdminController::class, 'updateTable']);
    Route::delete('/tables/{id}', [AdminController::class, 'deleteTable']);

    // Event Management
    Route::post('/events', [AdminController::class, 'createEvent']);
    Route::put('/events/{id}', [AdminController::class, 'updateEvent']);
    Route::delete('/events/{id}', [AdminController::class, 'deleteEvent']);

    // Booking Management
    Route::get('/bookings', [AdminController::class, 'getAllBookings']);
    Route::put('/bookings/{id}/status', [AdminController::class, 'updateBookingStatus']);
});