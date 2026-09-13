<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('listings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('host_id')->constrained('users')->cascadeOnDelete();
            $table->string('service');
            $table->string('plan');
            $table->unsignedInteger('price'); // FCFA / month
            $table->unsignedInteger('seats');
            $table->string('color');
            $table->string('access_type'); // link|credentials
            $table->text('access_link')->nullable();
            $table->string('access_email')->nullable();
            $table->string('access_password')->nullable();
            $table->text('description')->nullable();
            $table->string('status')->default('active'); // active|inactive
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('listings');
    }
};
