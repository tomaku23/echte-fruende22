<?php
/*
=====================================================
 ECHTE FRÜNDE '22
 MODAL.PHP
 Version 4.1

 EF22 FRAMEWORK
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
        data-modal-close>

    </div>


    <!-- ======================================
         WINDOW
    ======================================= -->

    <div
        class="modal-window"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle">

        <!-- ==================================
             HERO
        =================================== -->

        <div
            id="modalImage"
            class="modal-hero">

            <!-- ==============================
                 HERO CONTENT
            =============================== -->

            <div
                class="modal-hero-content">

                <h2
                    id="modalTitle"
                    class="modal-title">

                </h2>

            </div>

        </div>


        <!-- ==================================
             BODY
        =================================== -->

        <div
            class="modal-body">

            <!-- ==============================
                 METADATEN
            =============================== -->

            <section
                id="modalMeta"
                class="modal-meta">

            </section>


            <!-- ==============================
                 BESCHREIBUNG
            =============================== -->

            <section
                id="modalContent"
                class="modal-content"
                hidden>

            </section>


            <!-- ==============================
                 AKTIONEN
            =============================== -->

            <div
                id="modalActions"
                class="modal-actions">

            </div>


            <!-- ==============================
                 FOOTER
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

    </div>

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
    ======================================= -->

    <div
        class="route-modal-overlay"
        data-route-modal-close>

    </div>


    <!-- ======================================
         WINDOW
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

                Route öffnen

            </h3>

        </header>


        <!-- ==================================
             PROVIDER
        =================================== -->

        <div
            class="route-modal-actions">

            <a
                id="routeAppleMaps"
                class="route-provider-button"
                href="#"
                target="_blank"
                rel="noopener">

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
                rel="noopener">

                <span
                    class="route-provider-name">

                    Google Maps

                </span>

            </a>

        </div>

    </div>

</div>