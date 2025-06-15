<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventFormSubmission extends Model
{
    protected $fillable = [
        'event_id',
        'order_id',
        'user_id',
        'event_form_field_id',
        'value',
    ];

    public function field()
    {
        return $this->belongsTo(EventFormField::class, 'event_form_field_id');
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function formField()
{
    return $this->belongsTo(EventFormField::class, 'event_form_field_id');
}

}


