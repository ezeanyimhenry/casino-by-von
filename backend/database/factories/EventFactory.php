<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "title" => $this->faker->sentence(3),
            "description" => $this->faker->paragraph(),
            "event_date" => $this->faker->dateTimeBetween('+1 week', '+1 year'),
            "image_url" => $this->faker->optional()->imageUrl(640, 480, 'events', true),
            "location" => $this->faker->optional()->address(),
            "capacity" => $this->faker->optional()->numberBetween(50, 500),
            "is_featured" => $this->faker->boolean(20),
        ];
    }
}