<?php

declare(strict_types=1);

/*
=====================================================
 ECHTE FRÜNDE '22
 CALENDAR.PHP
 Version 4.0
=====================================================
*/

header(
    "Content-Type: application/json; charset=UTF-8"
);

date_default_timezone_set(
    "Europe/Berlin"
);

/* ==========================================
   KONFIGURATION
========================================== */

const CALENDAR_URL =
    "https://calendar.google.com/calendar/ical/ef22.kalender%40gmail.com/public/basic.ics";

const DEFAULT_IMAGE =
    "images/hero-bg.png";

/* ==========================================
   FEHLERBEHANDLUNG
========================================== */

set_exception_handler(

    static function(Throwable $exception): void{

        http_response_code(500);

        echo json_encode(

            [

                "success" => false,

                "message" => $exception->getMessage(),

                "events" => [],

                "nextEvent" => null

            ],

            JSON_UNESCAPED_UNICODE |
            JSON_UNESCAPED_SLASHES

        );

        exit;

    }

);

/* ==========================================
   GOOGLE KALENDER LADEN
========================================== */

function loadCalendar(): string
{

    $ics = false;

    /* ======================================
       cURL verwenden
    ====================================== */

    if(function_exists("curl_init")){

        $curl = curl_init();

        curl_setopt_array(

            $curl,

            [

                CURLOPT_URL => CALENDAR_URL,

                CURLOPT_RETURNTRANSFER => true,

                CURLOPT_FOLLOWLOCATION => true,

                CURLOPT_CONNECTTIMEOUT => 10,

                CURLOPT_TIMEOUT => 20,

                CURLOPT_SSL_VERIFYPEER => true,

                CURLOPT_USERAGENT => "Echte Fründe Calendar/4.0"

            ]

        );

        $ics = curl_exec($curl);

        if($ics === false){

            throw new RuntimeException(

                "cURL: " . curl_error($curl)

            );

        }

        $status = curl_getinfo(

            $curl,

            CURLINFO_RESPONSE_CODE

        );

        curl_close($curl);

        if($status !== 200){

            throw new RuntimeException(

                "Google Kalender antwortet mit HTTP " . $status

            );

        }

    }

    /* ======================================
       Fallback
    ====================================== */

    else{

        $ics = @file_get_contents(

            CALENDAR_URL

        );

        if($ics === false){

            throw new RuntimeException(

                "Google Kalender konnte nicht geladen werden."

            );

        }

    }

    /* ======================================
       VALIDIERUNG
    ====================================== */

    if(

        !is_string($ics) ||

        trim($ics) === ""

    ){

        throw new RuntimeException(

            "Leere Kalenderdatei."

        );

    }

    if(

        !str_contains(

            $ics,

            "BEGIN:VCALENDAR"

        )

    ){

        throw new RuntimeException(

            "Ungültige ICS-Datei."

        );

    }

    return $ics;

}

/* ==========================================
   VEVENTS EINLESEN
========================================== */

function parseEvents(string $ics): array
{

    /* ======================================
       LINE FOLDING ENTFERNEN
    ====================================== */

    $ics = preg_replace(

        "/\R[ \t]/",

        "",

        $ics

    );

    $lines = preg_split(

        "/\R/",

        $ics

    );

    $events = [];

    $event = null;

    foreach($lines as $line){

        $line = trim($line);

        if($line === ""){

            continue;

        }

        if($line === "BEGIN:VEVENT"){

            $event = [];

            continue;

        }

        if($line === "END:VEVENT"){

            if($event !== null){

                $events[] = $event;

            }

            $event = null;

            continue;

        }

        if($event === null){

            continue;

        }

        $parts = explode(

            ":",

            $line,

            2

        );

        if(count($parts) !== 2){

            continue;

        }

        $key = strtoupper(

            strtok(

                $parts[0],

                ";"

            )

        );

        $value = trim(

            $parts[1]

        );

        switch($key){

            case "SUMMARY":

                $event["title"] = $value;

                break;

            case "DESCRIPTION":

                $event["description"] = $value;

                break;

            case "LOCATION":

                $event["location"] = $value;

                break;

            case "DTSTART":

                $event["start"] = $value;

                break;

            case "DTEND":

                $event["end"] = $value;

                break;

        }

    }

    return $events;

}

/* ==========================================
   METADATEN AUSLESEN
========================================== */

function parseMetadata(string $description): array
{

    $description = str_replace(

        [

            "\\n",
            "\\,",
            "\\;",
            "\\\\"

        ],

        [

            PHP_EOL,
            ",",
            ";",
            "\\"

        ],

        $description

    );

    $meta = [

        "type"       => "Sonstiges",
        "highlight"  => false,
        "hero"       => true,
        "image"      => DEFAULT_IMAGE,
        "dresscode"  => null,
        "meeting"    => null,
        "contact"    => null,
        "ticket"     => null

    ];

    $text = [];

    foreach(

        preg_split(

            "/\R/",

            $description

        ) as $line

    ){

        $line = trim($line);

        if($line === ""){

            $text[] = "";

            continue;

        }

        if(

            !str_starts_with(

                $line,

                "@"

            )

        ){

            $text[] = $line;

            continue;

        }

        $parts = explode(

            "=",

            substr($line,1),

            2

        );

        if(count($parts) !== 2){

            continue;

        }

        $key = strtolower(

            trim($parts[0])

        );

        $value = trim(

            $parts[1]

        );

        switch($key){

            case "type":

                $meta["type"] = $value;

                break;

            case "highlight":

                $meta["highlight"] = filter_var(

                    $value,

                    FILTER_VALIDATE_BOOLEAN

                );

                break;

            case "hero":

                $meta["hero"] = filter_var(

                    $value,

                    FILTER_VALIDATE_BOOLEAN

                );

                break;

            case "image":

                $meta["image"] =

                    $value !== ""

                        ? $value

                        : DEFAULT_IMAGE;

                break;

            case "dresscode":

                $meta["dresscode"] = $value;

                break;

            case "meeting":

                $meta["meeting"] = $value;

                break;

            case "contact":

                $meta["contact"] = $value;

                break;

            case "ticket":

                $meta["ticket"] = $value;

                break;

        }

    }

    return [

        "description" => trim(

            preg_replace(

                "/(\R){3,}/",

                PHP_EOL . PHP_EOL,

                implode(

                    PHP_EOL,

                    $text

                )

            )

        ),

        "meta" => $meta

    ];

}

