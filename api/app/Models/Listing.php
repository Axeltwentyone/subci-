<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['host_id', 'service', 'plan', 'price', 'seats', 'color', 'access_type', 'access_link', 'access_email', 'access_password', 'description', 'status'])]
class Listing extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'access_link' => 'encrypted',
            'access_email' => 'encrypted',
            'access_password' => 'encrypted',
        ];
    }

    public function host(): BelongsTo
    {
        return $this->belongsTo(User::class, 'host_id');
    }

    public function memberships(): HasMany
    {
        return $this->hasMany(Membership::class);
    }

    public function activeMemberships(): HasMany
    {
        return $this->memberships()->where('status', 'active');
    }

    public function seatsLeft(): int
    {
        return max(0, $this->seats - $this->activeMemberships()->count());
    }
}
