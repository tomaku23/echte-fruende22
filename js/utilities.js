/*
=====================================================
 ECHTE FRÜNDE '22
 UTILITIES.JS
 Version 2.0
=====================================================
*/

"use strict";

EF22.utils = {

        /* ==========================================
   DATUM & UHRZEIT
========================================== */

toDate(value) {

    if (value instanceof Date) {

        return value;

    }

    const date = new Date(value);

    if (isNaN(date.getTime())) {

        return null;

    }

    return date;

},

formatDate(value) {

    const date = this.toDate(value);

    if (!date) {

        return "";

    }

    return date.toLocaleDateString(

        EF22.config.locale,

        {

            weekday: "long",

            day: "2-digit",

            month: "long",

            year: "numeric"

        }

    );

},

formatTime(value) {

    const date = this.toDate(value);

    if (!date) {

        return "";

    }

    return date.toLocaleTimeString(

        EF22.config.locale,

        {

            hour: "2-digit",

            minute: "2-digit"

        }

    );

},

formatTimeRange(start, end) {

    const startDate = this.toDate(start);

    if (!startDate) {

        return "";

    }

    const endDate = this.toDate(end);

    if (!endDate) {

        return this.formatTime(startDate);

    }

    return `${

        this.formatTime(startDate)

    } – ${

        this.formatTime(endDate)

    }`;

},

formatEventTime(event) {

    if (!event) {

        return "";

    }

    if (event.allDay) {

        return "Ganztägig";

    }

    return this.formatTimeRange(

        event.start,

        event.end

    );

},

getCountdown(value) {

    const date = this.toDate(value);

    if (!date) {

        return "";

    }

    const MS_PER_DAY = 86400000;

    const today = new Date();

    today.setHours(

        0,

        0,

        0,

        0

    );

    const target = new Date(date);

    target.setHours(

        0,

        0,

        0,

        0

    );

    const days = Math.ceil(

        (target - today) /

        MS_PER_DAY

    );

    if (days < 0) {

        return "Termin vorbei";

    }

    if (days === 0) {

        return "Heute";

    }

    if (days === 1) {

        return "Morgen";

    }

    return `Noch ${days} Tage`;

},

        /* ==========================================
       EVENTS
    ========================================== */

    getProps(event) {

        return {

            image: "images/hero-bg.png",

            category: "Termin",

            location: "",

            address: "",

            description: "",

            dresscode: "",

            meeting: "",

            contact: "",

            ticket: "",

            highlight: false,

            ...(event?.extendedProps ?? {})

        };

    },

    getNextEvent(events) {

        return this
            .sortEvents(events)
            .find(event => this.isFutureEvent(event)) ?? null;

    },

    sortEvents(events) {

        return [...events].sort(

            (a, b) => new Date(a.start) - new Date(b.start)

        );

    },

    filterCalendar(events) {

        return this.sortEvents(events);

    },

    filterHighlights(events) {

        return this
            .sortEvents(events)
            .filter(event => this.getProps(event).highlight);

    },

    isFutureEvent(event) {

        return new Date(event.start) >= new Date();

    },

    /* ==========================================
       HTML
    ========================================== */

    escapeHtml(text) {

        const div = document.createElement("div");

        div.textContent = text ?? "";

        return div.innerHTML;

    },

    /* ==========================================
       CSS
    ========================================== */

    addBadgeClass(element, category) {

        if (!element) {

            return;

        }

        element.classList.remove(

            "badge-fest",
            "badge-meeting",
            "badge-intern",
            "badge-public",
            "badge-royal"

        );

        const classes = {

            "schützenfest": "badge-fest",
            "versammlung": "badge-meeting",
            "intern": "badge-intern",
            "öffentlich": "badge-public",
            "zugkönig": "badge-royal"

        };

        const badge = classes[(category ?? "").toLowerCase()];

        if (badge) {

            element.classList.add(badge);

        }

    }

};