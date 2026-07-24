/*
=====================================================
 EF22 FRAMEWORK
 HIGHLIGHTS.JS
 Version 2.0
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

        dragging: false,

        animating: false,

        startX: 0,

        currentX: 0,

        deltaX: 0,

        pointerId: null

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

        pointerDown: null,

        pointerMove: null,

        pointerUp: null,

        pointerCancel: null,

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

        this.handlers.pointerDown =

            (event) => {

                this.onPointerDown(
                    event
                );

            };

        this.handlers.pointerMove =

            (event) => {

                this.onPointerMove(
                    event
                );

            };

        this.handlers.pointerUp =

            (event) => {

                this.onPointerUp(
                    event
                );

            };

        this.handlers.pointerCancel =

            () => {

                this.cancelDrag();

            };

        this.handlers.resize =

            () => {

                this.renderCards();

            };

    },

    /* ==========================================
       EVENTS
    ========================================== */

    registerEvents() {

        this.elements.viewport.addEventListener(

            "pointerdown",

            this.handlers.pointerDown

        );

        window.addEventListener(

            "pointermove",

            this.handlers.pointerMove,

            {
                passive: false
            }

        );

        window.addEventListener(

            "pointerup",

            this.handlers.pointerUp

        );

        window.addEventListener(

            "pointercancel",

            this.handlers.pointerCancel

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

        this.resetInteraction();

        this.render();

    },

    /* ==========================================
       RENDERN
    ========================================== */

    render() {

        this.renderCards();

        this.renderIndicators();

        this.updateVisibility();

        this.updateIndicators();

    },

    /* ==========================================
       KARTEN RENDERN
    ========================================== */

    renderCards() {

        if (!this.elements.track) {

            return;

        }

        this.elements.track.innerHTML =
            "";

        const count =

            this.state.events.length;

        if (!count) {

            return;

        }

        /* ======================================
           EIN HIGHLIGHT
        ====================================== */

        if (count === 1) {

            this.elements.track.append(

                this.createCard(

                    this.state.events[0],

                    0,

                    "active"

                )

            );

            return;

        }

        /* ======================================
           ZWEI HIGHLIGHTS
        ====================================== */

        if (count === 2) {

            const activeIndex =

                this.state.activeIndex;

            const otherIndex =

                activeIndex === 0

                    ? 1

                    : 0;

            /*
             * Beim ersten Highlight liegt
             * das zweite rechts.
             *
             * Beim zweiten Highlight liegt
             * das erste links.
             */

            if (activeIndex === 0) {

                this.elements.track.append(

                    this.createCard(

                        this.state.events[
                            activeIndex
                        ],

                        activeIndex,

                        "active"

                    ),

                    this.createCard(

                        this.state.events[
                            otherIndex
                        ],

                        otherIndex,

                        "next"

                    )

                );

            }

            else {

                this.elements.track.append(

                    this.createCard(

                        this.state.events[
                            otherIndex
                        ],

                        otherIndex,

                        "previous"

                    ),

                    this.createCard(

                        this.state.events[
                            activeIndex
                        ],

                        activeIndex,

                        "active"

                    )

                );

            }

            return;

        }

        /* ======================================
           DREI ODER MEHR HIGHLIGHTS

           Es existieren immer nur:

           PREVIOUS | ACTIVE | NEXT
        ====================================== */

        const previousIndex =

            this.getPreviousIndex();

        const nextIndex =

            this.getNextIndex();

        this.elements.track.append(

            this.createCard(

                this.state.events[
                    previousIndex
                ],

                previousIndex,

                "previous"

            ),

            this.createCard(

                this.state.events[
                    this.state.activeIndex
                ],

                this.state.activeIndex,

                "active"

            ),

            this.createCard(

                this.state.events[
                    nextIndex
                ],

                nextIndex,

                "next"

            )

        );

    },

    /* ==========================================
       KARTE ERSTELLEN
    ========================================== */

    createCard(
        event,
        index,
        position
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

            `highlight-card highlight-card--${position}`;

        card.dataset.highlightIndex =
            String(index);

        card.dataset.highlightPosition =
            position;

        card.setAttribute(

            "aria-label",

            `Details zu ${event.title ?? "Highlight"}`

        );

        if (position === "active") {

            card.setAttribute(

                "aria-current",

                "true"

            );

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

            String(
                props.image
            ).trim() !== ""

                ? String(
                    props.image
                )

                : EF22.config
                    ?.images
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

            type.hidden =
                true;

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
           CLICK
        ====================================== */

        card.addEventListener(

            "click",

            (clickEvent) => {

                /*
                 * Ein Swipe darf anschließend
                 * kein Modal öffnen.
                 */

                if (

                    Math.abs(
                        this.state.deltaX
                    ) > 8

                ) {

                    clickEvent.preventDefault();

                    return;

                }

                /*
                 * Seitliche Karte:
                 * erst aktivieren.
                 */

                if (position === "previous") {

                    this.goPrevious();

                    return;

                }

                if (position === "next") {

                    this.goNext();

                    return;

                }

                /*
                 * Aktive Karte:
                 * Modal öffnen.
                 */

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
                    month:
                        "long"
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
       VORHERIGER INDEX
    ========================================== */

    getPreviousIndex() {

        const count =

            this.state.events.length;

        if (!count) {

            return 0;

        }

        return (

            this.state.activeIndex -
            1 +
            count

        ) % count;

    },

    /* ==========================================
       NÄCHSTER INDEX
    ========================================== */

    getNextIndex() {

        const count =

            this.state.events.length;

        if (!count) {

            return 0;

        }

        return (

            this.state.activeIndex +
            1

        ) % count;

    },

    /* ==========================================
       DARF ZURÜCK
    ========================================== */

    canGoPrevious() {

        const count =

            this.state.events.length;

        if (count <= 1) {

            return false;

        }

        if (count === 2) {

            return (

                this.state.activeIndex ===
                1

            );

        }

        return true;

    },

    /* ==========================================
       DARF VOR
    ========================================== */

    canGoNext() {

        const count =

            this.state.events.length;

        if (count <= 1) {

            return false;

        }

        if (count === 2) {

            return (

                this.state.activeIndex ===
                0

            );

        }

        return true;

    },

    /* ==========================================
       POINTER DOWN
    ========================================== */

    onPointerDown(event) {

        if (

            this.state.animating ||

            this.state.events.length <= 1

        ) {

            return;

        }

        /*
         * Nur primäre Maus-/Touch-Interaktion.
         */

        if (

            event.pointerType === "mouse" &&

            event.button !== 0

        ) {

            return;

        }

        this.state.dragging =
            true;

        this.state.pointerId =
            event.pointerId;

        this.state.startX =
            event.clientX;

        this.state.currentX =
            event.clientX;

        this.state.deltaX =
            0;

        this.elements.viewport.classList.add(
            "is-dragging"
        );

        try {

            this.elements.viewport
                .setPointerCapture(
                    event.pointerId
                );

        }

        catch (_) {

            /*
             * Nicht jeder Browser benötigt
             * Pointer Capture.
             */

        }

    },

    /* ==========================================
       POINTER MOVE
    ========================================== */

    onPointerMove(event) {

        if (

            !this.state.dragging ||

            event.pointerId !==
                this.state.pointerId

        ) {

            return;

        }

        this.state.currentX =
            event.clientX;

        let delta =

            this.state.currentX -
            this.state.startX;

        /*
         * Bei zwei Karten gibt es echte Enden.
         * Dort erzeugen wir nur einen kleinen
         * Widerstand statt eines weiteren Slides.
         */

        if (

            delta > 0 &&

            !this.canGoPrevious()

        ) {

            delta *=
                .18;

        }

        if (

            delta < 0 &&

            !this.canGoNext()

        ) {

            delta *=
                .18;

        }

        this.state.deltaX =
            delta;

        this.applyDragTransform(
            delta
        );

        if (

            Math.abs(delta) > 4

        ) {

            event.preventDefault();

        }

    },

    /* ==========================================
       POINTER UP
    ========================================== */

    onPointerUp(event) {

        if (

            !this.state.dragging ||

            event.pointerId !==
                this.state.pointerId

        ) {

            return;

        }

        const delta =

            this.state.deltaX;

        const threshold =

            Math.max(

                50,

                this.elements.viewport.clientWidth *
                    .14

            );

        this.state.dragging =
            false;

        this.elements.viewport.classList.remove(
            "is-dragging"
        );

        /*
         * Nach links gewischt:
         * nächstes Highlight.
         */

        if (

            delta <= -threshold &&

            this.canGoNext()

        ) {

            this.animateToNext();

            return;

        }

        /*
         * Nach rechts gewischt:
         * vorheriges Highlight.
         */

        if (

            delta >= threshold &&

            this.canGoPrevious()

        ) {

            this.animateToPrevious();

            return;

        }

        /*
         * Schwelle nicht erreicht:
         * zurück zur Mitte.
         */

        this.animateBack();

    },

    /* ==========================================
       DRAG TRANSFORM
    ========================================== */

    applyDragTransform(delta) {

        if (!this.elements.track) {

            return;

        }

        this.elements.track.style.setProperty(

            "--highlight-drag-x",

            `${delta}px`

        );

    },

    /* ==========================================
       ZURÜCK AN MITTE
    ========================================== */

    animateBack() {

        if (!this.elements.track) {

            return;

        }

        this.state.animating =
            true;

        this.elements.track.classList.add(
            "is-animating"
        );

        this.applyDragTransform(
            0
        );

        window.setTimeout(

            () => {

                this.elements.track.classList.remove(
                    "is-animating"
                );

                this.state.animating =
                    false;

                this.resetDragValues();

            },

            280

        );

    },

    /* ==========================================
       NÄCHSTES HIGHLIGHT ANIMIEREN
    ========================================== */

    animateToNext() {

        if (!this.elements.track) {

            return;

        }

        this.state.animating =
            true;

        this.elements.track.classList.add(
            "is-animating"
        );

        const distance =

            this.elements.viewport.clientWidth *
            .72;

        this.applyDragTransform(
            -distance
        );

        window.setTimeout(

            () => {

                this.state.activeIndex =

                    this.getNextIndex();

                this.finishTransition();

            },

            280

        );

    },

    /* ==========================================
       VORHERIGES HIGHLIGHT ANIMIEREN
    ========================================== */

    animateToPrevious() {

        if (!this.elements.track) {

            return;

        }

        this.state.animating =
            true;

        this.elements.track.classList.add(
            "is-animating"
        );

        const distance =

            this.elements.viewport.clientWidth *
            .72;

        this.applyDragTransform(
            distance
        );

        window.setTimeout(

            () => {

                this.state.activeIndex =

                    this.getPreviousIndex();

                this.finishTransition();

            },

            280

        );

    },

    /* ==========================================
       TRANSITION ABSCHLIESSEN
    ========================================== */

    finishTransition() {

        /*
         * Erst Transition abschalten.
         * Dann neue Rollen rendern.
         *
         * Dadurch erscheint die weggegangene
         * Karte bei 3+ auf der anderen Seite,
         * ohne selbst zurückzuanimieren.
         */

        this.elements.track.classList.remove(
            "is-animating"
        );

        this.applyDragTransform(
            0
        );

        this.renderCards();

        this.updateIndicators();

        this.state.animating =
            false;

        this.resetDragValues();

    },

    /* ==========================================
       DIREKT NÄCHSTES
    ========================================== */

    goNext() {

        if (

            this.state.animating ||

            !this.canGoNext()

        ) {

            return;

        }

        this.state.deltaX =
            0;

        this.animateToNext();

    },

    /* ==========================================
       DIREKT VORHERIGES
    ========================================== */

    goPrevious() {

        if (

            this.state.animating ||

            !this.canGoPrevious()

        ) {

            return;

        }

        this.state.deltaX =
            0;

        this.animateToPrevious();

    },

    /* ==========================================
       INDIKATOREN
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

                        this.goTo(
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
       INDIKATOREN AKTUALISIEREN
    ========================================== */

    updateIndicators() {

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
       ZU INDEX
    ========================================== */

    goTo(index) {

        if (

            this.state.animating ||

            index < 0 ||

            index >=
                this.state.events.length ||

            index ===
                this.state.activeIndex

        ) {

            return;

        }

        const count =

            this.state.events.length;

        /*
         * Bei zwei Karten ist die Richtung
         * eindeutig.
         */

        if (count === 2) {

            if (

                index >
                this.state.activeIndex

            ) {

                this.goNext();

            }

            else {

                this.goPrevious();

            }

            return;

        }

        /*
         * Bei einem Ring wählen wir den
         * kürzeren Weg.
         */

        const forward =

            (
                index -
                this.state.activeIndex +
                count
            ) % count;

        const backward =

            (
                this.state.activeIndex -
                index +
                count
            ) % count;

        if (forward <= backward) {

            this.goNext();

        }

        else {

            this.goPrevious();

        }

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
       DRAG ABBRECHEN
    ========================================== */

    cancelDrag() {

        if (!this.state.dragging) {

            return;

        }

        this.state.dragging =
            false;

        this.elements.viewport?.classList.remove(
            "is-dragging"
        );

        this.animateBack();

    },

    /* ==========================================
       DRAG WERTE RESET
    ========================================== */

    resetDragValues() {

        this.state.startX =
            0;

        this.state.currentX =
            0;

        /*
         * Leicht verzögert, damit der Click,
         * der unmittelbar nach pointerup
         * entstehen kann, einen Swipe noch
         * erkennen kann.
         */

        window.setTimeout(

            () => {

                if (!this.state.dragging) {

                    this.state.deltaX =
                        0;

                }

            },

            50

        );

        this.state.pointerId =
            null;

    },

    /* ==========================================
       INTERAKTION RESET
    ========================================== */

    resetInteraction() {

        this.state.dragging =
            false;

        this.state.animating =
            false;

        this.state.startX =
            0;

        this.state.currentX =
            0;

        this.state.deltaX =
            0;

        this.state.pointerId =
            null;

    },

    /* ==========================================
       DESTROY
    ========================================== */

    destroy() {

        this.elements.viewport
            ?.removeEventListener(

                "pointerdown",

                this.handlers.pointerDown

            );

        window.removeEventListener(

            "pointermove",

            this.handlers.pointerMove

        );

        window.removeEventListener(

            "pointerup",

            this.handlers.pointerUp

        );

        window.removeEventListener(

            "pointercancel",

            this.handlers.pointerCancel

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

        this.state.events = [];

        this.state.activeIndex =
            0;

        this.resetInteraction();

    }

};