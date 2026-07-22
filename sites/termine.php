    <?php
    /*
    =====================================================
     ECHTE FRÜNDE '22
     TERMINE.PHP
     Version 2.0

     EF22 FRAMEWORK
    =====================================================
    */

    ob_start();

    ?>

    <!-- ==========================================
         HERO
    ========================================== -->

<?php

require_once __DIR__ . "/../components/hero.php";

?>

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

    require_once __DIR__ . "/../components/modal.php";

    $pageContent = ob_get_clean();

    include __DIR__ . "/../framework/framework.php";