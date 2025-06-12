@extends('manager.layouts.app')
@section('content')

<div class="page-wrapper">
    <div class="container-fluid">

        <!-- Page Title & Breadcrumb -->
        <div class="row page-titles">
            <div class="col-md-5 align-self-center">
                <h4 class="text-themecolor">Edit Event</h4>
            </div>
            <div class="col-md-7 align-self-center text-end">
                <div class="d-flex justify-content-end align-items-center">
                    <ol class="breadcrumb justify-content-end">
                        <li class="breadcrumb-item"><a href="{{ route('manager.dashboard') }}">Home</a></li>
                        <li class="breadcrumb-item"><a href="{{ route('manager.events.index') }}">Event List</a></li>
                        <li class="breadcrumb-item active">Edit Event</li>
                    </ol>
                </div>
            </div>
        </div>

        <!-- Form Card -->
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <form method="POST" action="{{ route('manager.events.update', $event) }}" enctype="multipart/form-data">
                            @csrf
                            @method('PUT')

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

                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <label>Start Date</label>
                                    <input type="date" name="start_date" class="form-control" value="{{ $event->start_date }}" required>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label>End Date</label>
                                    <input type="date" name="end_date" class="form-control" value="{{ $event->end_date }}" required>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label>Registration Closing Date</label>
                                    <input type="date" name="registration_closing_date" class="form-control" value="{{ $event->registration_closing_date }}" required>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Location</label>
                                <input type="text" name="location" class="form-control" value="{{ $event->location }}" required>
                            </div>

                            <button type="submit" class="btn btn-primary">Update</button>
                            <a href="{{ route('manager.events.index') }}" class="btn btn-secondary">Cancel</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

@endsection
