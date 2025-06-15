@extends('team.layouts.app') {{-- Adjust if your layout is different --}}

@section('head')
    <script src="{{ asset('plugins/password-strength-meter/password-score.js') }}"></script>
    <script src="{{ asset('plugins/password-strength-meter/password-score-options.js') }}"></script>
    <script src="{{ asset('plugins/password-strength-meter/bootstrap-strength-meter.js') }}"></script>
@endsection

@section('content')
<div style="margin-top:100px"></div>

<section class="mt-5 mb-5">
    <div class="container">
        <h1>Login</h1>

        <form method="POST" action="{{ route('team.login') }}" class="was-validated">
            @csrf

            <div class="row">
                <div class="col-md-6 col-xs-12">
                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" class="form-control" name="name" value="{{ old('username') }}" required>
                        @error('username') <div class="text-danger">{{ $message }}</div> @enderror
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input class="form-control" name="password" id="pwd" type="password" required>
                        @error('password') <div class="text-danger">{{ $message }}</div> @enderror
                    </div>

                    <div class="form-group">
                        <div id="password-strength-meter-1"></div>
                    </div>
                </div>
            </div>

            <div>
                <button type="submit" class="btn btn-primary">Login</button>
            </div>
        </form>
    </div>
</section>
@endsection
