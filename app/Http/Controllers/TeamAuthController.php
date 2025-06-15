<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Team;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\Event;
use App\Models\EventFormField;
use App\Models\EventFormSubmission;
use App\Models\Participant;
use Yajra\DataTables\DataTables;
use Illuminate\Support\Facades\DB;



class TeamAuthController extends Controller
{
    // Show registration form
    public function showRegisterForm()
    {
        return view('team.register');
    }

    // Handle registration
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'mobile' => 'required|string|max:20',
            'email' => 'required|email|unique:teams',
            'nric' => 'required|string|unique:teams',
            'username' => 'required|string|unique:teams',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $team = Team::create([
            'name' => $validated['name'],
            'mobile' => $validated['mobile'],
            'email' => $validated['email'],
            'nric' => $validated['nric'],
            'username' => $validated['username'],
            'password' => Hash::make($validated['password']),
        ]);

        // Use default web guard
        Auth::login($team);

        return redirect()->route('team.dashboard')->with('success', 'Registered and logged in successfully!');
    }

    // Show login form
    public function showLoginForm()
    {
        return view('team.login');
    }

    // Handle login
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->route('team.dashboard')->with('success', 'Logged in successfully!');
        }

        return back()->withErrors([
            'username' => 'Invalid username or password.',
        ])->onlyInput('username');
    }

    // Handle logout
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('team.login')->with('success', 'Logged out successfully!');
    }

    public function dashboard()
    {
        $user = Auth::user(); // assuming you're using Laravel Auth

        return view('team.dashboard', compact('user'));
    }

     public function event()
    {
        // Get all events (you can filter by status, date, or sport if needed)
        $events = Event::all();

        return view('team.event', compact('events'));
    }

    public function detail(Event $event)
    {
        $formFields = EventFormField::with('options')
                        ->where('event_id', $event->id)
                        ->get();

        return view('team.detail', compact('event', 'formFields'));
    }

    public function submit(Request $request, Event $event)
    {
         $fields = $event->formFields;
        $orderId = time(); // Use UNIX timestamp as order ID

        foreach ($fields as $field) {
            $input = $request->input($field->input_id);

            // For checkboxes (array), loop through values
            if (is_array($input)) {
                foreach ($input as $val) {
                    EventFormSubmission::create([
                        'event_id' => $event->id,
                        'order_id' => $orderId,
                        'user_id' => Auth::id(),
                        'event_form_field_id' => $field->id,
                        'value' => $val,
                    ]);
                }
            } else {
                EventFormSubmission::create([
                    'event_id' => $event->id,
                    'order_id' => $orderId,
                    'user_id' => Auth::id(),
                    'event_form_field_id' => $field->id,
                    'value' => $input ?? '', // fallback for empty inputs
                ]);
            }
        }

        return redirect()->route('team.event')->with('success', 'Form submitted successfully!');
    }

    public function data(Request $request)
    {
        if ($request->ajax()) {
            $submissions = EventFormSubmission::with('event')
    ->select('order_id', 'event_id', DB::raw('MIN(created_at) as created_at'))
    ->where('user_id', Auth::id())
    ->groupBy('order_id', 'event_id');


            return DataTables::of($submissions)
                ->addIndexColumn()
                ->addColumn('event_name', function ($row) {
                    return $row->event->title ?? '-';
                })
                ->addColumn('dates', function ($row) {
                    $start = $row->event->start_date ? date('d-m-Y', strtotime($row->event->start_date)) : '-';
                    $end = $row->event->end_date ? date('d-m-Y', strtotime($row->event->end_date)) : '-';
                    return "$start > $end";
                })
                ->addColumn('type', function ($row) {
                    return $row->event->type ?? '-';
                })
                ->addColumn('order_id', function ($row) {
                    return $row->order_id;
                })
                ->addColumn('payment_status', function () {
                    return 'Paid'; // Placeholder, update based on logic if needed
                })
               ->addColumn('action', function ($row) {
                $updateUrl = route('team.event.store', [
                    'id' => $row->event_id,
                    'order_id' => $row->order_id, // add order_id as query param
                ]);
    return '
        <div class="d-inline-flex gap-2 align-items-center">
            <a href="javascript:void(0);" 
               class=" btn-sm btn-view-summary" 
               data-order-id="' . $row->order_id . '">
               View Summary
            </a>
            |
            <a href="' . $updateUrl . '" class=" btn-sm">Update Data</a>
            |
            <a href="#" class=" btn-sm">Delete</a>
        </div>
    ';
})


                ->rawColumns(['action'])
                ->make(true);
        }

    }

    public function summary(Request $request)
{
    $orderId = $request->order_id;

    $submissions = EventFormSubmission::with('formField', 'event')

        ->where('user_id', auth()->id())
        ->where('order_id', $orderId)
        ->get();

    $event = $submissions->first()?->event;

    $participants = Participant::
        where('order_id', $orderId)
        ->get();

    return view('team.partials.submission_summary', compact('submissions', 'event', 'orderId', 'participants'));
}

    public function store($id, Request $request)
{
    $userId = auth()->id();
    $orderId = $request->query('order_id');

    // Find the event manually
    $event = Event::findOrFail($id);

    // Get all form fields for this event
    $formFields = EventFormField::with('options')
                    ->where('event_id', $event->id)
                    ->get();

    // Get user's previous submission for this event and this order
    $submissions = EventFormSubmission::where('event_id', $event->id)
                    ->where('user_id', $userId)
                    ->where('order_id', $orderId)
                    ->get();

    // Map to [event_form_field_id => value]
    $values = $submissions->pluck('value', 'event_form_field_id');

    return view('team.store', compact('event', 'formFields', 'values', 'orderId'));
}

