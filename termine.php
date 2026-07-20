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

    "js/calendar.js",

    "js/animations.js",

    "js/app.js"

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

<div
    id="eventModal"
    class="modal-overlay"
    hidden>

    <div
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle">

        <button
            id="closeModal"
            class="modal-close"
            type="button"
            aria-label="Modal schließen">

            <i class="fa-solid fa-xmark"></i>

        </button>

        <div
            id="modalBadge"
            class="modal-badge">

        </div>

        <h2 id="modalTitle">

        </h2>

        <div class="modal-meta">

            <div
                id="modalLocationRow"
                class="modal-row">

                <i class="fa-solid fa-location-dot"></i>

                <div>

                    <strong>Veranstaltungsort</strong>

                    <div id="modalLocation"></div>

                </div>

            </div>

            <div class="modal-row">

                <i class="fa-regular fa-calendar"></i>

                <div>

                    <strong>Datum</strong>

                    <div id="modalDate"></div>

                </div>

            </div>

            <div class="modal-row">

                <i class="fa-regular fa-clock"></i>

                <div>

                    <strong>Uhrzeit</strong>

                    <div id="modalTime"></div>

                </div>

            </div>

            <div
                id="modalDresscodeRow"
                class="modal-row">

                <i class="fa-solid fa-shirt"></i>

                <div>

                    <strong>Dresscode</strong>

                    <div id="modalDresscode"></div>

                </div>

            </div>

            <div
                id="modalMeetingRow"
                class="modal-row">

                <i class="fa-solid fa-people-group"></i>

                <div>

                    <strong>Treffpunkt</strong>

                    <div id="modalMeeting"></div>

                </div>

            </div>

            <div
                id="modalContactRow"
                class="modal-row">

                <i class="fa-solid fa-user"></i>

                <div>

                    <strong>Ansprechpartner</strong>

                    <div id="modalContact"></div>

                </div>

            </div>

        </div>

        <section
            id="modalDescriptionSection"
            class="modal-description-section">

            <h3>

                Beschreibung

            </h3>

            <div
                id="modalDescription"
                class="modal-description">

            </div>

        </section>

        <div class="modal-buttons">

            <a
                id="mapsLink"
                class="btn-outline"
                href="#"
                target="_blank"
                rel="noopener"
                hidden>

                <i class="fa-solid fa-map-location-dot"></i>

                Route öffnen

            </a>

            <a
                id="ticketLink"
                class="btn"
                href="#"
                target="_blank"
                rel="noopener"
                hidden>

                <i class="fa-solid fa-ticket"></i>

                Tickets

            </a>

            <button
                id="closeModalButton"
                class="btn-outline"
                type="button">

                Schließen

            </button>

        </div>

    </div>

</div>


<?php include "framework/framework-footer.php"; ?>