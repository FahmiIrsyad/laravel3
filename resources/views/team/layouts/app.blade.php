<!DOCTYPE html>
<html lang="en">
@include('team.partials.header') {{-- Head section from partial --}}
<body>

    {{-- Navbar --}}
    @include('team.partials.navbar')

    {{-- Main content --}}
    <main class="py-4">
        @yield('content')
    </main>

    {{-- Footer (optional) --}}
    @includeIf('team.partials.footer')

    {{-- jQuery + Bootstrap JS --}}
   
    {{-- Optional password strength meter or other plugin --}}
   @stack('scripts')

</body>
</html>
