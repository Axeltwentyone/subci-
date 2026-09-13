<?php

namespace App\Filament\Widgets;

use App\Models\Listing;
use App\Models\Membership;
use App\Models\User;
use App\Models\Withdrawal;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        $fmt = fn (int $n) => number_format($n, 0, ',', ' ').' FCFA';

        $revenue = Membership::where('status', 'active')->sum('price');
        $pendingWithdrawals = Withdrawal::where('status', 'pending');
        $pendingKyc = User::where('kyc_status', 'checkingSub')->count();

        return [
            Stat::make('Utilisateurs', User::count())
                ->description(User::where('kyc_status', 'verified')->count().' vendeurs vérifiés')
                ->icon('heroicon-o-users'),

            Stat::make('Cercles actifs', Listing::where('status', 'active')->count())
                ->description(Membership::where('status', 'active')->count().' places occupées')
                ->icon('heroicon-o-rectangle-stack'),

            Stat::make('Revenu mensuel récurrent', $fmt($revenue))
                ->description('Somme des abonnements actifs')
                ->icon('heroicon-o-banknotes')
                ->color('success'),

            Stat::make('Retraits en attente', $pendingWithdrawals->count())
                ->description($fmt((int) $pendingWithdrawals->sum('amount')).' à traiter')
                ->icon('heroicon-o-clock')
                ->color($pendingWithdrawals->count() > 0 ? 'warning' : 'gray'),

            Stat::make('KYC à finaliser', $pendingKyc)
                ->description('Identité vérifiée, en attente de vérif. abonnement')
                ->icon('heroicon-o-shield-exclamation')
                ->color($pendingKyc > 0 ? 'warning' : 'gray'),
        ];
    }
}
