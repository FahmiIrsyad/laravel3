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
        Schema::table('event_form_submissions', function (Blueprint $table) {
            $table->string('order_id')->after('event_id');
        });
    }

    public function down(): void
    {
        Schema::table('event_form_submissions', function (Blueprint $table) {
            $table->dropColumn('order_id');
        });
    }

};
