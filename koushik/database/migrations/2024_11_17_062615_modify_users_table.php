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
        //
        Schema::table('users', function (Blueprint $table) {
            // Drop the unwanted columns
            $table->dropColumn(['firstname', 'lastname', 'phone', 'image']);
            
            // Add the password column again
            $table->string('password');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Revert the changes if rolled back
            $table->string('firstname');
            $table->string('lastname');
            $table->string('phone');
            $table->string('image')->nullable();
            
            // Drop the password column
            $table->dropColumn('password');
        });
    }
};
