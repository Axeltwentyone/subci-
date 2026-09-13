<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Throw instead of silently dropping a field passed to update()/fill()
        // that isn't in the model's Fillable list — this exact mistake (a new
        // column added to a migration but forgotten in #[Fillable]) has
        // already caused a real silent-failure bug in this app.
        Model::preventSilentlyDiscardingAttributes(! $this->app->isProduction());
    }
}
