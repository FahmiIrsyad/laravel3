<!DOCTYPE html>
<html>
<head>
    <title>Form A - Registration Detail</title>
    <style>
        body { font-family: Arial, sans-serif; font-size: 14px; margin: 40px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        table, th, td { border: 1px solid #999; }
        th, td { padding: 8px 12px; text-align: left; }
        th { background-color: #eee; }
        h2, h3 { margin-bottom: 10px; }
        .signature { margin-top: 60px; }
        .signature-line { margin-top: 40px; border-top: 1px dashed #000; width: 300px; }
        .logo { height: 60px; }
        .top-section { display: flex; justify-content: space-between; align-items: center; }
    </style>
</head>
<body>

<div class="top-section">
   <img src="{{ asset('assets/images/sporteqa-logo-text-003-300x60.png') }}" class="logo" alt="Logo">

</div>
<h2>FORM A : TEAM REGISTRATION DETAIL</h2>
<h3>{{ $event->title }}</h3>
<p>{{ \Carbon\Carbon::parse($event->start_date)->format('d M Y') }} - {{ \Carbon\Carbon::parse($event->end_date)->format('d M Y') }}</p>

<table>
    @foreach($submissions as $submission)
        <tr>
            <th>{{ $submission->formField->label ?? 'Field' }}</th>
            <td>{{ $submission->value }}</td>
        </tr>
    @endforeach
</table>

<h3>Team Members</h3>
<table>
    <thead>
        <tr>
            <th>No</th>
            <th>Player's Full Name</th>
            <th>Passport / NRIC No</th>
            <th>Date of Birth</th>
        </tr>
    </thead>
    <tbody>
        @foreach($participants as $index => $player)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $player->name }}</td>
                <td>{{ $player->nric }}</td>
                <td>{{ \Carbon\Carbon::parse($player->dob)->format('Y-m-d') }}</td>
            </tr>
        @endforeach
    </tbody>
</table>

<div class="signature">
    <div class="signature-line"></div>
    <strong>TEAM MANAGER'S SIGNATURE</strong><br>
    DATE: {{ now()->format('d-m-Y') }}
</div>

</body>
</html>
