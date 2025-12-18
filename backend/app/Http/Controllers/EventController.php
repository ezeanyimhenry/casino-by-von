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