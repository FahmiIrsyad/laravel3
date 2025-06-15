<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\EventFormField;

class EventFormFieldSeeder extends Seeder
{
    public function run()
    {
        $eventId = 3; // Adjust based on your event ID

        $fields = [
            ['label' => 'School Name', 'input_id' => 'school_name'],
            ['label' => 'School Telephone', 'input_id' => 'school_telephone'],
            ['label' => 'School Fax', 'input_id' => 'school_fax'],
            ['label' => 'Team Name', 'input_id' => 'team_name'],
            ['label' => 'Team Manager\'s Name', 'input_id' => 'manager_name'],
            ['label' => 'Team Manager\'s Email', 'input_id' => 'manager_email', 'type' => 'email'],
            ['label' => 'Team Manager\'s Mobile No', 'input_id' => 'manager_mobile'],
            ['label' => 'Team Manager\'s NRIC/Passport No', 'input_id' => 'manager_nric'],
            ['label' => 'Jersey Color (Set 1)', 'input_id' => 'jersey_1'],
            ['label' => 'Jersey Color (Set 2)', 'input_id' => 'jersey_2'],
            ['label' => 'Coach\'s Name', 'input_id' => 'coach_name'],
            ['label' => 'Coach\'s NRIC', 'input_id' => 'coach_nric'],
            ['label' => 'Category', 'input_id' => 'category', 'type' => 'radio'],
            ['label' => 'Acceptance of Terms and conditions', 'input_id' => 'terms', 'type' => 'checkbox'],
        ];

        foreach ($fields as $field) {
            EventFormField::create([
                'event_id' => $eventId,
                'type' => $field['type'] ?? 'text',
                'label' => $field['label'],
                'input_id' => $field['input_id'],
                'required' => true,
            ]);
        }
    }
}
