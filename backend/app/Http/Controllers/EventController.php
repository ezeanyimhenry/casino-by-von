<?php
namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::orderBy('event_date', 'asc')->get();
        return response()->json($events);
    }

    public function show($id)
    {
        $event = Event::findOrFail($id);
        return response()->json($event);
    }

    public function featured()
    {
        $events = Event::where('is_featured', true)
            ->orderBy('event_date', 'asc')
            ->get();
        return response()->json($events);
    }

    public function upcoming()
    {
        $events = Event::where('event_date', '>=', now())
            ->orderBy('event_date', 'asc')
            ->take(10)
            ->get();
        return response()->json($events);
    }
}

// backend/app/Http/Controllers/MembershipController.php

namespace App\Http\Controllers;

use App\Models\MembershipTier;
use Illuminate\Http\Request;

class MembershipController extends Controller
{
    public function tiers()
    {
        $tiers = MembershipTier::orderBy('min_spent', 'asc')->get();
        return response()->json($tiers);
    }

    public function current(Request $request)
    {
        $user = $request->user()->load('membershipTier');
        return response()->json($user->membershipTier);
    }

    public function progress(Request $request)
    {
        $user = $request->user()->load('membershipTier');
        $currentTier = $user->membershipTier;

        // Get next tier
        $nextTier = MembershipTier::where('min_spent', '>', $user->total_spent)
            ->orderBy('min_spent', 'asc')
            ->first();

        $progress = [
            'current_tier' => $currentTier,
            'next_tier' => $nextTier,
            'total_spent' => $user->total_spent,
            'amount_to_next_tier' => $nextTier ? $nextTier->min_spent - $user->total_spent : 0,
            'progress_percentage' => $nextTier
                ? min(100, ($user->total_spent / $nextTier->min_spent) * 100)
                : 100,
        ];

        return response()->json($progress);
    }
}