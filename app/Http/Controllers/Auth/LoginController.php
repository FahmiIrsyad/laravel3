<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class LoginController extends Controller
{
    public function showLoginForm()
    {
        return view('manager.login.index');
    }

    public function login(Request $request)
    {
        // $validator = Validator::make($request->all(), [
        //     'email' => 'required|email:rfc,dns|max:255',
        //     'password' => 'required|string|min:8|max:100',
        // ]);

        // if ($validator->fails()) {
        //     return back()->withErrors($validator)->withInput();
        // }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return back()->withErrors(['email' => 'Invalid credentials'])->withInput();
        }

        // Optional: check if email is verified
        // if (!is_null($user->email_verified_at) || config('auth.require_email_verification') !== true) {
            Auth::login($user, $request->filled('remember'));
            $request->session()->regenerate(); // prevent session fixation
            return redirect()->intended('manager/dashboard');
        // } else {
        //     return back()->withErrors(['email' => 'Please verify your email address.']);
        // }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken(); // prevent CSRF reuse
        return redirect('manager/login');
    }
}
