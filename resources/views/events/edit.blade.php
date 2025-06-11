@extends('manager.layouts.app')
@section('content')
<h2>Edit Event</h2>
<form method="POST" action="{{ route('manager.events.update', $event) }}" enctype="multipart/form-data">
  @csrf @method('PUT')

  <div class="mb-3">
    <label>Current Image</label><br>
    <img src="{{ asset('storage/' . ltrim($event->image, '/')) }}" width="200" alt="Event Image">
  </div>

  <div class="mb-3">
    <label>Change Image (optional)</label>
    <input type="file" name="image" class="form-control">
  </div>

  <div class="mb-3">
    <label>Title</label>
    <input type="text" name="title" class="form-control" value="{{ $event->title }}" required>
  </div>

  <div class="mb-3">
    <label>Description</label>
    <textarea name="description" class="form-control" required>{{ $event->description }}</textarea>
  </div>

  <div class="mb-3">
    <label>Start Date</label>
    <input type="date" name="start_date" class="form-control" value="{{ $event->start_date }}" required>
  </div>

  <div class="mb-3">
    <label>End Date</label>
    <input type="date" name="end_date" class="form-control" value="{{ $event->end_date }}" required>
  </div>

  <div class="mb-3">
    <label>Registration Closing Date</label>
    <input type="date" name="registration_closing_date" class="form-control" value="{{ $event->registration_closing_date }}" required>
  </div>

  <div class="mb-3">
    <label>Location</label>
    <input type="text" name="location" class="form-control" value="{{ $event->location }}" required>
  </div>

  <button type="submit" class="btn btn-primary">Update</button>
</form>
@endsection
