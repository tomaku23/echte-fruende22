<?php
/*
=====================================================
 ECHTE FRÜNDE '22
 MODAL.PHP
 Version 3.1

 EF22 FRAMEWORK
=====================================================

Struktur für das Event-Modal.

Inhalte werden vollständig durch
modal.js erzeugt.

=====================================================
*/
?>

<!-- ==========================================
     EVENT MODAL
========================================== -->

<div
    id="eventModal"
    class="modal"
    aria-hidden="true">

    <!-- ==========================================
         OVERLAY
    =========================================== -->

    <div
        class="modal-overlay"
        aria-hidden="true">

    </div>

    <!-- ==========================================
         MODAL WINDOW
    =========================================== -->

    <div
        class="modal-window"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle">

        <!-- ======================================
             SCHLIESSEN
        ======================================= -->

        <button
            id="closeModalButton"
            class="modal-close"
            type="button"
            aria-label="Modal schließen">

            &times;

        </button>

        <!-- ======================================
             HERO
        ======================================= -->

        <div
            id="modalImage"
            class="modal-hero"
            aria-hidden="true">

        </div>

        <!-- ======================================
             HEADER
        ======================================= -->

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

        <!-- ======================================
             METADATEN
        ======================================= -->

        <section
            id="modalMeta"
            class="modal-meta"
            aria-label="Termininformationen">

        </section>

        <!-- ======================================
             BESCHREIBUNG
        ======================================= -->

        <section
            id="modalContent"
            class="modal-content">

        </section>

        <!-- ======================================
             AKTIONEN
        ======================================= -->

        <footer
            id="modalActions"
            class="modal-actions">

        </footer>

    </div>

</div>