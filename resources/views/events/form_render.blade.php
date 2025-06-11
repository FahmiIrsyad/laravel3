@extends('manager.layouts.app') {{-- Or your preferred layout --}}

@section('content')
<div class="container mt-5">
  <h2>Register for: {{ $event->title }}</h2>

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
  </form>
</div>
@endsection
