/*
=====================================================
 EF22 FRAMEWORK
 HERO.JS
 Version 3.1
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

    this.elements =

        EF22.dom.register(

            document.getElementById(

                "hero"

            ),

            "data-hero"

        );

    if (

        !this.elements.root

    ) {

        return;

    }

    this.elements.root.addEventListener(

        "click",

        () => {

            if (

                !this.state.event ||

                !EF22.modal ||

                typeof EF22.modal.open !== "function"

            ) {

                return;

            }

            EF22.modal.open(

                this.state.event

            );

        }

    );

},

        /* ==========================================
       ÖFFENTLICHE METHODEN
    ========================================== */

    refresh(event) {

        this.state.event = event;

        if (

            !this.elements.root

        ) {

            return;

        }

        if (

            !event

        ) {

            this.clear();

            return;

        }

        const props =

            EF22.utils.getProps(

                event

            );

        this.setBackground(

            props.image

        );

        this.setText(

            this.elements.badge,

            props.category

        );

        this.setText(

            this.elements.title,

            event.title

        );

        this.setText(

            this.elements.description,

            props.description

        );

        this.setText(

            this.elements.location,

            props.location

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

                props.location

            )

        );

    },

    destroy() {

    },

    /* ==========================================
   PRIVATE METHODEN
========================================== */

setBackground(image) {

    if (!this.elements.background) {

        return;

    }

    this.elements.background.style.backgroundImage =

        image

            ? `url("${image}")`

            : "";

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

    this.setBackground("");

},

updateCountdown(start) {

    if (

        !this.elements.countdown ||

        !start

    ) {

        return;

    }

    const now = new Date();

    const eventDate = new Date(start);

    const diff =

        eventDate.getTime() -

        now.getTime();

    if (diff <= 0) {

        this.elements.countdown.hidden = true;

        return;

    }

    const days = Math.ceil(

        diff /

        1000 /

        60 /

        60 /

        24

    );

    this.elements.countdown.hidden = false;

    this.elements.countdown.textContent =

        `Noch ${days} Tag${days !== 1 ? "e" : ""}`;

}

};