/*
=====================================================
 ECHTE FRÜNDE '22
 CONFIG.JS
 Version 1.0
=====================================================
*/

"use strict";

window.EF22 ??= {};

EF22.config = {

    /* ==========================================
       KALENDER
    ========================================== */

    calendars: {

        EF22: {

            id: "ef22",

            name: "Echte Fründe '22",

            color: "#0E6A3A",

            textColor: "#FFFFFF"

        },

        RKN: {

            id: "rkn",

            name: "Schützenfeste Rhein-Kreis Neuss",

            color: "#C89A2B",

            textColor: "#000000"

        }

    },

    /* ==========================================
   API
========================================== */

api: {

    calendar: "../api/calendar.php"

},

    /* ==========================================
       BILDER
    ========================================== */

    images: {

        heroFallback: "../images/hero-bg.png"

    }

};