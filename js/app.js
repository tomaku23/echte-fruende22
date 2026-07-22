/*
=====================================================
 EF22 FRAMEWORK
 APP.JS
 Version 3.0
=====================================================
*/

"use strict";

window.EF22 ??= {};

/* ==========================================
   APP
========================================== */

EF22.app = {

    /* ==========================================
       INITIALISIERUNG
    ========================================== */

    async init() {

        console.log(

            "=== APP START ==="

        );

        try {

            if (

                EF22.header?.init

            ) {

                console.log(

                    "EF22.header.init()"

                );

                EF22.header.init();

            }

            if (

                EF22.modal?.init

            ) {

                console.log(

                    "EF22.modal.init()"

                );

                EF22.modal.init();

            }

            if (

                EF22.hero?.init

            ) {

                console.log(

                    "EF22.hero.init()"

                );

                EF22.hero.init();

            }

            if (

                EF22.highlights?.init

            ) {

                console.log(

                    "EF22.highlights.init()"

                );

                EF22.highlights.init();

            }

            if (

                EF22.calendar?.init

            ) {

                console.log(

                    "EF22.calendar.init()"

                );

                await EF22.calendar.init();

            }

        }

        catch (error) {

            console.error(

                "Framework:",

                error

            );

        }

        console.log(

            "=== APP ENDE ==="

        );

    },

    /* ==========================================
       DESTROY
    ========================================== */

    destroy() {

        EF22.calendar?.destroy?.();

        EF22.highlights?.destroy?.();

        EF22.hero?.destroy?.();

        EF22.modal?.destroy?.();

        EF22.header?.destroy?.();

    }

};

/* ==========================================
   GLOBALE FEHLER
========================================== */

window.onerror = function (

    message,

    source,

    line,

    column,

    error

) {

    console.group(

        "🚨 GLOBAL SCRIPT ERROR"

    );

    console.log(

        "Message:",

        message

    );

    console.log(

        "Source :",

        source

    );

    console.log(

        "Line   :",

        line

    );

    console.log(

        "Column :",

        column

    );

    console.log(

        "Error  :",

        error

    );

    console.groupEnd();

    return false;

};

window.addEventListener(

    "unhandledrejection",

    (event) => {

        console.group(

            "🚨 PROMISE ERROR"

        );

        console.log(

            event.reason

        );

        console.groupEnd();

    }

);

/* ==========================================
   START
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => EF22.app.init()

);