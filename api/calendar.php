<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
date_default_timezone_set('Europe/Berlin');

echo json_encode([
    "success" => true,
    "version" => "0.1.0",
    "message" => "EF22 Calendar API läuft."
], JSON_PRETTY_PRINT);