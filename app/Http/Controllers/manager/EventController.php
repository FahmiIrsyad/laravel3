<?php

namespace App\Http\Controllers\manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\EventForm;
use Yajra\DataTables\Facades\DataTables;

class EventController extends Controller {
    public function index() {
        $events = Event::all();
        return view('events.index', compact('events'));
    }

    public function listEvent()
    {
        $events = Event::orderBy('created_at', 'DESC')->get();

        $eventCollection = collect($events)->map(function ($event) {
            return [
                'id' => $event->id,
                'title' => $event->title,
                'location' => $event->location,
                'status' => $event->status ? 'Active' : 'Inactive',
                'created_at' => $event->created_at->format('Y/m/d'),
            ];
        });

        return DataTables::of($eventCollection)
            ->escapeColumns([]) // allow HTML and Blade code
            ->addIndexColumn()
            ->addColumn('action', '
                <a href="{{ route(\'manager.events.edit\', $id) }}" class="btn btn-warning btn-sm">Edit</a>
                <form method="POST" action="{{ route(\'manager.events.destroy\', $id) }}" style="display:inline-block" onsubmit="return confirm(\'Are you sure?\')">
                    ' . csrf_field() . method_field('DELETE') . '
                    <button type="submit" class="btn btn-danger btn-sm">Delete</button>
                </form>
                <a href="{{ route(\'manager.event.form.builder\', $id) }}" class="btn btn-info btn-sm">Build Form</a>
                <a href="{{ route(\'manager.form.show\', $id) }}" class="btn btn-primary btn-sm" target="_blank">View Form</a>
            ')
            ->make(true);
    }


    public function create() {
        return view('events.create');
    }

    public function store(Request $request) {
        $data = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'registration_closing_date' => 'required|date|before_or_equal:start_date',
            'location' => 'required|string',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $data['image'] = $request->file('image')->store('events', 'public');
        Event::create($data);
        return redirect()->route('manager.events.index');
    }

    public function edit(Event $event) {
        return view('events.edit', compact('event'));
    }

    public function update(Request $request, Event $event) {
        $data = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'registration_closing_date' => 'required|date|before_or_equal:start_date',
            'location' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('events', 'public');
        }

        $event->update($data);
        return redirect()->route('manager.events.index');
    }

    public function destroy(Event $event) {
        $event->delete();
        return redirect()->route('manager.events.index');
    }
}
