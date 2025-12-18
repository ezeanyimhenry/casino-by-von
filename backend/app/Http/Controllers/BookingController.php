<?php
namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\CasinoTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'table_id' => 'required|exists:casino_tables,id',
            'booking_date' => 'required|date|after_or_equal:today',
            'time_slot' => 'required|string',
            'num_seats' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Check if table is available
        $table = CasinoTable::findOrFail($request->table_id);

        if (!$table->is_active) {
            return response()->json([
                'message' => 'This table is not available'
            ], 400);
        }

        if ($request->num_seats > $table->max_seats) {
            return response()->json([
                'message' => 'Number of seats exceeds table capacity'
            ], 400);
        }

        // Check if table is already booked for this date and time
        $existingBooking = Booking::where('table_id', $request->table_id)
            ->where('booking_date', $request->booking_date)
            ->where('time_slot', $request->time_slot)
            ->whereIn('status', ['confirmed', 'pending'])
            ->first();

        if ($existingBooking) {
            return response()->json([
                'message' => 'This table is already booked for the selected time'
            ], 400);
        }

        // Create booking
        $booking = Booking::create([
            'user_id' => $request->user()->id,
            'table_id' => $request->table_id,
            'booking_date' => $request->booking_date,
            'time_slot' => $request->time_slot,
            'num_seats' => $request->num_seats,
            'status' => 'confirmed',
        ]);

        return response()->json([
            'message' => 'Booking created successfully',
            'booking' => $booking->load('table', 'user')
        ], 201);
    }

    public function userBookings(Request $request)
    {
        $bookings = Booking::where('user_id', $request->user()->id)
            ->with('table')
            ->orderBy('booking_date', 'desc')
            ->orderBy('time_slot', 'desc')
            ->get();

        return response()->json($bookings);
    }

    public function show($id)
    {
        $booking = Booking::with('table', 'user')->findOrFail($id);

        // Check if user owns this booking
        if ($booking->user_id !== request()->user()->id) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        return response()->json($booking);
    }

    public function cancel(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);

        // Check if user owns this booking
        if ($booking->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        if ($booking->status === 'cancelled') {
            return response()->json([
                'message' => 'Booking is already cancelled'
            ], 400);
        }

        $booking->update(['status' => 'cancelled']);

        return response()->json([
            'message' => 'Booking cancelled successfully',
            'booking' => $booking
        ]);
    }
}