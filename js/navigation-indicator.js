/*
=====================================================
 EF22 FRAMEWORK
 NAVIGATION-INDICATOR.JS
 Version 5.0
=====================================================

Komponente:
Navigation Indicator

Verantwortung:
- Weiteren Seiteninhalt anzeigen
- Scrollzustand darstellen
- Am Footer parken
- Am Seitenende Scroll-to-top anbieten

Zustände:
- start
- scroll
- park

=====================================================
*/

"use strict";

window.EF22 ??= {};

EF22.navigationIndicator = {

    /* ==========================================
       STATE
    ========================================== */

    state: {

        mode: "start"

    },

    /* ==========================================
       ELEMENTE
    ========================================== */

    elements: {

        root: null,

        footer: null

    },

    /* ==========================================
       HANDLER
    ========================================== */

    handlers: {},

    /* ==========================================
       INITIALISIERUNG
    ========================================== */

    init() {

        this.cacheDom();

        if (!this.elements.root) {

            return;

        }

        this.createHandlers();

        this.registerEvents();

        this.refresh();

    },

    /* ==========================================
       DOM
    ========================================== */

    cacheDom() {

        this.elements.root =
            document.getElementById(
                "navigationIndicator"
            );

        this.elements.footer =
            document.querySelector(
                ".footer"
            );

    },

    /* ==========================================
       HANDLER
    ========================================== */

    createHandlers() {

        this.handlers.scroll = () =>

            this.update();

        this.handlers.click = () =>

            this.onClick();

    },

    /* ==========================================
       EVENTS
    ========================================== */

    registerEvents() {

        window.addEventListener(

            "scroll",

            this.handlers.scroll,

            {

                passive: true

            }

        );

        this.elements.root.addEventListener(

            "click",

            this.handlers.click

        );

    },

    unregisterEvents() {

        window.removeEventListener(

            "scroll",

            this.handlers.scroll

        );

        this.elements.root?.removeEventListener(

            "click",

            this.handlers.click

        );

    },

    /* ==========================================
       ÖFFENTLICHE METHODEN
    ========================================== */

    refresh() {

        this.update();

    },

    /* ==========================================
       UPDATE
    ========================================== */

    update() {

        this.updatePosition();

        if (

            this.state.mode !== "park"

        ) {

            this.updateState();

        }

    },

    /* ==========================================
       POSITION
    ========================================== */

    updatePosition() {

        if (

            !this.elements.root ||

            !this.elements.footer

        ) {

            return;

        }

        const config =

            EF22.config.navigationIndicator;

        const footerTop =

            this.elements.footer
                .getBoundingClientRect()
                .top;

        const parkLine =

            window.innerHeight -

            config.parkBottom;

        if (

            footerTop <= parkLine

        ) {

            this.elements.root.style.bottom =

                `${config.parkBottom}px`;

            this.setState(

                "park"

            );

            return;

        }

        this.elements.root.style.bottom =

            `${config.defaultBottom}px`;

    },

    /* ==========================================
       STATE
    ========================================== */

    updateState() {

        if (

            window.scrollY === 0

        ) {

            this.setState(

                "start"

            );

            return;

        }

        this.setState(

            "scroll"

        );

    },

    setState(mode) {

        if (!this.elements.root) {

            return;

        }

        this.state.mode = mode;

        this.elements.root.classList.remove(

            "navigation-indicator--compact",
            "navigation-indicator--park",
            "navigation-indicator--up",
            "navigation-indicator--bounce"

        );

        switch (mode) {

            case "start":

                this.elements.root.classList.add(

                    "navigation-indicator--bounce"

                );

                this.elements.root.setAttribute(

                    "aria-label",

                    "Nach unten scrollen"

                );

                break;

            case "scroll":

                this.elements.root.classList.add(

                    "navigation-indicator--compact"

                );

                this.elements.root.setAttribute(

                    "aria-label",

                    "Nach unten scrollen"

                );

                break;

            case "park":

                this.elements.root.classList.add(

                    "navigation-indicator--compact",
                    "navigation-indicator--park",
                    "navigation-indicator--up"

                );

                this.elements.root.setAttribute(

                    "aria-label",

                    "Nach oben scrollen"

                );

                break;

        }

    },

    /* ==========================================
       INTERAKTION
    ========================================== */

    onClick() {

        if (

            this.state.mode !== "park"

        ) {

            return;

        }

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    },

    /* ==========================================
       DESTROY
    ========================================== */

    destroy() {

        this.unregisterEvents();

        this.state.mode = "start";

        this.elements.root = null;

        this.elements.footer = null;

        this.handlers = {};

    }

};