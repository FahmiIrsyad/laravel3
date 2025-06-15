<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\EventFee;

class EventFeeSeeder extends Seeder
{
    public function run(): void
    {
        // Replace with actual event IDs from your 'events' table
        $freeEvents = [
            ['event_id' => 1, 'sponsored_by' => 'Nike Malaysia'],
            ['event_id' => 2, 'sponsored_by' => 'Adidas Run Club'],
            ['event_id' => 3, 'sponsored_by' => 'Puma Athletics']
        ];

        foreach ($freeEvents as $event) {
            EventFee::create([
                'event_id'      => $event['event_id'],
                'type'          => 0,
                'amount'        => null,
                'processing_fee'=> null,
                'sponsored_by'  => $event['sponsored_by'],
            ]);
        }
    }
}
