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
        Schema::create('educations', function (Blueprint $table) {
            $table->id();  // Primary key
            $table->foreignId('user_id')->constrained()->onDelete('cascade');  // Foreign key to users table
            $table->string('degree');  // Degree field
            $table->string('institution');  // Institution field
            $table->text('description');  // Description of the education
            $table->string('date');  // Date field
            $table->timestamps();  // Timestamps (created_at, updated_at)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('educations');
    }
};
