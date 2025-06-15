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
        Schema::create('event_fees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->tinyInteger('type')->default(0); // 0=Free, 1=Fixed, 2=Category-based
            $table->decimal('amount', 8, 2)->nullable();
            $table->decimal('processing_fee', 8, 2)->nullable();
            $table->string('sponsored_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_fees');
    }
};
