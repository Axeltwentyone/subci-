<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PurchasedMembershipResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $this->resource->loadMissing('listing');

        return [
            'id' => (string) $this->id,
            'service' => $this->listing->service,
            'plan' => $this->listing->plan,
            'price' => $this->price,
            'color' => $this->listing->color,
            'status' => $this->status === 'active' ? 'Actif' : 'Annulé',
            'until' => $this->renews_at ? Carbon::parse($this->renews_at)->locale('fr')->isoFormat('D MMMM YYYY') : null,
            'accessType' => $this->access_type,
            'accessLink' => $this->access_type === 'link' ? $this->access_link : null,
            'accessEmail' => $this->access_type === 'credentials' ? $this->access_email : null,
            'accessPassword' => $this->access_type === 'credentials' ? $this->access_password : null,
            'sellerRating' => $this->seller_rating,
        ];
    }
}