/* ==========================================
   DATUM FORMATIEREN
========================================== */

function formatDate(string $value): string
{

    if($value === ""){

        return "";

    }

    try{

        /* ======================================
           GANZTÄGIGER TERMIN
        ====================================== */

        if(isAllDay($value)){

            $date = DateTimeImmutable::createFromFormat(

                "Ymd",

                $value,

                new DateTimeZone("Europe/Berlin")

            );

            return $date

                ? $date->format("Y-m-d")

                : "";

        }

        /* ======================================
           UTC (Google Standard)
        ====================================== */

        if(str_ends_with($value,"Z")){

            $date = DateTimeImmutable::createFromFormat(

                "Ymd\\THis\\Z",

                $value,

                new DateTimeZone("UTC")

            );

            return $date

                ? $date
                    ->setTimezone(
                        new DateTimeZone(
                            "Europe/Berlin"
                        )
                    )
                    ->format(DateTimeInterface::ATOM)

                : "";

        }

        /* ======================================
           LOKALE UHRZEIT
        ====================================== */

        $date = DateTimeImmutable::createFromFormat(

            "Ymd\\THis",

            $value,

            new DateTimeZone("Europe/Berlin")

        );

        return $date

            ? $date->format(DateTimeInterface::ATOM)

            : "";

    }

    catch(Throwable){

        return "";

    }

}

/* ==========================================
   GANZTÄGIGER TERMIN
========================================== */

function isAllDay(string $value): bool
{

    return preg_match(

        "/^\\d{8}$/",

        $value

    ) === 1;

}

/* ==========================================
   TERMINE AUFBEREITEN
========================================== */

function prepareEvents(array $events): array
{

    $prepared = [];

    foreach($events as $event){

        $metadata = parseMetadata(

            $event["description"] ?? ""

        );

        $start = formatDate(

            $event["start"] ?? ""

        );

        $end = formatDate(

            $event["end"] ?? ""

        );

        $allDay = isAllDay(

            $event["start"] ?? ""

        );

        $address = str_replace(

            [

                "\\,",
                "\\;",
                "\\\\"

            ],

            [

                ",",
                ";",
                "\\"

            ],

            (string)($event["location"] ?? "")

        );

        $location = "";

        if($address !== ""){

            $parts = explode(

                ",",

                $address,

                2

            );

            $location = trim(

                $parts[0]

            );

        }

        $prepared[] = [

            "title" =>

                trim(

                    $event["title"] ?? ""

                ),

            "start" =>

                $start,

            "end" =>

                $end,

            "allDay" =>

                $allDay,

            "extendedProps" => [

                "description" =>

                    $metadata["description"],

                "location" =>

                    $location,

                "address" =>

                    $address,

                "category" =>

                    $metadata["meta"]["type"],

                "type" =>

                    $metadata["meta"]["type"],

                "highlight" =>

                    $metadata["meta"]["highlight"],

                "hero" =>

                    $metadata["meta"]["hero"],

                "image" =>

                    $metadata["meta"]["image"],

                "dresscode" =>

                    $metadata["meta"]["dresscode"],

                "meeting" =>

                    $metadata["meta"]["meeting"],

                "contact" =>

                    $metadata["meta"]["contact"],

                "ticket" =>

                    $metadata["meta"]["ticket"]

            ]

        ];

    }

    usort(

        $prepared,

        static function(

            array $a,

            array $b

        ): int{

            return strcmp(

                $a["start"],

                $b["start"]

            );

        }

    );

    return $prepared;

}

/* ==========================================
   NÄCHSTEN HERO ERMITTELN
========================================== */

function findNextHero(array $events): ?array
{

    $today = new DateTimeImmutable(

        "today",

        new DateTimeZone("Europe/Berlin")

    );

    foreach($events as $event){

        if(

            empty(

                $event["extendedProps"]["hero"]

            )

        ){

            continue;

        }

        if(

            empty(

                $event["start"]

            )

        ){

            continue;

        }

        try{

            $start = new DateTimeImmutable(

                $event["start"]

            );

        }

        catch(Throwable){

            continue;

        }

        if($start < $today){

            continue;

        }

        return $event;

    }

    return null;

}

/* ==========================================
   HAUPTPROGRAMM
========================================== */

$ics = loadCalendar();

$events = parseEvents(

    $ics

);

$preparedEvents = prepareEvents(

    $events

);

$nextEvent = findNextHero(

    $preparedEvents

);

/* ==========================================
   JSON AUSGEBEN
========================================== */

echo json_encode(

    [

        "success" => true,

        "nextEvent" => $nextEvent,

        "events" => $preparedEvents

    ],

    JSON_UNESCAPED_UNICODE |

    JSON_UNESCAPED_SLASHES |

    JSON_PRETTY_PRINT |

    JSON_THROW_ON_ERROR

);