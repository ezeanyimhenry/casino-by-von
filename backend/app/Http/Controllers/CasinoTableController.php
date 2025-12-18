<?php

namespace App\Http\Controllers;

use App\Models\CasinoTable;
use App\Models\Booking;
use Illuminate\Http\Request;

class CasinoTableController extends Controller
{
    public function index()
    {
        $tables = CasinoTable::where('is_active', true)
            ->orderBy('name')
            ->get();

        return response()->json($tables);
    }

    public function show($id)
    {
        $table = CasinoTable::findOrFail($id);
        return response()->json($table);
    }

    public function available(Request $request)
    {
        $date = $request->query('date');
        $timeSlot = $request->query('time_slot');

        // Get all active tables
        $tables = CasinoTable::where('is_active', true)->get();

        // Get bookings for the specified date and time slot
        $bookedTableIds = Booking::where('booking_date', $date)
            ->where('time_slot', $timeSlot)
            ->whereIn('status', ['confirmed', 'pending'])
            ->pluck('table_id')
            ->toArray();

        // Filter out booked tables
        $availableTables = $tables->filter(function ($table) use ($bookedTableIds) {
            return !in_array($table->id, $bookedTableIds);
        })->values();

        return response()->json($availableTables);
    }
}