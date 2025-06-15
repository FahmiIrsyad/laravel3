@if($event)
    <h4>{{ $event->title }}</h4>
    <p>{{ \Carbon\Carbon::parse($event->start_date)->format('d M Y') }} - {{ \Carbon\Carbon::parse($event->end_date)->format('d M Y') }}</p>


    <table class="table table-bordered">
        @foreach($submissions as $row)
            <tr>
                <th>{{ $row->formField->label ?? 'Field' }}</th>
                <td>{{ $row->value }}</td>
            </tr>
        @endforeach
    </table>

    @if($participants->count())
    <h5>Team Member</h5>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>NRIC</th>
                <th>DOB</th>
                <th>Photo</th>
            </tr>
        </thead>
        <tbody>
            @foreach($participants as $participant)
                <tr>
                    <td>{{ $participant->name }}</td>
                    <td>{{ $participant->nric }}</td>
                    <td>{{ \Carbon\Carbon::parse($participant->dob)->format('d/m/Y') }}</td>
                    <td>
                        @if($participant->photo)
                            <img src="{{ asset('storage/' . $participant->photo) }}" width="60">
                        @else
                            <span class="text-muted">No photo</span>
                        @endif
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@else
    <p class="text-center text-muted">No participants found for this order.</p>
@endif


@else
    <p class="text-danger">Submission not found.</p>
@endif
