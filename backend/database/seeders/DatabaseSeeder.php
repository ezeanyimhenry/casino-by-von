<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->command->info('🎲 Seeding Von Casino Database...');

        // Create Membership Tiers First
        $this->command->info('Creating membership tiers...');

        $this->call(MembershipTierSeeder::class);

        // Create Admin Users
        $this->command->info('Creating admin users...');

        $this->call(AdminUserSeeder::class);

        // Create Sample Regular Users
        $this->command->info('Creating sample users...');

        $this->call(UserSeeder::class);

        // Create Casino Tables
        $this->command->info('Creating casino tables...');

        $this->call(CasinoTableSeeder::class);

        // Create Events
        $this->command->info('Creating events...');

        $this->call(EventSeeder::class);

        $this->command->info('✅ Database seeded successfully!');
    }
}