@php
$current_url = url()->full();
@endphp

<nav class="navbar navbar-dark navbar-expand-lg fixed-top clean-navbar" style="background-color:rgb(0,0,0);">
    <div class="container">
        <a class="navbar-brand logo" href="#">
            <img src="/events/assets/images/sporteqa-logo-text-on-black-bg-03x-616x135.png" title="" class="img-responsive" style="height: 2.5rem;">
        </a>
        <button class="navbar-toggler" data-toggle="collapse" data-target="#navcol-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navcol-1">
            <ul class="nav navbar-nav ml-auto">
                <li class="nav-item" style="padding-right:8px;">
                    <a class="nav-link active" href="{{ url('/') }}">Home</a>
                </li>

                <li class="dropdown">
                    <a class="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false" href="#">BROWSE EVENTS</a>
                    <div class="dropdown-menu" role="menu" style="font-size:0.8rem; background-color:rgb(52,58,64); color:#ffffff;">
                        <a class="dropdown-item" href="https://sporteqa.com/v1/Running.html" style="color:#ffffff;">RUNNING</a>
                        <a class="dropdown-item" href="https://sporteqa.com/v1/Football.html" style="color:#ffffff;">FOOTBALL</a>
                        <a class="dropdown-item" href="https://sporteqa.com/v1/Hockey.html" style="color:#ffffff;">HOCKEY</a>
                        <a class="dropdown-item" href="https://sporteqa.com/v1/Rugby.html" style="color:#ffffff;">RUGBY</a>
                        <a class="dropdown-item" href="https://sporteqa.com/v1/Netball.html" style="color:#ffffff;">NETBALL</a>
                        <a class="dropdown-item" href="https://sporteqa.com/v1/MultiSports.html" style="color:#ffffff;">MULTI-SPORTS</a>
                    </div>
                </li>

                @auth
                    {{-- Profile picture + name --}}
                    <div class="nav-item text-white border border-right-0 border-top-0 border-bottom-0 pl-3 pt-2 mb-2">
                        @if (Auth::user()->profile_picture ?? false)
                            <img src="{{ Auth::user()->profile_picture }}" width="30">
                        @endif
                        {{ Auth::user()->name }}
                    </div>

                    <li class="nav-item mb-2" style="padding-right:2px;">
                        <span id="login_span" class="badge badge-primary pt-1">
                            <a class="nav-link text-white" href="{{ route('team.dashboard') }}">
                                <i class="fas fa-user-astronaut"></i> My Account
                            </a>
                        </span>
                    </li>

                    <li class="nav-item mb-2" style="padding-right:2px;">
                        <span id="signup_span" class="badge badge-danger">
                            <form method="POST" action="{{ route('team.logout') }}">
                                @csrf
                                <button type="submit" class="nav-link btn btn-link text-white p-0">
                                    <i class="fas fa-sign-in-alt"></i> Logout
                                </button>
                            </form>
                        </span>
                    </li>
                @else
                    <li class="nav-item" style="padding-right:0;">
                        <span id="login_span" class="badge badge-warning pt-1">
                            <a class="nav-link text-dark" href="{{ route('team.login', ['redirect' => $current_url]) }}">Login</a>
                        </span>
                    </li>

                    <li class="nav-item" style="padding-right:0;">
                        <span id="signup_span">
                            <a class="nav-link" href="{{ route('team.register') }}">Sign Up</a>
                        </span>
                    </li>
                @endauth
            </ul>
        </div>
    </div>
</nav>
