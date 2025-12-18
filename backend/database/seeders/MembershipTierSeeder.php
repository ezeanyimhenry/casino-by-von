<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MembershipTierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tiers = [
            [
                "name" => "Bronze",
                "min_spent" => 0.00,
                "max_spent" => 999.99,
                "benefits" => [
                    "Welcome bonus",
                    "Basic lounge access",
                    "Monthly newsletter"
                ],
                "color" => "#CD7F32",
                "icon" => "award",
                "discount_percentage" => 0,
                "priority_booking" => false,
            ],
            [
                "name" => "Silver",
                "min_spent" => 1000.00,
                "max_spent" => 4999.99,
                "benefits" => [
                    "10% discount on bookings",
                    "Priority customer service",
                    "Complimentary drinks",
                    "Silver lounge access"
                ],
                "color" => "#C0C0C0",
                "icon" => "award",
                "discount_percentage" => 10,
                "priority_booking" => false,
            ],
            [
                "name" => "Gold",
                "min_spent" => 5000.00,
                "max_spent" => 14999.99,
                "benefits" => [
                    "15% discount on bookings",
                    "Priority booking",
                    "Gold lounge access",
                    "Free valet parking",
                    "Birthday bonus"
                ],
                "color" => "#FFD700",
                "icon" => "crown",
                "discount_percentage" => 15,
                "priority_booking" => true,
            ],
            [
                "name" => "Platinum",
                "min_spent" => 15000.00,
                "max_spent" => 49999.00,
                "benefits" => [
                    "20% discount on bookings",
                    "VIP event access",
                    "Platinum lounge access",
                    "Personal host",
                    "Complimentary meals"
                ],
                "color" => "#E5E4E2",
                "icon" => "gem",
                "discount_percentage" => 20,
                "priority_booking" => true,
            ],
            [
                "name" => "Diamond",
                "min_spent" => 50000.00,
                "max_spent" => 0.00,
                "benefits" => [
                    "25% discount on bookings",
                    "Exclusive Diamond lounge",
                    "Private tables available",
                    "Luxury transportation",
                    "Personalized concierge",
                    "Suite accommodations"
                ],
                "color" => "#B9F2FF",
                "icon" => "sparkles",
                "discount_percentage" => 25,
                "priority_booking" => true,
            ],
        ];

        \App\Models\MembershipTier::factory()->createMany($tiers);
    }
}