<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Services\DiditClient;
use App\Services\KycService;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:30'],
        ]);

        $request->user()->update($data);

        return response()->json(['user' => new UserResource($request->user())]);
    }

    /**
     * Start a real identity verification session with Didit and return the
     * hosted URL the frontend should redirect the seller to.
     */
    public function startKyc(Request $request, DiditClient $didit)
    {
        $request->validate([
            'callback' => ['required', 'url'],
        ]);

        $user = $request->user();

        $session = $didit->createSession(
            vendorData: (string) $user->id,
            callbackUrl: $request->string('callback'),
        );

        $user->update(['kyc_session_id' => $session['session_id']]);

        return response()->json(['url' => $session['url']]);
    }

    /**
     * Called when the seller returns from the Didit hosted flow — fetch the
     * authoritative decision from Didit (never trust the redirect alone) and
     * move the seller's KYC status forward.
     */
    public function checkKyc(Request $request, KycService $kyc)
    {
        $user = $request->user();
        $status = $kyc->refreshFromDidit($user);

        return response()->json(['user' => new UserResource($user->fresh()), 'status' => $status]);
    }

    public function verifySubscription(Request $request)
    {
        $request->user()->update(['kyc_status' => 'verified']);

        return response()->json(['user' => new UserResource($request->user())]);
    }
}
