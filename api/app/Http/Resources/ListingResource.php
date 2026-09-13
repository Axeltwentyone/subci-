<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ListingResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $this->resource->loadMissing('host');

        return [
            'id' => (string) $this->id,
            'service' => $this->service,
            'plan' => $this->plan,
            'price' => $this->price,
            'seatsLeft' => $this->seatsLeft(),
            'totalSeats' => $this->seats,
            'seller' => $this->host->name,
            'verified' => $this->host->kyc_status === 'verified',
            'rating' => (float) $this->host->rating,
            'sales' => $this->host->transactions_count,
            'color' => $this->color,
            'accessType' => $this->access_type,
            'accessLink' => $this->access_type === 'link' ? $this->access_link : null,
            'accessEmail' => $this->access_type === 'credentials' ? $this->access_email : null,
            'accessPassword' => $this->access_type === 'credentials' ? $this->access_password : null,
            'desc' => $this->description,
            'reviews' => $this->memberships()
                ->whereNotNull('seller_rating')
                ->with('buyer:id,name')
                ->latest()
                ->limit(10)
                ->get()
                ->map(fn ($m) => [
                    'author' => $m->buyer->name,
                    'stars' => $m->seller_rating,
                    'text' => $m->rating_comment ?? '',
                ])->values(),
        ];
    }
}
