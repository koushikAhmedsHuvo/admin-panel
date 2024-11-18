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
        Schema::table('educations', function (Blueprint $table) {
            //
            $table->dropColumn('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('educations', function (Blueprint $table) {
            //
            $table->unsignedBigInteger('user_id');

            // Optionally, add the foreign key constraint back
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }
};
