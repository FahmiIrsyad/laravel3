<?php

namespace App\Http\Controllers\manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\EventForm;

class EventFormController extends Controller {
    public function create(Event $event) {
        return view('events.form_builder', compact('event'));
    }

    public function store(Request $request, Event $event) {
        $request->validate(['form_json' => 'required|json']);

        EventForm::updateOrCreate(
            ['event_id' => $event->id],
            ['form_json' => $request->form_json]
        );

        return redirect()->route('manager.events.index')->with('success', 'Form saved');
    }

    public function showForm(Event $event)
    {
        return view('events.form_render', compact('event'));
    }

    public function submitForm(Request $request, Event $event)
    {
        $response = $request->input('fields'); // An array of field => value
        // Save this in a table like event_form_responses (JSON or column-based)
        return back()->with('success', 'Thank you for registering!');
    }

}
