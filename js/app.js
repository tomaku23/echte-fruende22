/*
=====================================================
 ECHTE FRÜNDE '22
 APP.JS
 Version 1.1 DEBUG
=====================================================
*/

"use strict";

/* ==========================================
   GLOBALE FEHLER
========================================== */

window.onerror = function(message, source, line, column, error){

    console.group("🚨 GLOBAL SCRIPT ERROR");

    console.log("Message:", message);
    console.log("Source :", source);
    console.log("Line   :", line);
    console.log("Column :", column);
    console.log("Error  :", error);

    console.groupEnd();

    return false;

};

window.addEventListener("unhandledrejection", event => {

    console.group("🚨 PROMISE ERROR");

    console.log(event.reason);

    console.groupEnd();

});

/* ==========================================
   INITIALISIERUNG
========================================== */

document.addEventListener("DOMContentLoaded", async () => {

    console.log("=== APP START ===");

    try {

        console.log("EF22.calendar.init()");
        await EF22.calendar.init();

    } catch (error) {

        console.error("EF22.calendar:", error);

    }

    console.log("=== APP ENDE ===");

});