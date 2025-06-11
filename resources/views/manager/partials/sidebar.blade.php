<style>
    .active-link {
    color: #fb9678 !important;
}

.active-link i {
    color: #fb9678 !important;
}

</style>
<aside class="left-sidebar" style="background-color: #2b2b2b;">
    <div class="scroll-sidebar">
        <!-- User Profile -->
        <div class="user-profile">
            <div class="user-pro-body">
                <div>
                    <img src="{{ Auth::user()->avatar ?? asset('assets/default.png') }}" alt="user-img" class="img-circle">
                </div>
                <div class="dropdown">
                    <a href="#" class="dropdown-toggle u-dropdown link hide-menu" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style="color: #6c757d;">
                        {{ Auth::user()->name ?? 'User' }} <span class="caret"></span>
                    </a>
                    <div class="dropdown-menu animated flipInY">
                        <a href="#" class="dropdown-item"><i class="ti-user"></i> My Profile</a>
                        <a href="#" class="dropdown-item"><i class="ti-email"></i> Inbox</a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item"><i class="ti-settings"></i> Account Settings</a>
                        <div class="dropdown-divider"></div>
                        <a href="{{ route('manager.logout') }}" class="dropdown-item"
                           onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                            <i class="fas fa-power-off"></i> Logout
                        </a>
                        <form id="logout-form" action="{{ route('manager.logout') }}" method="POST" class="d-none">
                            @csrf
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sidebar navigation -->
        <nav class="sidebar-nav">
            <ul id="sidebarnav">
                <li class="nav-small-cap">--- MAIN MENU</li>
                <li>
                    <a class="waves-effect waves-dark {{ request()->is('manager/dashboard') ? 'active-link' : '' }}" href="{{ url('manager/dashboard') }}">
                        <i class="icon-speedometer"></i>
                        <span class="hide-menu">Dashboard</span>
                    </a>
                </li>

                <li class="nav-small-cap">--- EVENTS</li>
                <li>
                    <a class="has-arrow waves-effect waves-dark {{ request()->is('manager/events*') ? 'active-link' : '' }}" href="{{ url('manager/events') }}">
                        <i class="icon-people"></i><span class="hide-menu">Registration</span>
                    </a>
                    <ul class="collapse">
                        <li><a href="{{ route('manager.events.index') }}">Event List</a></li>
                        <li><a href="{{ route('manager.events.create') }}">Create Event</a></li>
                    </ul>
                </li>


                <li class="nav-small-cap">--- ADMINISTRATIVE</li>
                <li>
                    <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)">
                        <i class="icon-user"></i><span class="hide-menu">System Configuration</span>
                    </a>
                    <ul class="collapse">
                        <li><a href="#">Administrators</a></li>
                    </ul>
                </li>

                <li class="nav-small-cap">--- SUPPORT</li>
                <li>
                    <a class="waves-effect waves-dark" href="{{ route('manager.logout') }}"
                       onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                        <i class="icon-logout"></i><span class="hide-menu">Log Out</span>
                    </a>
                    <form id="logout-form" action="{{ route('manager.logout') }}" method="POST" class="d-none">
                        @csrf
                    </form>
                </li>
            </ul>
        </nav>
    </div>
</aside>
