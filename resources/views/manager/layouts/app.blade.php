<!DOCTYPE html>
<html lang="en">
@include('manager.partials.head') <!-- Move the <head> code here -->

<body class="skin-default-dark fixed-layout mini-sidebar">

    <!-- Preloader (optional) -->
    {{-- @include('manager.partials.preloader') --}}

    <!-- Main wrapper -->
    <div id="main-wrapper">

        <!-- Topbar -->
        @include('manager.partials.topbar')

        <!-- Sidebar -->
        @include('manager.partials.sidebar')

        <!-- Page Content -->
        
         
                @yield('content')
     

        <!-- Footer (optional) -->
        {{-- @include('manager.partials.footer') --}}

    </div>

    <!-- JavaScript Dependencies -->
   
   
    <script src="{{ asset('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('node_modules/toast-master/js/jquery.toast.js') }}"></script>
    <script src="{{ asset('node_modules/morrisjs/morris.min.js') }}"></script>
    <script src="{{ asset('dist/js/custom.min.js') }}"></script>
    <script src="{{ asset('node_modules/datatables/datatables.min.js') }}"></script>
    <script src="{{ asset('assets/sweetalert2/dist/sweetalert2.all.min.js') }}"></script>
    <script src="{{ asset('custom/js/custom_admin.php') }}"></script>
    <script src="{{ asset('assets/zxcvbn/zxcvbn.js') }}"></script>

    <!-- Extra Scripts -->
    @stack('scripts')
</body>
</html>
