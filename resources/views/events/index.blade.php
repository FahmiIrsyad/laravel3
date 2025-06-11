@extends('manager.layouts.app')
@section('content')
<h2>All Events</h2>
<a href="{{ route('manager.events.create') }}" class="btn btn-success mb-3">Create Event</a>
<table class="table">
  <thead>
    <tr>
      <th>Title</th>
      <th>Date</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    @foreach($events as $event)
    <tr>
      <td>{{ $event->title }}</td>
      <td>{{ $event->date }}</td>
      <td>
        <a href="{{ route('manager.events.edit', $event) }}" class="btn btn-warning btn-sm">Edit</a>
        <form method="POST" action="{{ route('manager.events.destroy', $event) }}" style="display:inline-block">
          @csrf @method('DELETE')
          <button type="submit" class="btn btn-danger btn-sm">Delete</button>
        </form>
        <a href="{{ route('manager.event.form.builder', $event) }}" class="btn btn-info btn-sm">Build Form</a>

        <a href="{{ route('manager.form.show', $event->id) }}" class="btn btn-primary btn-sm" target="_blank">View Form</a>
      </td>
    </tr>
    @endforeach
  </tbody>
</table>
@endsection