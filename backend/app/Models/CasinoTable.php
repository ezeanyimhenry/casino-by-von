<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class CasinoTable extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'type',
        'max_seats',
        'image_url',
        'description',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'max_seats' => 'integer',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'table_id');
    }
}