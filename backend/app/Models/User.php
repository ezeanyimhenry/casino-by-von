<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasUuids, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'full_name',
        'email',
        'password',
        'phone',
        'total_spent',
        'current_tier_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'total_spent' => 'decimal:2',
        ];
    }

    protected $appends = ['membership_tier'];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function membershipTier()
    {
        return $this->belongsTo(MembershipTier::class, 'current_tier_id');
    }

    public function getMembershipTierAttribute()
    {
        // Auto-calculate tier based on total_spent
        return MembershipTier::where('min_spent', '<=', $this->total_spent)
            ->where(function ($query) {
                $query->whereNull('max_spent')
                    ->orWhere('max_spent', '>=', $this->total_spent);
            })
            ->orderBy('min_spent', 'desc')
            ->first();
    }
}