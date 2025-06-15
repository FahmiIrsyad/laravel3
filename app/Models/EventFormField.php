<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EventFormField extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'type',
        'label',
        'input_id',
        'placeholder',
        'class',
        'popup_detail',
        'js_cmd',
        'js_event',
        'required',
        'inline',
        'checked',
        'orderby',
    ];

    protected $casts = [
        'required' => 'boolean',
        'inline' => 'boolean',
        'checked' => 'boolean',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function options()
    {
        return $this->hasMany(EventFormFieldOption::class, 'event_form_field_id');
    }
}
