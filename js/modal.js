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

        image: null,

        badge: null,

        title: null,

        date: null,
        dateRow: null,

        time: null,
        timeRow: null,

        location: null,
        locationRow: null,

        dresscode: null,
        dresscodeRow: null,

        meeting: null,
        meetingRow: null,

        contact: null,
        contactRow: null,

        description: null,
        descriptionSection: null,

        mapsLink: null,
        ticketLink: null,

        close: null,
        closeButton: null

    },

        /* ==========================================
       INITIALISIERUNG
    ========================================== */

    init() {

        this.elements.modal = document.getElementById("eventModal");

        this.elements.image = document.getElementById("modalImage");

        this.elements.badge = document.getElementById("modalBadge");

        this.elements.title = document.getElementById("modalTitle");

        this.elements.date = document.getElementById("modalDate");
        this.elements.dateRow = document.getElementById("modalDateRow");

        this.elements.time = document.getElementById("modalTime");
        this.elements.timeRow = document.getElementById("modalTimeRow");

        this.elements.location = document.getElementById("modalLocation");
        this.elements.locationRow = document.getElementById("modalLocationRow");

        this.elements.dresscode = document.getElementById("modalDresscode");
        this.elements.dresscodeRow = document.getElementById("modalDresscodeRow");

        this.elements.meeting = document.getElementById("modalMeeting");
        this.elements.meetingRow = document.getElementById("modalMeetingRow");

        this.elements.contact = document.getElementById("modalContact");
        this.elements.contactRow = document.getElementById("modalContactRow");

        this.elements.description = document.getElementById("modalDescription");
        this.elements.descriptionSection = document.getElementById("modalDescriptionSection");

        this.elements.mapsLink = document.getElementById("mapsLink");

        this.elements.ticketLink = document.getElementById("ticketLink");

        this.elements.close = document.getElementById("closeModal");

        this.elements.closeButton = document.getElementById("closeModalButton");

        this.registerEvents();

    },

    registerEvents() {

        if (this.elements.close) {

            this.elements.close.addEventListener(
                "click",
                () => this.close()
            );

        }

        if (this.elements.closeButton) {

            this.elements.closeButton.addEventListener(
                "click",
                () => this.close()
            );

        }

        if (this.elements.modal) {

            this.elements.modal.addEventListener(
                "click",
                (event) => {

                    if (event.target === this.elements.modal) {

                        this.close();

                    }

                }
            );

        }

        document.addEventListener(

            "keydown",

            (event) => {

                if (event.key === "Escape") {

                    this.close();

                }

            }

        );

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

        document.body.classList.add("no-scroll");

    },

    close() {

        if (!this.elements.modal) {

            return;

        }

        this.elements.modal.classList.remove("show");

        document.body.classList.remove("no-scroll");

        this.state.event = null;

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

        const props = EF22.utils.getProps(this.state.event);

        if (this.elements.image) {

            this.elements.image.style.backgroundImage =
                `url("${props.image}")`;

        }

        if (this.elements.badge) {

            this.elements.badge.className = "modal-badge";

            EF22.utils.addBadgeClass(
                this.elements.badge,
                props.category
            );

            this.elements.badge.textContent =
                props.category;

        }

        if (this.elements.title) {

            this.elements.title.textContent =
                this.state.event.title ?? "";

        }

    },

    renderMeta() {

        const event = this.state.event;

        const props = EF22.utils.getProps(event);

        const start = new Date(event.start);

        if (this.elements.date) {

            this.elements.date.textContent =
                EF22.utils.formatDate(start);

        }

        if (this.elements.dateRow) {

            this.elements.dateRow.hidden = false;

        }

        if (this.elements.time) {

            this.elements.time.textContent =
                EF22.utils.formatEventTime(event);

        }

        if (this.elements.timeRow) {

            this.elements.timeRow.hidden = false;

        }

        if (this.elements.location) {

            this.elements.location.innerHTML =
                props.address
                    ? props.address
                        .split(",")
                        .map(line => line.trim())
                        .join("<br>")
                    : props.location;

        }

        if (this.elements.locationRow) {

            this.elements.locationRow.hidden =
                !(props.address || props.location);

        }

        if (this.elements.dresscode) {

            this.elements.dresscode.textContent =
                props.dresscode;

        }

        if (this.elements.dresscodeRow) {

            this.elements.dresscodeRow.hidden =
                !props.dresscode;

        }

        if (this.elements.meeting) {

            this.elements.meeting.textContent =
                props.meeting;

        }

        if (this.elements.meetingRow) {

            this.elements.meetingRow.hidden =
                !props.meeting;

        }

        if (this.elements.contact) {

            this.elements.contact.textContent =
                props.contact;

        }

        if (this.elements.contactRow) {

            this.elements.contactRow.hidden =
                !props.contact;

        }

    },

    renderContent() {

        const props = EF22.utils.getProps(this.state.event);

        if (this.elements.description) {

            this.elements.description.textContent =
                props.description;

        }

        if (this.elements.descriptionSection) {

            this.elements.descriptionSection.hidden =
                !props.description;

        }

    },

    renderActions() {

        const props = EF22.utils.getProps(this.state.event);

        if (this.elements.mapsLink) {

            if (props.address) {

                this.elements.mapsLink.hidden = false;

                this.elements.mapsLink.href =
                    "https://www.google.com/maps/search/?api=1&query=" +
                    encodeURIComponent(props.address);

            } else {

                this.elements.mapsLink.hidden = true;

                this.elements.mapsLink.removeAttribute("href");

            }

        }

        if (this.elements.ticketLink) {

            if (props.ticket) {

                this.elements.ticketLink.hidden = false;

                this.elements.ticketLink.href =
                    props.ticket;

            } else {

                this.elements.ticketLink.hidden = true;

                this.elements.ticketLink.removeAttribute("href");

            }

        }

    }