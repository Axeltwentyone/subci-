<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class DiditClient
{
    /**
     * Create a verification session and return Didit's raw response
     * (session_id, url, session_token, status, ...).
     *
     * @return array<string, mixed>
     */
    public function createSession(string $vendorData, string $callbackUrl): array
    {
        $payload = [
            'workflow_id' => config('services.didit.workflow_id'),
            'vendor_data' => $vendorData,
            'callback' => $callbackUrl,
        ];

        if ($scenario = config('services.didit.sandbox_scenario')) {
            $payload['sandbox_scenario'] = $scenario;
        }

        $response = $this->client()->post('/v3/session/', $payload);
        $response->throw();

        return $response->json();
    }

    /**
     * Fetch the full decision for a session (status, extracted data, ...).
     *
     * @return array<string, mixed>
     */
    public function getDecision(string $sessionId): array
    {
        $response = $this->client()->get("/v3/session/{$sessionId}/decision/");
        $response->throw();

        return $response->json();
    }

    private function client()
    {
        return Http::baseUrl(config('services.didit.base_url'))
            ->withHeaders(['x-api-key' => config('services.didit.api_key')])
            ->acceptJson();
    }
}
