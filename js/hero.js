/*
=====================================================
 EF22 FRAMEWORK
 HERO.JS
 Version 4.2
=====================================================
*/

"use strict";

window.EF22 ??= {};

EF22.hero = {

    /* ==========================================
       STATE
    ========================================== */

    state: {

        data: null,

        action: null,

        customImage: null

    },

    /* ==========================================
       ELEMENTE
    ========================================== */

    elements: {},

    /* ==========================================
       HANDLER
    ========================================== */

    handlers: {},

    /* ==========================================
       OBSERVER
    ========================================== */

    observers: {

        media: null

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

        if (!this.elements.root) {

            return;

        }

        this.createHandlers();

        this.registerEvents();

        this.registerMediaObserver();

    },

    /* ==========================================
       HANDLER
    ========================================== */

    createHandlers() {

        this.handlers.click = () =>

            this.onClick();

    },

    /* ==========================================
       EVENTS
    ========================================== */

    registerEvents() {

        this.elements.root.addEventListener(

            "click",

            this.handlers.click

        );

    },

    /* ==========================================
       MEDIA OBSERVER
    ========================================== */

    registerMediaObserver() {

        if (

            !this.elements.media ||

            typeof ResizeObserver === "undefined"

        ) {

            return;

        }

        this.observers.media =

            new ResizeObserver(

                () => {

                    if (!this.state.customImage) {

                        this.setFallbackImage();

                    }

                }

            );

        this.observers.media.observe(

            this.elements.media

        );

    },

    /* ==========================================
       REFRESH
    ========================================== */

    refresh(data = {}) {

        if (!this.elements.root) {

            return;

        }

        this.state.data = data;

        this.state.action =

            typeof data.action === "function"

                ? data.action

                : null;

        this.setImage(
            data.image
        );

        this.setText(
            this.elements.badge,
            data.badge
        );

        this.setText(
            this.elements.title,
            data.title
        );

        this.setText(
            this.elements.subtitle,
            data.subtitle
        );

        this.setText(
            this.elements.description,
            data.description
        );

        this.setText(
            this.elements.date,
            data.date
        );

        this.setText(
            this.elements.time,
            data.time
        );

        this.setText(
            this.elements.location,
            data.location
        );

        this.setText(
            this.elements.countdown,
            data.countdown
        );

        this.setText(
            this.elements.hint,
            data.hint
        );

        this.setButton(
            data.button
        );

        this.updateInfo();

    },

    /* ==========================================
       BILD
    ========================================== */

    setImage(image) {

        if (!this.elements.media) {

            return;

        }

        const hasImage =

            image !== undefined &&

            image !== null &&

            String(image).trim() !== "";

        this.state.customImage =

            hasImage

                ? String(image)

                : null;

        console.log(
            "HERO IMAGE:",
            {
                receivedImage: image,
                customImage: this.state.customImage
            }
        );

        if (this.state.customImage) {

            console.log(
                "HERO IMAGE MODE: CUSTOM",
                this.state.customImage
            );

            this.elements.media.style.backgroundImage =

                `url("${this.state.customImage}")`;

            return;

        }

        console.log(
            "HERO IMAGE MODE: FALLBACK"
        );

        this.setFallbackImage();

    },

    /* ==========================================
       FALLBACK BILD
    ========================================== */

    setFallbackImage() {

        if (!this.elements.media) {

            return;

        }

        const width =

            this.elements.media.clientWidth;

        const height =

            this.elements.media.clientHeight;

        const orientation =

            height > width

                ? "PORTRAIT"

                : "LANDSCAPE";

        console.log(
            "HERO MEDIA:",
            {
                width,
                height,
                orientation
            }
        );

        if (

            width <= 0 ||

            height <= 0

        ) {

            console.log(
                "HERO FALLBACK: Keine gültigen Maße."
            );

            return;

        }

        const portraitImage =

            EF22.config?.images?.heroFallbackPortrait;

        const landscapeImage =

            EF22.config?.images?.heroFallbackLandscape;

        const source =

            height > width

                ? portraitImage

                : landscapeImage;

        console.log(
            "HERO FALLBACK:",
            {
                portraitImage,
                landscapeImage,
                source
            }
        );

        this.elements.media.style.backgroundImage =

            source

                ? `url("${source}")`

                : "";

    },

    /* ==========================================
       TEXT
    ========================================== */

    setText(element, value) {

        if (!element) {

            return;

        }

        const hasValue =

            value !== undefined &&

            value !== null &&

            String(value).trim() !== "";

        element.hidden = !hasValue;

        element.textContent =

            hasValue

                ? String(value)

                : "";

    },

    /* ==========================================
       INFO
    ========================================== */

    updateInfo() {

        const items = [

            this.elements.dateItem,

            this.elements.timeItem,

            this.elements.locationItem

        ];

        items.forEach(

            (item) => {

                if (!item) {

                    return;

                }

                const value =

                    item.querySelector(
                        "[data-hero]:not([data-hero=\"dateItem\"]):not([data-hero=\"timeItem\"]):not([data-hero=\"locationItem\"])"
                    );

                item.hidden =

                    !value ||

                    value.hidden;

            }

        );

        const hasInfo =

            items.some(

                (item) =>

                    item &&

                    !item.hidden

            );

        if (this.elements.info) {

            this.elements.info.hidden =

                !hasInfo;

        }

    },

    /* ==========================================
       BUTTON
    ========================================== */

    setButton(button) {

        if (!this.elements.button) {

            return;

        }

        if (

            !button ||

            !button.text

        ) {

            this.elements.button.hidden = true;

            this.elements.button.textContent = "";

            this.elements.button.removeAttribute(
                "href"
            );

            return;

        }

        this.elements.button.hidden = false;

        this.elements.button.textContent =
            button.text;

        this.elements.button.setAttribute(

            "href",

            button.link || "#"

        );

    },

    /* ==========================================
       INTERAKTION
    ========================================== */

    onClick() {

        if (!this.state.action) {

            return;

        }

        this.state.action();

    },

    /* ==========================================
       CLEAR
    ========================================== */

    clear() {

        this.refresh({});

    },

    /* ==========================================
       DESTROY
    ========================================== */

    destroy() {

        this.elements.root?.removeEventListener(

            "click",

            this.handlers.click

        );

        this.observers.media?.disconnect();

        this.state.data = null;

        this.state.action = null;

        this.state.customImage = null;

        this.handlers = {};

        this.observers.media = null;

    }

};