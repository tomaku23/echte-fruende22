<?php
/*
=====================================================
 ECHTE FRÜNDE '22
 MODAL.PHP
 Version 2.0

 EF22 FRAMEWORK
=====================================================
*/

if (!function_exists("renderModal")) {

    function renderModal()
    {

?>

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

        <!-- ==========================================
             HERO
        ========================================== -->

        <header
            id="modalHero"
            class="modal-hero">

            <div
                id="modalImage"
                class="modal-image">

                <div class="modal-image-overlay"></div>

                <div class="modal-hero-content">

                    <div
                        id="modalBadge"
                        class="modal-badge">

                    </div>

                    <h2 id="modalTitle">

                    </h2>

                </div>

            </div>

        </header>

        <!-- ==========================================
             CONTENT
        ========================================== -->

        <div
            id="modalContent"
            class="modal-content">
            
                        <!-- ==========================================
                 METADATEN
            ========================================== -->

            <div
                id="modalMeta"
                class="modal-meta">

                <div
                    id="modalLocationRow"
                    class="modal-row">

                    <i class="fa-solid fa-location-dot"></i>

                    <div>

                        <strong>Veranstaltungsort</strong>

                        <span id="modalLocation"></span>

                    </div>

                </div>

                <div
                    id="modalDateRow"
                    class="modal-row">

                    <i class="fa-regular fa-calendar"></i>

                    <div>

                        <strong>Datum</strong>

                        <span id="modalDate"></span>

                    </div>

                </div>

                <div
                    id="modalTimeRow"
                    class="modal-row">

                    <i class="fa-regular fa-clock"></i>

                    <div>

                        <strong>Uhrzeit</strong>

                        <span id="modalTime"></span>

                    </div>

                </div>

                <div
                    id="modalDresscodeRow"
                    class="modal-row">

                    <i class="fa-solid fa-shirt"></i>

                    <div>

                        <strong>Dresscode</strong>

                        <span id="modalDresscode"></span>

                    </div>

                </div>

                <div
                    id="modalMeetingRow"
                    class="modal-row">

                    <i class="fa-solid fa-people-group"></i>

                    <div>

                        <strong>Treffpunkt</strong>

                        <span id="modalMeeting"></span>

                    </div>

                </div>

                <div
                    id="modalContactRow"
                    class="modal-row">

                    <i class="fa-solid fa-user"></i>

                    <div>

                        <strong>Ansprechpartner</strong>

                        <span id="modalContact"></span>

                    </div>

                </div>

            </div>

            <!-- ==========================================
                 BESCHREIBUNG
            ========================================== -->

            <section
                id="modalDescriptionSection"
                class="modal-description-section">

                <h3>Beschreibung</h3>

                <div
                    id="modalDescription"
                    class="modal-description">

                </div>

            </section>
            
                        <!-- ==========================================
                 AKTIONEN
            ========================================== -->

            <div
                id="modalButtons"
                class="modal-buttons">

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

</div>

<?php

    }

}

