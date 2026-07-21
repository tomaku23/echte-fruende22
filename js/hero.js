/*
=====================================================
 ECHTE FRÜNDE '22
 HERO.JS
 Version 2.0
=====================================================
*/

"use strict";

EF22.hero = {

    /* ==========================================
   STATE
========================================== */

state: {

    event: null

},

    /* ==========================================
       ELEMENTE
    ========================================== */

    elements: {

        hero: null,
        background: null,
        badge: null,
        title: null,
        date: null,
        time: null,
        location: null,
        countdown: null,
        hint: null

    },

    /* ==========================================
   INITIALISIERUNG
========================================== */

init() {

    this.elements.hero = document.getElementById("hero");
    this.elements.background = document.getElementById("heroBackground");
    this.elements.badge = document.getElementById("heroBadge");
    this.elements.title = document.getElementById("heroTitle");
    this.elements.date = document.getElementById("heroDate");
    this.elements.time = document.getElementById("heroTime");
    this.elements.location = document.getElementById("heroLocation");
    this.elements.countdown = document.getElementById("heroCountdown");
    this.elements.hint = document.getElementById("heroHint");

    this.registerEvents();

},

registerEvents() {

    if (!this.elements.hero) {

        return;

    }

    this.elements.hero.addEventListener(
        "click",
        () => {

            if (this.state.event) {

                EF22.modal.open(
                    this.state.event
                );

            }

        }
    );

    this.elements.hero.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                if (this.state.event) {

                    EF22.modal.open(
                        this.state.event
                    );

                }

            }

        }
    );

},

    /* ==========================================
   ÖFFENTLICHE METHODEN
========================================== */

refresh(event) {

    this.state.event = event;

    this.render();

},

render() {

    if (!this.state.event) {

        this.renderEmpty();

        return;

    }

    this.renderBackground();

    this.renderBadge();

    this.renderTitle();

    this.renderDate();

    this.renderTime();

    this.renderLocation();

    this.renderCountdown();

},

            /* ==========================================
       PRIVATE METHODEN
    ========================================== */

    renderEmpty() {

        if (!this.elements.background) {

            return;

        }

        this.elements.badge.className = "hero-badge";
        this.elements.badge.textContent = "Termine";

        this.elements.title.textContent =
            "Zurzeit sind keine Termine vorhanden.";

        this.elements.date.textContent =
            "Neue Veranstaltungen folgen bald.";

        this.elements.time.textContent = "";

        this.elements.location.textContent = "";

        this.elements.countdown.textContent = "--";

        this.elements.background.style.backgroundImage =
            'url("images/hero-bg.png")';

    },

    renderBackground() {

        const props = EF22.utils.getProps(
            this.state.event
        );

        this.elements.background.style.backgroundImage =
            `url("${props.image}")`;

    },

    renderBadge() {

        const props = EF22.utils.getProps(
            this.state.event
        );

        this.elements.badge.className =
            "hero-badge";

        EF22.utils.addBadgeClass(
            this.elements.badge,
            props.category
        );

        this.elements.badge.textContent =
            props.category;

    },

    renderTitle() {

        this.elements.title.textContent =
            this.state.event.title ?? "";

    },

    renderDate() {

        this.elements.date.textContent =
            EF22.utils.formatDate(
                new Date(this.state.event.start)
            );

    },

    renderTime() {

        const event = this.state.event;

        const start = new Date(event.start);

        const end = event.end
            ? new Date(event.end)
            : null;

        this.elements.time.textContent =
            event.allDay
                ? "Ganztägig"
                : (
                    end
                        ? `${EF22.utils.formatTime(start)} – ${EF22.utils.formatTime(end)}`
                        : EF22.utils.formatTime(start)
                );

    },

    renderLocation() {

        const props = EF22.utils.getProps(
            this.state.event
        );

        this.elements.location.textContent =
            props.location;

    },

    renderCountdown() {

        this.elements.countdown.textContent =
            EF22.utils.getCountdown(
                new Date(this.state.event.start)
            );

    }

};