/*
=====================================================
 EF22 FRAMEWORK
 HIGHLIGHTS.JS
 Version 1.2
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

        activeIndex: 0,

        physicalIndex: 0,

        isJumping: false,

        scrollTimer: null

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

        scroll: null,

        resize: null

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

            if (this.state.isJumping) {

                return;

            }

            window.clearTimeout(
                this.state.scrollTimer
            );

            this.updateActiveFromScroll();

            this.state.scrollTimer =

                window.setTimeout(

                    () => {

                        this.onScrollEnd();

                    },

                    100

                );

        };

        this.handlers.resize = () => {

            if (!this.state.events.length) {

                return;

            }

            requestAnimationFrame(

                () => {

                    this.centerPhysicalCard(
                        this.state.physicalIndex,
                        false
                    );

                }

            );

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

        window.addEventListener(

            "resize",

            this.handlers.resize

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

        this.state.physicalIndex =

            this.state.events.length > 1

                ? 1

                : 0;

        this.state.isJumping = false;

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

        if (!this.state.events.length) {

            return;

        }

        requestAnimationFrame(

            () => {

                requestAnimationFrame(

                    () => {

                        this.centerPhysicalCard(
                            this.state.physicalIndex,
                            false
                        );

                    }

                );

            }

        );

    },

    /* ==========================================
       KARTEN RENDERN
    ========================================== */

    renderCards() {

        if (!this.elements.track) {

            return;

        }

        this.elements.track.innerHTML = "";

        const events =

            this.state.events;

        if (!events.length) {

            return;

        }

        /*
         * Bei mehreren Highlights:
         *
         * KLON LETZTE
         * EVENT 1
         * EVENT 2
         * EVENT 3
         * KLON ERSTE
         *
         * Dadurch kann an beiden Enden
         * unsichtbar gesprungen werden.
         */

        if (events.length > 1) {

            this.elements.track.append(

                this.createCard(

                    events[
                        events.length - 1
                    ],

                    events.length - 1,

                    true

                )

            );

        }

        events.forEach(

            (event, index) => {

                this.elements.track.append(

                    this.createCard(
                        event,
                        index,
                        false
                    )

                );

            }

        );

        if (events.length > 1) {

            this.elements.track.append(

                this.createCard(

                    events[0],

                    0,

                    true

                )

            );

        }

    },

    /* ==========================================
       KARTE ERSTELLEN
    ========================================== */

    createCard(
        event,
        realIndex,
        clone = false
    ) {

        const props =

            EF22.utils.getProps(
                event
            );

        const card =

            document.createElement(
                "button"
            );

        card.type =
            "button";

        card.className =
            "highlight-card";

        card.dataset.highlightIndex =
            String(realIndex);

        card.dataset.highlightClone =

            clone

                ? "true"

                : "false";

        card.setAttribute(

            "aria-label",

            `Details zu ${event.title ?? "Highlight"}`

        );

        if (clone) {

            card.setAttribute(
                "aria-hidden",
                "true"
            );

            card.tabIndex = -1;

        }

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

                : EF22.config?.images
                    ?.heroFallbackLandscape;

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
           TYPE
        ====================================== */

        const type =

            document.createElement(
                "div"
            );

        type.className =
            "highlight-card-title";

        type.textContent =

            props.type ??

            props.category ??

            "";

        if (!type.textContent.trim()) {

            type.hidden = true;

        }

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

            type,
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

                if (clone) {

                    return;

                }

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
       PHYSISCHE KARTEN
    ========================================== */

    getCards() {

        if (!this.elements.track) {

            return [];

        }

        return Array.from(

            this.elements.track.querySelectorAll(
                ".highlight-card"
            )

        );

    },

    /* ==========================================
       KARTE ZENTRIEREN
    ========================================== */

    centerPhysicalCard(
        physicalIndex,
        smooth = true
    ) {

        if (!this.elements.viewport) {

            return;

        }

        const cards =
            this.getCards();

        const card =

            cards[
                physicalIndex
            ];

        if (!card) {

            return;

        }

        const target =

            card.offsetLeft -

            (
                (
                    this.elements.viewport.clientWidth -
                    card.offsetWidth
                ) /
                2
            );

        this.elements.viewport.scrollTo({

            left:
                target,

            behavior:

                smooth

                    ? "smooth"

                    : "auto"

        });

    },

    /* ==========================================
       AKTIVE KARTE AUS SCROLL
    ========================================== */

    updateActiveFromScroll() {

        if (

            !this.elements.viewport ||

            this.state.isJumping

        ) {

            return;

        }

        const cards =
            this.getCards();

        if (!cards.length) {

            return;

        }

        const viewportCenter =

            this.elements.viewport.scrollLeft +

            (
                this.elements.viewport.clientWidth /
                2
            );

        let closestPhysicalIndex = 0;

        let closestDistance =
            Infinity;

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

                if (

                    distance <
                    closestDistance

                ) {

                    closestDistance =
                        distance;

                    closestPhysicalIndex =
                        index;

                }

            }

        );

        this.state.physicalIndex =
            closestPhysicalIndex;

        const card =

            cards[
                closestPhysicalIndex
            ];

        if (!card) {

            return;

        }

        const realIndex =

            Number(
                card.dataset.highlightIndex
            );

        if (

            Number.isInteger(
                realIndex
            )

        ) {

            this.state.activeIndex =
                realIndex;

        }

        this.updateActiveState();

    },

    /* ==========================================
       SCROLL ENDE
    ========================================== */

    onScrollEnd() {

        if (

            this.state.isJumping ||

            this.state.events.length <= 1

        ) {

            return;

        }

        const cards =
            this.getCards();

        if (!cards.length) {

            return;

        }

        const lastPhysicalIndex =

            cards.length - 1;

        /*
         * Linker Klon:
         * letzte Karte -> echte letzte Karte
         */

        if (

            this.state.physicalIndex ===
            0

        ) {

            this.jumpToPhysicalCard(

                this.state.events.length

            );

            return;

        }

        /*
         * Rechter Klon:
         * erste Karte -> echte erste Karte
         */

        if (

            this.state.physicalIndex ===
            lastPhysicalIndex

        ) {

            this.jumpToPhysicalCard(
                1
            );

            return;

        }

        /*
         * Normale Karte noch einmal
         * exakt zentrieren.
         */

        this.centerPhysicalCard(

            this.state.physicalIndex,

            true

        );

    },

    /* ==========================================
       UNSICHTBARER LOOP SPRUNG
    ========================================== */

    jumpToPhysicalCard(
        physicalIndex
    ) {

        this.state.isJumping =
            true;

        this.state.physicalIndex =
            physicalIndex;

        requestAnimationFrame(

            () => {

                this.centerPhysicalCard(

                    physicalIndex,

                    false

                );

                requestAnimationFrame(

                    () => {

                        this.state.isJumping =
                            false;

                        this.updateActiveFromScroll();

                    }

                );

            }

        );

    },

    /* ==========================================
       INDIKATOREN RENDERN
    ========================================== */

    renderIndicators() {

        if (!this.elements.indicators) {

            return;

        }

        this.elements.indicators.innerHTML =
            "";

        if (

            this.state.events.length <= 1

        ) {

            this.elements.indicators.hidden =
                true;

            return;

        }

        this.elements.indicators.hidden =
            false;

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
       AKTIVEN STATUS AKTUALISIEREN
    ========================================== */

    updateActiveState() {

        const cards =
            this.getCards();

        cards.forEach(

            (card, physicalIndex) => {

                card.classList.toggle(

                    "is-active",

                    physicalIndex ===
                        this.state.physicalIndex

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
       ZU ECHTER KARTE SCROLLEN
    ========================================== */

    scrollTo(index) {

        if (

            index < 0 ||

            index >=
                this.state.events.length

        ) {

            return;

        }

        /*
         * Wegen des linken Klons liegt
         * echtes Event 0 auf Position 1.
         */

        const physicalIndex =

            this.state.events.length > 1

                ? index + 1

                : index;

        this.state.activeIndex =
            index;

        this.state.physicalIndex =
            physicalIndex;

        this.updateActiveState();

        this.centerPhysicalCard(

            physicalIndex,

            true

        );

    },

    /* ==========================================
       DESTROY
    ========================================== */

    destroy() {

        window.clearTimeout(
            this.state.scrollTimer
        );

        this.elements.viewport
            ?.removeEventListener(

                "scroll",

                this.handlers.scroll

            );

        window.removeEventListener(

            "resize",

            this.handlers.resize

        );

        if (this.elements.track) {

            this.elements.track.innerHTML =
                "";

        }

        if (this.elements.indicators) {

            this.elements.indicators.innerHTML =
                "";

        }

        this.state = {

            events: [],

            activeIndex: 0,

            physicalIndex: 0,

            isJumping: false,

            scrollTimer: null

        };

        this.elements = {

            section: null,

            root: null,

            viewport: null,

            track: null,

            indicators: null

        };

        this.handlers = {

            scroll: null,

            resize: null

        };

    }

};