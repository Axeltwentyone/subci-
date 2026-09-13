<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'kycStatus' => $this->kyc_status,
            'kycName' => $this->kyc_name,
            'kycPhone' => $this->kyc_phone,
            'kycDocUploaded' => (bool) $this->kyc_doc_uploaded,
            'kycSessionPending' => $this->kyc_status === 'none' && $this->kyc_session_id !== null,
            'hostBalance' => $this->host_balance,
            'rating' => (float) $this->rating,
            'transactionsCount' => $this->transactions_count,
        ];
    }
}
