/*
=====================================================
 ECHTE FRÜNDE '22
 HIGHLIGHTS.JS
 Version 2.0
=====================================================

Highlight-Komponente des EF22 Frameworks.

Verantwortung:
- Highlight-Karten erzeugen
- Highlight-Liste aktualisieren

Nicht verantwortlich für:
- API
- Modal
- Hero
- Kalender

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

        events: []

    },

    /* ==========================================
       ELEMENTE
    ========================================== */

    elements: {

        container: null

    },

    /* ==========================================
       INITIALISIERUNG
    ========================================== */

    init() {

        this.elements.container =
            document.getElementById("highlights");

    },

    /* ==========================================
       ÖFFENTLICHE METHODEN
    ========================================== */

    refresh(events = []) {

        this.state.events = events;

        this.render();

    },

        /* ==========================================
       PRIVATE METHODEN
    ========================================== */

    render() {

        this.clear();

        if (!this.elements.container) {

            return;

        }

        if (!this.state.events.length) {

            const card = document.createElement("article");
            card.className = "highlight-card";

            const content = document.createElement("div");
            content.className = "highlight-content";

            const badge = document.createElement("span");
            badge.className = "highlight-badge";
            badge.textContent = "Zurzeit nichts geplant";

            const title = document.createElement("h3");
            title.className = "highlight-title";
            title.textContent = "Keine Highlights vorhanden";

            const description = document.createElement("p");
            description.className = "highlight-description";
            description.textContent =
                "Neue Veranstaltungen erscheinen hier automatisch, sobald sie im Kalender als Highlight markiert wurden.";

            content.append(
                badge,
                title,
                description
            );

            card.appendChild(content);

            this.elements.container.appendChild(card);

            return;

        }

        this.state.events.forEach(event => {

            this.elements.container.appendChild(

                this.renderCard(event)

            );

        });

    },

    clear() {

        if (!this.elements.container) {

            return;

        }

        this.elements.container.replaceChildren();

    },

    renderCard(event) {

        const props = EF22.utils.getProps(event);

        const start = new Date(event.start);

        const card = document.createElement("article");
        card.className = "highlight-card";

        const image = document.createElement("div");
        image.className = "highlight-image";
        image.style.backgroundImage =
            `url("${props.image}")`;

        const content = document.createElement("div");
        content.className = "highlight-content";

        const badge = document.createElement("span");
        badge.className = "highlight-badge";

        EF22.utils.addBadgeClass(
            badge,
            props.category
        );

        badge.textContent = props.category;

        const title = document.createElement("h3");
        title.className = "highlight-title";
        title.textContent = event.title ?? "";

        const date = document.createElement("div");
        date.className = "highlight-date";
        date.textContent =
            EF22.utils.formatDate(start);

        const description = document.createElement("p");
        description.className = "highlight-description";
        description.textContent =
            props.description;

        const footer = document.createElement("div");
        footer.className = "highlight-footer";

        const countdown = document.createElement("span");
        countdown.className = "highlight-countdown";
        countdown.textContent =
            EF22.utils.getCountdown(start);

        const arrow = document.createElement("span");
        arrow.className = "highlight-arrow";
        arrow.textContent = "→";

        footer.append(
            countdown,
            arrow
        );

        content.append(
            badge,
            title,
            date,
            description,
            footer
        );

        card.append(
            image,
            content
        );

        card.addEventListener(
            "click",
            () => EF22.modal.open(event)
        );

        return card;

    }