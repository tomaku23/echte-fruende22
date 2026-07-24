/*
=====================================================
 EF22 FRAMEWORK
 HIGHLIGHTS.JS
 Version 4.0
=====================================================
*/

"use strict";

window.EF22 ??= {};

/* ==========================================
   HIGHLIGHTS
========================================== */

EF22.highlights = {

    /* ==========================================
       KONFIGURATION
    ========================================== */

    config: {

        /*
         * Abstand zwischen den Mittelpunkten
         * zweier Karten relativ zur
         * Viewport-Breite.
         */

        spacing:
            0.58,

        /*
         * Größe der direkten Nachbarkarten.
         */

        sideScale:
            0.90,

        /*
         * Minimale Größe weiter entfernter
         * Karten.
         */

        farScale:
            0.82,

        /*
         * Sichtbarkeit der Nachbarkarten.
         */

        sideOpacity:
            0.78,

        /*
         * Ab dieser Entfernung von der Mitte
         * werden Karten vollständig unsichtbar.
         */

        visibilityRange:
            2.25,

        /*
         * Mindestbewegung für einen Wechsel.
         */

        swipeThreshold:
            0.16,

        /*
         * Dauer des Einrastens.
         */

        snapDuration:
            320

    },

    /* ==========================================
       STATE
    ========================================== */

    state: {

        events: [],

        activeIndex:
            0,

        dragging:
            false,

        animating:
            false,

        pointerId:
            null,

        startX:
            0,

        currentX:
            0,

        dragOffset:
            0,

        moved:
            false,

        suppressClick:
            false,

        animationFrame:
            null

    },

    /* ==========================================
   ELEMENTE
========================================== */

elements: {

    section:
        null,

    root:
        null,

    viewport:
        null,

    track:
        null,

    indicators:
        null

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

            this.updateCards();

            this.updateTrackHeight();

        };

},

/* ==========================================
   EVENTS
========================================== */

