<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WithdrawalResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'amount' => $this->amount,
            'date' => $this->created_at->locale('fr')->isoFormat('D MMMM YYYY'),
        ];
    }
}
