FROM php:8.4-fpm

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev

RUN docker-php-ext-install pdo pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# copy composer files first (cache optimization)
COPY composer.json composer.lock ./

RUN composer install --no-interaction --prefer-dist --no-scripts

COPY . .

# FIX permissions for Laravel watch + runtime
RUN mkdir -p storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

RUN composer dump-autoload

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]