/*/*
=====================================================
 ECHTE FRÜNDE '22
 CALENDAR.JS
 Version 3.3
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

        calendar: null,

        view: "month",

        filters: {

            ef22: true,

            rkn: true

        }

    },

    /* ==========================================
       ELEMENTE
    ========================================== */

    elements: {

        calendar: null,

        controls: null,

        list: null

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

        this.createInterface();

        await this.loadEvents();

    },

    /* ==========================================
       INTERFACE
    ========================================== */

    createInterface() {

        const controls =

            document.createElement(
                "div"
            );

        controls.className =
            "calendar-controls";

        controls.innerHTML = `

            <button
                type="button"
                class="calendar-control-button is-active"
                data-calendar-view="month">

                Monat

            </button>

            <button
                type="button"
                class="calendar-control-button"
                data-calendar-today>

                Heute

            </button>

            <button
                type="button"
                class="calendar-control-button"
                data-calendar-view="list">

                Übersicht

            </button>

        `;

        this.elements.calendar.before(
            controls
        );

        this.elements.controls =
            controls;

        const list =

            document.createElement(
                "div"
            );

        list.className =
            "calendar-list";

        list.hidden = true;

        this.elements.calendar.after(
            list
        );

        this.elements.list =
            list;

        this.registerInterfaceEvents();

    },

    /* ==========================================
       INTERFACE EVENTS
    ========================================== */

    registerInterfaceEvents() {

        this.elements.controls
            ?.querySelectorAll(
                "[data-calendar-view]"
            )
            .forEach(

                (button) => {

                    button.addEventListener(

                        "click",

                        () => {

                            this.setView(
                                button.dataset.calendarView
                            );

                        }

                    );

                }

            );

        this.elements.controls
            ?.querySelector(
                "[data-calendar-today]"
            )
            ?.addEventListener(

                "click",

                () => {

                    if (!this.state.calendar) {

                        return;

                    }

                    this.state.calendar.today();

                    this.setView(
                        "month"
                    );

                }

            );

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

            const result =
                await response.json();

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

        this.renderList();

        this.updateView();

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

        meeting:
            props.meeting,

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

        const now =
            new Date();

        const eventDate =
            new Date(start);

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

        this.updateNavigationLabels();

        this.updateDayStates();

    },

    /* ==========================================
   FULLCALENDAR OPTIONEN
========================================== */

