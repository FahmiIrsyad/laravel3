@extends('manager.layouts.app')
@section('content')
<h2>Create Event</h2>
<form method="POST" action="{{ route('manager.events.store') }}" enctype="multipart/form-data">
  @csrf
  <div class="mb-3">
    <label>Event Image</label>
    <input type="file" name="image" class="form-control" required>
  </div>
  <div class="mb-3">
    <label>Title</label>
    <input type="text" name="title" class="form-control" required>
  </div>
  <div class="mb-3">
    <label>Description</label>
    <textarea name="description" class="form-control" required></textarea>
  </div>
  <div class="mb-3">
    <label>Start Date</label>
    <input type="date" name="start_date" class="form-control" required>
  </div>
  <div class="mb-3">
    <label>End Date</label>
    <input type="date" name="end_date" class="form-control" required>
  </div>
  <div class="mb-3">
    <label>Registration Closing Date</label>
    <input type="date" name="registration_closing_date" class="form-control" required>
  </div>
  <div class="mb-3">
    <label>Location</label>
    <input type="text" name="location" class="form-control" required>
  </div>
  <button type="submit" class="btn btn-primary">Save</button>
</form>
@endsection