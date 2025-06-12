@extends('manager.layouts.app')
@section('content')

<div class="page-wrapper">
    <div class="container-fluid">

        <!-- Page Title & Breadcrumb -->
        <div class="row page-titles">
            <div class="col-md-5 align-self-center">
                <h4 class="text-themecolor">Create Event</h4>
            </div>
            <div class="col-md-7 align-self-center text-end">
                <div class="d-flex justify-content-end align-items-center">
                    <ol class="breadcrumb justify-content-end">
                        <li class="breadcrumb-item"><a href="{{ route('manager.dashboard') }}">Home</a></li>
                        <li class="breadcrumb-item"><a href="{{ route('manager.events.index') }}">Event List</a></li>
                        <li class="breadcrumb-item active">Create Event</li>
                    </ol>
                </div>
            </div>
        </div>

        <!-- Form Card -->
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
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
                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <label>Start Date</label>
                                    <input type="date" name="start_date" class="form-control" required>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label>End Date</label>
                                    <input type="date" name="end_date" class="form-control" required>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label>Registration Closing Date</label>
                                    <input type="date" name="registration_closing_date" class="form-control" required>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label>Location</label>
                                <input type="text" name="location" class="form-control" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Save</button>
                            <a href="{{ route('manager.events.index') }}" class="btn btn-secondary">Cancel</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

@endsection
