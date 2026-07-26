/*
=====================================================
 ECHTE FRÜNDE '22
 UTILITIES.JS
 Version 3.1
=====================================================
*/

"use strict";

window.EF22 ??= {};

/* ==========================================
   UTILITIES
========================================== */

EF22.utils = {

    /* ==========================================
       DATUM & UHRZEIT
    ========================================== */

    toDate(value) {

        if (value instanceof Date) {

            return value;

        }

        const date =
            new Date(value);

        if (isNaN(date.getTime())) {

            return null;

        }

        return date;

    },

    formatDate(value) {

        const date =
            this.toDate(value);

        if (!date) {

            return "";

        }

        return date.toLocaleDateString(

            EF22.config.locale,

            {

                weekday:
                    "long",

                day:
                    "2-digit",

                month:
                    "long",

                year:
                    "numeric"

            }

        );

    },

    formatTime(value) {

        const date =
            this.toDate(value);

        if (!date) {

            return "";

        }

        return date.toLocaleTimeString(

            EF22.config.locale,

            {

                hour:
                    "2-digit",

                minute:
                    "2-digit"

            }

        );

    },

    formatTimeRange(start, end) {

        const startDate =
            this.toDate(start);

        if (!startDate) {

            return "";

        }

        const endDate =
            this.toDate(end);

        if (!endDate) {

            return this.formatTime(
                startDate
            );

        }

        return `${

            this.formatTime(
                startDate
            )

        } – ${

            this.formatTime(
                endDate
            )

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

    /* ==========================================
       MEHRTÄGIGES EVENT

       EF22-Regel:

       start = erster Veranstaltungstag
       end   = letzter Veranstaltungstag

       Beide Tage gehören vollständig zum
       Veranstaltungszeitraum.

       allDay beeinflusst diese Regel nicht.
    ========================================== */

    isMultiDayEvent(event) {

        if (

            !event?.start ||

            !event?.end

        ) {

            return false;

        }

        const start =
            this.toDate(
                event.start
            );

        const end =
            this.toDate(
                event.end
            );

        if (

            !start ||

            !end

        ) {

            return false;

        }

        return (

            start.getFullYear() !==
                end.getFullYear() ||

            start.getMonth() !==
                end.getMonth() ||

            start.getDate() !==
                end.getDate()

        );

    },

    /* ==========================================
       EVENT-DATUM

       EF22 verwendet Start- und Enddatum
       grundsätzlich inklusive.

       Beispiele:

       Freitag, 31. Juli 2026

       18.–20. September 2026

       30. September – 2. Oktober 2026

       30. Dezember 2026 – 2. Januar 2027
    ========================================== */

    formatEventDate(event) {

        if (!event?.start) {

            return "";

        }

        const start =
            this.toDate(
                event.start
            );

        if (!start) {

            return "";

        }

        /*
         * EINZELNER TAG
         */

        if (

            !this.isMultiDayEvent(
                event
            )

        ) {

            return start.toLocaleDateString(

                EF22.config.locale,

                {

                    weekday:
                        "long",

                    day:
                        "numeric",

                    month:
                        "long",

                    year:
                        "numeric"

                }

            );

        }

        /*
         * MEHRTÄGIG
         */

        const end =
            this.toDate(
                event.end
            );

        if (!end) {

            return this.formatDate(
                start
            );

        }

        const sameYear =

            start.getFullYear() ===
            end.getFullYear();

        const sameMonth =

            sameYear &&

            start.getMonth() ===
            end.getMonth();

        /*
         * GLEICHER MONAT

         * 18.–20. September 2026
         */

        if (sameMonth) {

            const monthYear =

                end.toLocaleDateString(

                    EF22.config.locale,

                    {

                        month:
                            "long",

                        year:
                            "numeric"

                    }

                );

            return `${

                start.getDate()

            }.–${

                end.getDate()

            }. ${

                monthYear

            }`;

        }

        /*
         * GLEICHES JAHR,
         * UNTERSCHIEDLICHE MONATE

         * 30. September – 2. Oktober 2026
         */

        if (sameYear) {

            const startPart =

                start.toLocaleDateString(

                    EF22.config.locale,

                    {

                        day:
                            "numeric",

                        month:
                            "long"

                    }

                );

            const endPart =

                end.toLocaleDateString(

                    EF22.config.locale,

                    {

                        day:
                            "numeric",

                        month:
                            "long",

                        year:
                            "numeric"

                    }

                );

            return `${

                startPart

            } – ${

                endPart

            }`;

        }

        /*
         * UNTERSCHIEDLICHE JAHRE

         * 30. Dezember 2026 – 2. Januar 2027
         */

        const startPart =

            start.toLocaleDateString(

                EF22.config.locale,

                {

                    day:
                        "numeric",

                    month:
                        "long",

                    year:
                        "numeric"

                }

            );

        const endPart =

            end.toLocaleDateString(

                EF22.config.locale,

                {

                    day:
                        "numeric",

                    month:
                        "long",

                    year:
                        "numeric"

                }

            );

        return `${

            startPart

        } – ${

            endPart

        }`;

    },

    /* ==========================================
       COUNTDOWN
    ========================================== */

    getCountdown(value) {

        const date =
            this.toDate(value);

        if (!date) {

            return "";

        }

        const MS_PER_DAY =
            86400000;

        const today =
            new Date();

        today.setHours(

            0,

            0,

            0,

            0

        );

        const target =
            new Date(date);

        target.setHours(

            0,

            0,

            0,

            0

        );

        const days =

            Math.ceil(

                (
                    target -
                    today
                ) /

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

            image:
                "",

            category:
                "Termin",

            type:
                "",

            location:
                "",

            address:
                "",

            description:
                "",

            dresscode:
                "",

            meeting:
                "",

            contact:
                "",

            ticket:
                "",

            highlight:
                false,

            hero:
                false,

            ...(event?.extendedProps ?? {})

        };

    },

    getNextEvent(events) {

        return this
            .sortEvents(
                events
            )
            .find(

                (event) =>

                    this.isFutureEvent(
                        event
                    )

            ) ?? null;

    },

    sortEvents(events) {

        return [

            ...events

        ].sort(

            (a, b) => {

                const startA =
                    this.toDate(
                        a?.start
                    );

                const startB =
                    this.toDate(
                        b?.start
                    );

                if (

                    !startA &&

                    !startB

                ) {

                    return 0;

                }

                if (!startA) {

                    return 1;

                }

                if (!startB) {

                    return -1;

                }

                return (

                    startA.getTime() -
                    startB.getTime()

                );

            }

        );

    },

    filterCalendar(events) {

        if (!Array.isArray(events)) {

            return [];

        }

        return this.sortEvents(
            events
        );

    },

    filterHighlights(events) {

        if (!Array.isArray(events)) {

            return [];

        }

        return this
            .sortEvents(
                events
            )
            .filter(

                (event) => {

                    return Boolean(

                        this
                            .getProps(
                                event
                            )
                            .highlight

                    );

                }

            );

    },

    isFutureEvent(event) {

        if (!event?.start) {

            return false;

        }

        const start =
            this.toDate(
                event.start
            );

        if (!start) {

            return false;

        }

        return (

            start.getTime() >=
            Date.now()

        );

    },
    
    /* ==========================================
       HTML
    ========================================== */

    escapeHtml(text) {

        const div =
            document.createElement(
                "div"
            );

        div.textContent =
            text ?? "";

        return div.innerHTML;

    },

    /* ==========================================
       CSS
    ========================================== */

    addBadgeClass(
        element,
        category
    ) {

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

            "schützenfest":
                "badge-fest",

            "versammlung":
                "badge-meeting",

            "intern":
                "badge-intern",

            "öffentlich":
                "badge-public",

            "zugkönig":
                "badge-royal"

        };

        const badge =

            classes[

                (
                    category ??
                    ""
                ).toLowerCase()

            ];

        if (badge) {

            element.classList.add(
                badge
            );

        }

    }

};