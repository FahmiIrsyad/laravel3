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
        Schema::create('event_form_field_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_form_field_id')->constrained('event_form_fields')->onDelete('cascade');
            $table->string('name'); // HTML name
            $table->string('value');
            $table->string('label');
            $table->decimal('price', 8, 2)->default(0.00); // used in radio_price
            $table->integer('order')->default(0);
            $table->boolean('checked')->default(false);
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_form_field_options');
    }
};
