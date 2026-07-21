<?php
/*
=====================================================
 ECHTE FRÜNDE '22
 TERMINE.PHP
 Version 1.0

 EF22 FRAMEWORK
=====================================================
*/

$pageCss = [

    "css/calendar.css",

    "css/animations.css",

    "css/responsive.css"

];

$pageJs = [

    "js/config.js",

    "js/utilities.js",

    "js/modal.js",

    "js/hero.js",

    "js/highlights.js",

];

include "framework/framework-header.php";
?>

<!-- ==========================================
     MAIN
========================================== -->

<main id="main-content">

<!-- ==========================================
     KALENDER
========================================== -->

<section
    id="calendar-section"
    class="calendar-section">

    <div class="container">

        <div class="section-header">

            <span class="section-kicker">

                Termine

            </span>

            <h2>

                Alle Veranstaltungen auf einen Blick

            </h2>

            <p>

                Hier findet ihr alle Termine der Echten Fründe '22'.
                Ein Klick auf einen Termin öffnet alle Details.

            </p>

        </div>

        <div
            id="calendarCard"
            class="calendar-card">

            <div id="calendar">

            </div>

        </div>

    </div>

</section>

<!-- ==========================================
     HIGHLIGHTS
========================================== -->

<section
    id="highlights-section"
    class="highlights-section">

    <div class="container">

        <div class="section-header">

            <span class="section-kicker">

                Highlights

            </span>

            <h2>

                Besondere Veranstaltungen

            </h2>

            <p>

                Hier findet ihr die wichtigsten Veranstaltungen
                der Echten Fründe '22.

            </p>

        </div>

        <div
            id="highlights"
            class="highlight-grid">

        </div>

    </div>

</section>

</main>

<!-- ==========================================
     EVENT MODAL
========================================== -->

<?php

require_once __DIR__ . "/framework/modal.php";

renderModal();

?>

<?php include "framework/framework-footer.php"; ?>