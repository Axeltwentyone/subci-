<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\KycService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DiditWebhookController extends Controller
{
    /**
     * Didit calls this when a session's status changes. We only trust the
     * signature-verified ping to know *which* session changed — the actual
     * decision is always re-fetched from Didit's API (see KycService),
     * never trusted from the webhook body itself.
     */
    public function __invoke(Request $request, KycService $kyc)
    {
        if (! $this->hasValidSignature($request)) {
            return response()->json(['message' => 'Invalid signature'], Response::HTTP_UNAUTHORIZED);
        }

        $vendorData = $request->input('vendor_data');
        $user = $vendorData ? User::find($vendorData) : null;

        if ($user && $user->kyc_session_id === $request->input('session_id')) {
            $kyc->refreshFromDidit($user);
        }

        return response()->json(['ok' => true]);
    }

    private function hasValidSignature(Request $request): bool
    {
        $secret = config('services.didit.webhook_secret');
        if (! $secret) {
            return false;
        }

        $signature = $request->header('X-Signature-Simple');
        $timestamp = $request->header('X-Timestamp');

        if (! $signature || ! $timestamp) {
            return false;
        }

        if (abs(time() - (int) $timestamp) > 300) {
            return false;
        }

        $payload = sprintf(
            '%s:%s:%s:%s',
            $timestamp,
            $request->input('session_id'),
            $request->input('status'),
            $request->input('webhook_type'),
        );

        $expected = hash_hmac('sha256', $payload, $secret);

        return hash_equals($expected, $signature);
    }
}