registerEvents() {

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
                passive:
                    false
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

        this.stopAnimation();

        this.state.events =

            Array.isArray(events)

                ? [...events]

                : [];

        this.state.activeIndex =
            0;

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

    this.updateCards();

    this.updateTrackHeight();

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

        card.type =
            "button";

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

                if (this.state.suppressClick) {

                    clickEvent.preventDefault();

                    return;

                }

                const relative =

                    this.getRelativeIndex(
                        index
                    );

                /*
                 * Direkter Nachbar:
                 * Karte aktivieren.
                 */

                if (relative === 1) {

                    this.snapToNeighbour(
                        1
                    );

                    return;

                }

                if (relative === -1) {

                    this.snapToNeighbour(
                        -1
                    );

                    return;

                }

                /*
                 * Nur aktive Karte
                 * öffnet das Modal.
                 */

                if (relative !== 0) {

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
       RELATIVER INDEX

       Liefert die kürzeste Entfernung einer
       Karte zur aktiven Karte im Ring.

       Beispiel bei 5 Karten:

       active = 0

       Karte 0 =  0
       Karte 1 = +1
       Karte 2 = +2
       Karte 3 = -2
       Karte 4 = -1
    ========================================== */

    getRelativeIndex(index) {

        const count =

            this.state.events.length;

        if (!count) {

            return 0;

        }

        /*
         * Zwei Karten sind kein Ring.
         */

        if (count === 2) {

            return (

                index -
                this.state.activeIndex

            );

        }

        let difference =

            index -
            this.state.activeIndex;

        const half =

            count /
            2;

        while (difference > half) {

            difference -=
                count;

        }

        while (difference < -half) {

            difference +=
                count;

        }

        /*
         * Bei gerader Kartenanzahl liegt die
         * exakt gegenüberliegende Karte
         * mathematisch auf beiden Seiten.

         * Wir halten ihre Richtung stabil.
        */

        if (

            count % 2 === 0 &&

            Math.abs(difference) === half

        ) {

            difference =

                index >=
                this.state.activeIndex

                    ? half

                    : -half;

        }

        return difference;

    },

    /* ==========================================
       VIEWPORT BREITE
    ========================================== */

    getViewportWidth() {

        return Math.max(

            1,

            this.elements.viewport
                ?.clientWidth ??

            1

        );

    },

    /* ==========================================
       KARTENABSTAND
    ========================================== */

    getCardSpacing() {

        return (

            this.getViewportWidth() *

            this.config.spacing

        );

    },

    /* ==========================================
       DRAG IN KARTENPOSITIONEN

       1.0 entspricht genau dem Abstand
       zweier Karten.
    ========================================== */

    getDragPosition() {

        const spacing =

            this.getCardSpacing();

        if (!spacing) {

            return 0;

        }

        return (

            this.state.dragOffset /
            spacing

        );

    },

    /* ==========================================
       KARTEN AKTUALISIEREN
    ========================================== */

    updateCards() {

        if (!this.elements.track) {

            return;

        }

        const cards =

            this.elements.track.querySelectorAll(
                ".highlight-card"
            );

        const count =

            cards.length;

        if (!count) {

            return;

        }

        /*
         * Eine Karte steht einfach mittig.
         */

        if (count === 1) {

            const card =
                cards[0];

            card.style.transform =

                "translateX(-50%) scale(1)";

            card.style.opacity =
                "1";

            card.style.zIndex =
                "10";

            card.style.pointerEvents =
                "auto";

            card.setAttribute(
                "aria-current",
                "true"
            );

            return;

        }

        const dragPosition =

            this.getDragPosition();

        cards.forEach(

            (card, index) => {

                /*
                 * Finger nach links:
                 *
                 * dragPosition negativ.
                 *
                 * Rechte Karte bewegt sich
                 * dadurch Richtung Mitte.
                 */

                const basePosition =

                    this.getRelativeIndex(
                        index
                    );

                const position =

                    basePosition +
                    dragPosition;

                this.positionCard(

                    card,

                    position,

                    index

                );

            }

        );

    },

/* ==========================================
   TRACK HÖHE
========================================== */

updateTrackHeight() {

    if (!this.elements.track) {

        return;

    }

    const cards =

        Array.from(

            this.elements.track.querySelectorAll(
                ".highlight-card"
            )

        );

    if (!cards.length) {

        this.elements.track.style.height =
            "";

        return;

    }

    let maxHeight =
        0;

    cards.forEach(

        (card) => {

            maxHeight =

                Math.max(

                    maxHeight,

                    card.offsetHeight

                );

        }

    );

    const styles =

        getComputedStyle(
            this.elements.track
        );

    const paddingTop =

        parseFloat(
            styles.paddingTop
        ) || 0;

    const paddingBottom =

        parseFloat(
            styles.paddingBottom
        ) || 0;

    this.elements.track.style.height =

        `${maxHeight + paddingTop + paddingBottom}px`;

},

    /* ==========================================
       EINZELNE KARTE POSITIONIEREN
    ========================================== */

    positionCard(
        card,
        position,
        index
    ) {

        const absolute =

            Math.abs(
                position
            );

        /*
         * X-Position.

         * position 0  = Mitte
         * position 1  = rechts
         * position -1 = links
        */

        const x =

            position *

            this.config.spacing *

            100;

        /*
         * Skalierung.

         * Zwischen Mitte und Nachbar wird
         * kontinuierlich interpoliert.
        */

        let scale;

        if (absolute <= 1) {

            scale =

                this.lerp(

                    1,

                    this.config.sideScale,

                    absolute

                );

        }

        else {

            scale =

                this.lerp(

                    this.config.sideScale,

                    this.config.farScale,

                    Math.min(
                        1,
                        absolute - 1
                    )

                );

        }

        /*
         * Opacity.

         * Direkte Nachbarn bleiben sichtbar.
         * Weiter entfernte Karten verschwinden
         * weich außerhalb des Viewports.
        */

        let opacity;

        if (absolute <= 1) {

            opacity =

                this.lerp(

                    1,

                    this.config.sideOpacity,

                    absolute

                );

        }

        else {

            opacity =

                this.lerp(

                    this.config.sideOpacity,

                    0,

                    Math.min(

                        1,

                        (
                            absolute - 1
                        ) /
                        (
                            this.config.visibilityRange -
                            1
                        )

                    )

                );

        }

        if (

            absolute >=
            this.config.visibilityRange

        ) {

            opacity =
                0;

        }

        /*
         * Je näher zur Mitte,
         * desto weiter vorne.
        */

        const zIndex =

            Math.max(

                1,

                100 -
                Math.round(
                    absolute * 10
                )

            );

        card.style.transform =

            `translateX(calc(-50% + ${x}%)) scale(${scale})`;

        card.style.opacity =

            String(
                opacity
            );

        card.style.zIndex =

            String(
                zIndex
            );

        /*
         * Nur Karten im sichtbaren Bereich
         * sollen anklickbar sein.
        */

        card.style.pointerEvents =

            absolute <= 1.15

                ? "auto"

                : "none";

        /*
         * aria-current gehört nur zur
         * tatsächlich eingerasteten Karte.
        */

        if (

            index ===
            this.state.activeIndex &&

            !this.state.dragging

        ) {

            card.setAttribute(

                "aria-current",

                "true"

            );

        }

        else {

            card.removeAttribute(
                "aria-current"
            );

        }

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

        this.stopAnimation();

        this.state.dragging =
            true;

        this.state.pointerId =
            event.pointerId;

        this.state.startX =
            event.clientX;

        this.state.currentX =
            event.clientX;

        this.state.dragOffset =
            0;

        this.state.moved =
            false;

        this.state.suppressClick =
            false;

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

        this.state.currentX =
            event.clientX;

        let offset =

            this.state.currentX -
            this.state.startX;

        /*
         * Bei zwei Highlights gibt es
         * echte Endpunkte.

         * Dort federt die Bewegung außerhalb
         * des erlaubten Bereichs nur leicht.
        */

        if (

            this.state.events.length === 2

        ) {

            if (

                this.state.activeIndex === 0 &&

                offset > 0

            ) {

                offset *=
                    .16;

            }

            if (

                this.state.activeIndex === 1 &&

                offset < 0

            ) {

                offset *=
                    .16;

            }

        }

        this.state.dragOffset =
            offset;

        if (

            Math.abs(offset) >
            4

        ) {

            this.state.moved =
                true;

            this.state.suppressClick =
                true;

            event.preventDefault();

        }

        this.updateCards();

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

        this.state.dragging =
            false;

        this.elements.viewport.classList.remove(
            "is-dragging"
        );

        const viewportWidth =

            this.getViewportWidth();

        const threshold =

            viewportWidth *

            this.config.swipeThreshold;

        const offset =

            this.state.dragOffset;

        let direction =
            0;

        /*
         * WICHTIG:

         * Egal wie weit gezogen wurde:
         * pro Geste maximal EIN Nachbar.
        */

        if (

            offset <=
            -threshold

        ) {

            direction =
                1;

        }

        else if (

            offset >=
            threshold

        ) {

            direction =
                -1;

        }

        /*
         * Zwei Highlights besitzen Grenzen.
        */

        if (

            this.state.events.length === 2

        ) {

            if (

                this.state.activeIndex === 0 &&

                direction === -1

            ) {

                direction =
                    0;

            }

            if (

                this.state.activeIndex === 1 &&

                direction === 1

            ) {

                direction =
                    0;

            }

        }

        this.snap(
            direction
        );

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

        this.snap(
            0
        );

    },

    /* ==========================================
       ZUM NACHBARN EINRASTEN
    ========================================== */

    snapToNeighbour(direction) {

        if (

            this.state.animating ||

            this.state.events.length <= 1

        ) {

            return;

        }

        if (

            this.state.events.length === 2

        ) {

            if (

                direction === -1 &&

                this.state.activeIndex === 0

            ) {

                return;

            }

            if (

                direction === 1 &&

                this.state.activeIndex === 1

            ) {

                return;

            }

        }

        this.state.dragOffset =
            0;

        this.snap(
            direction
        );

    },

    /* ==========================================
       SNAP

       direction:

        -1 = vorherige Karte
         0 = zurück zur aktuellen
        +1 = nächste Karte
    ========================================== */

    snap(direction) {

        if (this.state.animating) {

            return;

        }

        const startOffset =

            this.state.dragOffset;

        /*
         * Zielposition relativ zur aktuell
         * aktiven Karte.

         * NEXT:
         * Ring muss um einen Kartenabstand
         * nach links.

         * PREVIOUS:
         * Ring muss nach rechts.
        */

        const targetOffset =

            direction === 1

                ? -this.getCardSpacing()

                : direction === -1

                    ? this.getCardSpacing()

                    : 0;

        this.state.animating =
            true;

        this.animateOffset(

            startOffset,

            targetOffset,

            this.config.snapDuration,

            () => {

                /*
                 * Erst NACH der sichtbaren
                 * Bewegung wird activeIndex
                 * geändert.
                */

                if (direction !== 0) {

                    if (

                        this.state.events.length === 2

                    ) {

                        this.state.activeIndex +=
                            direction;

                    }

                    else {

                        this.state.activeIndex =

                            this.normalizeIndex(

                                this.state.activeIndex +
                                direction

                            );

                    }

                }

                /*
                 * Durch den neuen activeIndex
                 * entspricht Offset 0 exakt
                 * derselben visuellen Position.

                 * Deshalb ist dieser Reset
                 * unsichtbar.
                */

                this.state.dragOffset =
                    0;

                this.state.animating =
                    false;

                this.updateCards();

                this.updateIndicators();

                this.finishInteraction();

            }

        );

    },

    /* ==========================================
       OFFSET ANIMIEREN
    ========================================== */

    animateOffset(
        from,
        to,
        duration,
        callback
    ) {

        this.stopAnimation();

        const startTime =

            performance.now();

        const step =

            (time) => {

                const elapsed =

                    time -
                    startTime;

                const progress =

                    Math.min(

                        1,

                        elapsed /
                        duration

                    );

                const eased =

                    this.easeOutCubic(
                        progress
                    );

                this.state.dragOffset =

                    this.lerp(

                        from,

                        to,

                        eased

                    );

                this.updateCards();

                if (progress < 1) {

                    this.state.animationFrame =

                        requestAnimationFrame(
                            step
                        );

                    return;

                }

                this.state.animationFrame =
                    null;

                callback?.();

            };

        this.state.animationFrame =

            requestAnimationFrame(
                step
            );

    },

    /* ==========================================
       EASING
    ========================================== */

    easeOutCubic(value) {

        return (

            1 -
            Math.pow(
                1 - value,
                3
            )

        );

    },

    /* ==========================================
       ANIMATION STOPPEN
    ========================================== */

    stopAnimation() {

        if (

            this.state.animationFrame !==
            null

        ) {

            cancelAnimationFrame(

                this.state.animationFrame

            );

            this.state.animationFrame =
                null;

        }

    },

    /* ==========================================
       INTERAKTION ABSCHLIESSEN
    ========================================== */

    finishInteraction() {

        this.state.pointerId =
            null;

        this.state.startX =
            0;

        this.state.currentX =
            0;

        this.state.dragOffset =
            0;

        this.state.moved =
            false;

        /*
         * Den Click noch kurz unterdrücken,
         * damit pointerup nicht versehentlich
         * das Modal öffnet.
        */

        window.setTimeout(

            () => {

                this.state.suppressClick =
                    false;

            },

            80

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

        this.state.pointerId =
            null;

        this.state.startX =
            0;

        this.state.currentX =
            0;

        this.state.dragOffset =
            0;

        this.state.moved =
            false;

        this.state.suppressClick =
            false;

        this.state.animationFrame =
            null;

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

                /*
                 * Die Punkte sind Navigation.

                 * Auch hier bewegen wir uns
                 * absichtlich nur einen Schritt.
                */

                indicator.addEventListener(

                    "click",

                    () => {

                        if (

                            index ===
                            this.state.activeIndex

                        ) {

                            return;

                        }

                        const relative =

                            this.getRelativeIndex(
                                index
                            );

                        this.snapToNeighbour(

                            relative > 0

                                ? 1

                                : -1

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
       DESTROY
    ========================================== */

    destroy() {

        this.stopAnimation();

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

        this.state.events =
            [];

        this.state.activeIndex =
            0;

        this.resetInteraction();

    }

};