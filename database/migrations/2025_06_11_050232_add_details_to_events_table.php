<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('events', function (Blueprint $table) {
            $table->string('image')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->date('registration_closing_date')->nullable();
            $table->string('location')->nullable();
        });
    }

    public function down(): void {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn(['image', 'start_date', 'end_date', 'registration_closing_date', 'location']);
        });
    }
};

