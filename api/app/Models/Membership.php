<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['listing_id', 'buyer_id', 'price', 'status', 'payment_status', 'renews_at', 'access_type', 'access_link', 'access_email', 'access_password', 'seller_rating', 'rating_comment'])]
class Membership extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'renews_at' => 'date',
            'access_link' => 'encrypted',
            'access_email' => 'encrypted',
            'access_password' => 'encrypted',
        ];
    }

    public function listing(): BelongsTo
    {
        return $this->belongsTo(Listing::class);
    }

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }
}
