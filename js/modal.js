    /*
    =====================================================
     ECHTE FRÜNDE '22
     MODAL.JS
     Version 4.1

     EF22 FRAMEWORK
    =====================================================

    Verantwortung:
    - Event-Modal öffnen / schließen
    - Eventdaten darstellen
    - Metadaten aufbereiten
    - Adressen für Anzeige formatieren
    - Routenauswahl öffnen / schließen
    - Apple Karten / Google Maps bereitstellen

    =====================================================
    */

    "use strict";

    window.EF22 ??= {};


    /* ==========================================
       MODAL
    ========================================== */

    EF22.modal = {

        /* ==========================================
           STATE
        ========================================== */

        state: {

            event:
                null,

            routeOpen:
                false

        },


        /* ==========================================
           ELEMENTE
        ========================================== */

        elements: {

            modal:
                null,

            overlay:
                null,

            window:
                null,

            closeButton:
                null,

            image:
                null,

            title:
                null,

            meta:
                null,

            content:
                null,

            actions:
                null,

            routeModal:
                null,

            routeOverlay:
                null,

            routeAppleMaps:
                null,

            routeGoogleMaps:
                null

        },


        /* ==========================================
           INITIALISIERUNG
        ========================================== */

        init() {

            this.elements.modal =
                document.getElementById(
                    "eventModal"
                );

            this.elements.overlay =
                this.elements.modal?.querySelector(
                    ".modal-overlay"
                );

            this.elements.window =
                this.elements.modal?.querySelector(
                    ".modal-window"
                );

            this.elements.closeButton =
                document.getElementById(
                    "closeModalButton"
                );

            this.elements.image =
                document.getElementById(
                    "modalImage"
                );

            this.elements.title =
                document.getElementById(
                    "modalTitle"
                );

            this.elements.meta =
                document.getElementById(
                    "modalMeta"
                );

            this.elements.content =
                document.getElementById(
                    "modalContent"
                );

            this.elements.actions =
                document.getElementById(
                    "modalActions"
                );


            /* ======================================
               ROUTENMODAL
            ====================================== */

            this.elements.routeModal =
                document.getElementById(
                    "routeModal"
                );

            this.elements.routeOverlay =
                this.elements.routeModal?.querySelector(
                    ".route-modal-overlay"
                );

            this.elements.routeAppleMaps =
                document.getElementById(
                    "routeAppleMaps"
                );

            this.elements.routeGoogleMaps =
                document.getElementById(
                    "routeGoogleMaps"
                );


            if (!this.elements.modal) {

                return;

            }


            this.registerEvents();

        },


        /* ==========================================
           EVENTS REGISTRIEREN
        ========================================== */

        registerEvents() {

            /* ======================================
               EVENT MODAL SCHLIESSEN
            ====================================== */

            this.elements.overlay?.addEventListener(

                "click",

                () => {

                    this.close();

                }

            );


            this.elements.closeButton?.addEventListener(

                "click",

                () => {

                    this.close();

                }

            );


            /* ======================================
               ROUTENMODAL SCHLIESSEN
            ====================================== */

            this.elements.routeOverlay?.addEventListener(

                "click",

                () => {

                    this.closeRoute();

                }

            );


            /* ======================================
               ESCAPE
            ====================================== */

            document.addEventListener(

                "keydown",

                (event) => {

                    if (event.key !== "Escape") {

                        return;

                    }


                    /*
                     * Ebene 3 zuerst schließen.
                     */

                    if (this.state.routeOpen) {

                        this.closeRoute();

                        return;

                    }


                    /*
                     * Danach Ebene 2.
                     */

                    if (this.state.event) {

                        this.close();

                    }

                }

            );

        },


        /* ==========================================
           ÖFFNEN
        ========================================== */

        open(event) {

            if (

                !event ||

                !this.elements.modal

            ) {

                return;

            }


            this.state.event =
                event;


            this.render();


            this.elements.modal.classList.add(
                "show"
            );


            this.elements.modal.setAttribute(

                "aria-hidden",

                "false"

            );


            document.body.classList.add(
                "no-scroll"
            );


            /*
             * Beim erneuten Öffnen immer oben
             * im Modal beginnen.
             */

            if (this.elements.window) {

                this.elements.window.scrollTop =
                    0;

            }


            /*
             * Fokus auf Schließen.
             *
             * preventScroll verhindert, dass das
             * Modal direkt bis zum unteren Button
             * scrollt.
             */

            this.elements.closeButton?.focus({

                preventScroll:
                    true

            });

        },


        /* ==========================================
           SCHLIESSEN
        ========================================== */

        close() {

            if (!this.elements.modal) {

                return;

            }


            /*
             * Falls Ebene 3 offen ist,
             * ebenfalls schließen.
             */

            this.closeRoute();


            this.elements.modal.classList.remove(
                "show"
            );


            this.elements.modal.setAttribute(

                "aria-hidden",

                "true"

            );


            document.body.classList.remove(
                "no-scroll"
            );


            this.state.event =
                null;


            this.reset();

        },


            /* ==========================================
       RESET
    ========================================== */

    reset() {

        if (this.elements.image) {

            this.elements.image.style.backgroundImage =
                "";

            this.elements.image.style.aspectRatio =
                "";

            this.elements.image.classList.remove(

                "modal-hero--contain",

                "modal-hero--cover",

                "modal-hero--empty",

                "modal-hero--limited"

            );

        }


        if (this.elements.title) {

            this.elements.title.textContent =
                "";

        }


        if (this.elements.meta) {

            this.elements.meta.innerHTML =
                "";

        }


        if (this.elements.content) {

            this.elements.content.innerHTML =
                "";

            this.elements.content.hidden =
                true;

        }


        if (this.elements.actions) {

            this.elements.actions.innerHTML =
                "";

        }

    },


    /* ==========================================
       RENDER
    ========================================== */

    render() {

        if (!this.state.event) {

            return;

        }


        this.renderHero();

        this.renderMeta();

        this.renderContent();

        this.renderActions();

    },


        /* ==========================================
           HERO
        ========================================== */

        renderHero() {

            const event =
                this.state.event;


            const props =
                EF22.utils.getProps(
                    event
                );


            /* ======================================
               TITEL
            ====================================== */

            if (this.elements.title) {

                this.elements.title.textContent =
                    event.title ?? "";

            }


            /* ======================================
               BILD
            ====================================== */

            this.renderHeroImage(
                props.image
            );

        },


            /* ==========================================
       HERO BILD

       Neue Bildlogik:

       - Modalbreite bleibt unverändert
       - Bild wird geladen
       - Hero übernimmt das Seitenverhältnis
         des Bildes
       - dadurch kein unnötiger Beschnitt
       - extreme Hochformate werden durch CSS
         in der Höhe begrenzt

       Die bisherige contain / cover Logik
       wird nicht mehr benötigt.
    ========================================== */

    renderHeroImage(imageUrl) {

        const hero =
            this.elements.image;


        if (!hero) {

            return;

        }


        /* ======================================
           ALTEN ZUSTAND ZURÜCKSETZEN
        ====================================== */

        hero.classList.remove(

            "modal-hero--contain",

            "modal-hero--cover",

            "modal-hero--empty",

            "modal-hero--limited"

        );


        hero.style.backgroundImage =
            "";


        hero.style.aspectRatio =
            "";


        /* ======================================
           QUELLE

           Wenn kein Eventbild vorhanden ist,
           wird das Landscape-Fallback genutzt.
        ====================================== */

        const fallback =
            EF22.config?.images
                ?.heroFallbackLandscape ??
            "";


        const source =
            imageUrl ||
            fallback;


        /* ======================================
           KEIN BILD
        ====================================== */

        if (!source) {

            hero.classList.add(
                "modal-hero--empty"
            );

            return;

        }


        /* ======================================
           BILD LADEN
        ====================================== */

        const image =
            new Image();


        image.onload =
            () => {

                if (

                    !image.naturalWidth ||

                    !image.naturalHeight

                ) {

                    hero.style.backgroundImage =
                        `url("${source}")`;

                    hero.classList.add(
                        "modal-hero--limited"
                    );

                    return;

                }


                const width =
                    image.naturalWidth;


                const height =
                    image.naturalHeight;


                /* ==================================
                   HERO ÜBERNIMMT BILDFORMAT
                ================================== */

                hero.style.aspectRatio =
                    `${width} / ${height}`;


                hero.style.backgroundImage =
                    `url("${source}")`;

            };


        /* ======================================
           FEHLER

           Wenn das Eventbild nicht geladen
           werden kann und ein anderes Fallback
           existiert, verwenden wir dieses.

           Andernfalls bleibt der Hero als
           dunkle Fläche erhalten.
        ====================================== */

        image.onerror =
            () => {

                hero.style.backgroundImage =
                    "";

                hero.style.aspectRatio =
                    "";

                hero.classList.add(
                    "modal-hero--empty"
                );

            };


        image.src =
            source;

    },
    
        /* ==========================================
           METADATEN
        ========================================== */

        renderMeta() {

            if (

                !this.elements.meta ||

                !this.state.event

            ) {

                return;

            }


            const event =
                this.state.event;


            const props =
                EF22.utils.getProps(
                    event
                );


            const meta =
                [];


            /* ======================================
               DATUM
            ====================================== */

            const date =
                EF22.utils.formatEventDate(
                    event
                );


            if (date) {

                meta.push({

                    label:
                        "Datum",

                    value:
                        date,

                    type:
                        "default"

                });

            }


            /* ======================================
               UHRZEIT

               Regel:
               Bei mehrtägigen Veranstaltungen
               grundsätzlich keine Uhrzeit anzeigen.

               Relevante Treffzeiten stehen dann
               im Meetingpoint.
            ====================================== */

            const isMultiDay =
                EF22.utils.isMultiDayEvent(
                    event
                );


            if (!isMultiDay) {

                const time =
                    EF22.utils.formatEventTime(
                        event
                    );


                if (

                    time &&

                    time !== "Ganztägig"

                ) {

                    meta.push({

                        label:
                            "Uhrzeit",

                        value:
                            time,

                        type:
                            "default"

                    });

                }

            }


            /* ======================================
               ORT / ADRESSE
            ====================================== */

            const formattedAddress =
                this.formatAddress(
                    props.address,
                    props.location
                );


            if (formattedAddress.length) {

                meta.push({

                    label:
                        "Ort",

                    value:
                        formattedAddress,

                    type:
                        "address"

                });

            }

            else if (props.location) {

                meta.push({

                    label:
                        "Ort",

                    value:
                        [
                            props.location
                        ],

                    type:
                        "address"

                });

            }


            /* ======================================
               TREFFPUNKT
            ====================================== */

            if (props.meeting) {

                meta.push({

                    label:
                        "Treffpunkt",

                    value:
                        props.meeting,

                    type:
                        "default"

                });

            }


            /* ======================================
               DRESSCODE
            ====================================== */

            if (props.dresscode) {

                meta.push({

                    label:
                        "Dresscode",

                    value:
                        props.dresscode,

                    type:
                        "default"

                });

            }


            /* ======================================
               KONTAKT
            ====================================== */

            if (props.contact) {

                meta.push({

                    label:
                        "Kontakt",

                    value:
                        props.contact,

                    type:
                        "default"

                });

            }


            /* ======================================
               HTML ERZEUGEN
            ====================================== */

            this.elements.meta.innerHTML =

                meta
                    .map(

                        (item) => {

                            const itemClass =

                                item.type ===
                                "address"

                                    ? "modal-meta-item modal-meta-item--address"

                                    : "modal-meta-item";


                            let valueHtml;


                            if (

                                item.type ===
                                "address" &&

                                Array.isArray(
                                    item.value
                                )

                            ) {

                                valueHtml =

                                    item.value
                                        .map(

                                            (line) =>

                                                `<span class="modal-address-line">${

                                                    EF22.utils.escapeHtml(
                                                        line
                                                    )

                                                }</span>`

                                        )
                                        .join("");

                            }

                            else {

                                valueHtml =

                                    EF22.utils.escapeHtml(
                                        item.value
                                    );

                            }


                            return `

                                <div
                                    class="${itemClass}">

                                    <div
                                        class="modal-meta-label">

                                        ${

                                            EF22.utils.escapeHtml(
                                                item.label
                                            )

                                        }

                                    </div>

                                    <div
                                        class="modal-meta-value">

                                        ${valueHtml}

                                    </div>

                                </div>

                            `;

                        }

                    )
                    .join("");

        },


        /* ==========================================
           ADRESSE FORMATIEREN

           Beispiel Deutschland:

           Haus Hubertus
           Am Niederfeld 4
           41539 Dormagen

           Beispiel Ausland:

           Veranstaltungsort
           Musterstraße 12
           1010 Wien
           Österreich

           location wird verwendet, um die erste
           Zeile zuverlässig vom Rest zu trennen.
        ========================================== */

        formatAddress(
            address,
            location
        ) {

            const rawAddress =

                typeof address === "string"

                    ? address.trim()

                    : "";


            const rawLocation =

                typeof location === "string"

                    ? location.trim()

                    : "";


            if (!rawAddress) {

                return rawLocation

                    ? [rawLocation]

                    : [];

            }


            /*
             * Kalenderadresse zunächst anhand
             * der Kommata zerlegen.
             */

            let parts =

                rawAddress
                    .split(",")
                    .map(

                        (part) =>
                            part.trim()

                    )
                    .filter(Boolean);


            if (!parts.length) {

                return [];

            }


            /* ======================================
               LAND ERMITTELN
            ====================================== */

            let country =
                "";


            const lastPart =

                parts[
                    parts.length -
                    1
                ] ?? "";


            const normalizedCountry =

                lastPart
                    .toLocaleLowerCase(
                        "de-DE"
                    )
                    .replace(/\./g, "")
                    .trim();


            const germanCountryNames = [

                "deutschland",

                "germany",

                "bundesrepublik deutschland"

            ];


            /*
             * Wenn das letzte Element offensichtlich
             * Deutschland ist, vollständig entfernen.
             */

            if (

                germanCountryNames.includes(
                    normalizedCountry
                )

            ) {

                parts.pop();

            }

            /*
             * Bei einem anderen Land bleibt es
             * als letzte Zeile erhalten.
             */

            else if (

                parts.length >= 3

            ) {

                country =
                    parts.pop();

            }


            /* ======================================
               LOCATION

               Wenn die Adresse mit location beginnt,
               wird location als eigene erste Zeile
               ausgegeben.
            ====================================== */

            const lines =
                [];


            if (rawLocation) {

                lines.push(
                    rawLocation
                );


                const firstPart =

                    parts[0] ?? "";


                if (

                    firstPart
                        .toLocaleLowerCase(
                            "de-DE"
                        ) ===

                    rawLocation
                        .toLocaleLowerCase(
                            "de-DE"
                        )

                ) {

                    parts.shift();

                }

            }


            /* ======================================
               RESTLICHE ADRESSE

               Erwartete Google-/Kalenderstruktur:

               Straße
               PLZ Ort
            ====================================== */

            parts.forEach(

                (part) => {

                    if (

                        !lines.includes(
                            part
                        )

                    ) {

                        lines.push(
                            part
                        );

                    }

                }

            );


            /* ======================================
               AUSLAND
            ====================================== */

            if (country) {

                lines.push(
                    country
                );

            }


            return lines;

        },


        /* ==========================================
           BESCHREIBUNG
        ========================================== */

        renderContent() {

            if (!this.elements.content) {

                return;

            }


            const props =
                EF22.utils.getProps(
                    this.state.event
                );


            const description =

                typeof props.description ===
                "string"

                    ? props.description.trim()

                    : "";


            if (!description) {

                this.elements.content.innerHTML =
                    "";

                this.elements.content.hidden =
                    true;

                return;

            }


            this.elements.content.innerHTML = `

                <p>${

                    EF22.utils.escapeHtml(
                        description
                    )

                }</p>

            `;


            this.elements.content.hidden =
                false;

        },


        /* ==========================================
           AKTIONEN
        ========================================== */

        renderActions() {

            if (!this.elements.actions) {

                return;

            }


            const props =
                EF22.utils.getProps(
                    this.state.event
                );


            const actions =
                [];


            /* ======================================
               ROUTE
            ====================================== */

            if (props.address) {

                actions.push(`

                    <button
                        class="modal-action-button modal-route-button"
                        type="button"
                        data-modal-route>

                        Route öffnen

                    </button>

                `);

            }


            /* ======================================
               TICKETS
            ====================================== */

            if (props.ticket) {

                actions.push(`

                    <a
                        class="modal-action-button"
                        href="${

                            EF22.utils.escapeHtml(
                                props.ticket
                            )

                        }"
                        target="_blank"
                        rel="noopener">

                        Tickets

                    </a>

                `);

            }


            this.elements.actions.innerHTML =
                actions.join("");


            /* ======================================
               ROUTE EVENT
            ====================================== */

            this.elements.actions
                .querySelector(
                    "[data-modal-route]"
                )
                ?.addEventListener(

                    "click",

                    () => {

                        this.openRoute();

                    }

                );

        },


        /* ==========================================
           ROUTENAUSWAHL ÖFFNEN
        ========================================== */

        openRoute() {

            if (

                !this.state.event ||

                !this.elements.routeModal

            ) {

                return;

            }


            const props =
                EF22.utils.getProps(
                    this.state.event
                );


            const address =

                typeof props.address ===
                "string"

                    ? props.address.trim()

                    : "";


            if (!address) {

                return;

            }


            const query =
                encodeURIComponent(
                    address
                );


            /* ======================================
               APPLE KARTEN

               maps.apple.com funktioniert auch
               als Web-Fallback.
            ====================================== */

            if (this.elements.routeAppleMaps) {

                this.elements.routeAppleMaps.href =

                    `https://maps.apple.com/?q=${query}`;

            }


            /* ======================================
               GOOGLE MAPS
            ====================================== */

            if (this.elements.routeGoogleMaps) {

                this.elements.routeGoogleMaps.href =

                    `https://www.google.com/maps/search/?api=1&query=${query}`;

            }


            this.state.routeOpen =
                true;


            this.elements.modal?.classList.add(
                "route-is-open"
            );


            this.elements.routeModal.classList.add(
                "show"
            );


            this.elements.routeModal.setAttribute(

                "aria-hidden",

                "false"

            );

        },


        /* ==========================================
           ROUTENAUSWAHL SCHLIESSEN
        ========================================== */

        closeRoute() {

            this.state.routeOpen =
                false;


            this.elements.modal?.classList.remove(
                "route-is-open"
            );


            this.elements.routeModal?.classList.remove(
                "show"
            );


            this.elements.routeModal?.setAttribute(

                "aria-hidden",

                "true"

            );

        },


        /* ==========================================
           DESTROY
        ========================================== */

        destroy() {

            this.close();

        }

    };