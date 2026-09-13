<?php

namespace App\Http\Controllers;

use App\Http\Resources\PurchasedMembershipResource;
use App\Models\Listing;
use App\Models\Membership;
use Illuminate\Http\Request;

class MembershipController extends Controller
{
    public function mine(Request $request)
    {
        $memberships = $request->user()->memberships()->with('listing')->latest()->get();

        return PurchasedMembershipResource::collection($memberships);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'listingId' => ['required', 'exists:listings,id'],
            'phoneNumber' => ['required', 'string'],
        ]);

        $listing = Listing::findOrFail($data['listingId']);

        if ($listing->host_id === $request->user()->id) {
            abort(422, 'Tu ne peux pas acheter ta propre place.');
        }

        if ($listing->seatsLeft() < 1) {
            abort(422, 'Plus de place disponible sur cette offre.');
        }

        $membership = $listing->memberships()->create([
            'buyer_id' => $request->user()->id,
            'price' => $listing->price,
            'status' => 'active',
            'payment_status' => 'ok',
            'renews_at' => now()->addMonth(),
            'access_type' => $listing->access_type,
            'access_link' => $listing->access_type === 'link' ? $listing->access_link : null,
            'access_email' => $listing->access_type === 'credentials' ? $listing->access_email : null,
            'access_password' => $listing->access_type === 'credentials' ? $listing->access_password : null,
        ]);

        $listing->host()->increment('host_balance', $listing->price);
        $listing->host()->increment('transactions_count');

        return new PurchasedMembershipResource($membership);
    }

    public function rate(Request $request, Membership $membership)
    {
        if ($membership->buyer_id !== $request->user()->id) {
            abort(403);
        }

        $data = $request->validate([
            'stars' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['nullable', 'string'],
        ]);

        $membership->update([
            'seller_rating' => $data['stars'],
            'rating_comment' => $data['comment'] ?? null,
        ]);

        $host = $membership->listing->host;
        $avg = $host->listings()
            ->join('memberships', 'memberships.listing_id', '=', 'listings.id')
            ->whereNotNull('memberships.seller_rating')
            ->avg('memberships.seller_rating');
        $host->update(['rating' => round($avg, 1)]);

        return new PurchasedMembershipResource($membership);
    }

    public function destroy(Request $request, Membership $membership)
    {
        if ($membership->buyer_id !== $request->user()->id) {
            abort(403);
        }

        $membership->delete();

        return response()->json(['ok' => true]);
    }
}
