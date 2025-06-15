@extends('team.layouts.app') {{-- Use your layout --}}

@section('head')
    <script src="{{ asset('plugins/password-strength-meter/password-score.js') }}"></script>
    <script src="{{ asset('plugins/password-strength-meter/password-score-options.js') }}"></script>
    <script src="{{ asset('plugins/password-strength-meter/bootstrap-strength-meter.js') }}"></script>
@endsection

@section('content')
<div style="margin-top:100px"></div>

<section class="mt-5 mb-5">
    <div class="container">

        <span class="float-right">Get Details From
            <button id="fb_button" class="btn btn-primary" onclick="sign_up_fb()">
                <i class="fab fa-facebook"></i> Facebook
            </button>
            or
            <button id="customBtn" class="btn btn-success">
                <i class="fab fa-google"></i> Google
            </button>
        </span>

        <h1>Sign Up</h1>

        <form method="POST" action="{{ route('team.register') }}" class="was-validated">
            @csrf

            <div class="row">
                <div class="col-md-6 col-xs-12">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" name="name" value="{{ old('name') }}" required>
                        @error('name') <div class="text-danger">{{ $message }}</div> @enderror
                    </div>

                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-control" name="email" value="{{ old('email') }}" required>
                        @error('email') <div class="text-danger">{{ $message }}</div> @enderror
                    </div>
                </div>

                <div class="col-md-6 col-xs-12">
                    <div class="form-group">
                        <label>Mobile No</label>
                        <input type="text" class="form-control" name="mobile" value="{{ old('mobile') }}">
                        @error('mobile') <div class="text-danger">{{ $message }}</div> @enderror
                    </div>

                    <div class="form-group">
                        <label>NRIC/Passport</label>
                        <input type="text" class="form-control" name="nric" value="{{ old('nric') }}">
                        @error('nric') <div class="text-danger">{{ $message }}</div> @enderror
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 col-xs-12">
                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" class="form-control" name="username" value="{{ old('username') }}" required>
                        @error('username') <div class="text-danger">{{ $message }}</div> @enderror
                    </div>
                </div>

                <div class="col-md-6 col-xs-12">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Password</label>
                                <input class="form-control" name="password" id="pwd" type="password" required>
                                @error('password') <div class="text-danger">{{ $message }}</div> @enderror
                            </div>
                            <div class="form-group">
                                <div id="password-strength-meter-1"></div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Reenter Password</label>
                                <input class="form-control" name="password_confirmation" type="password" required>
                            </div>
                            <div class="form-group">
                                <div id="password-strength-meter-2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <button type="submit" class="btn btn-primary">Sign Up</button>
                <span class="float-right" id="sign_up_result"></span>
            </div>

            {{-- Optional hidden fields --}}
            <input type="hidden" name="token" value="{{ md5(time()) }}">
            <input type="hidden" name="spq_user_fb_id" id="spq_user_fb_id">
            <input type="hidden" name="spq_user_picture" id="spq_user_picture">
            <input type="hidden" name="spq_user_google_id" id="spq_user_google_id">
        </form>
    </div>
</section>
@endsection
