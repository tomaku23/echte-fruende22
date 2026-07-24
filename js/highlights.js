/*
=====================================================
 EF22 FRAMEWORK
 HIGHLIGHTS.JS
 Version 1.1
=====================================================
*/

"use strict";

window.EF22 ??= {};

/* ==========================================
   HIGHLIGHTS
========================================== */

EF22.highlights = {

    /* ==========================================
       STATE
    ========================================== */

    state: {

        events: [],

        activeIndex: 0

    },

    /* ==========================================
       ELEMENTE
    ========================================== */

    elements: {

        section: null,

        root: null,

        viewport: null,

        track: null,

        indicators: null

    },

    /* ==========================================
       HANDLER
    ========================================== */

    handlers: {

        scroll: null

    },

    /* ==========================================
       INITIALISIERUNG
    ========================================== */

    init() {

        this.elements.section =

            document.querySelector(
                "[data-highlights-section]"
            );

        this.elements.root =

            document.querySelector(
                "[data-highlights]"
            );

        this.elements.viewport =

            document.querySelector(
                "[data-highlights-viewport]"
            );

        this.elements.track =

            document.querySelector(
                "[data-highlights-track]"
            );

        this.elements.indicators =

            document.querySelector(
                "[data-highlights-indicators]"
            );

        if (

            !this.elements.root ||

            !this.elements.viewport ||

            !this.elements.track

        ) {

            return;

        }

        this.createHandlers();

        this.registerEvents();

    },

    /* ==========================================
       HANDLER
    ========================================== */

    createHandlers() {

        this.handlers.scroll = () => {

            this.updateActiveFromScroll();

        };

    },

    /* ==========================================
       EVENTS
    ========================================== */

    registerEvents() {

        this.elements.viewport.addEventListener(

            "scroll",

            this.handlers.scroll,

            {
                passive: true
            }

        );

    },

    /* ==========================================
       REFRESH
    ========================================== */

    refresh(events = []) {

        if (!this.elements.root) {

            return;

        }

        this.state.events =

            Array.isArray(events)

                ? [...events]

                : [];

        this.state.activeIndex = 0;

        this.render();

    },

    /* ==========================================
       RENDERN
    ========================================== */

    render() {

        this.renderCards();

        this.renderIndicators();

        this.updateVisibility();

        this.updateActiveState();

    },

    /* ==========================================
       KARTEN RENDERN
    ========================================== */

    renderCards() {

        if (!this.elements.track) {

            return;

        }

        this.elements.track.innerHTML = "";

        this.state.events.forEach(

            (event, index) => {

                this.elements.track.append(

                    this.createCard(
                        event,
                        index
                    )

                );

            }

        );

    },

    /* ==========================================
       KARTE ERSTELLEN
    ========================================== */

    createCard(event, index) {

        const props =

            EF22.utils.getProps(
                event
            );

        const card =

            document.createElement(
                "button"
            );

        card.type = "button";

        card.className =
            "highlight-card";

        card.dataset.highlightIndex =
            String(index);

        card.setAttribute(

            "aria-label",

            `Details zu ${event.title ?? "Highlight"}`

        );

                /* ======================================
           MEDIA
        ====================================== */

        const media =

            document.createElement(
                "div"
            );

        media.className =
            "highlight-card-media";

        const image =

            props.image &&

            String(props.image).trim() !== ""

                ? String(props.image)

                : EF22.config?.images?.heroFallbackLandscape;

        if (image) {

            media.style.backgroundImage =

                `url("${image}")`;

        }
        
        /* ======================================
           CONTENT
        ====================================== */

        const content =

            document.createElement(
                "div"
            );

        content.className =
            "highlight-card-content";

        /* ======================================
           TITEL
        ====================================== */

        const title =

            document.createElement(
                "div"
            );

        title.className =
            "highlight-card-title";

        title.textContent =
            event.title ?? "";

        /* ======================================
           DATUM
        ====================================== */

        const date =

            document.createElement(
                "div"
            );

        date.className =
            "highlight-card-date";

        date.textContent =

            this.formatMonthYear(
                event.start
            );

        content.append(

            title,
            date

        );

        card.append(

            media,
            content

        );

        /* ======================================
           INTERAKTION
        ====================================== */

        card.addEventListener(

            "click",

            () => {

                EF22.modal.open(
                    event
                );

            }

        );

        return card;

    },

    /* ==========================================
       MONAT & JAHR
    ========================================== */

    formatMonthYear(value) {

        const date =

            EF22.utils.toDate(
                value
            );

        if (!date) {

            return "";

        }

        const month =

            new Intl.DateTimeFormat(

                EF22.config.locale,

                {
                    month: "long"
                }

            ).format(
                date
            );

        const year =

            String(
                date.getFullYear()
            ).slice(-2);

        return `${month} ${year}`;

    },

    /* ==========================================
       INDIKATOREN RENDERN
    ========================================== */

    renderIndicators() {

        if (!this.elements.indicators) {

            return;

        }

        this.elements.indicators.innerHTML = "";

        if (this.state.events.length <= 1) {

            this.elements.indicators.hidden = true;

            return;

        }

        this.elements.indicators.hidden = false;

        this.state.events.forEach(

            (_, index) => {

                const indicator =

                    document.createElement(
                        "button"
                    );

                indicator.type =
                    "button";

                indicator.className =
                    "highlights-indicator";

                indicator.dataset.highlightIndicator =
                    String(index);

                indicator.setAttribute(

                    "aria-label",

                    `Highlight ${index + 1} anzeigen`

                );

                indicator.addEventListener(

                    "click",

                    () => {

                        this.scrollTo(
                            index
                        );

                    }

                );

                this.elements.indicators.append(
                    indicator
                );

            }

        );

    },

    /* ==========================================
       SICHTBARKEIT
    ========================================== */

    updateVisibility() {

        const hasHighlights =

            this.state.events.length > 0;

        if (this.elements.section) {

            this.elements.section.hidden =
                !hasHighlights;

        }

    },

    /* ==========================================
       AKTIVE KARTE AUS SCROLL
    ========================================== */

    updateActiveFromScroll() {

        if (

            !this.elements.viewport ||

            !this.elements.track

        ) {

            return;

        }

        const cards =

            Array.from(

                this.elements.track.querySelectorAll(
                    ".highlight-card"
                )

            );

        if (!cards.length) {

            return;

        }

        const viewportCenter =

            this.elements.viewport.scrollLeft +

            (
                this.elements.viewport.clientWidth /
                2
            );

        let closestIndex = 0;

        let closestDistance = Infinity;

        cards.forEach(

            (card, index) => {

                const cardCenter =

                    card.offsetLeft +

                    (
                        card.offsetWidth /
                        2
                    );

                const distance =

                    Math.abs(

                        viewportCenter -
                        cardCenter

                    );

                if (distance < closestDistance) {

                    closestDistance =
                        distance;

                    closestIndex =
                        index;

                }

            }

        );

        if (

            closestIndex ===
            this.state.activeIndex

        ) {

            return;

        }

        this.state.activeIndex =
            closestIndex;

        this.updateActiveState();

    },

    /* ==========================================
       AKTIVEN STATUS AKTUALISIEREN
    ========================================== */

    updateActiveState() {

        this.elements.track
            ?.querySelectorAll(
                ".highlight-card"
            )
            .forEach(

                (card, index) => {

                    card.classList.toggle(

                        "is-active",

                        index ===
                            this.state.activeIndex

                    );

                }

            );

        this.elements.indicators
            ?.querySelectorAll(
                ".highlights-indicator"
            )
            .forEach(

                (indicator, index) => {

                    const active =

                        index ===
                        this.state.activeIndex;

                    indicator.classList.toggle(

                        "is-active",

                        active

                    );

                    indicator.setAttribute(

                        "aria-current",

                        active

                            ? "true"

                            : "false"

                    );

                }

            );

    },

    /* ==========================================
       ZU KARTE SCROLLEN
    ========================================== */

    scrollTo(index) {

        if (!this.elements.track) {

            return;

        }

        const card =

            this.elements.track.querySelector(

                `[data-highlight-index="${index}"]`

            );

        if (!card) {

            return;

        }

        card.scrollIntoView({

            behavior: "smooth",

            block: "nearest",

            inline: "center"

        });

    },

    /* ==========================================
       DESTROY
    ========================================== */

    destroy() {

        this.elements.viewport?.removeEventListener(

            "scroll",

            this.handlers.scroll

        );

        if (this.elements.track) {

            this.elements.track.innerHTML = "";

        }

        if (this.elements.indicators) {

            this.elements.indicators.innerHTML = "";

        }

        this.state.events = [];

        this.state.activeIndex = 0;

        this.elements = {

            section: null,

            root: null,

            viewport: null,

            track: null,

            indicators: null

        };

        this.handlers = {

            scroll: null

        };

    }

};