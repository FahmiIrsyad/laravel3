<?php
function generate_random_pwd() {
    // Check if a password and timestamp are already set in the session
    if (isset($_SESSION['random_pwd']) && isset($_SESSION['pwd_generated_time'])) {
        $current_time = time();
        $time_elapsed = $current_time - $_SESSION['pwd_generated_time'];

        // Check if 60 seconds have passed since the password was last generated
        if ($time_elapsed < 60) {
            // Return the existing password
            return $_SESSION['random_pwd'];
        }
    }

    // Generate a new random password
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $random_pwd = '';
    for ($i = 0; $i < 8; $i++) {
        $random_pwd .= $characters[rand(0, strlen($characters) - 1)];
    }

    // Store the new password and current time in the session
    $_SESSION['random_pwd'] = $random_pwd;
    $_SESSION['pwd_generated_time'] = time();

    return $random_pwd;
}
?>