<?php

/*
=====================================================
EF22 FRAMEWORK
MODAL.PHP
Version 1.0
=====================================================
*/

if (!function_exists("renderModal")) {

    function renderModal()
    {
?>

<div
    id="eventModal"
    class="modal"
    hidden
>

    <div
        class="modal-content modal-event"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
    >

        <button
            class="modal-close"
            type="button"
            aria-label="Schließen"
        >
            ×
        </button>

        <div id="modalHero">

        </div>

        <div class="modal-body">

            <h2
                id="modalTitle"
                class="modal-title">
            </h2>

            <div
                id="modalMeta"
                class="modal-meta">

                <div id="modalDateRow"></div>

                <div id="modalTimeRow"></div>

                <div id="modalLocationRow"></div>

                <div id="modalMeetingRow"></div>

                <div id="modalDresscodeRow"></div>

                <div id="modalContactRow"></div>

            </div>

            <div
                id="modalContent"
                class="modal-content-text">
            </div>

        </div>

    </div>

</div>

<?php

    }

}