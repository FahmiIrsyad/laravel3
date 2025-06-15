<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event_form_fields', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->string('label');
            $table->string('input_id'); // for HTML id/name
            $table->enum('type', ['text', 'radio', 'checkbox', 'select', 'radio_price', 'radio_qty', 'datepicker', 'image', 'list_country', 'list_state']);
            $table->string('placeholder')->nullable();
            $table->string('class')->nullable();
            $table->boolean('required')->default(false);
            $table->boolean('inline')->default(false); // layout style
            $table->boolean('checked')->default(false);
            $table->string('popup_detail')->nullable(); // size guide URL
            $table->text('js_cmd')->nullable();         // e.g., update_fee()
            $table->string('js_event')->nullable();     // e.g., onchange
            $table->text('default_value')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_form_fields');
    }
};
