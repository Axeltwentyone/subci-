<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable()->after('email');
            $table->string('kyc_status')->default('none')->after('phone'); // none|checkingSub|verified
            $table->string('kyc_name')->nullable()->after('kyc_status');
            $table->string('kyc_phone')->nullable()->after('kyc_name');
            $table->boolean('kyc_doc_uploaded')->default(false)->after('kyc_phone');
            $table->unsignedInteger('host_balance')->default(0)->after('kyc_doc_uploaded');
            $table->decimal('rating', 2, 1)->default(5.0)->after('host_balance');
            $table->unsignedInteger('transactions_count')->default(0)->after('rating');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'phone', 'kyc_status', 'kyc_name', 'kyc_phone',
                'kyc_doc_uploaded', 'host_balance', 'rating', 'transactions_count',
            ]);
        });
    }
};
