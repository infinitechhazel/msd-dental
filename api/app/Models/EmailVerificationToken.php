<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailVerificationToken extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'token',
        'expires_at',
        'verified_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'verified_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function isExpired(): bool
    {
        return now()->isAfter($this->expires_at);
    }

    public function isVerified(): bool
    {
        return $this->verified_at !== null;
    }

    public static function createForUser(User $user, int $expiresInMinutes = 60): string
    {
        // Invalidate previous tokens for this user
        self::where('user_id', $user->id)->delete();

        $token = bin2hex(random_bytes(32));

        self::create([
            'user_id' => $user->id,
            'token' => hash('sha256', $token),
            'expires_at' => now()->addMinutes($expiresInMinutes),
        ]);

        return $token;
    }

    public static function findByToken(string $token): ?self
    {
        return self::where('token', hash('sha256', $token))->first();
    }
}
