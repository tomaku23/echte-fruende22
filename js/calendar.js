/*
=====================================================
 ECHTE FRÜNDE '22
 CALENDAR.JS
 Version 3.0
=====================================================
*/

"use strict";

window.EF22 ??= {};

/* ==========================================
   KALENDER
========================================== */

EF22.calendar = {

    /* ==========================================
       STATE
    ========================================== */

    state: {

        events: [],

        calendar: null

    },

    /* ==========================================
       ELEMENTE
    ========================================== */

    elements: {

        calendar: null

    },

    /* ==========================================
       INITIALISIERUNG
    ========================================== */

    async init() {

        this.elements.calendar =

            document.getElementById(
                "calendar"
            );

        if (!this.elements.calendar) {

            return;

        }

        await this.loadEvents();

    },

    /* ==========================================
       EVENTS LADEN
    ========================================== */

    async loadEvents() {

        try {

            const response = await fetch(

                EF22.config.api.calendar

            );

            if (!response.ok) {

                throw new Error(

                    `HTTP ${response.status}`

                );

            }

            const result = await response.json();

            if (!result.success) {

                throw new Error(

                    "API meldet einen Fehler."

                );

            }

            this.state.events =

                EF22.utils.filterCalendar(

                    result.events

                );

            this.refresh();

        }

        catch (error) {

            console.error(

                "Kalender konnte nicht geladen werden.",

                error

            );

            this.state.events = [];

            this.refresh();

        }

    },

    /* ==========================================
       REFRESH
    ========================================== */

    refresh() {

        this.updateComponents();

        this.renderCalendar();

    },

    /* ==========================================
       KOMPONENTEN
    ========================================== */

    updateComponents() {

        const nextEvent =

            EF22.utils.getNextEvent(

                this.state.events

            );

        this.updateHero(

            nextEvent

        );

        EF22.highlights.refresh(

            EF22.utils.filterHighlights(

                this.state.events

            )

        );

    },

    /* ==========================================
       HERO
    ========================================== */

    updateHero(event) {

        if (!event) {

            EF22.hero.clear();

            return;

        }

        const props =

            EF22.utils.getProps(

                event

            );

        EF22.hero.refresh({

            image:
                props.image,

            badge:
                props.category,

            title:
                event.title,

            date:
                EF22.utils.formatDate(
                    event.start
                ),

            time:
                EF22.utils.formatTimeRange(
                    event.start,
                    event.end
                ),

            location:
                props.location,

            countdown:
                this.getCountdown(
                    event.start
                ),

            hint:
                "Für Details tippen",

            action: () => {

                EF22.modal.open(

                    event

                );

            }

        });

    },

    /* ==========================================
       COUNTDOWN
    ========================================== */

    getCountdown(start) {

        if (!start) {

            return "";

        }

        const now = new Date();

        const eventDate = new Date(

            start

        );

        const diff =

            eventDate.getTime() -

            now.getTime();

        if (diff <= 0) {

            return "";

        }

        const days = Math.ceil(

            diff /

            1000 /

            60 /

            60 /

            24

        );

        return `Noch ${days} Tag${days !== 1 ? "e" : ""}`;

    },

    /* ==========================================
       KALENDER RENDERN
    ========================================== */

    renderCalendar() {

        if (!this.elements.calendar) {

            return;

        }

        if (this.state.calendar) {

            this.state.calendar.destroy();

        }

        this.state.calendar =

            new FullCalendar.Calendar(

                this.elements.calendar,

                this.getCalendarOptions()

            );

        this.state.calendar.render();

    },

    /* ==========================================
       KALENDER OPTIONEN
    ========================================== */

    getCalendarOptions() {

        return {

            locale: "de",

            initialView: "dayGridMonth",

            firstDay: 1,

            height: "auto",

            events: this.state.events,

            headerToolbar: {

                left: "prev,next today",

                center: "title",

                right: "dayGridMonth,listMonth"

            },

            eventClick: (info) => {

                info.jsEvent.preventDefault();

                this.onEventClick(

                    info

                );

            }

        };

    },

    /* ==========================================
       EVENT CLICK
    ========================================== */

    onEventClick(info) {

        EF22.modal.open(

            info.event

        );

    },

    /* ==========================================
       DESTROY
    ========================================== */

    destroy() {

        if (this.state.calendar) {

            this.state.calendar.destroy();

            this.state.calendar = null;

        }

        this.state.events = [];

    }

};