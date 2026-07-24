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
     HERO BEREICH
========================================== -->

<section class="component-section hero-section">

    <div class="container">

        <?php

        $heroVariant = "calendar";

        require_once __DIR__ . "/../components/hero.php";

        ?>

    </div>

</section>


<!-- ==========================================
     KALENDER EINLEITUNG
========================================== -->

<section class="content-section">

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

    </div>

</section>


<!-- ==========================================
     KALENDER
========================================== -->

<section
    id="calendar-section"
    class="component-section calendar-section">

    <div class="container">

        <div
            id="calendarCard"
            class="calendar-card">

            <div id="calendar"></div>

        </div>

    </div>

</section>


<!-- ==========================================
     HIGHLIGHTS EINLEITUNG
========================================== -->

<section class="content-section">

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

    </div>

</section>


<!-- ==========================================
     HIGHLIGHTS
========================================== -->

<?php

require_once __DIR__ . "/../components/highlights.php";

?>

    <!-- ==========================================
         EVENT MODAL
    ========================================== -->

    <?php

    require_once __DIR__ . "/../components/modal.php";

    $pageContent = ob_get_clean();

    include __DIR__ . "/../framework/framework.php";