public function storeParticipants(Request $request, $eventId)
{
    $request->validate([
        'name'  => 'required|string|max:255',
        'nric'  => 'required|string|max:50',
        'dob'   => 'required|date',
        'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        'order_id' => 'required|string', // make sure the form sends this
    ]);

    $photoPath = null;
    if ($request->hasFile('photo')) {
        $photoPath = $request->file('photo')->store('participants/photos', 'public');
    }

    Participant::create([
        'event_id' => $eventId,
        'user_id'  => auth()->id(),
        'order_id' => $request->order_id,
        'name'     => $request->name,
        'nric'     => $request->nric,
        'dob'      => $request->dob,
        'photo'    => $photoPath,
    ]);

    return response()->json(['success' => true]);
}

public function tableParticipant(Request $request, $eventId)
{
    if ($request->ajax()) {
        $orderId = $request->get('order_id');
$participants = Participant::where('event_id', $eventId)
                ->when($orderId, fn($q) => $q->where('order_id', $orderId))
                ->latest()->get();


        return datatables()->of($participants)
            ->addColumn('photo', function ($row) {
                if ($row->photo) {
                    return '<img src="' . asset('storage/' . $row->photo) . '" width="50">';
                }
                return '<span class="text-muted">No Image</span>';
            })
            ->addColumn('action', function ($row) {
    return '
        <button type="button" class="btn btn-sm btn-primary btn-edit" 
                data-id="' . $row->id . '"
                data-name="' . e($row->name) . '"
                data-nric="' . e($row->nric) . '"
                data-dob="' . $row->dob . '"
                data-toggle="modal" data-target="#editModal">
            Edit
        </button>
        <button type="button" class="btn btn-sm btn-danger btn-delete" 
                data-id="' . $row->id . '" 
                data-bs-toggle="modal" data-bs-target="#deleteModal">
            Delete
        </button>
    ';
})
->rawColumns(['photo', 'action'])

            ->make(true);
    }

    
}


public function update(Request $request, $id)
{
    $participant = Participant::findOrFail($id);

    $request->validate([
        'name' => 'required|string|max:255',
        'nric' => 'required|string|max:50',
        'dob' => 'required|date',
    ]);

    $participant->update([
        'name' => $request->name,
        'nric' => $request->nric,
        'dob'  => $request->dob,
    ]);

    return response()->json(['success' => true]);
}


public function destroy($id)
{
    $participant = Participant::findOrFail($id);
    $participant->delete();

    return redirect()->back()->with('success', 'Participant deleted.');
}


public function printFormA($order_id)
{
$userId = auth()->id();

    // Get submissions
    $submissions = EventFormSubmission::with('formField', 'event')
        ->where('order_id', $order_id)
        ->where('user_id', $userId)
        ->get();

    $event = $submissions->first()?->event;

    // Get participant data
    $participants = Participant::where('order_id', $order_id)
        ->where('user_id', $userId)
        ->get();

    return view('team.form-a', compact('order_id', 'event', 'submissions', 'participants'));

}

public function printFormB($order_id)
{
    $submissions = EventFormSubmission::with('formField', 'event')
        ->where('order_id', $order_id)
        ->get();

    $event = $submissions->first()?->event;

    $participants = Participant::where('order_id', $order_id)->get();

    return view('team.form-b', compact('event', 'submissions', 'participants'));
}












}
