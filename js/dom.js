/*
=====================================================
 EF22 FRAMEWORK
 DOM.JS
 Version 2.0
=====================================================
*/

"use strict";

window.EF22 ??= {};

EF22.dom = {

    /* ==========================================
       ELEMENTE REGISTRIEREN
    ========================================== */

    register(root, attribute) {

        if (!root) {

            return {

                root: null

            };

        }

        const elements = {

            root

        };

        root.querySelectorAll(

            `[${attribute}]`

        ).forEach(

            (element) => {

                const key =

                    element.getAttribute(

                        attribute

                    );

                if (!key) {

                    return;

                }

                elements[key] =

                    element;

            }

        );

        return elements;

    }

};