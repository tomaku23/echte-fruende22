/*
=====================================================
 ECHTE FRÜNDE '22
 MODAL.JS
 Version 4.0

 EF22 FRAMEWORK
=====================================================

Modal-Komponente des EF22 Frameworks.

Verantwortung:
- Event-Modal öffnen
- Event-Modal schließen
- Eventdaten darstellen
- Routenauswahl öffnen
- Routenauswahl schließen
- Kartenlinks erzeugen

Nicht verantwortlich für:
- API
- Kalender
- Hero
- Highlights

Ebenen:

Ebene 1:
- Website

Ebene 2:
- Event-Modal

Ebene 3:
- Routenauswahl

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
            null,

        routeOpen:
            false,

        previousFocus:
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
            null,

        routeModal:
            null,

        routeOverlay:
            null,

        routeWindow:
            null,

        routeApple:
            null,

        routeGoogle:
            null

    },

    /* ==========================================
       HANDLER
    ========================================== */

    handlers: {

        modalOverlayClick:
            null,

        closeClick:
            null,

        routeOverlayClick:
            null,

        keyDown:
            null

    },

    /* ==========================================
       INITIALISIERUNG
    ========================================== */

    init() {

        /* ======================================
           EVENT MODAL
        ====================================== */

        this.elements.modal =

            document.getElementById(
                "eventModal"
            );

        this.elements.overlay =

            this.elements.modal
                ?.querySelector(
                    "[data-modal-close]"
                ) ??
            null;

        this.elements.window =

            this.elements.modal
                ?.querySelector(
                    ".modal-window"
                ) ??
            null;

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

        /* ======================================
           ROUTEN MODAL
        ====================================== */

        this.elements.routeModal =

            document.getElementById(
                "routeModal"
            );

        this.elements.routeOverlay =

            this.elements.routeModal
                ?.querySelector(
                    "[data-route-close]"
                ) ??
            null;

        this.elements.routeWindow =

            this.elements.routeModal
                ?.querySelector(
                    ".route-modal-window"
                ) ??
            null;

        this.elements.routeApple =

            document.getElementById(
                "routeAppleMaps"
            );

        this.elements.routeGoogle =

            document.getElementById(
                "routeGoogleMaps"
            );

        /* ======================================
           PRÜFUNG
        ====================================== */

        if (!this.elements.modal) {

            return;

        }

        this.createHandlers();

        this.registerEvents();

    },

    /* ==========================================
       HANDLER ERSTELLEN
    ========================================== */

    createHandlers() {

        this.handlers.modalOverlayClick =

            () => {

                this.close();

            };

        this.handlers.closeClick =

            () => {

                this.close();

            };

        this.handlers.routeOverlayClick =

            () => {

                this.closeRoute();

            };

        this.handlers.keyDown =

            (event) => {

                this.onKeyDown(
                    event
                );

            };

    },

    /* ==========================================
       EVENTS REGISTRIEREN
    ========================================== */

    registerEvents() {

        this.elements.overlay
            ?.addEventListener(

                "click",

                this.handlers.modalOverlayClick

            );

        this.elements.closeButton
            ?.addEventListener(

                "click",

                this.handlers.closeClick

            );

        this.elements.routeOverlay
            ?.addEventListener(

                "click",

                this.handlers.routeOverlayClick

            );

        document.addEventListener(

            "keydown",

            this.handlers.keyDown

        );

    },

    /* ==========================================
       KEYBOARD
    ========================================== */

    onKeyDown(event) {

        if (

            event.key !==
            "Escape"

        ) {

            return;

        }

        /*
         * Ebene 3 ist geöffnet:
         * Nur Ebene 3 schließen.
        */

        if (this.state.routeOpen) {

            this.closeRoute();

            return;

        }

        /*
         * Ebene 2 ist geöffnet:
         * Event-Modal schließen.
        */

        if (this.state.event) {

            this.close();

        }

    },

    /* ==========================================
       EVENT MODAL ÖFFNEN
    ========================================== */

    open(event) {

        if (

            !event ||

            !this.elements.modal

        ) {

            return;

        }

        /*
         * Element merken, das vor dem Öffnen
         * den Fokus hatte.
        */

        this.state.previousFocus =

            document.activeElement instanceof HTMLElement

                ? document.activeElement

                : null;

        this.state.event =
            event;

        this.state.routeOpen =
            false;

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
         * Beim Öffnen steht der Nutzer oben.
        */

        if (this.elements.window) {

            this.elements.window.scrollTop =
                0;

        }

        /*
         * Da es oben bewusst kein X mehr gibt,
         * fokussieren wir nicht künstlich den
         * unteren Schließen-Button.
        */

        this.elements.window?.focus?.();

    },

    /* ==========================================
       EVENT MODAL SCHLIESSEN
    ========================================== */

    close() {

        if (!this.elements.modal) {

            return;

        }

        /*
         * Ebene 3 zuerst zurücksetzen.
        */

        this.closeRoute(
            false
        );

        this.elements.modal.classList.remove(
            "show"
        );

        this.elements.modal.classList.remove(
            "route-is-open"
        );

        this.elements.modal.setAttribute(

            "aria-hidden",

            "true"

        );

        document.body.classList.remove(
            "no-scroll"
        );

        this.clear();

        /*
         * Fokus zum ursprünglichen Element
         * zurückgeben.
        */

        if (

            this.state.previousFocus &&

            document.contains(
                this.state.previousFocus
            )

        ) {

            this.state.previousFocus.focus?.();

        }

        this.state.previousFocus =
            null;

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
       HEADER
    ========================================== */

    renderHeader() {

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
                        ?.heroFallbackLandscape ??
                      "";

            this.elements.image.style.backgroundImage =

                image

                    ? `url("${image}")`

                    : "";

        }

        /* ======================================
           BADGE

           type = Badge-Inhalt

           category wird hier bewusst NICHT
           als sichtbarer Text verwendet.
        ====================================== */

        if (this.elements.badge) {

            this.elements.badge.className =
                "modal-badge";

            const badgeText =

                props.type &&

                String(
                    props.type
                ).trim() !== ""

                    ? String(
                        props.type
                    )

                    : "";

            if (badgeText) {

                this.elements.badge.hidden =
                    false;

                this.elements.badge.textContent =
                    badgeText;

                /*
                 * Für bestehende Badge-Farben
                 * verwenden wir weiterhin die
                 * vorhandene Klassenzuordnung.
                */

                EF22.utils.addBadgeClass(

                    this.elements.badge,

                    props.type

                );

            }

            else {

                this.elements.badge.hidden =
                    true;

                this.elements.badge.textContent =
                    "";

            }

        }

        /* ======================================
           TITEL
        ====================================== */

        if (this.elements.title) {

            this.elements.title.textContent =

                event.title ??
                "";

        }

    },

    /* ==========================================
       METADATEN
    ========================================== */

    renderMeta() {

        if (!this.elements.meta) {

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

        const eventDate =

            EF22.utils.formatEventDate(
                event
            );

        if (eventDate) {

            meta.push({

                label:
                    "Datum",

                value:
                    eventDate

            });

        }

        /* ======================================
           UHRZEIT

           Bei Ganztagsterminen brauchen wir
           keine zusätzliche Zeile
           "Ganztägig".
        ====================================== */

        if (!event.allDay) {

            const eventTime =

                EF22.utils.formatEventTime(
                    event
                );

            if (eventTime) {

                meta.push({

                    label:
                        "Uhrzeit",

                    value:
                        eventTime

                });

            }

        }

        /* ======================================
           ORT

           Im Modal ausschließlich die
           vollständige Adresse.

           location bleibt für Hero usw.
        ====================================== */

        if (

            props.address &&

            String(
                props.address
            ).trim() !== ""

        ) {

            meta.push({

                label:
                    "Ort",

                value:
                    String(
                        props.address
                    )

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
                    )

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
                    )

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
                    )

            });

        }

        /* ======================================
           HTML
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

                            <div
                                class="modal-meta-item">

                                <div
                                    class="modal-meta-label">

                                    ${label}

                                </div>

                                <div
                                    class="modal-meta-value">

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
       BESCHREIBUNG
    ========================================== */

    renderContent() {

        if (!this.elements.content) {

            return;

        }

        const props =

            EF22.utils.getProps(
                this.state.event
            );

        const description =

            props.description

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

        this.elements.content.hidden =
            false;

        /*
         * Beschreibung wird bewusst als Text
         * behandelt.

         * Zeilenumbrüche bleiben erhalten,
         * fremdes HTML wird nicht ausgeführt.
        */

        const safeDescription =

            EF22.utils
                .escapeHtml(
                    description
                )
                .replace(
                    /\n/g,
                    "<br>"
                );

        this.elements.content.innerHTML =

            `<p>${safeDescription}</p>`;

    },

    /* ==========================================
       AKTIONEN
    ========================================== */

    renderActions() {

        if (!this.elements.actions) {

            return;

        }

        const props =

            EF22.utils.getProps(
                this.state.event
            );

        this.elements.actions.innerHTML =
            "";

        let hasActions =
            false;

        /* ======================================
           ROUTE
        ====================================== */

        if (

            props.address &&

            String(
                props.address
            ).trim() !== ""

        ) {

            const routeButton =

                document.createElement(
                    "button"
                );

            routeButton.type =
                "button";

            routeButton.className =
                "modal-action-button modal-route-button";

            routeButton.textContent =
                "Route öffnen";

            routeButton.addEventListener(

                "click",

                () => {

                    this.openRoute();

                }

            );

            this.elements.actions.append(
                routeButton
            );

            hasActions =
                true;

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

            const ticketButton =

                document.createElement(
                    "a"
                );

            ticketButton.className =
                "modal-action-button modal-ticket-button";

            ticketButton.href =
                String(
                    props.ticket
                );

            ticketButton.target =
                "_blank";

            ticketButton.rel =
                "noopener noreferrer";

            ticketButton.textContent =
                "Tickets";

            this.elements.actions.append(
                ticketButton
            );

            hasActions =
                true;

        }

        this.elements.actions.hidden =
            !hasActions;

    },

    /* ==========================================
       ROUTENAUSWAHL ÖFFNEN
       EBENE 3
    ========================================== */

    openRoute() {

        if (

            !this.state.event ||

            !this.elements.routeModal

        ) {

            return;

        }

        const props =

            EF22.utils.getProps(
                this.state.event
            );

        const address =

            props.address

                ? String(
                    props.address
                ).trim()

                : "";

        if (!address) {

            return;

        }

        this.setRouteLinks(
            address
        );

        this.state.routeOpen =
            true;

        /*
         * Event-Modal bekommt einen eigenen
         * Zustand, damit CSS Ebene 2 unter
         * Ebene 3 optisch zurücknehmen kann.
        */

        this.elements.modal?.classList.add(
            "route-is-open"
        );

        this.elements.routeModal.classList.add(
            "show"
        );

        this.elements.routeModal.setAttribute(

            "aria-hidden",

            "false"

        );

        /*
         * Fokus auf die erste konkrete
         * Auswahlmöglichkeit.
        */

        this.elements.routeApple?.focus();

    },

    /* ==========================================
       ROUTENAUSWAHL SCHLIESSEN
    ========================================== */

    closeRoute(returnFocus = true) {

        if (!this.elements.routeModal) {

            return;

        }

        const wasOpen =
            this.state.routeOpen;

        this.state.routeOpen =
            false;

        this.elements.routeModal.classList.remove(
            "show"
        );

        this.elements.routeModal.setAttribute(

            "aria-hidden",

            "true"

        );

        this.elements.modal?.classList.remove(
            "route-is-open"
        );

        if (this.elements.routeApple) {

            this.elements.routeApple.href =
                "#";

        }

        if (this.elements.routeGoogle) {

            this.elements.routeGoogle.href =
                "#";

        }

        /*
         * Bei Klick außerhalb geht es zurück
         * zum Event-Modal.

         * Fokus landet sinnvollerweise wieder
         * beim Route-Button.
        */

        if (

            returnFocus &&

            wasOpen

        ) {

            this.elements.actions
                ?.querySelector(
                    ".modal-route-button"
                )
                ?.focus();

        }

    },

    /* ==========================================
       KARTENLINKS
    ========================================== */

    setRouteLinks(address) {

        const query =

            encodeURIComponent(
                address
            );

        /*
         * Apple Karten
        */

        if (this.elements.routeApple) {

            this.elements.routeApple.href =

                `https://maps.apple.com/?q=${query}`;

        }

        /*
         * Google Maps
        */

        if (this.elements.routeGoogle) {

            this.elements.routeGoogle.href =

                `https://www.google.com/maps/search/?api=1&query=${query}`;

        }

    },

    /* ==========================================
       INHALTE LEEREN
    ========================================== */

    clear() {

        this.state.event =
            null;

        this.state.routeOpen =
            false;

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

            this.elements.meta.hidden =
                false;

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
       DESTROY
    ========================================== */

    destroy() {

        this.elements.overlay
            ?.removeEventListener(

                "click",

                this.handlers.modalOverlayClick

            );

        this.elements.closeButton
            ?.removeEventListener(

                "click",

                this.handlers.closeClick

            );

        this.elements.routeOverlay
            ?.removeEventListener(

                "click",

                this.handlers.routeOverlayClick

            );

        document.removeEventListener(

            "keydown",

            this.handlers.keyDown

        );

        this.close();

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

        this.elements.routeModal =
            null;

        this.elements.routeOverlay =
            null;

        this.elements.routeWindow =
            null;

        this.elements.routeApple =
            null;

        this.elements.routeGoogle =
            null;

    }

};