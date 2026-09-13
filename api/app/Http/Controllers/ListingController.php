<?php

namespace App\Http\Controllers;

use App\Http\Resources\HostListingResource;
use App\Http\Resources\ListingResource;
use App\Models\Listing;
use Illuminate\Http\Request;

class ListingController extends Controller
{
    public function index(Request $request)
    {
        $listings = Listing::query()
            ->where('status', 'active')
            ->where('host_id', '!=', $request->user()->id)
            ->with('host')
            ->get()
            ->filter(fn (Listing $listing) => $listing->seatsLeft() > 0)
            ->values();

        return ListingResource::collection($listings);
    }

    public function mine(Request $request)
    {
        $listings = $request->user()->listings()->with('host')->latest()->get();

        return HostListingResource::collection($listings);
    }

    public function show(Request $request, Listing $listing)
    {
        return new ListingResource($listing);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'service' => ['required', 'string', 'max:255'],
            'plan' => ['required', 'string', 'max:255'],
            'price' => ['required', 'integer', 'min:1'],
            'seats' => ['required', 'integer', 'min:1'],
            'accessType' => ['required', 'in:link,credentials'],
            'accessLink' => ['required_if:accessType,link', 'nullable', 'string'],
            'accessEmail' => ['required_if:accessType,credentials', 'nullable', 'string'],
            'accessPassword' => ['required_if:accessType,credentials', 'nullable', 'string'],
            'description' => ['nullable', 'string'],
        ]);

        $listing = $request->user()->listings()->create([
            'service' => $data['service'],
            'plan' => $data['plan'],
            'price' => $data['price'],
            'seats' => $data['seats'],
            'color' => $this->colorFor($data['service']),
            'access_type' => $data['accessType'],
            'access_link' => $data['accessLink'] ?? null,
            'access_email' => $data['accessEmail'] ?? null,
            'access_password' => $data['accessPassword'] ?? null,
            'description' => $data['description'] ?? null,
            'status' => 'active',
        ]);

        return new HostListingResource($listing);
    }

    public function update(Request $request, Listing $listing)
    {
        if ($listing->host_id !== $request->user()->id) {
            abort(403);
        }

        $data = $request->validate([
            'service' => ['required', 'string', 'max:255'],
            'plan' => ['required', 'string', 'max:255'],
            'price' => ['required', 'integer', 'min:1'],
            'seats' => ['required', 'integer', 'min:1'],
            'accessType' => ['required', 'in:link,credentials'],
            'accessLink' => ['required_if:accessType,link', 'nullable', 'string'],
            'accessEmail' => ['required_if:accessType,credentials', 'nullable', 'string'],
            'accessPassword' => ['required_if:accessType,credentials', 'nullable', 'string'],
            'description' => ['nullable', 'string'],
        ]);

        $listing->update([
            'service' => $data['service'],
            'plan' => $data['plan'],
            'price' => $data['price'],
            'seats' => $data['seats'],
            'access_type' => $data['accessType'],
            'access_link' => $data['accessLink'] ?? null,
            'access_email' => $data['accessEmail'] ?? null,
            'access_password' => $data['accessPassword'] ?? null,
            'description' => $data['description'] ?? null,
        ]);

        return new HostListingResource($listing);
    }

    public function destroy(Request $request, Listing $listing)
    {
        if ($listing->host_id !== $request->user()->id) {
            abort(403);
        }

        $listing->memberships()->delete();
        $listing->delete();

        return response()->json(['ok' => true]);
    }

    private function colorFor(string $service): string
    {
        return match ($service) {
            'Netflix' => '#E50914',
            'Spotify' => '#1DB954',
            'Canal+' => '#151515',
            'YouTube Premium' => '#CC0000',
            'Disney+' => '#113CCF',
            'Apple TV+' => '#1A1A1A',
            default => '#8A8578',
        };
    }
}
