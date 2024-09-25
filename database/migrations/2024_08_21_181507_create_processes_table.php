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
            $table->bigInteger('nid')->unsigned()->unique();
            $table->uuid('user_id');
            $table->uuid('address_id');
            $table->uuid('identification_id');
            $table->uuid('oc_id');
            $table->enum('marital_state', ['single', 'married', 'divorced', 'widowed'])->nullable();
            $table->string('name')->index();
            $table->date('date_of_birth');
            $table->enum('genre', ['male', 'female', 'other']);
            $table->enum('race', ['black', 'white', 'mixed', 'asian', 'other']);
            $table->string('profession')->nullable();
            $table->string('workplace')->nullable();
            $table->string('naturality')->index();
            $table->string('phone_number');
            $table->string('father_name')->index();
            $table->string('mother_name')->index();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('address_id')->references('id')->on('addresses');
            $table->foreign('identification_id')->references('id')->on('identifications');
            $table->foreign('oc_id')->references('id')->on('orthopedic_centers');
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
