<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('events', function (Blueprint $table) {
            $table->tinyInteger('status')->default(1)->comment('1 = open, 2 = opening soon, 3 = completed, 4 = closed');
            $table->string('type')->nullable()->comment('Event type, e.g. running, football, etc');
        });
    }

    public function down()
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn('status');
            $table->dropColumn('type');
        });
    }

};
