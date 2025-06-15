<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Team extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'name', 'mobile', 'email', 'nric', 'username', 'password'
    ];

    protected $hidden = [
        'password',
    ];
}
