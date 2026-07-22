/*
=====================================================
 EF22 FRAMEWORK
 HEADER.JS
 Version 9.0
=====================================================
*/

"use strict";

window.EF22 ??= {};

EF22.header = {

    /* ==========================================
       STATE
    ========================================== */

    state: {

        isCompact: false,

        isNavigationOpen: false

    },

    /* ==========================================
       ELEMENTE
    ========================================== */

    elements: {},

    /* ==========================================
       EVENTS
    ========================================== */

    handlers: {},

    /* ==========================================
       INITIALISIERUNG
    ========================================== */

    init() {

        this.elements = EF22.dom.register(

            document.querySelector(

                "[data-header=\"root\"]"

            ),

            "data-header"

        );

        if (

            !this.elements.root

        ) {

            return;

        }

        this.elements.burger?.setAttribute(

            "aria-expanded",

            "false"

        );

        this.elements.navigation?.setAttribute(

            "aria-hidden",

            "true"

        );

        this.createHandlers();

        this.registerEvents();

        this.updateHeader();

    },

    /* ==========================================
       HANDLER
    ========================================== */

    createHandlers() {

        this.handlers.scroll = () =>

            this.onScroll();

        this.handlers.burger = () =>

            this.toggleNavigation();

        this.handlers.overlay = () =>

            this.closeNavigation();

        this.handlers.keydown = (event) =>

            this.onKeyDown(event);

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

        this.elements.burger?.addEventListener(

            "click",

            this.handlers.burger

        );

        this.elements.overlay?.addEventListener(

            "click",

            this.handlers.overlay

        );

        document.addEventListener(

            "keydown",

            this.handlers.keydown

        );

        this.elements.navigation

            ?.querySelectorAll(

                "a"

            )

            .forEach(

                (link) =>

                    link.addEventListener(

                        "click",

                        this.handlers.overlay

                    )

            );

    },

    /* ==========================================
       SCROLL
    ========================================== */

    onScroll() {

        if (

            this.state.isNavigationOpen

        ) {

            return;

        }

        this.updateHeader();

    },

    updateHeader() {

        if (

            window.scrollY < 80

        ) {

            this.expandHeader();

            return;

        }

        this.compactHeader();

    },

    expandHeader() {

        this.closeNavigation();

        if (

            !this.state.isCompact

        ) {

            return;

        }

        this.state.isCompact = false;

        this.elements.root.classList.remove(

            "compact"

        );

    },

    compactHeader() {

        if (

            this.state.isCompact

        ) {

            return;

        }

        this.state.isCompact = true;

        this.elements.root.classList.add(

            "compact"

        );

    },

    /* ==========================================
       NAVIGATION
    ========================================== */

    openNavigation() {

        if (

            this.state.isNavigationOpen

        ) {

            return;

        }

        this.state.isNavigationOpen = true;

        this.elements.root.classList.add(

            "expanded"

        );

        this.elements.burger?.setAttribute(

            "aria-expanded",

            "true"

        );

        this.elements.navigation?.setAttribute(

            "aria-hidden",

            "false"

        );

    },

    closeNavigation() {

        if (

            !this.state.isNavigationOpen

        ) {

            return;

        }

        this.state.isNavigationOpen = false;

        this.elements.root.classList.remove(

            "expanded"

        );

        this.elements.burger?.setAttribute(

            "aria-expanded",

            "false"

        );

        this.elements.navigation?.setAttribute(

            "aria-hidden",

            "true"

        );

    },

    toggleNavigation() {

        if (

            !this.state.isCompact

        ) {

            return;

        }

        this.state.isNavigationOpen

            ? this.closeNavigation()

            : this.openNavigation();

    },

    /* ==========================================
       TASTATUR
    ========================================== */

    onKeyDown(

        event

    ) {

        if (

            event.key === "Escape"

        ) {

            this.closeNavigation();

        }

    },

    /* ==========================================
       DESTROY
    ========================================== */

    destroy() {

        window.removeEventListener(

            "scroll",

            this.handlers.scroll

        );

        document.removeEventListener(

            "keydown",

            this.handlers.keydown

        );

        this.elements.burger?.removeEventListener(

            "click",

            this.handlers.burger

        );

        this.elements.overlay?.removeEventListener(

            "click",

            this.handlers.overlay

        );

        this.elements.navigation

            ?.querySelectorAll(

                "a"

            )

            .forEach(

                (link) =>

                    link.removeEventListener(

                        "click",

                        this.handlers.overlay

                    )

            );

        this.closeNavigation();

    }

};