getCalendarOptions() {

    return {

        locale:
            "de",

        titleFormat: {

            month:
                "long",

            year:
                "2-digit"

        },

        initialView:
            "dayGridMonth",

        firstDay:
            1,

        height:
            "auto",

        fixedWeekCount:
            false,

        showNonCurrentDates:
            true,

        events:
            this.state.events,

        /*
         * Die eigentlichen FullCalendar-
         * Event-Pills werden nicht angezeigt.
         * Der komplette Tag wird markiert.
         */

        eventDisplay:
            "none",

        headerToolbar: {

            left:
                "prev",

            center:
                "title",

            right:
                "next"

        },

        datesSet: () => {

            requestAnimationFrame(

                () => {

                    this.updateNavigationLabels();

                    this.updateDayStates();

                }

            );

        },

        dateClick: (info) => {

            this.onDateClick(
                info
            );

        }

    };

},

    /* ==========================================
       MONATSNAVIGATION
    ========================================== */

    updateNavigationLabels() {

        if (!this.state.calendar) {

            return;

        }

        const current =

            this.state.calendar.getDate();

        const previous =

            new Date(

                current.getFullYear(),

                current.getMonth() - 1,

                1

            );

        const next =

            new Date(

                current.getFullYear(),

                current.getMonth() + 1,

                1

            );

        const formatter =

            new Intl.DateTimeFormat(

                "de-DE",

                {

                    month:
                        "long"

                }

            );

        const previousLabel =

            formatter.format(
                previous
            );

        const nextLabel =

            formatter.format(
                next
            );

        const previousButton =

            this.elements.calendar.querySelector(

                ".fc-prev-button"

            );

        const nextButton =

            this.elements.calendar.querySelector(

                ".fc-next-button"

            );

        if (previousButton) {

            previousButton.textContent =
                previousLabel;

            previousButton.setAttribute(

                "aria-label",

                `Zum ${previousLabel}`

            );

        }

        if (nextButton) {

            nextButton.textContent =
                nextLabel;

            nextButton.setAttribute(

                "aria-label",

                `Zum ${nextLabel}`

            );

        }

    },

    /* ==========================================
       ANSICHT WECHSELN
    ========================================== */

    setView(view) {

        if (

            view !== "month" &&

            view !== "list"

        ) {

            return;

        }

        this.state.view =
            view;

        this.updateView();

    },

    /* ==========================================
       ANSICHT AKTUALISIEREN
    ========================================== */

    updateView() {

        const isMonth =

            this.state.view ===
            "month";

        /*
         * Wirklicher Ansichtswechsel:
         * niemals Kalender + Liste gleichzeitig.
         */

        this.elements.calendar.hidden =
            !isMonth;

        this.elements.list.hidden =
            isMonth;

        this.elements.controls
            ?.querySelectorAll(
                "[data-calendar-view]"
            )
            .forEach(

                (button) => {

                    button.classList.toggle(

                        "is-active",

                        button.dataset.calendarView ===
                            this.state.view

                    );

                }

            );

        if (!isMonth) {

            this.renderList();

        }

    },

    /* ==========================================
       EVENTS EINES TAGES
    ========================================== */

    getEventsForDate(date) {

        const key =

            this.getDateKey(
                date
            );

        return this.state.events

            .filter(

                (event) => {

                    if (!event.start) {

                        return false;

                    }

                    return (

                        this.getDateKey(
                            event.start
                        ) === key

                    );

                }

            )

            .sort(

                (a, b) =>

                    this.getCalendarPriority(a) -
                    this.getCalendarPriority(b)

            );

    },

    /* ==========================================
       DATUM KEY
    ========================================== */

    getDateKey(value) {

        const date =

            value instanceof Date

                ? value

                : new Date(value);

        const year =
            date.getFullYear();

        const month =

            String(
                date.getMonth() + 1
            ).padStart(
                2,
                "0"
            );

        const day =

            String(
                date.getDate()
            ).padStart(
                2,
                "0"
            );

        return `${year}-${month}-${day}`;

    },

    /* ==========================================
       KALENDER QUELLE
    ========================================== */

    getCalendarSource(event) {

        const props =

            EF22.utils.getProps(
                event
            );

        const source =

            String(

                props.calendar ??
                props.source ??
                "ef22"

            ).toLowerCase();

        return source === "rkn"

            ? "rkn"

            : "ef22";

    },

    /* ==========================================
       PRIORITÄT
    ========================================== */

    getCalendarPriority(event) {

        return (

            this.getCalendarSource(event) ===
            "ef22"

                ? 0

                : 1

        );

    },

    /* ==========================================
       TAGESSTATUS
    ========================================== */

    updateDayStates() {

        if (!this.elements.calendar) {

            return;

        }

        const cells =

            this.elements.calendar.querySelectorAll(

                ".fc-daygrid-day[data-date]"

            );

        cells.forEach(

            (cell) => {

                cell.classList.remove(

                    "has-event",

                    "has-ef22-event",

                    "has-external-event",

                    "has-mixed-events"

                );

                const date =

                    cell.getAttribute(
                        "data-date"
                    );

                const events =

                    this.getEventsForDate(
                        date
                    );

                if (!events.length) {

                    return;

                }

                const hasEF22 =

                    events.some(

                        (event) =>

                            this.getCalendarSource(event) ===
                            "ef22"

                    );

                const hasRKN =

                    events.some(

                        (event) =>

                            this.getCalendarSource(event) ===
                            "rkn"

                    );

                cell.classList.add(
                    "has-event"
                );

                if (

                    hasEF22 &&

                    hasRKN

                ) {

                    cell.classList.add(
                        "has-mixed-events"
                    );

                    return;

                }

                if (hasEF22) {

                    cell.classList.add(
                        "has-ef22-event"
                    );

                    return;

                }

                cell.classList.add(
                    "has-external-event"
                );

            }

        );

    },

    /* ==========================================
       TAG ANGEKLICKT
    ========================================== */

    onDateClick(info) {

        const events =

            this.getEventsForDate(
                info.date
            );

        if (!events.length) {

            return;

        }

        if (

            events.length > 1 &&

            typeof EF22.modal.openEvents ===
                "function"

        ) {

            EF22.modal.openEvents(
                events
            );

            return;

        }

        /*
         * EF22 steht bei mehreren Terminen
         * durch die Priorisierung zuerst.
         */

        EF22.modal.open(
            events[0]
        );

    },

    /* ==========================================
       ZUKÜNFTIGE EVENTS
    ========================================== */

    getFutureEvents() {

        const today =
            new Date();

        today.setHours(
            0,
            0,
            0,
            0
        );

        return this.state.events

            .filter(

                (event) => {

                    if (!event.start) {

                        return false;

                    }

                    const start =

                        new Date(
                            event.start
                        );

                    return start >= today;

                }

            )

            .sort(

                (a, b) => {

                    const difference =

                        new Date(a.start) -
                        new Date(b.start);

                    if (difference !== 0) {

                        return difference;

                    }

                    return (

                        this.getCalendarPriority(a) -
                        this.getCalendarPriority(b)

                    );

                }

            );

    },

    /* ==========================================
       GEFILTERTE EVENTS
    ========================================== */

    getFilteredFutureEvents() {

        return this.getFutureEvents()

            .filter(

                (event) => {

                    const source =

                        this.getCalendarSource(
                            event
                        );

                    return (

                        source === "ef22"

                            ? this.state.filters.ef22

                            : this.state.filters.rkn

                    );

                }

            );

    },

    /* ==========================================
       LISTE RENDERN
    ========================================== */

    renderList() {

        if (!this.elements.list) {

            return;

        }

        const events =

            this.getFilteredFutureEvents();

        this.elements.list.innerHTML =
            "";

        this.elements.list.append(

            this.createListFilters()

        );

        const content =

            document.createElement(
                "div"
            );

        content.className =
            "calendar-list-content";

        if (!events.length) {

            const empty =

                document.createElement(
                    "p"
                );

            empty.className =
                "calendar-list-empty";

            empty.textContent =

                this.state.filters.ef22 ||
                this.state.filters.rkn

                    ? "Keine kommenden Termine vorhanden."

                    : "Keine Kalender ausgewählt.";

            content.append(
                empty
            );

        }

        else {

            events.forEach(

                (event) => {

                    content.append(

                        this.createListEvent(
                            event
                        )

                    );

                }

            );

        }

        this.elements.list.append(
            content
        );

    },

    /* ==========================================
       LISTEN FILTER
    ========================================== */

    createListFilters() {

        const filters =

            document.createElement(
                "div"
            );

        filters.className =
            "calendar-list-filters";

        filters.innerHTML = `

            <label class="calendar-filter">

                <input
                    type="checkbox"
                    data-calendar-filter="ef22"
                    ${this.state.filters.ef22 ? "checked" : ""}
                >

                <span>
                    Echte Freunde '22
                </span>

            </label>

            <label class="calendar-filter">

                <input
                    type="checkbox"
                    data-calendar-filter="rkn"
                    ${this.state.filters.rkn ? "checked" : ""}
                >

                <span>
                    Rhein-Kreis Neuss
                </span>

            </label>

        `;

        filters
            .querySelectorAll(
                "[data-calendar-filter]"
            )
            .forEach(

                (checkbox) => {

                    checkbox.addEventListener(

                        "change",

                        () => {

                            const filter =

                                checkbox.dataset.calendarFilter;

                            this.state.filters[filter] =
                                checkbox.checked;

                            this.renderList();

                        }

                    );

                }

            );

        return filters;

    },

    /* ==========================================
       LISTEN EVENT
    ========================================== */

    createListEvent(event) {

        const props =

            EF22.utils.getProps(
                event
            );

        const source =

            this.getCalendarSource(
                event
            );

        const item =

            document.createElement(
                "button"
            );

        item.type =
            "button";

        item.className =

            `calendar-list-event calendar-list-event--${source}`;

        const date =

            new Intl.DateTimeFormat(

                "de-DE",

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

            ).format(

                new Date(
                    event.start
                )

            );

        const sourceLabel =

            source === "ef22"

                ? "Echte Freunde '22"

                : "Rhein-Kreis Neuss";

        const time =

            EF22.utils.formatTimeRange(

                event.start,

                event.end

            );

        item.innerHTML = `

            <span class="calendar-list-event-date">
                ${this.escapeHTML(date)}
            </span>

            <span class="calendar-list-event-source">
                ${this.escapeHTML(sourceLabel)}
            </span>

            <strong class="calendar-list-event-title">
                ${this.escapeHTML(event.title || "")}
            </strong>

            ${
                time

                    ? `
                        <span class="calendar-list-event-time">
                            ${this.escapeHTML(time)}
                        </span>
                    `

                    : ""
            }

            ${
                props.location

                    ? `
                        <span class="calendar-list-event-location">
                            ${this.escapeHTML(props.location)}
                        </span>
                    `

                    : ""
            }

        `;

        item.addEventListener(

            "click",

            () => {

                EF22.modal.open(
                    event
                );

            }

        );

        return item;

    },

    /* ==========================================
       HTML ESCAPEN
    ========================================== */

    escapeHTML(value) {

        const element =

            document.createElement(
                "div"
            );

        element.textContent =
            String(value ?? "");

        return element.innerHTML;

    },

    /* ==========================================
       DESTROY
    ========================================== */

    destroy() {

        if (this.state.calendar) {

            this.state.calendar.destroy();

            this.state.calendar = null;

        }

        this.elements.controls?.remove();

        this.elements.list?.remove();

        this.state.events = [];

        this.state.view =
            "month";

        this.state.filters = {

            ef22: true,

            rkn: true

        };

    }

};