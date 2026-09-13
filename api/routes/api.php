<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DiditWebhookController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\MembershipController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WithdrawalController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/webhooks/didit', DiditWebhookController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::get('/listings', [ListingController::class, 'index']);
    Route::get('/listings/mine', [ListingController::class, 'mine']);
    Route::post('/listings', [ListingController::class, 'store']);
    Route::get('/listings/{listing}', [ListingController::class, 'show']);
    Route::put('/listings/{listing}', [ListingController::class, 'update']);
    Route::delete('/listings/{listing}', [ListingController::class, 'destroy']);

    Route::get('/memberships/mine', [MembershipController::class, 'mine']);
    Route::post('/memberships', [MembershipController::class, 'store']);
    Route::post('/memberships/{membership}/rate', [MembershipController::class, 'rate']);
    Route::delete('/memberships/{membership}', [MembershipController::class, 'destroy']);

    Route::get('/withdrawals', [WithdrawalController::class, 'index']);
    Route::post('/withdrawals', [WithdrawalController::class, 'store']);

    Route::get('/notifications', [NotificationController::class, 'index']);

    Route::put('/profile', [ProfileController::class, 'update']);
    Route::post('/profile/kyc/start', [ProfileController::class, 'startKyc']);
    Route::post('/profile/kyc/check', [ProfileController::class, 'checkKyc']);
    Route::post('/profile/verify-subscription', [ProfileController::class, 'verifySubscription']);
});
