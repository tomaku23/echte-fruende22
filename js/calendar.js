/*
=====================================================
 ECHTE FRÜNDE '22
 CALENDAR.JS
 Version 2.0
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

    console.log(

        "1. calendar.init()"

    );

    this.elements.calendar =

        document.getElementById(

            "calendar"

        );

    console.log(

        "2. calendar Element:",

        this.elements.calendar

    );

    if (

        !this.elements.calendar

    ) {

        console.log(

            "3. Kein Calendar-Element gefunden."

        );

        return;

    }

    console.log(

        "4. loadEvents()"

    );

    await this.loadEvents();

    console.log(

        "5. init beendet"

    );

},
    
        /* ==========================================
   ÖFFENTLICHE METHODEN
========================================== */

async loadEvents() {

    try {

        const response = await fetch(

            EF22.config.api.calendar

        );

        console.log(

            "API Response:",

            response

        );

        if (!response.ok) {

            throw new Error(

                `HTTP ${response.status}`

            );

        }

        const result = await response.json();

        console.log(

            "API JSON:",

            result

        );

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

            "Kalender konnte nicht geladen werden."

        );

        console.error(

            "Message:",

            error.message

        );

        console.error(

            "Stack:",

            error.stack

        );

        console.error(

            error

        );

        this.state.events = [];

        this.refresh();

    }

},

refresh() {

    this.updateComponents();

    this.renderCalendar();

},

        /* ==========================================
   PRIVATE METHODEN
========================================== */

renderCalendar() {

    if (!this.elements.calendar) {

        return;

    }

    if (this.state.calendar) {

        this.state.calendar.destroy();

    }

    this.state.calendar = new FullCalendar.Calendar(

        this.elements.calendar,

        this.getCalendarOptions()

    );

    this.state.calendar.render();

},

updateComponents() {

    const nextEvent = EF22.utils.getNextEvent(

        this.state.events

    );

    EF22.hero.refresh(

        nextEvent

    );

    EF22.highlights.refresh(

        EF22.utils.filterHighlights(

            this.state.events

        )

    );

},

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

onEventClick(info) {

    EF22.modal.open(

        info.event

    );

    }

};