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
        Schema::create('neighbourhoods', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('cod');
            $table->uuid('district_id');
            $table->foreign('district_id')->references('id')->on('districts');
            $table->timestamps();

            // Add a composite unique index on name and district_id
            $table->unique(['name', 'district_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('neighbourhoods');
    }
};
