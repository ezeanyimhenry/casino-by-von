<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MembershipTier>
 */
class MembershipTierFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => $this->faker->word(),
            "min_spent" => $this->faker->randomFloat(2, 0, 900),
            "max_spent" => $this->faker->randomFloat(2, 1000, 10000),
            "benefits" => $this->faker->randomElements(
                [
                    "Access to exclusive events",
                    "Priority customer support",
                    "Special discounts on services",
                    "Free merchandise",
                    "Early access to new features",
                ],
                $this->faker->numberBetween(1, 5)
            ),
            "color" => $this->faker->optional()->hexColor(),
            "icon" => $this->faker->optional()->word(),
            "discount_percentage" => $this->faker->numberBetween(0, 30),
            "priority_booking" => $this->faker->boolean(30),
        ];
    }
}