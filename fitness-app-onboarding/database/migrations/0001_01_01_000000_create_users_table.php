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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 255)->nullable();
            $table->string('last_name', 255)->nullable();
            $table->string('email', 255);
            $table->string('dial_code', 10)->nullable();
            $table->string('country_code', 5)->nullable();
            $table->string('mobile', 20)->nullable();
            $table->string('password', 255)->nullable();
            $table->string('last_visited_tab', 10)->nullable();
            $table->string('otp', 10)->nullable();
            $table->enum('gender', ['MALE', 'FEMALE', 'OTHER'])->nullable();
            $table->integer('birth_year')->nullable();
            $table->integer('daily_workout_time')->nullable();
            $table->string('city', 255)->nullable();
            $table->string('preferred_language', 255)->nullable();
            $table->integer('weight')->nullable();
            $table->double('height', 5, 1)->nullable();
            $table->boolean('is_fat_loss')->default(0);
            $table->boolean('is_gain_muscles')->default(0);
            $table->boolean('is_stay_fit')->default(0);
            $table->boolean('is_yoga')->default(0);
            $table->enum('exp_level', ['BIGINNER', 'INTERMIDIATE', 'ADVANCE'])->default('BIGINNER');
            $table->enum('status', ['ACTIVE', 'INACTIVE', 'PENDING'])->default('ACTIVE');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
