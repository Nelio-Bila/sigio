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
        Schema::create('stock_movements', function (Blueprint $table) {
            $table->id();
            $table->uuid('material_id');
            $table->date('date')->comment('Data do movimento');
            $table->enum('movement', ['in', 'out'])->default('out')->comment('Movimento');
            $table->string('document_type')->nullable()->comment('Tipo de documento');
            $table->string('document_number')->nullable()->comment('Número do documento');
            $table->integer('quantity_in')->default(0)->comment('Quantidade de itens entrada');
            $table->decimal('unit_value_in', 10, 2)->nullable()->comment('Valor unitário dos itens entrada');
            $table->decimal('total_value_in', 10, 2)->nullable()->comment('Valor total dos itens entrada');
            $table->integer('quantity_out')->default(0)->comment('Quantidade de itens saída');
            $table->decimal('unit_value_out', 10, 2)->nullable()->comment('Valor unitário dos itens saída');
            $table->decimal('total_value_out', 10, 2)->nullable()->comment('Valor total dos itens saída');
            $table->integer('current_stock')->comment('EXISTÊNCIA');
            $table->decimal('current_unit_value', 10, 2)->nullable()->comment('Valor unitário atual');
            $table->decimal('current_total_value', 10, 2)->nullable()->comment('Valor total atual');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('material_id')->references('id')->on('materials')->onUpdate('cascade')
                ->onDelete('cascade')
                ->comment('Relacionado ao material');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_movements');
    }
};
