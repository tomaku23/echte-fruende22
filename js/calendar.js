/*
=====================================================
ECHTE FRÜNDE '22
CALENDAR.JS
Version 4.0
=====================================================
*/

const Calendar = (() => {

    "use strict";

    /* ==========================================
       KONFIGURATION
    ========================================== */

    const CONFIG = {

        endpoint : "api/calendar.php",
        locale   : "de-DE"

    };

    /* ==========================================
       STATUS
    ========================================== */

    const STATE = {

        calendar  : null,
        events    : [],
        nextEvent : null

    };

        /* ==========================================
       DOM
    ========================================== */

    const DOM = {

        hero                    : null,
        heroBackground          : null,
        heroBadge               : null,
        heroTitle               : null,
        heroDate                : null,
        heroTime                : null,
        heroLocation            : null,
        heroCountdown           : null,
        heroHint                : null,

        calendar                : null,
        highlights              : null,

        modal                   : null,
        modalHero               : null,
        modalImage              : null,
        modalContent            : null,
        modalMeta               : null,
        modalButtons            : null,

        modalBadge              : null,
        modalTitle              : null,

        modalLocation           : null,
        modalLocationRow        : null,

        modalDate               : null,
        modalDateRow            : null,

        modalTime               : null,
        modalTimeRow            : null,

        modalDresscode          : null,
        modalDresscodeRow       : null,

        modalMeeting            : null,
        modalMeetingRow         : null,

        modalContact            : null,
        modalContactRow         : null,

        modalDescription        : null,
        modalDescriptionSection : null,

        mapsLink                : null,
        ticketLink              : null,

        closeModal              : null,
        closeModalButton        : null

    };

    /* ==========================================
       INITIALISIERUNG
    ========================================== */

    async function init(){

        cacheDom();

        bindEvents();

        await loadEvents();

        render();

    }

        /* ==========================================
       DOM EINLESEN
    ========================================== */

    function cacheDom(){

        DOM.hero                    = document.getElementById("hero");
        DOM.heroBackground          = document.getElementById("heroBackground");
        DOM.heroBadge               = document.getElementById("heroBadge");
        DOM.heroTitle               = document.getElementById("heroTitle");
        DOM.heroDate                = document.getElementById("heroDate");
        DOM.heroTime                = document.getElementById("heroTime");
        DOM.heroLocation            = document.getElementById("heroLocation");
        DOM.heroCountdown           = document.getElementById("heroCountdown");
        DOM.heroHint                = document.getElementById("heroHint");

        DOM.calendar                = document.getElementById("calendar");
        DOM.highlights              = document.getElementById("highlights");

        DOM.modal                   = document.getElementById("eventModal");

        DOM.modalHero               = document.getElementById("modalHero");
        DOM.modalImage              = document.getElementById("modalImage");
        DOM.modalContent            = document.getElementById("modalContent");
        DOM.modalMeta               = document.getElementById("modalMeta");
        DOM.modalButtons            = document.getElementById("modalButtons");

        DOM.modalBadge              = document.getElementById("modalBadge");
        DOM.modalTitle              = document.getElementById("modalTitle");

        DOM.modalLocation           = document.getElementById("modalLocation");
        DOM.modalLocationRow        = document.getElementById("modalLocationRow");

        DOM.modalDate               = document.getElementById("modalDate");
        DOM.modalDateRow            = document.getElementById("modalDateRow");

        DOM.modalTime               = document.getElementById("modalTime");
        DOM.modalTimeRow            = document.getElementById("modalTimeRow");

        DOM.modalDresscode          = document.getElementById("modalDresscode");
        DOM.modalDresscodeRow       = document.getElementById("modalDresscodeRow");

        DOM.modalMeeting            = document.getElementById("modalMeeting");
        DOM.modalMeetingRow         = document.getElementById("modalMeetingRow");

        DOM.modalContact            = document.getElementById("modalContact");
        DOM.modalContactRow         = document.getElementById("modalContactRow");

        DOM.modalDescription        = document.getElementById("modalDescription");
        DOM.modalDescriptionSection = document.getElementById("modalDescriptionSection");

        DOM.mapsLink                = document.getElementById("mapsLink");
        DOM.ticketLink              = document.getElementById("ticketLink");

        DOM.closeModal              = document.getElementById("closeModal");
        DOM.closeModalButton        = document.getElementById("closeModalButton");

    }
    
    /* ==========================================
       EVENTS
    ========================================== */

    function bindEvents(){

        if(DOM.hero){

            DOM.hero.addEventListener("click", onHeroClick);
            DOM.hero.addEventListener("keydown", onHeroKeyDown);

        }

        if(DOM.closeModal){

            DOM.closeModal.addEventListener("click", closeModal);

        }

        if(DOM.closeModalButton){

            DOM.closeModalButton.addEventListener("click", closeModal);

        }

        if(DOM.modal){

            DOM.modal.addEventListener("click", onOverlayClick);

        }

        document.addEventListener("keydown", onKeyDown);

    }

    /* ==========================================
       TERMINE LADEN
    ========================================== */

    async function loadEvents(){

        try{

            const response = await fetch(CONFIG.endpoint, {

                cache : "no-store"

            });

            if(!response.ok){

                throw new Error("Termine konnten nicht geladen werden.");

            }

            const data = await response.json();

            if(!data.success){

                throw new Error("API liefert keinen Erfolg.");

            }

            STATE.events = Array.isArray(data.events)
                ? data.events
                : [];

            STATE.nextEvent = data.nextEvent ?? null;

        }

        catch(error){

            console.error("Calendar:", error);

            STATE.events = [];
            STATE.nextEvent = null;

        }

    }
    
    /* ==========================================
       RENDER
    ========================================== */

    function render(){

        renderHero();

        renderCalendar();

        renderHighlights();

    }

    /* ==========================================
       AKTUALISIEREN
    ========================================== */

    async function refresh(){

        await loadEvents();

        render();

    }

    /* ==========================================
       HERO
    ========================================== */

    function renderHero(){

        if(
            !DOM.hero ||
            !DOM.heroBackground
        ){

            return;

        }

        const event = STATE.nextEvent;

        if(!event){

            renderEmptyHero();

            return;

        }

        const props = event.extendedProps ?? {};

        const start = new Date(event.start);

        const end = event.end
            ? new Date(event.end)
            : null;

        DOM.heroBadge.className = "hero-badge";

        addBadgeClass(
            DOM.heroBadge,
            props.category
        );

        DOM.heroBadge.textContent =
            props.category || "Termin";

        DOM.heroTitle.textContent =
            event.title || "";

        DOM.heroDate.textContent =
            formatDate(start);

        DOM.heroTime.textContent =
            event.allDay
                ? "Ganztägig"
                : (
                    end
                        ? `${formatTime(start)} – ${formatTime(end)}`
                        : formatTime(start)
                );

        DOM.heroLocation.textContent =
            props.location || "";

        DOM.heroCountdown.textContent =
            getCountdown(start);

        DOM.heroBackground.style.backgroundImage =
            `url("${props.image || "images/hero-bg.png"}")`;

    }

    /* ==========================================
       LEERER HERO
    ========================================== */

    function renderEmptyHero(){

        DOM.heroBadge.className =
            "hero-badge";

        DOM.heroBadge.textContent =
            "Termine";

        DOM.heroTitle.textContent =
            "Zurzeit sind keine Termine vorhanden.";

        DOM.heroDate.textContent =
            "Neue Veranstaltungen folgen bald.";

        DOM.heroTime.textContent = "";

        DOM.heroLocation.textContent = "";

        DOM.heroCountdown.textContent = "--";

        DOM.heroBackground.style.backgroundImage =
            'url("images/hero-bg.png")';

    }

    /* ==========================================
       HERO EVENTS
    ========================================== */

    function onHeroClick(){

        if(!STATE.nextEvent){

            return;

        }

        openModal(STATE.nextEvent);

    }

    function onHeroKeyDown(event){

        if(
            event.key === "Enter" ||
            event.key === " "
        ){

            event.preventDefault();

            onHeroClick();

        }

    }

        /* ==========================================
   FULLCALENDAR
========================================== */

function renderCalendar(){

    if(!DOM.calendar){

        console.error("Calendar-Div nicht gefunden.");

        return;

    }

    if(typeof FullCalendar === "undefined"){

        console.error("FullCalendar wurde nicht geladen.");

        return;

    }

    if(STATE.calendar){

        STATE.calendar.destroy();

        STATE.calendar = null;

    }

    STATE.calendar = new FullCalendar.Calendar(

        DOM.calendar,

        {

            locale: "de",

            initialView: "dayGridMonth",

            firstDay: 1,

            height: "auto",

            events: STATE.events,

            eventClick: onEventClick,

            eventDidMount: onEventRender,

            headerToolbar: {

                left: "prev,next today",

                center: "title",

                right: "dayGridMonth,listMonth"

            }

        }

    );

    STATE.calendar.render();

}
    /* ==========================================
       EVENT GERENDERT
    ========================================== */

    function onEventRender(info){

        const props =
            info.event.extendedProps ?? {};

        if(props.highlight){

            info.el.classList.add(
                "event-highlight"
            );

        }

    }

    /* ==========================================
       EVENT CLICK
    ========================================== */

    function onEventClick(info){

        info.jsEvent.preventDefault();

        openModal(info.event);

    }
    
        /* ==========================================
       HIGHLIGHTS
    ========================================== */

    function renderHighlights(){

        if(!DOM.highlights){

            return;

        }

        DOM.highlights.innerHTML = "";

        const highlights = STATE.events.filter(event =>
            event.extendedProps?.highlight === true
        );

        if(!highlights.length){

            DOM.highlights.innerHTML = `
                <article class="highlight-card">
                    <div class="highlight-content">
                        <span class="highlight-badge">
                            Zurzeit nichts geplant
                        </span>

                        <h3 class="highlight-title">
                            Keine Highlights vorhanden
                        </h3>

                        <p class="highlight-description">
                            Neue Veranstaltungen erscheinen hier automatisch,
                            sobald sie im Kalender als Highlight markiert wurden.
                        </p>
                    </div>
                </article>
            `;

            return;

        }

        highlights.forEach(event => {

            const props = event.extendedProps ?? {};

            const start = new Date(event.start);

            const image =
                props.image || "images/hero-bg.png";

            const card =
                document.createElement("article");

            card.className = "highlight-card";

            card.innerHTML = `

                <div
                    class="highlight-image"
                    style="background-image:url('${image}')">
                </div>

                <div class="highlight-content">

                    <span class="highlight-badge">
                        ${props.category || "Highlight"}
                    </span>

                    <h3 class="highlight-title">
                        ${event.title}
                    </h3>

                    <div class="highlight-date">
                        ${formatDate(start)}
                    </div>

                    <p class="highlight-description">
                        ${props.description || ""}
                    </p>

                    <div class="highlight-footer">

                        <span class="highlight-countdown">
                            ${getCountdown(start)}
                        </span>

                        <span class="highlight-arrow">
                            →
                        </span>

                    </div>

                </div>

            `;

            const badge =
                card.querySelector(".highlight-badge");

            addBadgeClass(
                badge,
                props.category
            );

            card.addEventListener(
                "click",
                () => openModal(event)
            );

            DOM.highlights.appendChild(card);

        });

    }

        /* ==========================================
       MODAL
    ========================================== */

    function openModal(event){

        if(!DOM.modal){

            return;

        }

        const props = event.extendedProps ?? {};

        const start = new Date(event.start);

        const end = event.end
            ? new Date(event.end)
            : null;

        /* ------------------------------------------
           Hero
        ------------------------------------------ */

        if(DOM.modalImage){

            DOM.modalImage.style.backgroundImage =
                `url("${props.image || "images/hero-bg.png"}")`;

        }

        /* ------------------------------------------
           Badge
        ------------------------------------------ */

        DOM.modalBadge.className = "modal-badge";

        addBadgeClass(
            DOM.modalBadge,
            props.category
        );

        DOM.modalBadge.textContent =
            props.category || "Veranstaltung";

        DOM.modalTitle.textContent =
            event.title || "";

        /* ------------------------------------------
           Datum
        ------------------------------------------ */

        DOM.modalDate.textContent =
            formatDate(start);

        if(DOM.modalDateRow){

            DOM.modalDateRow.hidden = false;

        }

        /* ------------------------------------------
           Uhrzeit
        ------------------------------------------ */

        DOM.modalTime.textContent =
            event.allDay
                ? "Ganztägig"
                : (
                    end
                        ? `${formatTime(start)} – ${formatTime(end)}`
                        : formatTime(start)
                );

        if(DOM.modalTimeRow){

            DOM.modalTimeRow.hidden = false;

        }

        /* ------------------------------------------
           Ort
        ------------------------------------------ */

        DOM.modalLocation.innerHTML =
            props.address
                ? props.address
                    .split(",")
                    .map(line => line.trim())
                    .join("<br>")
                : (props.location || "");

        DOM.modalLocationRow.hidden =
            !(props.address || props.location);

        /* ------------------------------------------
           Dresscode
        ------------------------------------------ */

        DOM.modalDresscode.textContent =
            props.dresscode || "";

        DOM.modalDresscodeRow.hidden =
            !props.dresscode;

        /* ------------------------------------------
           Treffpunkt
        ------------------------------------------ */

        DOM.modalMeeting.textContent =
            props.meeting || "";

        DOM.modalMeetingRow.hidden =
            !props.meeting;

        /* ------------------------------------------
           Kontakt
        ------------------------------------------ */

        DOM.modalContact.textContent =
            props.contact || "";

        DOM.modalContactRow.hidden =
            !props.contact;

        /* ------------------------------------------
           Beschreibung
        ------------------------------------------ */

        DOM.modalDescription.textContent =
            props.description || "";

        DOM.modalDescriptionSection.hidden =
            !props.description;

        /* ------------------------------------------
           Google Maps
        ------------------------------------------ */

        if(props.address){

            DOM.mapsLink.hidden = false;

            DOM.mapsLink.href =
                "https://www.google.com/maps/search/?api=1&query=" +
                encodeURIComponent(props.address);

        }else{

            DOM.mapsLink.hidden = true;
            DOM.mapsLink.removeAttribute("href");

        }
        
        /* ------------------------------------------

           Tickets

        ------------------------------------------ */

        if(props.ticket){

            DOM.ticketLink.hidden = false;

            DOM.ticketLink.href = props.ticket;

        }else{

            DOM.ticketLink.hidden = true;

            DOM.ticketLink.removeAttribute("href");

        }

        DOM.modal.classList.add("show");

        document.body.classList.add("no-scroll");

    }

    /* ==========================================
       OVERLAY
    ========================================== */

    function onOverlayClick(event){

        if(event.target === DOM.modal){

            closeModal();

        }

    }

    /* ==========================================
       ESC
    ========================================== */

    function onKeyDown(event){

        if(event.key === "Escape"){

            closeModal();

        }

    }
    
        /* ==========================================
       BADGE FARBEN
    ========================================== */

    function addBadgeClass(
        element,
        category
    ){

        if(!element){

            return;

        }

        const classes = {

            "schützenfest" : "badge-fest",
            "versammlung"  : "badge-meeting",
            "intern"        : "badge-intern",
            "öffentlich"    : "badge-public",
            "zugkönig"      : "badge-royal"

        };

        const badge =
            classes[(category || "").toLowerCase()];

        if(badge){

            element.classList.add(badge);

        }

    }

    /* ==========================================
       DATUM
    ========================================== */

    function formatDate(date){

        if(
            !(date instanceof Date) ||
            isNaN(date.getTime())
        ){

            return "";

        }

        return date.toLocaleDateString(
            CONFIG.locale,
            {

                weekday : "long",
                day     : "2-digit",
                month   : "long",
                year    : "numeric"

            }
        );

    }

    /* ==========================================
       UHRZEIT
    ========================================== */

    function formatTime(date){

        if(
            !(date instanceof Date) ||
            isNaN(date.getTime())
        ){

            return "";

        }

        return date.toLocaleTimeString(
            CONFIG.locale,
            {

                hour   : "2-digit",
                minute : "2-digit"

            }
        );

    }

    /* ==========================================
       COUNTDOWN
    ========================================== */

    function getCountdown(date){

        if(
            !(date instanceof Date) ||
            isNaN(date.getTime())
        ){

            return "";

        }

        const today = new Date();

        today.setHours(
            0,
            0,
            0,
            0
        );

        const target = new Date(date);

        target.setHours(
            0,
            0,
            0,
            0
        );

        const days = Math.ceil(
            (target - today) / (1000 * 60 * 60 * 24)
        );

        if(days < 0){

            return "Termin vorbei";

        }

        if(days === 0){

            return "Heute";

        }

        if(days === 1){

            return "Morgen";

        }

        return `Noch ${days} Tage`;

    }

    /* ==========================================
       DESTROY
    ========================================== */

    function destroy(){

        if(STATE.calendar){

            STATE.calendar.destroy();

            STATE.calendar = null;

        }

        DOM.hero?.removeEventListener(
            "click",
            onHeroClick
        );

        DOM.hero?.removeEventListener(
            "keydown",
            onHeroKeyDown
        );

        DOM.closeModal?.removeEventListener(
            "click",
            closeModal
        );

        DOM.closeModalButton?.removeEventListener(
            "click",
            closeModal
        );

        DOM.modal?.removeEventListener(
            "click",
            onOverlayClick
        );

        document.removeEventListener(
            "keydown",
            onKeyDown
        );

    }

    /* ==========================================
       PUBLIC API
    ========================================== */

    return {

        init,
        refresh,
        destroy,

        openModal,
        closeModal

    };

})();