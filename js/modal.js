/*
=====================================================
 ECHTE FRÜNDE '22
 MODAL.JS
 Version 2.0
=====================================================

Modal-Komponente des EF22 Frameworks.

Verantwortung:
- Modal öffnen
- Modal schließen
- Inhalte darstellen

Nicht verantwortlich für:
- API
- Kalender
- Hero
- Highlights

=====================================================
*/

"use strict";

window.EF22 ??= {};

/* ==========================================
   MODAL
========================================== */

EF22.modal = {

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

    modal: null,

    overlay: null,

    window: null,

    closeButton: null,

    image: null,

    badge: null,

    title: null,

    meta: null,

    content: null,

    actions: null

},

        /* ==========================================
   INITIALISIERUNG
========================================== */

init() {

    this.elements.modal =
        document.getElementById("eventModal");

    this.elements.overlay =
        this.elements.modal?.querySelector(".modal-overlay");

    this.elements.window =
        this.elements.modal?.querySelector(".modal-window");

    this.elements.closeButton =
        document.getElementById("closeModalButton");

    this.elements.image =
        document.getElementById("modalImage");

    this.elements.badge =
        document.getElementById("modalBadge");

    this.elements.title =
        document.getElementById("modalTitle");

    this.elements.meta =
        document.getElementById("modalMeta");

    this.elements.content =
        document.getElementById("modalContent");

    this.elements.actions =
        document.getElementById("modalActions");

    this.registerEvents();

},

        /* ==========================================
   ÖFFENTLICHE METHODEN
========================================== */

open(event) {

    if (!event || !this.elements.modal) {

        return;

    }

    this.state.event = event;

    this.render();

    this.elements.modal.classList.add("show");

    this.elements.modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add("no-scroll");

    this.elements.closeButton?.focus();

},

close() {

    if (!this.elements.modal) {

        return;

    }

    this.elements.modal.classList.remove("show");

    this.elements.modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove("no-scroll");

    this.state.event = null;

    if (this.elements.image) {

        this.elements.image.style.backgroundImage = "";

    }

    if (this.elements.badge) {

        this.elements.badge.textContent = "";

        this.elements.badge.className = "modal-badge";

    }

    if (this.elements.title) {

        this.elements.title.textContent = "";

    }

    if (this.elements.meta) {

        this.elements.meta.innerHTML = "";

    }

    if (this.elements.content) {

        this.elements.content.innerHTML = "";

    }

    if (this.elements.actions) {

        this.elements.actions.innerHTML = "";

    }

},

            /* ==========================================
   PRIVATE METHODEN
========================================== */

render() {

    if (!this.state.event) {

        return;

    }

    this.renderHeader();

    this.renderMeta();

    this.renderContent();

    this.renderActions();

},

renderHeader() {

    const props = EF22.utils.getProps(
        this.state.event
    );

    if (this.elements.image) {

        this.elements.image.style.backgroundImage =
            props.image
                ? `url("${props.image}")`
                : "";

    }

    if (this.elements.badge) {

        this.elements.badge.className =
            "modal-badge";

        if (props.category) {

            EF22.utils.addBadgeClass(
                this.elements.badge,
                props.category
            );

            this.elements.badge.textContent =
                props.category;

        } else {

            this.elements.badge.textContent = "";

        }

    }

    if (this.elements.title) {

        this.elements.title.textContent =
            this.state.event.title ?? "";

    }

},

renderMeta() {

    if (!this.elements.meta) {

        return;

    }

    const event = this.state.event;

    const props = EF22.utils.getProps(event);

    const meta = [];

    meta.push({

        label: "Datum",

        value: EF22.utils.formatDate(
            new Date(event.start)
        )

    });

    meta.push({

        label: "Uhrzeit",

        value: EF22.utils.formatEventTime(
            event
        )

    });

    if (props.location || props.address) {

        meta.push({

            label: "Ort",

            value: props.address ?? props.location

        });

    }

    if (props.meeting) {

        meta.push({

            label: "Treffpunkt",

            value: props.meeting

        });

    }

    if (props.dresscode) {

        meta.push({

            label: "Dresscode",

            value: props.dresscode

        });

    }

    if (props.contact) {

        meta.push({

            label: "Kontakt",

            value: props.contact

        });

    }

    this.elements.meta.innerHTML = meta
        .map(item => `

            <div class="modal-meta-item">

                <div class="modal-meta-label">

                    ${item.label}

                </div>

                <div class="modal-meta-value">

                    ${item.value}

                </div>

            </div>

        `)
        .join("");

},

renderContent() {

    if (!this.elements.content) {

        return;

    }

    const props = EF22.utils.getProps(
        this.state.event
    );

    this.elements.content.innerHTML =
        props.description
            ? `<p>${props.description}</p>`
            : "";

},

renderActions() {

    if (!this.elements.actions) {

        return;

    }

    const props = EF22.utils.getProps(
        this.state.event
    );

    const actions = [];

    if (props.address) {

        actions.push(`

            <a
                class="btn btn-outline"
                href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(props.address)}"
                target="_blank"
                rel="noopener">

                Route

            </a>

        `);

    }

    if (props.ticket) {

        actions.push(`

            <a
                class="btn"
                href="${props.ticket}"
                target="_blank"
                rel="noopener">

                Tickets

            </a>

        `);

    }

    this.elements.actions.innerHTML =
        actions.join("");

}

};