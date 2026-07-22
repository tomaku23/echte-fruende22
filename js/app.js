/*
=====================================================
 EF22 FRAMEWORK
 APP.JS
 Version 3.1
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

        console.group("=== EF22 APP START ===");

        try {

            await this.initComponent("header", false);
            await this.initComponent("modal", false);
            await this.initComponent("hero", false);
            await this.initComponent("highlights", false);
            await this.initComponent("calendar", true);

        }

        catch (error) {

            console.error("APP FEHLER:", error);

        }

        console.groupEnd();

    },

    /* ==========================================
       KOMPONENTEN INITIALISIEREN
    ========================================== */

    async initComponent(name, isAsync = false) {

        const component = EF22[name];

        if (!component) {

            console.warn(`${name}: nicht gefunden`);

            return;

        }

        if (typeof component.init !== "function") {

            console.warn(`${name}: keine init()-Methode`);

            return;

        }

        console.group(`${name}.init()`);

        try {

            if (isAsync) {

                await component.init();

            } else {

                component.init();

            }

            console.log("✔ OK");

        }

        catch (error) {

            console.error(error);

        }

        console.groupEnd();

    },

    /* ==========================================
       DESTROY
    ========================================== */

    destroy() {

        [

            "calendar",
            "highlights",
            "hero",
            "modal",
            "header"

        ].forEach(

            (name) => {

                EF22[name]?.destroy?.();

            }

        );

    }

};

/* ==========================================
   GLOBALE FEHLER
========================================== */

window.addEventListener(

    "error",

    (event) => {

        console.group("🚨 JAVASCRIPT FEHLER");

        console.log("Datei :", event.filename);
        console.log("Zeile :", event.lineno);
        console.log("Spalte:", event.colno);
        console.log("Fehler:", event.message);

        if (event.error) {

            console.log(event.error);

        }

        console.groupEnd();

    }

);

window.addEventListener(

    "unhandledrejection",

    (event) => {

        console.group("🚨 PROMISE FEHLER");

        console.log(event.reason);

        console.groupEnd();

    }

);

/* ==========================================
   START
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        EF22.app.init();

    }

);