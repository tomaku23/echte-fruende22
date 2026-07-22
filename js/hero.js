/*
=====================================================
 EF22 FRAMEWORK
 HERO.JS
 Version 3.0
=====================================================
*/

"use strict";

window.EF22 ??= {};

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

    root: null

},

    /* ==========================================
   INITIALISIERUNG
========================================== */

init() {

    this.elements.root =

        document.getElementById("hero");

    if (!this.elements.root) {

        return;

    }

    this.registerElements();

},

    /* ==========================================
   ÖFFENTLICHE METHODEN
========================================== */

refresh(event) {

    this.state.event = event;

    if (!this.elements.root) {

        return;

    }

    if (!event) {

        this.clear();

        return;

    }

    this.setText(
        this.elements.badge,
        "Nächster Termin"
    );

    this.setText(
        this.elements.title,
        event.title
    );

    this.setText(
        this.elements.description,
        event.description
    );

    this.setText(
        this.elements.location,
        event.extendedProps?.location
    );

    this.setText(
        this.elements.date,
        EF22.utils.formatDate(
            event.start
        )
    );

    this.setText(
        this.elements.time,
        EF22.utils.formatTimeRange(
            event.start,
            event.end
        )
    );

    this.updateCountdown(
        event.start
    );

    this.toggle(
        this.elements.info,
        !!(
            event.start ||
            event.end ||
            event.extendedProps?.location
        )
    );

},

         /* ==========================================
   PRIVATE METHODEN
========================================== */

registerElements() {

    const elements =

        this.elements.root.querySelectorAll(

            "[data-hero]"

        );

    elements.forEach(

        (element) => {

            const key =

                element.dataset.hero;

            this.elements[key] =

                element;

        }

    );

},

setText(element, value) {

    if (!element) {

        return;

    }

    if (!value) {

        element.hidden = true;

        element.textContent = "";

        return;

    }

    element.hidden = false;

    element.textContent = value;

},

toggle(element, visible) {

    if (!element) {

        return;

    }

    element.hidden = !visible;

},

clear() {

    Object.values(

        this.elements

    ).forEach(

        (element) => {

            if (

                !element ||

                element === this.elements.root

            ) {

                return;

            }

            element.hidden = true;

        }

    );

},

updateCountdown(start) {

    if (

        !this.elements.countdown ||

        !start

    ) {

        return;

    }

    const now =

        new Date();

    const eventDate =

        new Date(start);

    const diff =

        eventDate.getTime() -

        now.getTime();

    if (diff <= 0) {

        this.elements.countdown.hidden = true;

        return;

    }

    const days = Math.ceil(

        diff / 1000 / 60 / 60 / 24

    );

    this.elements.countdown.hidden = false;

    this.elements.countdown.textContent =

        `Noch ${days} Tag${days !== 1 ? "e" : ""}`;

}