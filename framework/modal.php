<?php
/*
=====================================================
 ECHTE FRÜNDE '22
 MODAL.PHP
 Version 2.0

 EF22 FRAMEWORK
=====================================================
*/

!-- ==========================================================
     MODAL
========================================================== -->

<div id="modal" class="modal hidden" aria-hidden="true">

    <div
    id="modalOverlay"
    class="modal-overlay">
</div>

    <div class="modal-window" role="dialog" aria-modal="true" aria-labelledby="modalTitle">

        <!-- ==========================================================
             MODAL SCHLIESSEN
        ========================================================== -->

        <button
            id="closeModalButton"
            class="modal-close"
            type="button"
            aria-label="Modal schließen">
            ×
        </button>

        <!-- ==========================================================
             MODAL HEADER
        ========================================================== -->

        <header id="modalHeader" class="modal-header">

            <!-- Hero (optional) -->
            <div id="modalImageContainer"
                 class="modal-hero hidden">
                <img
                    id="modalImage"
                    src=""
                    alt="">
            </div>

            <div class="modal-header-content">

                <span
                    id="modalBadge"
                    class="modal-badge hidden">
                </span>

                <h2 id="modalTitle"></h2>

                <p
                    id="modalSubtitle"
                    class="modal-subtitle hidden">
                </p>

            </div>

        </header>

        <!-- ==========================================================
             METADATEN
        ========================================================== -->

        <section
            id="modalMeta"
            class="modal-meta">
        </section>

        <!-- ==========================================================
             INHALT
        ========================================================== -->

        <section
            id="modalContent"
            class="modal-content">
        </section>

        <!-- ==========================================================
             AKTIONEN
        ========================================================== -->

        <footer
            id="modalActions"
            class="modal-actions">
        </footer>

    </div>

</div>

/* ==========================================================
   MODAL
========================================================== */

/* Grundgerüst */
.modal {}

/* Overlay */
.modal-overlay {}

/* Fenster */
.modal-window {}


/* ==========================================================
   MODAL HEADER
========================================================== */

/* Hero */
.modal-hero {}

.modal-hero img {}

/* Header */
.modal-header {}

.modal-header-content {}

/* Badge */
.modal-badge {}

/* Titel */
#modalTitle {}

/* Untertitel */
.modal-subtitle {}


/* ==========================================================
   METADATEN
========================================================== */

.modal-meta {}

.modal-meta-item {}

.modal-meta-icon {}

.modal-meta-text {}

.modal-meta-label {}

.modal-meta-value {}


/* ==========================================================
   INHALT
========================================================== */

.modal-content {}


/* ==========================================================
   AKTIONEN
========================================================== */

.modal-actions {}

.modal-action {}


/* ==========================================================
   MODAL SCHLIESSEN
========================================================== */

.modal-close {}


/* ==========================================================
   RESPONSIVE
========================================================== */

@media (max-width: 768px) {

}

/* ==========================================================
   MODAL
========================================================== */

/* Grundgerüst */
.modal {
    position: fixed;
    inset: 0;
    z-index: 9999;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 2rem;

    opacity: 0;
    visibility: hidden;

    transition:
        opacity .25s ease,
        visibility .25s ease;
}

.modal.show {
    opacity: 1;
    visibility: visible;
}


/* Overlay */
.modal-overlay {
    position: absolute;
    inset: 0;

    background: rgba(0, 0, 0, .65);

    backdrop-filter: blur(6px);
}


/* Fenster */
.modal-window {

    position: relative;

    width: min(720px, 100%);
    max-height: calc(100vh - 4rem);

    display: flex;
    flex-direction: column;

    overflow: hidden;
    overflow-y: auto;

    border-radius: var(--radius-large);

    background: var(--surface);

    box-shadow:
        0 16px 48px rgba(0, 0, 0, .30);

    transform: translateY(24px) scale(.98);

    transition:
        transform .25s ease;
}

