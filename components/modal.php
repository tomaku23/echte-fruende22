<?php
/*
=====================================================
 ECHTE FRÜNDE '22
 MODAL.PHP
 Version 4.0

 EF22 FRAMEWORK
=====================================================

Struktur für:

Ebene 1:
- Website

Ebene 2:
- Event-Modal

Ebene 3:
- Routenauswahl

Inhalte und Interaktionen werden durch
modal.js gesteuert.

=====================================================
*/
?>

<!-- ==========================================
     EVENT MODAL
     EBENE 2
========================================== -->

<div
    id="eventModal"
    class="modal"
    aria-hidden="true">

    <!-- ======================================
         OVERLAY
    ======================================= -->

    <div
        class="modal-overlay"
        data-modal-close
        aria-hidden="true">

    </div>

    <!-- ======================================
         EVENT WINDOW
    ======================================= -->

    <article
        class="modal-window"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle">

        <!-- ==================================
             HERO
        =================================== -->

        <div
            id="modalImage"
            class="modal-hero"
            aria-hidden="true">

        </div>

        <!-- ==================================
             BODY
        =================================== -->

        <div
            class="modal-body">

            <!-- ==============================
                 HEADER
            =============================== -->

            <header
                class="modal-header">

                <span
                    id="modalBadge"
                    class="modal-badge">

                </span>

                <h2
                    id="modalTitle"
                    class="modal-title">

                </h2>

            </header>

            <!-- ==============================
                 METADATEN
            =============================== -->

            <section
                id="modalMeta"
                class="modal-meta"
                aria-label="Termininformationen">

            </section>

            <!-- ==============================
                 BESCHREIBUNG
            =============================== -->

            <section
                id="modalContent"
                class="modal-content">

            </section>

            <!-- ==============================
                 AKTIONEN
            =============================== -->

            <div
                id="modalActions"
                class="modal-actions">

            </div>

            <!-- ==============================
                 SCHLIESSEN

                 Bewusst ausschließlich
                 am Ende des Modals.
            =============================== -->

            <footer
                class="modal-footer">

                <button
                    id="closeModalButton"
                    class="modal-close-button"
                    type="button">

                    Schließen

                </button>

            </footer>

        </div>

    </article>

</div>


<!-- ==========================================
     ROUTENAUSWAHL
     EBENE 3
========================================== -->

<div
    id="routeModal"
    class="route-modal"
    aria-hidden="true">

    <!-- ======================================
         OVERLAY

         Klick außerhalb führt zurück zum
         Event-Modal.
    ======================================= -->

    <div
        class="route-modal-overlay"
        data-route-close
        aria-hidden="true">

    </div>

    <!-- ======================================
         ROUTE WINDOW
    ======================================= -->

    <div
        class="route-modal-window"
        role="dialog"
        aria-modal="true"
        aria-labelledby="routeModalTitle">

        <!-- ==================================
             HEADER
        =================================== -->

        <header
            class="route-modal-header">

            <span
                class="route-modal-eyebrow">

                Navigation

            </span>

            <h3
                id="routeModalTitle"
                class="route-modal-title">

                Route öffnen mit

            </h3>

        </header>

        <!-- ==================================
             ANBIETER
        =================================== -->

        <div
            class="route-modal-actions">

            <a
                id="routeAppleMaps"
                class="route-provider-button"
                href="#"
                target="_blank"
                rel="noopener noreferrer">

                <span
                    class="route-provider-name">

                    Apple Karten

                </span>

            </a>

            <a
                id="routeGoogleMaps"
                class="route-provider-button"
                href="#"
                target="_blank"
                rel="noopener noreferrer">

                <span
                    class="route-provider-name">

                    Google Maps

                </span>

            </a>

        </div>

    </div>

</div>