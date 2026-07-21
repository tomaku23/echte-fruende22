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

document.addEventListener("DOMContentLoaded", () => {

    console.log("=== APP START ===");

    try{

        console.log("Header.init()");
        Header.init();

    }catch(error){

        console.error("Header:", error);

    }

    try{

        console.log("Navigation.init()");
        Navigation.init();

    }catch(error){

        console.error("Navigation:", error);

    }

    try{

        console.log("Animations.init()");
        Animations.init();

    }catch(error){

        console.error("Animations:", error);

    }

    try{

        console.log("Calendar.init()");
        Calendar.init();

    }catch(error){

        console.error("Calendar:", error);

    }

    console.log("=== APP ENDE ===");

});