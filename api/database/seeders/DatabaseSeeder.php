<?php

namespace Database\Seeders;

use App\Models\Listing;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    private int $fillerSeq = 1;

    /**
     * Seed the application's database with the same demo data the
     * frontend used to hardcode locally, so the two stay equivalent.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin sub.ci',
            'email' => 'admin@subci.local',
            'password' => 'password',
            'is_admin' => true,
        ]);

        $awa = User::factory()->create([
            'name' => 'Awa Koné',
            'email' => 'awa.kone@gmail.com',
            'password' => 'password',
            'kyc_status' => 'verified',
            'rating' => 4.8,
            'transactions_count' => 12,
            'host_balance' => 8500,
        ]);

        $sellers = [
            'aicha' => User::factory()->create(['name' => 'Aïcha K.', 'email' => 'aicha.k@example.com', 'kyc_status' => 'verified', 'rating' => 4.9, 'transactions_count' => 58]),
            'moussa' => User::factory()->create(['name' => 'Moussa T.', 'email' => 'moussa.t@example.com', 'kyc_status' => 'verified', 'rating' => 4.7, 'transactions_count' => 21]),
            'fatouD' => User::factory()->create(['name' => 'Fatou D.', 'email' => 'fatou.d@example.com', 'kyc_status' => 'none', 'rating' => 4.2, 'transactions_count' => 6]),
            'ibrahim' => User::factory()->create(['name' => 'Ibrahim S.', 'email' => 'ibrahim.s@example.com', 'kyc_status' => 'verified', 'rating' => 5.0, 'transactions_count' => 102]),
            'nadege' => User::factory()->create(['name' => 'Nadège A.', 'email' => 'nadege.a@example.com', 'kyc_status' => 'verified', 'rating' => 4.8, 'transactions_count' => 44]),
            'kader' => User::factory()->create(['name' => 'Kader B.', 'email' => 'kader.b@example.com', 'kyc_status' => 'verified', 'rating' => 4.6, 'transactions_count' => 15]),
        ];

        $l1 = $sellers['aicha']->listings()->create([
            'service' => 'Netflix', 'plan' => 'Premium · 4 écrans', 'price' => 3500, 'seats' => 4, 'color' => '#E50914',
            'access_type' => 'credentials', 'access_email' => 'famille.koffi.stream@gmail.com', 'access_password' => 'Netflix2026!',
            'description' => 'Compte partagé Netflix Premium, 4K Ultra HD, 4 écrans simultanés. Profil individuel sécurisé par code PIN.',
        ]);
        $this->review($l1, 'Yasmine B.', 5, 'Accès instantané, aucun souci depuis 3 mois.');
        $this->review($l1, 'Karim O.', 5, 'Vendeuse très réactive, je recommande.');
        $this->fillerSeats($l1, 3);

        $l2 = $sellers['moussa']->listings()->create([
            'service' => 'Spotify', 'plan' => 'Duo', 'price' => 1500, 'seats' => 2, 'color' => '#1DB954',
            'access_type' => 'link', 'access_link' => 'https://www.spotify.com/family/invite/9K2xQ7',
            'description' => 'Abonnement Spotify Duo, 2 comptes premium séparés, sans publicité, qualité audio élevée.',
        ]);
        $this->review($l2, 'Léa M.', 5, 'Configuration simple, ça marche parfaitement.');
        $this->review($l2, 'Souleymane K.', 4, "Bon plan, léger délai à l'activation.");
        $this->fillerSeats($l2, 1);

        $l3 = $sellers['fatouD']->listings()->create([
            'service' => 'Canal+', 'plan' => 'Ciné Séries', 'price' => 4000, 'seats' => 1, 'color' => '#151515',
            'access_type' => 'credentials', 'access_email' => 'partage.canal.plus@gmail.com', 'access_password' => 'CanalCine24#',
            'description' => 'Accès Canal+ Ciné Séries, films et séries en illimité, streaming HD.',
        ]);
        $this->review($l3, 'Bakary S.', 4, 'Ça fonctionne bien, communication un peu lente.');

        $l4 = $sellers['ibrahim']->listings()->create([
            'service' => 'YouTube', 'plan' => 'Premium Famille', 'price' => 1200, 'seats' => 6, 'color' => '#CC0000',
            'access_type' => 'link', 'access_link' => 'https://families.google.com/join/9F3KDE',
            'description' => "YouTube Premium sans pub + YouTube Music inclus, jusqu'à 6 membres du foyer.",
        ]);
        $this->review($l4, 'Aminata C.', 5, 'Meilleur vendeur, place activée en 5 minutes.');
        $this->review($l4, 'Josué N.', 5, 'Toujours fiable, 3ème place que je lui achète.');
        $this->fillerSeats($l4, 3);

        $l5 = $sellers['nadege']->listings()->create([
            'service' => 'Disney+', 'plan' => 'Standard', 'price' => 2000, 'seats' => 4, 'color' => '#113CCF',
            'access_type' => 'credentials', 'access_email' => 'famille.diallo.disney@gmail.com', 'access_password' => 'DisneyMagic7!',
            'description' => 'Disney, Marvel, Pixar, Star Wars. 4 écrans en simultané, profils séparés.',
        ]);
        $this->review($l5, 'Prisca T.', 5, 'Très pro, réponse rapide à mes questions.');
        $this->fillerSeats($l5, 1);
        // Awa's own active subscription (buyer side) — she occupies one of Nadège's seats.
        $l5->memberships()->create([
            'buyer_id' => $awa->id, 'price' => 2000, 'status' => 'active', 'payment_status' => 'ok',
            'renews_at' => '2026-08-12', 'access_type' => 'credentials',
            'access_email' => 'famille.diallo.disney@gmail.com', 'access_password' => 'DisneyMagic7!',
        ]);

        $l6 = $sellers['kader']->listings()->create([
            'service' => 'Apple TV+', 'plan' => 'Famille', 'price' => 1000, 'seats' => 6, 'color' => '#1A1A1A',
            'access_type' => 'link', 'access_link' => 'https://appleid.apple.com/family/invite/7QX2M',
            'description' => "Apple TV+ en partage familial, contenus originaux Apple, jusqu'à 6 comptes.",
        ]);
        $this->review($l6, 'Estelle G.', 4, 'Bonne expérience globale, RAS.');
        $this->fillerSeats($l6, 5);

        // Awa's own circles (host side).
        $spotifyCircle = $awa->listings()->create([
            'service' => 'Spotify', 'plan' => 'Duo', 'price' => 1500, 'seats' => 1, 'color' => '#1DB954',
            'access_type' => 'link', 'access_link' => 'https://www.spotify.com/family/invite/AWA123',
        ]);
        $this->member($spotifyCircle, 'Fatou N.', '2026-08-18', 'ok');

        $netflixCircle = $awa->listings()->create([
            'service' => 'Netflix', 'plan' => 'Premium · 4 écrans', 'price' => 3500, 'seats' => 4, 'color' => '#E50914',
            'access_type' => 'credentials', 'access_email' => 'famille.awa.stream@gmail.com', 'access_password' => 'AwaStream2026!',
        ]);
        $this->member($netflixCircle, 'Yao K.', '2026-08-05', 'failed');
        $this->member($netflixCircle, 'Aminata S.', '2026-08-21', 'ok');

        $awa->appNotifications()->create([
            'title' => 'Place libérée sur Netflix Premium',
            'body' => 'Une place vient de se libérer chez Aïcha K. — 3 500 FCFA/mois.',
        ]);
        $awa->appNotifications()->create([
            'title' => 'Renouvellement dans 3 jours',
            'body' => 'Ton abonnement Disney+ se renouvelle le 12 août 2026.',
        ]);
    }

    private function review(Listing $listing, string $name, int $stars, string $text): void
    {
        $buyer = User::factory()->create(['name' => $name, 'email' => $this->slug($name).'@example.com']);

        $listing->memberships()->create([
            'buyer_id' => $buyer->id,
            'price' => $listing->price,
            'status' => 'cancelled', // churned — the review stays, the seat is freed
            'payment_status' => 'ok',
            'renews_at' => now()->subMonth(),
            'seller_rating' => $stars,
            'rating_comment' => $text,
        ]);
    }

    private function fillerSeats(Listing $listing, int $count): void
    {
        for ($i = 0; $i < $count; $i++) {
            $buyer = User::factory()->create(['name' => 'Membre Démo '.$this->fillerSeq, 'email' => 'membre.demo.'.$this->fillerSeq.'@example.com']);
            $this->fillerSeq++;

            $listing->memberships()->create([
                'buyer_id' => $buyer->id,
                'price' => $listing->price,
                'status' => 'active',
                'payment_status' => 'ok',
                'renews_at' => now()->addMonth(),
                'access_type' => $listing->access_type,
                'access_link' => $listing->access_link,
                'access_email' => $listing->access_email,
                'access_password' => $listing->access_password,
            ]);
        }
    }

    private function member(Listing $listing, string $name, string $renewsAt, string $paymentStatus): void
    {
        $buyer = User::factory()->create(['name' => $name, 'email' => $this->slug($name).'@example.com']);

        $listing->memberships()->create([
            'buyer_id' => $buyer->id,
            'price' => $listing->price,
            'status' => 'active',
            'payment_status' => $paymentStatus,
            'renews_at' => $renewsAt,
            'access_type' => $listing->access_type,
            'access_link' => $listing->access_link,
            'access_email' => $listing->access_email,
            'access_password' => $listing->access_password,
        ]);
    }

    private function slug(string $name): string
    {
        return str()->slug($name);
    }
}
