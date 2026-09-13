<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('memberships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('listing_id')->constrained()->cascadeOnDelete();
            $table->foreignId('buyer_id')->constrained('users')->cascadeOnDelete();
            $table->unsignedInteger('price'); // locked in at purchase time
            $table->string('status')->default('active'); // active|cancelled
            $table->string('payment_status')->default('ok'); // ok|failed
            $table->date('renews_at')->nullable();

            // access snapshot at time of purchase
            $table->string('access_type')->nullable();
            $table->text('access_link')->nullable();
            $table->string('access_email')->nullable();
            $table->string('access_password')->nullable();

            $table->unsignedTinyInteger('seller_rating')->nullable();
            $table->text('rating_comment')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('memberships');
    }
};
