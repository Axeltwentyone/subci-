<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Arr;

class KycService
{
    public function __construct(private DiditClient $didit) {}

    /**
     * Fetch the authoritative decision for the user's current Didit session
     * and move their kyc_status forward accordingly. Returns the raw status
     * string reported by Didit.
     */
    public function refreshFromDidit(User $user): string
    {
        if (! $user->kyc_session_id) {
            return 'none';
        }

        $decision = $this->didit->getDecision($user->kyc_session_id);

        return $this->applyDecision($user, $decision);
    }

    /**
     * @param  array<string, mixed>  $decision
     */
    public function applyDecision(User $user, array $decision): string
    {
        $status = $decision['status'] ?? 'Not Started';

        if ($status === 'Approved') {
            $fullName = Arr::get($decision, 'id_verification.full_name')
                ?? Arr::get($decision, 'id_verifications.0.full_name');

            $user->update([
                'kyc_status' => 'checkingSub',
                'kyc_name' => $fullName ?: $user->name,
            ]);
        } elseif (in_array($status, ['Declined', 'Expired', 'Kyc Expired', 'Abandoned'], true)) {
            $user->update(['kyc_status' => 'none', 'kyc_session_id' => null]);
        }

        return $status;
    }
}
