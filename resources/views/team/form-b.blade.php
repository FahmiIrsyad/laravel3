<!DOCTYPE html>
<html>
<head>
    <title>Form B - Match Registration</title>
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
    <img src="{{ asset('assets/images/sporteqa-logo-text-003-300x60.png') }}" class="logo" alt="Logo">

    <h3>FORM B : MATCH REGISTRATION FORM</h3>
    <h2>{{ $event->title }}</h2>
    <p>{{ \Carbon\Carbon::parse($event->start_date)->format('d M Y') }} - {{ \Carbon\Carbon::parse($event->end_date)->format('d M Y') }}</p>

    <table>
        @foreach($submissions as $row)
        <tr>
            <th>{{ $row->formField->label ?? 'Field' }}</th>
            <td>{{ $row->value }}</td>
        </tr>
        @endforeach
    </table>

    <h4 style="margin-top: 40px;">TEAM MEMBERS</h4>
    <table>
        <thead>
            <tr>
                <th colspan="4"></th>
                <th colspan="3">Day One & Two</th>
                <th colspan="3">Day Three</th>
            </tr>
            <tr>
                <th>No</th>
                <th>Name</th>
                <th>Jersey 1</th>
                <th>Jersey 2</th>
                <th>Match 1</th>
                <th>Match 2</th>
                <th>Match 3</th>
                <th>Q/Final</th>
                <th>S/Final</th>
                <th>Final</th>
            </tr>
        </thead>
        <tbody>
            @foreach($participants as $index => $p)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $p->name }}</td>
                <td></td> <!-- Jersey 1 -->
                <td></td> <!-- Jersey 2 -->
                <td></td> <!-- Match 1 -->
                <td></td> <!-- Match 2 -->
                <td></td> <!-- Match 3 -->
                <td></td> <!-- Q/Final -->
                <td></td> <!-- S/Final -->
                <td></td> <!-- Final -->
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
