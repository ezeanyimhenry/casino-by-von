<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Booking extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'table_id',
        'booking_date',
        'time_slot',
        'num_seats',
        'status',
    ];

    protected $casts = [
        'booking_date' => 'date',
        'num_seats' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function table()
    {
        return $this->belongsTo(CasinoTable::class, 'table_id');
    }
}