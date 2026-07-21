<?php
/*
=====================================================
 ECHTE FRÜNDE '22
 MODAL.PHP
 Version 3.0

 EF22 FRAMEWORK
=====================================================
*/
?>

<div
    id="eventModal"
    class="modal"
    aria-hidden="true">

    <div
        class="modal-overlay">

    </div>

    <div
        class="modal-window"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle">

        <!-- =========================================
             SCHLIESSEN
        ========================================== -->

        <button
            id="closeModalButton"
            class="modal-close"
            type="button"
            aria-label="Modal schließen">

            &times;

        </button>

        <!-- =========================================
             HERO
        ========================================== -->

        <div
            id="modalImage"
            class="modal-hero">

        </div>

        <!-- =========================================
             HEADER
        ========================================== -->

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

        <!-- =========================================
             METADATEN
        ========================================== -->

        <section
            id="modalMeta"
            class="modal-meta">

        </section>

        <!-- =========================================
             BESCHREIBUNG
        ========================================== -->

        <section
            id="modalContent"
            class="modal-content">

        </section>

        <!-- =========================================
             AKTIONEN
        ========================================== -->

        <footer
            id="modalActions"
            class="modal-actions">

        </footer>

    </div>

</div>