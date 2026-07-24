/*
=====================================================
 EF22 FRAMEWORK
 HIGHLIGHTS.JS
 Version 3.0
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

        deltaX: 0,

        pointerId: null,

        direction: null,

        dragProgress: 0

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

        this.updateIndicators();

        this.updateVisibility();

    },

    /* ==========================================
       INDEX NORMALISIEREN
    ========================================== */

    normalizeIndex(index) {

        const count =

            this.state.events.length;

        if (!count) {

            return 0;

        }

        return (

            (
                index % count
            ) +
            count

        ) % count;

    },

    /* ==========================================
       EVENT HOLEN
    ========================================== */

    getEvent(index) {

        if (!this.state.events.length) {

            return null;

        }

        return this.state.events[

            this.normalizeIndex(
                index
            )

        ];

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

            if (

                this.state.activeIndex ===
                0

            ) {

                this.elements.track.append(

                    this.createCard(

                        this.state.events[0],

                        0,

                        "active"

                    ),

                    this.createCard(

                        this.state.events[1],

                        1,

                        "right"

                    )

                );

            }

            else {

                this.elements.track.append(

                    this.createCard(

                        this.state.events[0],

                        0,

                        "left"

                    ),

                    this.createCard(

                        this.state.events[1],

                        1,

                        "active"

                    )

                );

            }

            return;

        }

        /* ======================================
           DREI ODER MEHR

           Drei sichtbare Karten:

           LEFT | ACTIVE | RIGHT

           plus unsichtbarer BACK-Slot.

           BACK bekommt seinen endgültigen
           Inhalt erst beim Drag.
        ====================================== */

        const previousIndex =

            this.normalizeIndex(

                this.state.activeIndex -
                1

            );

        const nextIndex =

            this.normalizeIndex(

                this.state.activeIndex +
                1

            );

        const backIndex =

            this.normalizeIndex(

                this.state.activeIndex +
                2

            );

        this.elements.track.append(

            this.createCard(

                this.getEvent(
                    previousIndex
                ),

                previousIndex,

                "left"

            ),

            this.createCard(

                this.getEvent(
                    this.state.activeIndex
                ),

                this.state.activeIndex,

                "active"

            ),

            this.createCard(

                this.getEvent(
                    nextIndex
                ),

                nextIndex,

                "right"

            ),

            this.createCard(

                this.getEvent(
                    backIndex
                ),

                backIndex,

                "back"

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

            `Details zu ${event?.title ?? "Highlight"}`

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

                if (

                    Math.abs(
                        this.state.deltaX
                    ) > 8

                ) {

                    clickEvent.preventDefault();

                    return;

                }

                if (position === "left") {

                    this.goPrevious();

                    return;

                }

                if (position === "right") {

                    this.goNext();

                    return;

                }

                if (position !== "active") {

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
       KARTE AKTUALISIEREN
    ========================================== */

    updateCardContent(
        card,
        event,
        index
    ) {

        if (

            !card ||

            !event

        ) {

            return;

        }

        const props =

            EF22.utils.getProps(
                event
            );

        card.dataset.highlightIndex =
            String(index);

        card.setAttribute(

            "aria-label",

            `Details zu ${event.title ?? "Highlight"}`

        );

        const media =

            card.querySelector(
                ".highlight-card-media"
            );

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

        if (media) {

            media.style.backgroundImage =

                image

                    ? `url("${image}")`

                    : "";

        }

        const type =

            card.querySelector(
                ".highlight-card-title"
            );

        if (type) {

            type.textContent =

                props.type ??

                props.category ??

                "";

            type.hidden =

                !type.textContent.trim();

        }

        const date =

            card.querySelector(
                ".highlight-card-date"
            );

        if (date) {

            date.textContent =

                this.formatMonthYear(
                    event.start
                );

        }

    },

    /* ==========================================
       SCHRÖDINGERS HIGHLIGHT

       Der BACK-Slot wird erst dann eindeutig,
       wenn die Drag-Richtung feststeht.
    ========================================== */

    prepareBackCard(direction) {

        if (

            this.state.events.length < 3 ||

            !this.elements.track

        ) {

            return;

        }

        const back =

            this.elements.track.querySelector(
                ".highlight-card--back"
            );

        if (!back) {

            return;

        }

        let index;

        /*
         * NEXT:
         *
         * LEFT   = active - 1
         * ACTIVE = active
         * RIGHT  = active + 1
         * BACK   = active + 2
         */

        if (direction === "next") {

            index =

                this.normalizeIndex(

                    this.state.activeIndex +
                    2

                );

        }

        /*
         * PREVIOUS:
         *
         * BACK   = active - 2
         * LEFT   = active - 1
         * ACTIVE = active
         * RIGHT  = active + 1
         */

        else {

            index =

                this.normalizeIndex(

                    this.state.activeIndex -
                    2

                );

        }

        this.updateCardContent(

            back,

            this.getEvent(
                index
            ),

            index

        );

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

        this.state.deltaX =
            0;

        this.state.direction =
            null;

        this.state.dragProgress =
            0;

        this.elements.viewport.classList.add(
            "is-dragging"
        );

        this.elements.track.classList.add(
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
             * Pointer Capture ist optional.
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

        let delta =

            event.clientX -
            this.state.startX;

        /*
         * Richtung erst nach ein paar Pixeln
         * festlegen. Dadurch reagiert das
         * Carousel nicht auf jedes Zittern.
         */

        if (

            !this.state.direction &&

            Math.abs(delta) >= 5

        ) {

            this.state.direction =

                delta < 0

                    ? "next"

                    : "previous";

            this.prepareBackCard(

                this.state.direction

            );

        }

        /*
         * Zwei Highlights besitzen echte Enden.
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

        const distance =

            this.getRotationDistance();

        this.state.dragProgress =

            Math.min(

                1,

                Math.abs(delta) /
                distance

            );

        this.applyCarouselProgress(

            delta,

            this.state.dragProgress

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

        const progress =

            this.state.dragProgress;

        const direction =

            this.state.direction;

        this.state.dragging =
            false;

        this.elements.viewport.classList.remove(
            "is-dragging"
        );

        this.elements.track.classList.remove(
            "is-dragging"
        );

        /*
         * Etwa ein Drittel einer Drehung
         * reicht zum Einrasten.
         */

        const commit =

            progress >= .32;

        if (

            commit &&

            direction === "next" &&

            this.canGoNext()

        ) {

            this.completeRotation(
                "next"
            );

            return;

        }

        if (

            commit &&

            direction === "previous" &&

            this.canGoPrevious()

        ) {

            this.completeRotation(
                "previous"
            );

            return;

        }

        this.returnToCenter();

    },

    /* ==========================================
       ROTATIONSDISTANZ
    ========================================== */

    getRotationDistance() {

        if (!this.elements.viewport) {

            return 300;

        }

        return Math.max(

            220,

            this.elements.viewport.clientWidth *
                .62

        );

    },

    /* ==========================================
       INTERPOLATION
    ========================================== */

    lerp(
        start,
        end,
        progress
    ) {

        return (

            start +

            (
                end -
                start
            ) *

            progress

        );

    },

    /* ==========================================
       TRANSFORM SETZEN
    ========================================== */

    setCardTransform(
        card,
        x,
        scale,
        opacity,
        zIndex
    ) {

        if (!card) {

            return;

        }

        card.style.transform =

            `translateX(calc(-50% + ${x}%)) scale(${scale})`;

        card.style.opacity =
            String(opacity);

        card.style.zIndex =
            String(zIndex);

    },

    /* ==========================================
       CAROUSEL PROGRESS

       Hier passiert die eigentliche
       "Würfeldrehung".
    ========================================== */

    applyCarouselProgress(
        delta,
        progress
    ) {

        if (!this.elements.track) {

            return;

        }

        const left =

            this.elements.track.querySelector(
                ".highlight-card--left"
            );

        const active =

            this.elements.track.querySelector(
                ".highlight-card--active"
            );

        const right =

            this.elements.track.querySelector(
                ".highlight-card--right"
            );

        const back =

            this.elements.track.querySelector(
                ".highlight-card--back"
            );

        const count =

            this.state.events.length;

        /*
         * ZWEI HIGHLIGHTS
        ====================================== */

        if (count === 2) {

            if (delta < 0) {

                /*
                 * ACTIVE → LEFT
                 * RIGHT  → ACTIVE
                 */

                this.setCardTransform(

                    active,

                    this.lerp(
                        0,
                        -54,
                        progress
                    ),

                    this.lerp(
                        1,
                        .92,
                        progress
                    ),

                    this.lerp(
                        1,
                        .78,
                        progress
                    ),

                    progress < .5
                        ? 10
                        : 3

                );

                this.setCardTransform(

                    right,

                    this.lerp(
                        54,
                        0,
                        progress
                    ),

                    this.lerp(
                        .92,
                        1,
                        progress
                    ),

                    this.lerp(
                        .78,
                        1,
                        progress
                    ),

                    progress < .5
                        ? 3
                        : 10

                );

            }

            else {

                /*
                 * LEFT   → ACTIVE
                 * ACTIVE → RIGHT
                 */

                this.setCardTransform(

                    left,

                    this.lerp(
                        -54,
                        0,
                        progress
                    ),

                    this.lerp(
                        .92,
                        1,
                        progress
                    ),

                    this.lerp(
                        .78,
                        1,
                        progress
                    ),

                    progress < .5
                        ? 3
                        : 10

                );

                this.setCardTransform(

                    active,

                    this.lerp(
                        0,
                        54,
                        progress
                    ),

                    this.lerp(
                        1,
                        .92,
                        progress
                    ),

                    this.lerp(
                        1,
                        .78,
                        progress
                    ),

                    progress < .5
                        ? 10
                        : 3

                );

            }

            return;

        }

        /*
         * DREHUNG ZUM NÄCHSTEN HIGHLIGHT
        ====================================== */

        if (this.state.direction === "next") {

            /*
             * LEFT → BACK
             */

            this.setCardTransform(

                left,

                this.lerp(
                    -54,
                    -88,
                    progress
                ),

                this.lerp(
                    .92,
                    .82,
                    progress
                ),

                this.lerp(
                    .78,
                    0,
                    progress
                ),

                1

            );

            /*
             * ACTIVE → LEFT
             */

            this.setCardTransform(

                active,

                this.lerp(
                    0,
                    -54,
                    progress
                ),

                this.lerp(
                    1,
                    .92,
                    progress
                ),

                this.lerp(
                    1,
                    .78,
                    progress
                ),

                progress < .5
                    ? 10
                    : 4

            );

            /*
             * RIGHT → ACTIVE
             */

            this.setCardTransform(

                right,

                this.lerp(
                    54,
                    0,
                    progress
                ),

                this.lerp(
                    .92,
                    1,
                    progress
                ),

                this.lerp(
                    .78,
                    1,
                    progress
                ),

                progress < .5
                    ? 4
                    : 10

            );

            /*
             * BACK → RIGHT
             */

            this.setCardTransform(

                back,

                this.lerp(
                    88,
                    54,
                    progress
                ),

                this.lerp(
                    .82,
                    .92,
                    progress
                ),

                this.lerp(
                    0,
                    .78,
                    progress
                ),

                2

            );

            return;

        }

        /*
         * DREHUNG ZUM VORHERIGEN HIGHLIGHT
        ====================================== */

        if (

            this.state.direction ===
            "previous"

        ) {

            /*
             * RIGHT → BACK
             */

            this.setCardTransform(

                right,

                this.lerp(
                    54,
                    88,
                    progress
                ),

                this.lerp(
                    .92,
                    .82,
                    progress
                ),

                this.lerp(
                    .78,
                    0,
                    progress
                ),

                1

            );

            /*
             * ACTIVE → RIGHT
             */

            this.setCardTransform(

                active,

                this.lerp(
                    0,
                    54,
                    progress
                ),

                this.lerp(
                    1,
                    .92,
                    progress
                ),

                this.lerp(
                    1,
                    .78,
                    progress
                ),

                progress < .5
                    ? 10
                    : 4

            );

            /*
             * LEFT → ACTIVE
             */

            this.setCardTransform(

                left,

                this.lerp(
                    -54,
                    0,
                    progress
                ),

                this.lerp(
                    .92,
                    1,
                    progress
                ),

                this.lerp(
                    .78,
                    1,
                    progress
                ),

                progress < .5
                    ? 4
                    : 10

            );

            /*
             * BACK → LEFT
             */

            this.setCardTransform(

                back,

                this.lerp(
                    -88,
                    -54,
                    progress
                ),

                this.lerp(
                    .82,
                    .92,
                    progress
                ),

                this.lerp(
                    0,
                    .78,
                    progress
                ),

                2

            );

        }

    },

    /* ==========================================
       ROTATION ABSCHLIESSEN
    ========================================== */

    completeRotation(direction) {

        if (this.state.animating) {

            return;

        }

        this.state.animating =
            true;

        this.elements.track.classList.add(
            "is-animating"
        );

        this.state.direction =
            direction;

        this.applyCarouselProgress(

            direction === "next"
                ? -1
                : 1,

            1

        );

        window.setTimeout(

            () => {

                if (direction === "next") {

                    this.state.activeIndex =

                        this.normalizeIndex(

                            this.state.activeIndex +
                            1

                        );

                }

                else {

                    this.state.activeIndex =

                        this.normalizeIndex(

                            this.state.activeIndex -
                            1

                        );

                }

                /*
                 * Die Rotation ist fertig.
                 * Jetzt ist der BACK-Slot
                 * unsichtbar und wir dürfen
                 * die vier DOM-Karten neu
                 * belegen.
                 */

                this.elements.track.classList.remove(
                    "is-animating"
                );

                this.clearInlineCardStyles();

                this.renderCards();

                this.updateIndicators();

                this.state.animating =
                    false;

                this.resetDragValues();

            },

            280

        );

    },

    /* ==========================================
       ZUR MITTE ZURÜCK
    ========================================== */

    returnToCenter() {

        if (this.state.animating) {

            return;

        }

        this.state.animating =
            true;

        this.elements.track.classList.add(
            "is-animating"
        );

        this.clearInlineCardStyles();

        window.setTimeout(

            () => {

                this.elements.track.classList.remove(
                    "is-animating"
                );

                this.renderCards();

                this.state.animating =
                    false;

                this.resetDragValues();

            },

            280

        );

    },

    /* ==========================================
       INLINE STYLES ENTFERNEN
    ========================================== */

    clearInlineCardStyles() {

        this.elements.track
            ?.querySelectorAll(
                ".highlight-card"
            )
            .forEach(

                (card) => {

                    card.style.removeProperty(
                        "transform"
                    );

                    card.style.removeProperty(
                        "opacity"
                    );

                    card.style.removeProperty(
                        "z-index"
                    );

                }

            );

    },

    /* ==========================================
       DIREKT WEITER
    ========================================== */

    goNext() {

        if (

            this.state.animating ||

            !this.canGoNext()

        ) {

            return;

        }

        this.state.direction =
            "next";

        this.prepareBackCard(
            "next"
        );

        this.completeRotation(
            "next"
        );

    },

    /* ==========================================
       DIREKT ZURÜCK
    ========================================== */

    goPrevious() {

        if (

            this.state.animating ||

            !this.canGoPrevious()

        ) {

            return;

        }

        this.state.direction =
            "previous";

        this.prepareBackCard(
            "previous"
        );

        this.completeRotation(
            "previous"
        );

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
       ZU HIGHLIGHT
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

        const forward =

            this.normalizeIndex(

                index -
                this.state.activeIndex

            );

        const backward =

            this.normalizeIndex(

                this.state.activeIndex -
                index

            );

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

        this.elements.track?.classList.remove(
            "is-dragging"
        );

        this.returnToCenter();

    },

    /* ==========================================
       DRAG RESET
    ========================================== */

    resetDragValues() {

        this.state.startX =
            0;

        this.state.direction =
            null;

        this.state.dragProgress =
            0;

        this.state.pointerId =
            null;

        window.setTimeout(

            () => {

                if (!this.state.dragging) {

                    this.state.deltaX =
                        0;

                }

            },

            60

        );

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

        this.state.deltaX =
            0;

        this.state.pointerId =
            null;

        this.state.direction =
            null;

        this.state.dragProgress =
            0;

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