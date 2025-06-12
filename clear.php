<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

foreach (['config:clear', 'cache:clear', 'view:clear', 'route:clear'] as $cmd) {
    Artisan::call($cmd);
    echo "<strong>$cmd:</strong><br>" . nl2br(Artisan::output()) . "<hr>";
}
echo "✅ Done. Please delete this file.";
