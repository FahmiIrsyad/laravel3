<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sporteqa v2.0 Login</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Bootstrap 5 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

  <style>
    body {
      margin: 0;
      font-family: sans-serif;
      background: url('{{ asset('assets/image/sporteqa_bg_01.png') }}') no-repeat center center fixed;
      background-size: cover;
    }
    .login-box {
      background: #fff;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 0 15px rgba(0,0,0,0.2);
      max-width: 400px;
      width: 100%;
    }
    .login-box .logo {
      max-width: 200px;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>

  <div class="d-flex align-items-center justify-content-center vh-100">
    <div class="login-box text-center">
      <img src="{{ asset('assets/image/sporteqa-logo-text-003-300x60.png') }}" class="logo" alt="Sporteqa Logo">
      <h6 class="mb-4">Sporteqa v2.0</h6>

      <form method="POST" action="{{ route('manager.register.send') }}">
        @csrf

        <!-- Name -->
        <div class="input-group mb-3">
          <span class="input-group-text"><i class="fa fa-user-secret"></i></span>
          <input type="text" name="name" class="form-control" placeholder="Name" required>
        </div>

        <!-- Username -->
        <div class="input-group mb-3">
          <span class="input-group-text"><i class="fa fa-envelope"></i></span>
          <input type="text" name="email" id="email" class="form-control" placeholder="Email" required>
        </div>

        <!-- Password -->
        <div class="input-group mb-3">
          <span class="input-group-text"><i class="fa fa-lock"></i></span>
          <input type="password" name="password" id="password" class="form-control" placeholder="Password" required>
          <span class="input-group-text" style="cursor:pointer;" onclick="togglePassword()">
            <i id="show_pass_icon" class="fa fa-eye-slash"></i>
          </span>
        </div>

        <!-- Login Button -->
        <button type="submit" class="btn btn-primary w-100">
          <i class="fas fa-sign-in-alt"></i> Register
        </button>

      </form>
    </div>
  </div>

  <!-- JS for show/hide password -->
  <script>
    function togglePassword() {
      const input = document.getElementById('password');
      const icon = document.getElementById('show_pass_icon');
      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      } else {
        input.type = "password";
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      }
    }
  </script>

</body>
</html>
