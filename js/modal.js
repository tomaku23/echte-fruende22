/*
=====================================================
 ECHTE FRÜNDE '22
 MODAL.JS
 Version 3.0
=====================================================

Modal-Komponente des EF22 Frameworks.

Verantwortung:
- Modal öffnen
- Modal schließen
- Event-Inhalte darstellen
- Event-Metadaten darstellen
- Event-Aktionen bereitstellen

Nicht verantwortlich für:
- API
- Kalender
- Hero
- Highlights

=====================================================
*/

"use strict";

window.EF22 ??= {};

/* ==========================================
   MODAL
========================================== */

EF22.modal = {

    /* ==========================================
       STATE
    ========================================== */

    state: {

        event:
            null

    },

    /* ==========================================
       ELEMENTE
    ========================================== */

    elements: {

        modal:
            null,

        overlay:
            null,

        window:
            null,

        closeButton:
            null,

        image:
            null,

        badge:
            null,

        title:
            null,

        meta:
            null,

        content:
            null,

        actions:
            null

    },

    /* ==========================================
       HANDLER
    ========================================== */

    handlers: {

        overlayClick:
            null,

        closeClick:
            null,

        keyDown:
            null

    },

    /* ==========================================
       INITIALISIERUNG
    ========================================== */

    init() {

        this.elements.modal =

            document.getElementById(
                "eventModal"
            );

        if (!this.elements.modal) {

            return;

        }

        this.elements.overlay =

            this.elements.modal.querySelector(
                ".modal-overlay"
            );

        this.elements.window =

            this.elements.modal.querySelector(
                ".modal-window"
            );

        this.elements.closeButton =

            document.getElementById(
                "closeModalButton"
            );

        this.elements.image =

            document.getElementById(
                "modalImage"
            );

        this.elements.badge =

            document.getElementById(
                "modalBadge"
            );

        this.elements.title =

            document.getElementById(
                "modalTitle"
            );

        this.elements.meta =

            document.getElementById(
                "modalMeta"
            );

        this.elements.content =

            document.getElementById(
                "modalContent"
            );

        this.elements.actions =

            document.getElementById(
                "modalActions"
            );

        this.createHandlers();

        this.registerEvents();

    },

    /* ==========================================
       HANDLER ERSTELLEN
    ========================================== */

    createHandlers() {

        this.handlers.overlayClick =

            () => {

                this.close();

            };

        this.handlers.closeClick =

            () => {

                this.close();

            };

        this.handlers.keyDown =

            (event) => {

                if (

                    event.key === "Escape" &&

                    this.state.event

                ) {

                    this.close();

                }

            };

    },

    /* ==========================================
       EVENTS
    ========================================== */

    registerEvents() {

        this.elements.overlay
            ?.addEventListener(

                "click",

                this.handlers.overlayClick

            );

        this.elements.closeButton
            ?.addEventListener(

                "click",

                this.handlers.closeClick

            );

        document.addEventListener(

            "keydown",

            this.handlers.keyDown

        );

    },

    /* ==========================================
       MODAL ÖFFNEN
    ========================================== */

    open(event) {

        if (

            !event ||

            !this.elements.modal

        ) {

            return;

        }

        this.state.event =
            event;

        this.render();

        this.elements.modal.classList.add(
            "show"
        );

        this.elements.modal.setAttribute(

            "aria-hidden",

            "false"

        );

        document.body.classList.add(
            "no-scroll"
        );

        /*
         * Modal beim erneuten Öffnen
         * immer oben beginnen lassen.
         */

        if (this.elements.window) {

            this.elements.window.scrollTop =
                0;

        }

        this.elements.closeButton
            ?.focus();

    },

    /* ==========================================
       MODAL SCHLIESSEN
    ========================================== */

    close() {

        if (!this.elements.modal) {

            return;

        }

        this.elements.modal.classList.remove(
            "show"
        );

        this.elements.modal.setAttribute(

            "aria-hidden",

            "true"

        );

        document.body.classList.remove(
            "no-scroll"
        );

        this.state.event =
            null;

        /*
         * Inhalte zurücksetzen.
         */

        if (this.elements.image) {

            this.elements.image.style.backgroundImage =
                "";

        }

        if (this.elements.badge) {

            this.elements.badge.textContent =
                "";

            this.elements.badge.className =
                "modal-badge";

            this.elements.badge.hidden =
                false;

        }

        if (this.elements.title) {

            this.elements.title.textContent =
                "";

        }

        if (this.elements.meta) {

            this.elements.meta.innerHTML =
                "";

        }

        if (this.elements.content) {

            this.elements.content.innerHTML =
                "";

            this.elements.content.hidden =
                false;

        }

        if (this.elements.actions) {

            this.elements.actions.innerHTML =
                "";

            this.elements.actions.hidden =
                false;

        }

    },
    
        /* ==========================================
       RENDERN
    ========================================== */

    render() {

        if (!this.state.event) {

            return;

        }

        this.renderHeader();

        this.renderMeta();

        this.renderContent();

        this.renderActions();

    },

    /* ==========================================
       HEADER RENDERN
    ========================================== */

    renderHeader() {

        if (!this.state.event) {

            return;

        }

        const event =
            this.state.event;

        const props =

            EF22.utils.getProps(
                event
            );

        /* ======================================
           BILD
        ====================================== */

        if (this.elements.image) {

            const image =

                props.image &&

                String(
                    props.image
                ).trim() !== ""

                    ? String(
                        props.image
                    )

                    : EF22.config
                        ?.images
                        ?.heroFallbackLandscape;

            this.elements.image.style.backgroundImage =

                image

                    ? `url("${image}")`

                    : "";

        }

        /* ======================================
           BADGE

           Das Badge verwendet TYPE.

           category ist ausdrücklich NICHT
           für das Badge zuständig.
        ====================================== */

        if (this.elements.badge) {

            this.elements.badge.className =
                "modal-badge";

            const type =

                props.type &&

                String(
                    props.type
                ).trim() !== ""

                    ? String(
                        props.type
                    ).trim()

                    : "";

            if (type) {

                EF22.utils.addBadgeClass(

                    this.elements.badge,

                    type

                );

                this.elements.badge.textContent =
                    type;

                this.elements.badge.hidden =
                    false;

            }

            else {

                this.elements.badge.textContent =
                    "";

                this.elements.badge.hidden =
                    true;

            }

        }

        /* ======================================
           TITEL

           Der eigentliche Event-Titel kommt
           direkt aus event.title.
        ====================================== */

        if (this.elements.title) {

            this.elements.title.textContent =

                event.title ??

                "";

        }

    },

    /* ==========================================
       METADATEN RENDERN
    ========================================== */

    renderMeta() {

        if (

            !this.elements.meta ||

            !this.state.event

        ) {

            return;

        }

        const event =
            this.state.event;

        const props =

            EF22.utils.getProps(
                event
            );

        const meta =
            [];

        /* ======================================
           DATUM
        ====================================== */

        const date =

            EF22.utils.formatEventDate(
                event
            );

        if (date) {

            meta.push({

                label:
                    "Datum",

                value:
                    date

            });

        }

        /* ======================================
           UHRZEIT

           Ganztägig bleibt eine Information
           über die Uhrzeit, nicht über den
           Datumsbereich.
        ====================================== */

        const time =

            EF22.utils.formatEventTime(
                event
            );

        if (time) {

            meta.push({

                label:
                    "Uhrzeit",

                value:
                    time

            });

        }

        /* ======================================
           ADRESSE

           Im Modal wird ausschließlich die
           vollständige Adresse verwendet.

           location gehört zur HeroCard und
           wird hier nicht als Ersatz benutzt.
        ====================================== */

        if (

            props.address &&

            String(
                props.address
            ).trim() !== ""

        ) {

            meta.push({

                label:
                    "Adresse",

                value:
                    String(
                        props.address
                    ).trim()

            });

        }

        /* ======================================
           TREFFPUNKT
        ====================================== */

        if (

            props.meeting &&

            String(
                props.meeting
            ).trim() !== ""

        ) {

            meta.push({

                label:
                    "Treffpunkt",

                value:
                    String(
                        props.meeting
                    ).trim()

            });

        }

        /* ======================================
           DRESSCODE
        ====================================== */

        if (

            props.dresscode &&

            String(
                props.dresscode
            ).trim() !== ""

        ) {

            meta.push({

                label:
                    "Dresscode",

                value:
                    String(
                        props.dresscode
                    ).trim()

            });

        }

        /* ======================================
           KONTAKT
        ====================================== */

        if (

            props.contact &&

            String(
                props.contact
            ).trim() !== ""

        ) {

            meta.push({

                label:
                    "Kontakt",

                value:
                    String(
                        props.contact
                    ).trim()

            });

        }

        /* ======================================
           AUSGABE
        ====================================== */

        this.elements.meta.innerHTML =

            meta
                .map(

                    (item) => {

                        const label =

                            EF22.utils.escapeHtml(
                                item.label
                            );

                        const value =

                            EF22.utils.escapeHtml(
                                item.value
                            );

                        return `

                            <div class="modal-meta-item">

                                <div class="modal-meta-label">

                                    ${label}

                                </div>

                                <div class="modal-meta-value">

                                    ${value}

                                </div>

                            </div>

                        `;

                    }

                )
                .join("");

        this.elements.meta.hidden =

            meta.length === 0;

    },

    /* ==========================================
       BESCHREIBUNG RENDERN
    ========================================== */

    renderContent() {

        if (

            !this.elements.content ||

            !this.state.event

        ) {

            return;

        }

        const props =

            EF22.utils.getProps(
                this.state.event
            );

        const description =

            props.description &&

            String(
                props.description
            ).trim() !== ""

                ? String(
                    props.description
                ).trim()

                : "";

        if (!description) {

            this.elements.content.innerHTML =
                "";

            this.elements.content.hidden =
                true;

            return;

        }

        /*
         * Beschreibung wird bewusst escaped.

         * Inhalte aus dem Kalender dürfen
         * dadurch kein beliebiges HTML in
         * das Modal einschleusen.
        */

        const safeDescription =

            EF22.utils.escapeHtml(
                description
            );

        this.elements.content.innerHTML =

            `<p>${safeDescription}</p>`;

        this.elements.content.hidden =
            false;

    },
    
        /* ==========================================
       AKTIONEN RENDERN
    ========================================== */

    renderActions() {

        if (

            !this.elements.actions ||

            !this.state.event

        ) {

            return;

        }

        const props =

            EF22.utils.getProps(
                this.state.event
            );

        const actions =
            [];

        /* ======================================
           ROUTE

           Die Route verwendet ausschließlich
           die vollständige Adresse.

           location ist nur für die HeroCard
           vorgesehen.
        ====================================== */

        if (

            props.address &&

            String(
                props.address
            ).trim() !== ""

        ) {

            const address =

                String(
                    props.address
                ).trim();

            const routeUrl =

                `https://www.google.com/maps/search/?api=1&query=${

                    encodeURIComponent(
                        address
                    )

                }`;

            actions.push(`

                <a
                    class="btn btn-outline"
                    href="${routeUrl}"
                    target="_blank"
                    rel="noopener noreferrer">

                    Route

                </a>

            `);

        }

        /* ======================================
           TICKETS
        ====================================== */

        if (

            props.ticket &&

            String(
                props.ticket
            ).trim() !== ""

        ) {

            const ticketUrl =

                EF22.utils.escapeHtml(

                    String(
                        props.ticket
                    ).trim()

                );

            actions.push(`

                <a
                    class="btn"
                    href="${ticketUrl}"
                    target="_blank"
                    rel="noopener noreferrer">

                    Tickets

                </a>

            `);

        }

        /* ======================================
           AUSGABE
        ====================================== */

        this.elements.actions.innerHTML =

            actions.join("");

        this.elements.actions.hidden =

            actions.length === 0;

    },

    /* ==========================================
       DESTROY
    ========================================== */

    destroy() {

        this.elements.overlay
            ?.removeEventListener(

                "click",

                this.handlers.overlayClick

            );

        this.elements.closeButton
            ?.removeEventListener(

                "click",

                this.handlers.closeClick

            );

        if (this.handlers.keyDown) {

            document.removeEventListener(

                "keydown",

                this.handlers.keyDown

            );

        }

        document.body.classList.remove(
            "no-scroll"
        );

        if (this.elements.modal) {

            this.elements.modal.classList.remove(
                "show"
            );

            this.elements.modal.setAttribute(

                "aria-hidden",

                "true"

            );

        }

        this.state.event =
            null;

        this.handlers.overlayClick =
            null;

        this.handlers.closeClick =
            null;

        this.handlers.keyDown =
            null;

        this.elements.modal =
            null;

        this.elements.overlay =
            null;

        this.elements.window =
            null;

        this.elements.closeButton =
            null;

        this.elements.image =
            null;

        this.elements.badge =
            null;

        this.elements.title =
            null;

        this.elements.meta =
            null;

        this.elements.content =
            null;

        this.elements.actions =
            null;

    }

};