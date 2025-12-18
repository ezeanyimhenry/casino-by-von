<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('membership_tiers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->decimal('min_spent', 8, 2);
            $table->decimal('max_spent', 8, 2);
            $table->jsonb('benefits');
            $table->string('color')->nullable();
            $table->string('icon')->nullable();
            $table->integer('discount_percentage')->default(0);
            $table->boolean('priority_booking')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('membership_tiers');
    }
};