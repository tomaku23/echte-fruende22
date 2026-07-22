/*
=====================================================
 EF22 FRAMEWORK
 HEADER.JS
 Version 7.0
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
       INITIALISIERUNG
    ========================================== */

    init() {

        this.elements =

            EF22.dom.register(

                document.querySelector(

                    "[data-header=\"root\"]"

                ),

                "data-header"

            );

        if (

            !this.elements.root

        ) {

            console.warn(

                "Header wurde nicht gefunden."

            );

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

        this.registerEvents();

        this.updateHeader();

    },

    /* ==========================================
       EVENTS
    ========================================== */

    registerEvents() {

        window.addEventListener(

            "scroll",

            this.onScroll.bind(

                this

            ),

            {

                passive: true

            }

        );

        window.addEventListener(

            "resize",

            this.updateHeader.bind(

                this

            )

        );

        this.elements.burger?.addEventListener(

            "click",

            this.toggleNavigation.bind(

                this

            )

        );

        this.elements.logo?.addEventListener(

            "click",

            this.onLogoClick.bind(

                this

            )

        );

        this.elements.logo?.addEventListener(

            "keydown",

            this.onLogoKeyDown.bind(

                this

            )

        );

        this.elements.overlay?.addEventListener(

            "click",

            this.closeNavigation.bind(

                this

            )

        );

        document.addEventListener(

            "keydown",

            this.onKeyDown.bind(

                this

            )

        );

        this.elements.navigation

            ?.querySelectorAll(

                "a"

            )

            .forEach(

                (link) =>

                    link.addEventListener(

                        "click",

                        this.closeNavigation.bind(

                            this

                        )

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

    /* ==========================================
       HEADER AKTUALISIEREN
    ========================================== */

    updateHeader() {

        if (

            window.scrollY === 0

        ) {

            this.expandHeader();

            return;

        }

        this.compactHeader();

    },

    /* ==========================================
       HEADER GROSS
    ========================================== */

    expandHeader() {

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

    /* ==========================================
       HEADER KOMPAKT
    ========================================== */

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
       NAVIGATION ÖFFNEN
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

    /* ==========================================
       NAVIGATION SCHLIESSEN
    ========================================== */

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

    /* ==========================================
       NAVIGATION UMSCHALTEN
    ========================================== */

    toggleNavigation() {

        if (

            !this.state.isCompact

        ) {

            return;

        }

        if (

            this.state.isNavigationOpen

        ) {

            this.closeNavigation();

            return;

        }

        this.openNavigation();

    },

    /* ==========================================
       HILFSFUNKTIONEN
    ========================================== */

    onLogoClick() {

        this.closeNavigation();

        window.location.href =

            "index.php";

    },

    onLogoKeyDown(event) {

        if (

            event.key !== "Enter" &&

            event.key !== " "

        ) {

            return;

        }

        event.preventDefault();

        this.onLogoClick();

    },

    onKeyDown(event) {

        if (

            event.key === "Escape" &&

            this.state.isNavigationOpen

        ) {

            this.closeNavigation();

        }

    },

    /* ==========================================
       DESTROY
    ========================================== */

    destroy() {

    }

};