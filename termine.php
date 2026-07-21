<?php
/*
=====================================================
 ECHTE FRÜNDE '22
 TERMINE.PHP
 Version 2.0

 EF22 FRAMEWORK
=====================================================
*/

$pageCss = [

    "css/calendar.css",

    "css/animations.css",

    "css/responsive.css"

];

$pageJs = [

];

ob_start();

?>

<!-- ==========================================
     HERO
========================================== -->

<section
    id="hero"
    class="hero"
    data-hero="calendar"
    tabindex="0"
    aria-label="Hero">

    <div
        id="heroBackground"
        class="hero-background">

    </div>

    <div class="hero-overlay">

        <div class="container">

            <div class="hero-content">

                <span
                    id="heroBadge"
                    class="hero-badge">

                    Termin

                </span>

                <h1 id="heroTitle">

                    Termine werden geladen …

                </h1>

                <p
                    id="heroDate"
                    class="hero-date">

                    Bitte warten …

                </p>

                <div class="hero-info">

                    <div class="hero-item">

                        <span class="hero-icon">

                            🕒

                        </span>

                        <span id="heroTime"></span>

                    </div>

                    <div class="hero-item">

                        <span class="hero-icon">

                            📍

                        </span>

                        <span id="heroLocation"></span>

                    </div>

                </div>

                <div
                    id="heroCountdown"
                    class="hero-countdown">

                    --

                </div>

                <div
                    id="heroHint"
                    class="hero-hint">

                </div>

            </div>

        </div>

    </div>

    <div
        class="hero-scroll"
        aria-hidden="true">

        <span>

            ▼

        </span>

    </div>

</section>

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

            <div id="calendar"></div>

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

<!-- ==========================================
     EVENT MODAL
========================================== -->

<?php

require_once __DIR__ . "/framework/modal.php";

$pageContent = ob_get_clean();

include __DIR__ . "/framework/framework.php";