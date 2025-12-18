<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'email' => 'admin@example.com',
            'password' => Hash::make('admin123'),
            'full_name' => 'Von Casino Admin',
            'phone' => '+1234567890',
            'role' => 'admin',
            'total_spent' => 0,
        ]);

        User::create([
            'email' => 'superadmin@example.com',
            'password' => Hash::make('superadmin123'),
            'full_name' => 'Super Admin',
            'phone' => '+1234567891',
            'role' => 'admin',
            'total_spent' => 0,
        ]);

        $this->command->info('Admin users created successfully!');
        $this->command->info('Admin Email: admin@example.com | Password: admin123');
        $this->command->info('Super Admin Email: superadmin@example.com | Password: superadmin123');
        $this->command->warn('⚠️  Please change these passwords in production!');
    }
}