<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventStatementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('event_statements')->insert([
            [
                'event_id' => 3,
                'title' => 'Ketetapan',
                'class' => 'btn btn-danger',
                'url' => 'https://sporteqa.com/mckkp7s/P7sKetetapan.html',
                'target' => '_blank',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 3,
                'title' => 'Tournament Rules',
                'class' => 'btn btn-primary',
                'url' => 'https://sporteqa.com/mckkp7s/2024rules.html',
                'target' => '_blank',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 3,
                'title' => 'Health and Safety Statement',
                'class' => 'btn btn-secondary',
                'url' => 'https://sporteqa.com/mckkp7s/health_safety.html',
                'target' => '_blank',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
