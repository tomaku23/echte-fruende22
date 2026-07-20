/*
=====================================================
 ECHTE FRÜNDE '22
 HEADER.JS
 Version 6.0
=====================================================
*/

const Header = (() => {

    "use strict";

/* ==========================================
   STATUS
========================================== */

const STATE = {

    compact: false,

    navigationOpen: false

};

/* ==========================================
   DOM
========================================== */

const DOM = {

    header: null,

    logo: null,

    navigation: null,

    burger: null,

    overlay: null

};

/* ==========================================
   INITIALISIERUNG
========================================== */

function init(){

    cacheDom();

    if(!DOM.header){

        console.warn(

            "Header wurde nicht gefunden."

        );

        return;

    }

    DOM.burger?.setAttribute(

        "aria-expanded",

        "false"

    );

    DOM.navigation?.setAttribute(

        "aria-hidden",

        "true"

    );

    bindEvents();

    updateHeader();

}

/* ==========================================
   DOM EINLESEN
========================================== */

function cacheDom(){

    DOM.header =

        document.querySelector(

            ".header"

        );

    DOM.logo =

        document.querySelector(

            ".logo-slider"

        );

    DOM.navigation =

        document.querySelector(

            ".nav-top"

        );

    DOM.burger =

        document.querySelector(

            ".burger"

        );

    DOM.overlay =

        document.querySelector(

            ".nav-overlay"

        );

}

/* ==========================================
   EVENTS
========================================== */

function bindEvents(){

    window.addEventListener(

        "scroll",

        onScroll,

        {

            passive: true

        }

    );

    window.addEventListener(

        "resize",

        updateHeader

    );

    DOM.burger?.addEventListener(

        "click",

        toggleNavigation

    );

    DOM.logo?.addEventListener(

        "click",

        onLogoClick

    );

    DOM.logo?.addEventListener(

        "keydown",

        onLogoKeyDown

    );

    DOM.overlay?.addEventListener(

        "click",

        closeNavigation

    );

    document.addEventListener(

        "keydown",

        onKeyDown

    );

    DOM.navigation

        ?.querySelectorAll("a")

        .forEach(

            link =>

                link.addEventListener(

                    "click",

                    closeNavigation

                )

        );

}

/* ==========================================
   SCROLL
========================================== */

function onScroll(){

    if(STATE.navigationOpen){

        return;

    }

    updateHeader();

}

/* ==========================================
   HEADER AKTUALISIEREN
========================================== */

function updateHeader(){

    if(window.scrollY === 0){

        expandHeader();

    }else{

        compactHeader();

    }

}

/* ==========================================
   HEADER GROSS
========================================== */

function expandHeader(){

    if(!STATE.compact){

        return;

    }

    STATE.compact = false;

    DOM.header.classList.remove(

        "compact"

    );

}

/* ==========================================
   HEADER KOMPAKT
========================================== */

function compactHeader(){

    if(STATE.compact){

        return;

    }

    STATE.compact = true;

    DOM.header.classList.add(

        "compact"

    );

}

/* ==========================================
   NAVIGATION ÖFFNEN
========================================== */

function openNavigation(){

    if(STATE.navigationOpen){

        return;

    }

    STATE.navigationOpen = true;

    DOM.header.classList.add(

        "expanded"

    );

    DOM.burger?.setAttribute(

        "aria-expanded",

        "true"

    );

    DOM.navigation?.setAttribute(

        "aria-hidden",

        "false"

    );

}

/* ==========================================
   NAVIGATION SCHLIESSEN
========================================== */

function closeNavigation(){

    if(!STATE.navigationOpen){

        return;

    }

    STATE.navigationOpen = false;

    DOM.header.classList.remove(

        "expanded"

    );

    DOM.burger?.setAttribute(

        "aria-expanded",

        "false"

    );

    DOM.navigation?.setAttribute(

        "aria-hidden",

        "true"

    );

}

/* ==========================================
   NAVIGATION UMSCHALTEN
========================================== */

function toggleNavigation(){

    if(!STATE.compact){

        return;

    }

    if(STATE.navigationOpen){

        closeNavigation();

    }else{

        openNavigation();

    }

}

/* ==========================================
   HILFSFUNKTIONEN
========================================== */

function onLogoClick(){

    closeNavigation();

    window.location.href =

        "index.php";

}

function onLogoKeyDown(event){

    if(

        event.key !== "Enter" &&

        event.key !== " "

    ){

        return;

    }

    event.preventDefault();

    onLogoClick();

}

function onKeyDown(event){

    if(

        event.key === "Escape" &&

        STATE.navigationOpen

    ){

        closeNavigation();

    }

}

/* ==========================================
   DESTROY
========================================== */

function destroy(){

    window.removeEventListener(

        "scroll",

        onScroll

    );

    window.removeEventListener(

        "resize",

        updateHeader

    );

    DOM.burger?.removeEventListener(

        "click",

        toggleNavigation

    );

    DOM.logo?.removeEventListener(

        "click",

        onLogoClick

    );

    DOM.logo?.removeEventListener(

        "keydown",

        onLogoKeyDown

    );

    DOM.overlay?.removeEventListener(

        "click",

        closeNavigation

    );

    document.removeEventListener(

        "keydown",

        onKeyDown

    );

    DOM.navigation

        ?.querySelectorAll("a")

        .forEach(

            link =>

                link.removeEventListener(

                    "click",

                    closeNavigation

                )

        );

}

/* ==========================================
   PUBLIC API
========================================== */

return {

    init,

    destroy

};

})();