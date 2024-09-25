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
        Schema::create('materials', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('designation')->comment('DESIGNAÇÃO DO BEM OU PRODUTO');
            $table->string('unit_of_measure')->nullable()->comment('Unidade de Medida');
            $table->string('code')->nullable();
            $table->string('brand_manufacturer')->nullable()->comment('Marca / Fabricante');
            $table->string('cabinet')->nullable()->comment('Armário');
            $table->string('shelf')->nullable()->comment('Estante');
            $table->string('rack')->nullable()->comment('Prateleira');
            $table->integer('average_monthly_consumption')->nullable()->comment('Consumo Mensal Médio');
            $table->integer('reorder_point')->nullable()->comment('Ponto de Encomenda');
            $table->integer('maximum_stock')->nullable()->comment('Stock Máximo');
            $table->integer('minimum_stock')->nullable()->comment('Stock Mínimo');
            $table->integer('current_stock')->comment('Stock actual');
            $table->uuid('warehouse_id');
            $table->uuid('user_id');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('warehouse_id')->references('id')->on('warehouses')->onUpdate('cascade')
                ->onDelete('cascade')
                ->comment('Armazém onde encontra-se');
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')
                ->onDelete('cascade')
                ->comment('Registrador');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('materials');
    }
};
