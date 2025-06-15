<?php

namespace App\Http\Controllers\manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\EventFormField;
use App\Models\EventFormFieldOption;
use App\Models\EventForm;      

class EventFormController extends Controller {
    public function create(Event $event) {
        return view('events.form_builder', compact('event'));
    }

    public function store(Request $request, Event $event)
    {
        $request->validate([
            'form_json' => 'required|json',
        ]);

        $fields = json_decode($request->form_json, true);

        // Clean existing
        EventFormField::where('event_id', $event->id)->delete();

        foreach ($fields as $order => $field) {
            $fieldModel = EventFormField::create([
                'event_id'   => $event->id,
                'label'      => $field['label'],
                'input_id'   => 'field_' . uniqid(),
                'type'       => $field['type'],
                'required'   => $field['required'] ?? false,
                'order'      => $order,
            ]);

            if (isset($field['options']) && is_array($field['options'])) {
                foreach ($field['options'] as $index => $option) {
                    EventFormFieldOption::create([
                        'event_form_field_id' => $fieldModel->id,
                        'name'  => $fieldModel->input_id,
                        'value' => $option,
                        'label' => $option,
                        'order' => $index,
                    ]);
                }
            }
        }

        return redirect()->route('manager.events.index')->with('success', 'Form saved.');
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
