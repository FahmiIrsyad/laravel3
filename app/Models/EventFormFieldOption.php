<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EventFormFieldOption extends Model
{
    use HasFactory;

    protected $fillable = [
        'form_field_id',
        'label',
        'value',
        'price',
        'checked',
        'orderby',
    ];

    protected $casts = [
        'checked' => 'boolean',
        'price' => 'float',
    ];

    public function formField()
    {
        return $this->belongsTo(EventFormField::class, 'event_form_field_id');
    }
}
