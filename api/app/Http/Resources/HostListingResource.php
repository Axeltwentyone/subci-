<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HostListingResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $members = $this->activeMemberships()->with('buyer:id,name')->get();

        return [
            'id' => (string) $this->id,
            'service' => $this->service,
            'plan' => $this->plan,
            'price' => $this->price,
            'color' => $this->color,
            'ventes' => $members->count(),
            'status' => $this->status === 'active' ? 'Active' : 'Inactive',
            'seats' => $this->seats,
            'accessType' => $this->access_type,
            'accessLink' => $this->access_type === 'link' ? $this->access_link : null,
            'accessEmail' => $this->access_type === 'credentials' ? $this->access_email : null,
            'accessPassword' => $this->access_type === 'credentials' ? $this->access_password : null,
            'members' => $members->map(fn ($m) => [
                'name' => $m->buyer->name,
                'renewal' => $m->renews_at ? Carbon::parse($m->renews_at)->locale('fr')->isoFormat('D MMMM YYYY') : null,
                'paymentStatus' => $m->payment_status,
            ])->values(),
        ];
    }
}
