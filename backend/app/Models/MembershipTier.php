<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class MembershipTier extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'min_spent',
        'max_spent',
        'benefits',
        'color',
        'icon',
        'discount_percentage',
        'priority_booking',
    ];

    protected $casts = [
        'min_spent' => 'decimal:2',
        'max_spent' => 'decimal:2',
        'benefits' => 'array',
        'discount_percentage' => 'integer',
        'priority_booking' => 'boolean',
    ];

    public function users()
    {
        return $this->hasMany(User::class, 'current_tier_id');
    }
}