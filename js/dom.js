/*
=====================================================
 ECHTE FRÜNDE '22
 DOM.JS
 Version 1.0
=====================================================

DOM-Hilfsfunktionen des EF22 Frameworks.

Verantwortung:
- Elemente erzeugen
- Elemente leeren
- Elemente ein-/ausblenden
- Klassen verwalten
- Attribute setzen

Nicht verantwortlich für:
- Hero
- Modal
- Kalender
- Highlights

=====================================================
*/

"use strict";

window.EF22 ??= {};

/* ==========================================
   DOM
========================================== */

EF22.dom = {

    /* ==========================================
       ELEMENTE
    ========================================== */

    createElement(tag, className = "", text = "") {

        const element = document.createElement(tag);

        if (className) {

            element.className = className;

        }

        if (text !== "") {

            element.textContent = text;

        }

        return element;

    },

    /* ==========================================
       SICHTBARKEIT
    ========================================== */

    show(element) {

        if (!element) {
            return;
        }

        element.classList.remove("hidden");

    },

    hide(element) {

        if (!element) {
            return;
        }

        element.classList.add("hidden");

    },

    /* ==========================================
       INHALT
    ========================================== */

    clear(element) {

        if (!element) {
            return;
        }

        element.replaceChildren();

    },

    /* ==========================================
       ATTRIBUTE
    ========================================== */

    setAttributes(element, attributes = {}) {

        if (!element) {
            return;
        }

        Object.entries(attributes).forEach(([key, value]) => {

            if (
                value !== null &&
                value !== undefined
            ) {

                element.setAttribute(key, value);

            }

        });

    }

};