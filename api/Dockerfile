# Build vendor/ separately so it's cached unless composer files change
FROM composer:2 AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --no-scripts --optimize-autoloader --ignore-platform-req=ext-intl

FROM php:8.3-cli

RUN apt-get update && apt-get install -y --no-install-recommends \
        libpq-dev libsqlite3-dev libzip-dev libicu-dev unzip git \
    && docker-php-ext-install pdo pdo_pgsql pdo_sqlite zip intl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

COPY --from=vendor /app/vendor ./vendor
COPY . .

RUN mkdir -p storage/framework/{cache,sessions,views} storage/logs bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 8080

CMD php artisan migrate --force \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan serve --host=0.0.0.0 --port=${PORT:-8080}
