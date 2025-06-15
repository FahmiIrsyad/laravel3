@extends('team.layouts.app') {{-- Adjust if your layout filename differs --}}

@section('content')

<div style="margin-top:100px"></div>
<section class="mt-5">
	<div class="container">

    <h1 class="mb-4">{{ $event->title }}</h1>

    <div class="row mb-4">
        <div class="col-12">
            <img 
                src="{{ Str::startsWith($event->image, 'http') ? $event->image : asset('storage/' . ltrim($event->image, '/')) }}" 
                class="img-fluid img-thumbnail w-100"
                alt="Event Image"
            >
        </div>
    </div>

    <div class="row mb-4">
        <div class="col-12 text-justify">
            {!! $event->description !!}
        </div>
    </div>

    <hr style="border:1px solid red">

    @foreach($formFields->chunk(2) as $fieldPair)
    <div class="row">
        @foreach($fieldPair as $field)
            @php
                $options = $field->options ?? [];
                $val = $values[$field->id] ?? '';
                $hideLabel = Str::lower(trim($field->label)) === 'acceptance of terms and conditions';
            @endphp

            <div class="col-md-6 mb-4">
                @if(!$hideLabel && !in_array($field->type, ['checkbox', 'radio', 'radio_price', 'radio_qty']))
                    <label for="{{ $field->input_id }}">
                        {{ $field->label }}
                        @if($field->popup_detail)
                            <a href="{{ $field->popup_detail }}" target="_blank" class="text-info">(View Detail)</a>
                        @endif
                        @if($field->required)
                            <span class="text-danger">*</span>
                        @endif
                    </label>
                @endif

                @switch($field->type)

                    @case('text')
                    @case('email')
                    @case('number')
                    @case('datepicker')
                        <input type="text" readonly class="form-control {{ $field->class }}" value="{{ $val }}">
                        @break

                    @case('textarea')
                        <textarea class="form-control {{ $field->class }}" readonly>{{ $val }}</textarea>
                        @break

                    @case('select')
                        <input type="text" class="form-control" readonly
                            value="{{ $options->firstWhere('value', $val)->label ?? $val }}">
                        @break

                    @case('checkbox')
                        @if(!$hideLabel)
                            <label for="{{ $field->input_id }}">
                                {{ $field->label }}
                                @if($field->popup_detail)
                                    <a href="{{ $field->popup_detail }}" target="_blank" class="text-info">(View Detail)</a>
                                @endif
                                @if($field->required)
                                    <span class="text-danger">*</span>
                                @endif
                            </label>
                        @endif

                        @if(count($options) > 0)
                            @foreach($options as $opt)
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" disabled
                                        {{ in_array($opt->value, (array) $val) ? 'checked' : '' }}>
                                    <label class="form-check-label">{{ $opt->label }}</label>
                                </div>
                            @endforeach
                        @else
                           
                        @endif
                        @break

                    @case('radio')
                    @case('radio_price')
                    @case('radio_qty')
                        @if(!$hideLabel)
                            <label for="{{ $field->input_id }}">
                                {{ $field->label }}
                                @if($field->popup_detail)
                                    <a href="{{ $field->popup_detail }}" target="_blank" class="text-info">(View Detail)</a>
                                @endif
                                @if($field->required)
                                    <span class="text-danger">*</span>
                                @endif
                            </label>
                        @endif

                        @php
                            $selectedLabel = null;
                        @endphp

                        @if(count($options) > 0)
                            @foreach($options as $opt)
                                @if($opt->value == $val)
                                    @php $selectedLabel = $opt->label; @endphp
                                @endif
                                <div class="form-check">
                                    <input class="form-check-input"
                                        type="radio"
                                        disabled
                                        id="{{ $field->input_id . '_' . $loop->index }}"
                                        name="{{ $field->input_id }}"
                                        value="{{ $opt->value }}"
                                        {{ $opt->value == $val ? 'checked' : '' }}>
                                    <label class="form-check-label" for="{{ $field->input_id . '_' . $loop->index }}">
                                        {{ $opt->label }}
                                        @if(in_array($field->type, ['radio_price', 'radio_qty']))
                                            (RM{{ number_format($opt->price, 2) }})
                                        @endif
                                    </label>
                                </div>
                            @endforeach
                        @else
                            @php $selectedLabel = $val ? 'Open' : ''; @endphp
                        
                        @endif

                        {{-- Show selected label in readonly input --}}
                        @if($selectedLabel)
                            <input type="text" class="form-control " readonly value="{{ $selectedLabel }}">
                        @endif
                        @break


                    @case('image')
                        @if($val)
                            <img src="{{ asset('storage/' . $val) }}" class="img-thumbnail w-100" alt="Uploaded Image">
                        @else
                            <p class="text-muted">No image uploaded</p>
                        @endif
                        @break

                @endswitch
            </div>
        @endforeach
    </div>