.modal.show .modal-window {
    transform: translateY(0) scale(1);
}

/* ==========================================================
   MODAL HEADER
========================================================== */

/* Hero */

.modal-hero {
    width: 100%;
    height: 260px;

    overflow: hidden;

    background: var(--surface-alt);
}

.modal-hero img {
    width: 100%;
    height: 100%;

    display: block;

    object-fit: cover;
}


/* Header */

.modal-header {
    display: flex;
    flex-direction: column;
}

.modal-header-content {
    display: flex;
    flex-direction: column;
    gap: .75rem;

    padding: 2rem;
}


/* Badge */

.modal-badge {
    align-self: flex-start;

    padding: .35rem .8rem;

    border-radius: 999px;

    background: var(--primary);

    color: #fff;

    font-size: .8rem;
    font-weight: 600;
}


/* Titel */

#modalTitle {
    margin: 0;

    color: var(--text);

    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 700;
    line-height: 1.2;
}


/* Untertitel */

.modal-subtitle {
    margin: 0;

    color: var(--text-muted);

    font-size: 1rem;
    line-height: 1.6;
}


/* Optionaler Hero */

.modal-hero.hidden {
    display: none;
}


/* Optionale Elemente */

.modal-badge.hidden,
.modal-subtitle.hidden {
    display: none;
}

/* ==========================================================
   METADATEN
========================================================== */

.modal-meta {

    display: grid;
    gap: 1rem;

    padding: 0 2rem 2rem;
}

.modal-meta:empty {
    display: none;
}


/* Einzelner Eintrag */

.modal-meta-item {

    display: flex;
    align-items: flex-start;
    gap: 1rem;

    padding: 1rem;

    border: 1px solid var(--border);
    border-radius: var(--radius-medium);

    background: var(--surface-alt);
}


/* Icon */

.modal-meta-icon {

    flex-shrink: 0;

    width: 42px;
    height: 42px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50%;

    background: var(--primary-soft);
    color: var(--primary);

    font-size: 1.2rem;
}


/* Text */

.modal-meta-text {

    flex: 1;

    display: flex;
    flex-direction: column;
    gap: .2rem;
}


/* Überschrift */

.modal-meta-label {

    color: var(--text-muted);

    font-size: .8rem;
    font-weight: 600;

    text-transform: uppercase;
    letter-spacing: .05em;
}


/* Wert */

.modal-meta-value {

    color: var(--text);

    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;

    word-break: break-word;
}

/* ==========================================================
   INHALT
========================================================== */

.modal-content {

    padding: 0 2rem 2rem;

    color: var(--text);

    font-size: 1rem;
    line-height: 1.7;
}

.modal-content:empty {
    display: none;
}

.modal-content h2,
.modal-content h3,
.modal-content h4 {

    margin: 0 0 1rem;

    color: var(--text);
}

.modal-content p {

    margin: 0 0 1rem;
}

.modal-content p:last-child {

    margin-bottom: 0;
}

.modal-content ul,
.modal-content ol {

    margin: 0 0 1rem 1.5rem;
}

.modal-content li {

    margin-bottom: .4rem;
}

/* ==========================================================
   MODAL SCHLIESSEN
========================================================== */

.modal-close {

    position: absolute;
    top: 1rem;
    right: 1rem;

    width: 44px;
    height: 44px;

    display: flex;
    justify-content: center;
    align-items: center;

    border: none;
    border-radius: 50%;

    background: rgba(255, 255, 255, .9);

    color: var(--text);

    font-size: 1.5rem;
    line-height: 1;

    cursor: pointer;

    transition:
        background .2s ease,
        transform .2s ease;

    z-index: 10;
}

.modal-close:hover {

    background: #ffffff;

    transform: scale(1.05);
}

.modal-close:active {

    transform: scale(.96);
}

.modal-close:focus-visible {

    outline: 2px solid var(--primary);
    outline-offset: 2px;
}