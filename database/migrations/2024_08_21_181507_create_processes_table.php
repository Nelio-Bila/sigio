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
        Schema::create('processes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->uuid('address_id');
            $table->foreign('address_id')->references('id')->on('adresses');
            $table->uuid('identification_id');
            $table->foreign('identification_id')->references('id')->on('identifications');
            $table->string('marital_state')->nullable();
            $table->string('genre');
            $table->string('race');
            $table->string('profession')->nullable();
            $table->string('workplace')->nullable();
            $table->string('naturality');
            $table->string('phone_number');
            $table->string('father_name');
            $table->string('mother_name');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('processes');
    }
};
