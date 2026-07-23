<?php

/*
=====================================================
 EF22 FRAMEWORK
 HEADER.PHP
 Version 2.1
=====================================================
*/

/* ==========================================
   NAVIGATION
========================================== */

$navigation = [

    "./index.php" => [

        "title" => "Startseite"

    ],

    "./ueber-uns.php" => [

        "title" => "Über uns"

    ],

    "./zugkoenig.php" => [

        "title" => "Zugkönig"

    ],

    "./termine.php" => [

        "title" => "Termine"

    ]

];

$currentPage = basename(

    $_SERVER["PHP_SELF"]

);