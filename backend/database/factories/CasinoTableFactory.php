<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CasinoTable>
 */
class CasinoTableFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => $this->faker->word() . ' Table',
            "type" => $this->faker->randomElement(['Poker', 'Blackjack', 'Roulette', 'Baccarat', 'Craps']),
            "max_seats" => $this->faker->numberBetween(2, 10),
            "image_url" => $this->faker->optional()->imageUrl(640, 480, 'casino_tables', true),
            "description" => $this->faker->optional()->paragraph(),
            "is_active" => $this->faker->boolean(80),
        ];
    }
}