@endforeach
<form method="POST" action="{{ route('team.participants.store', $event->id) }}" enctype="multipart/form-data" id="participantForm">
    @csrf
    <input type="hidden" name="order_id" value="{{ $orderId }}">

    <div class="container mt-5">
        <h4>Add a Team Member</h4>

        <div class="row g-2 align-items-center border p-3 bg-light rounded mb-2">
            <div class="col-md-3">
                <label>Player’s Full Name</label>
                <input type="text" name="name" class="form-control" placeholder="Team Member Name" required>
            </div>
            <div class="col-md-3">
                <label>Passport / NRIC No</label>
                <input type="text" name="nric" class="form-control" placeholder="NRIC/Passport No" required>
            </div>
            <div class="col-md-2">
                <label>Date of Birth</label>
                <input type="date" name="dob" class="form-control" required>
            </div>
            <div class="col-md-3">
                <label>Photo</label>
                <input type="file" name="photo" class="form-control">
            </div>
        </div>

        <button type="submit" class="btn btn-success mt-2">Save Member</button>
    </div>
</form>

<div class="alert alert-success mt-3 d-none" id="successMessage">
    Participant added successfully!
</div>

<div class="container mt-5">
    <h3>Team Participants</h3>
    <table class="table table-bordered" id="participants-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>NRIC / Passport</th>
                <th>Date of Birth</th>
                <th>Photo</th>
                <th>Action</th>
                
            </tr>
        </thead>
    </table>
</div>

<div class="d-flex gap-2 my-3">
    <a href="{{ route('team.print.formA', ['order_id' => $orderId]) }}" target="_blank" class="btn btn-danger">
        Print Registration Form (Form A)
    </a>

    <a href="{{ route('team.print.formB', ['order_id' => $orderId]) }}" target="_blank" class="btn btn-secondary">
        Print Match Detail (Form B)
    </a>
</div>





</div>
<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <form method="POST" id="editForm">
        @csrf @method('PUT')
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Edit Participant</h5>
                <button type="button" class="btn-close" data-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <input type="hidden" name="id" id="edit-id">
                <div class="mb-3">
                    <label>Name</label>
                    <input type="text" name="name" id="edit-name" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label>NRIC</label>
                    <input type="text" name="nric" id="edit-nric" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label>DOB</label>
                    <input type="date" name="dob" id="edit-dob" class="form-control" required>
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Update</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            </div>
        </div>
    </form>
  </div>
</div>
<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <form method="POST" id="deleteForm">
        @csrf @method('DELETE')
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Confirm Delete</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                Are you sure you want to delete this participant?
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-danger">Yes, Delete</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
        </div>
    </form>
  </div>
</div>

</section>


@push('scripts')
<script>
document.getElementById('participantForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const form = this;
    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('input[name=_token]').value
        },
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            form.reset();
            document.getElementById('successMessage').classList.remove('d-none');
            $('#participants-table').DataTable().ajax.reload(); // ⬅️ reload table
            setTimeout(() => {
                document.getElementById('successMessage').classList.add('d-none');
            }, 3000);
        }
    });
});
</script>

<script>
$(function () {
    let eventId = '{{ $event->id }}';
    let orderId = '{{ $orderId }}';

    $('#participants-table').DataTable({
        processing: true,
        serverSide: true,
        ajax: {
            url: `/team/participants/${eventId}/table`,
            data: {
                order_id: orderId
            }
        },
        columns: [
            { data: 'name', name: 'name' },
            { data: 'nric', name: 'nric' },
            { data: 'dob', name: 'dob' },
            { data: 'photo', name: 'photo', orderable: false, searchable: false },
             { data: 'action', name: 'action', orderable: false, searchable: false }
        ]
    });

    // Delete handler
    $(document).on('click', '.btn-delete', function () {
        const url = $(this).data('url');
        if (confirm("Are you sure you want to delete this participant?")) {
            $.ajax({
                url: url,
                type: 'DELETE',
                data: { _token: '{{ csrf_token() }}' },
                success: function (response) {
                    $('#participants-table').DataTable().ajax.reload();
                }
            });
        }
    });
});
</script>

<script>
$(document).ready(function () {
    // Edit button clicked
    $(document).on('click', '.btn-edit', function () {
        const id = $(this).data('id');
        const name = $(this).data('name');
        const nric = $(this).data('nric');
        const dob = $(this).data('dob');

        $('#edit-id').val(id);
        $('#edit-name').val(name);
        $('#edit-nric').val(nric);
        $('#edit-dob').val(dob);

        $('#editForm').attr('action', `/team/participants/${id}`);
    });

    // Handle Edit Form Submit
$('#editForm').on('submit', function (e) {
    e.preventDefault();

    const form = this;
    const formData = $(form).serialize();

    $.ajax({
        url: form.action,
        type: 'POST',
        data: formData,
        success: function (response) {
            if (response.success) {
                $('#editModal').modal('hide');
                $('#participants-table').DataTable().ajax.reload();
            }
        }
    });
});


    // Delete button clicked
    $(document).on('click', '.btn-delete', function () {
        const id = $(this).data('id');
        $('#deleteForm').attr('action', `/team/participants/${id}`);
    });
});
</script>


@endpush

@endsection
