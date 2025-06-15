<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model {
    protected $fillable = ['title', 'description', 'start_date', 'end_date', 'registration_closing_date', 'location', 'image'];
    public function form() {
        return $this->hasOne(EventForm::class);
    }

    public function event_statements()
    {
        return $this->hasMany(EventStatement::class);
    }

    public function eventFee()
    {
        return $this->hasOne(EventFee::class);
    }

    public function formFields()
{
    return $this->hasMany(EventFormField::class);
}




}
