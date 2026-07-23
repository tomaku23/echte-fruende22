/*
=====================================================
 EF22 FRAMEWORK
 NAVIGATION-INDICATOR.JS
 Version 6.0
=====================================================
*/

"use strict";

window.EF22 ??= {};

EF22.navigationIndicator = {

    /* ==========================================
       STATE
    ========================================== */

    state: {

        mode: "start",

        originalParent: null,

        originalNextSibling: null

    },

    /* ==========================================
       ELEMENTE
    ========================================== */

    elements: {

        indicator: null,

        anchor: null,

        footerArea: null

    },

    /* ==========================================
       HANDLER
    ========================================== */

    handlers: {},

    /* ==========================================
       INITIALISIERUNG
    ========================================== */

    init() {

        this.elements.indicator =
            document.getElementById(
                "navigationIndicator"
            );

        this.elements.anchor =
            document.querySelector(
                "[data-navigation-indicator-anchor]"
            );

        this.elements.footerArea =
            document.querySelector(
                ".footer-area"
            );

        if (!this.elements.indicator) {

            return;

        }

        this.state.originalParent =
            this.elements.indicator.parentNode;

        this.state.originalNextSibling =
            this.elements.indicator.nextSibling;

        this.createHandlers();

        this.registerEvents();

        this.update();

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

        this.elements.indicator.addEventListener(

            "click",

            this.handlers.click

        );

    },

    /* ==========================================
       UPDATE
    ========================================== */

    update() {

        if (this.isAtAnchor()) {

            this.setMode("park");

            return;

        }

        if (window.scrollY === 0) {

            this.setMode("start");

            return;

        }

        this.setMode("scroll");

    },

    /* ==========================================
       PARK ANCHOR
    ========================================== */

    isAtAnchor() {

        if (!this.elements.anchor) {

            return false;

        }

        const anchorTop =
            this.elements.anchor
                .getBoundingClientRect()
                .top;

        const indicatorRect =
            this.elements.indicator
                .getBoundingClientRect();

        return anchorTop <= indicatorRect.top;

    },

    /* ==========================================
       MODUS
    ========================================== */

    setMode(mode) {

        if (!this.elements.indicator) {

            return;

        }

        if (

            mode === "park" &&

            this.state.mode !== "park"

        ) {

            this.park();

        }

        if (

            mode !== "park" &&

            this.state.mode === "park"

        ) {

            this.unpark();

        }

        this.state.mode = mode;

        this.elements.indicator.classList.remove(

            "navigation-indicator--compact",
            "navigation-indicator--park",
            "navigation-indicator--up",
            "navigation-indicator--bounce"

        );

        if (mode === "start") {

            this.elements.indicator.classList.add(

                "navigation-indicator--bounce"

            );

            this.elements.indicator.setAttribute(

                "aria-label",

                "Nach unten scrollen"

            );

            return;

        }

        if (mode === "scroll") {

            this.elements.indicator.classList.add(

                "navigation-indicator--compact"

            );

            this.elements.indicator.setAttribute(

                "aria-label",

                "Nach unten scrollen"

            );

            return;

        }

        if (mode === "park") {

            this.elements.indicator.classList.add(

                "navigation-indicator--compact",
                "navigation-indicator--park",
                "navigation-indicator--up"

            );

            this.elements.indicator.setAttribute(

                "aria-label",

                "Nach oben scrollen"

            );

        }

    },

    /* ==========================================
       PARKEN
    ========================================== */

    park() {

        if (!this.elements.footerArea) {

            return;

        }

        this.elements.footerArea.appendChild(

            this.elements.indicator

        );

    },

    /* ==========================================
       PARKPOSITION VERLASSEN
    ========================================== */

    unpark() {

        if (!this.state.originalParent) {

            return;

        }

        if (

            this.state.originalNextSibling &&

            this.state.originalNextSibling.parentNode ===
                this.state.originalParent

        ) {

            this.state.originalParent.insertBefore(

                this.elements.indicator,

                this.state.originalNextSibling

            );

            return;

        }

        this.state.originalParent.appendChild(

            this.elements.indicator

        );

    },

    /* ==========================================
       INTERAKTION
    ========================================== */

    onClick() {

        if (this.state.mode !== "park") {

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

        window.removeEventListener(

            "scroll",

            this.handlers.scroll

        );

        this.elements.indicator?.removeEventListener(

            "click",

            this.handlers.click

        );

        if (this.state.mode === "park") {

            this.unpark();

        }

        this.handlers = {};

    }

};