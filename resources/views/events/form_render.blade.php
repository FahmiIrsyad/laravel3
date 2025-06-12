@extends('manager.layouts.app')

@section('content')
<div class="page-wrapper">
    <div class="container-fluid">

        <!-- Page Title & Breadcrumb -->
        <div class="row page-titles">
            <div class="col-md-5 align-self-center">
                <h4 class="text-themecolor">Register for: {{ $event->title }}</h4>
            </div>
            <div class="col-md-7 align-self-center text-end">
                <div class="d-flex justify-content-end align-items-center">
                    <ol class="breadcrumb justify-content-end">
                        <li class="breadcrumb-item"><a href="{{ route('manager.dashboard') }}">Home</a></li>
                        <li class="breadcrumb-item"><a href="{{ route('manager.events.index') }}">Event List</a></li>
                        <li class="breadcrumb-item active">Register</li>
                    </ol>
                </div>
            </div>
        </div>

        <!-- Form Card -->
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">

                        <form method="POST" action="{{ route('manager.form.submit', $event->id) }}">
                            @csrf

                            @php
                                $fields = json_decode($event->form->form_json ?? '[]', true);
                            @endphp

                            @forelse ($fields as $field)
                                <div class="mb-3">
                                    <label class="form-label">{{ $field['label'] }} @if($field['required'])<span class="text-danger">*</span>@endif</label>

                                    @if($field['type'] === 'text')
                                        <input type="text" name="fields[{{ $field['label'] }}]" class="form-control" {{ $field['required'] ? 'required' : '' }}>

                                    @elseif($field['type'] === 'textarea')
                                        <textarea name="fields[{{ $field['label'] }}]" class="form-control" {{ $field['required'] ? 'required' : '' }}></textarea>

                                    @elseif($field['type'] === 'dropdown')
                                        <select name="fields[{{ $field['label'] }}]" class="form-select" {{ $field['required'] ? 'required' : '' }}>
                                            <option value="">-- Select --</option>
                                            @foreach($field['options'] as $option)
                                                <option value="{{ $option }}">{{ $option }}</option>
                                            @endforeach
                                        </select>

                                    @elseif($field['type'] === 'checkbox')
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" name="fields[{{ $field['label'] }}]" value="1" id="check_{{ $loop->index }}">
                                            <label class="form-check-label" for="check_{{ $loop->index }}">
                                                {{ $field['label'] }}
                                            </label>
                                        </div>
                                    @endif
                                </div>
                            @empty
                                <p class="text-muted">No form fields available for this event.</p>
                            @endforelse

                            <button type="submit" class="btn btn-primary">Submit</button>
                            <a href="{{ route('manager.events.index') }}" class="btn btn-secondary">Cancel</a>
                        </form>

                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
@endsection
