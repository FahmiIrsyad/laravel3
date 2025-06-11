<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>@yield('title', 'Sporteqa')</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap + FontAwesome -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link rel="stylesheet" href="{{ asset('assets/icons/themify-icons/themify-icons.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/icons/themify-icons/themify.ttf') }}">
    <link rel="stylesheet" href="{{ asset('assets/icons/themify-icons/themify.woff') }}">
    <link rel="stylesheet" href="{{ asset('assets/icons/themify-icons/fonts/themify.woff') }}">
    <link rel="stylesheet" href="{{ asset('assets/icons/themify-icons/fonts/themify.ttf') }}">

    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body>

    <div class="d-flex">

        <button id="toggleSidebar" style="background: none; border: none; color: black; font-size: 24px; margin: 10px; position: absolute; z-index: 1000;">
            <i class="fas fa-bars"></i>
        </button>
        <!-- Sidebar (Fixed Width) -->
        <aside class="sidebar">
            @include('manager.partials.sidebar')
        </aside>

        <!-- Main Content (Flexible) -->
        <main class="flex-grow-1 p-5" style="margin-left: 250px;">
            @yield('content')
        </main>
    </div>

    <!-- JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        document.getElementById('toggleSidebar').addEventListener('click', function () {
            const sidebar = document.querySelector('.left-sidebar');
            const hideMenus = document.querySelectorAll('.left-sidebar .hide-menu');
            const main = document.querySelector('main');

            sidebar.classList.toggle('collapsed');

            if (sidebar.classList.contains('collapsed')) {
                main.style.marginLeft = '70px';
                hideMenus.forEach(el => el.style.display = 'none');
            } else {
                main.style.marginLeft = '250px';
                hideMenus.forEach(el => el.style.display = '');
            }
        });
    </script>



</body>
</html>
