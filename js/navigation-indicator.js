/*
=====================================================
 ECHTE FRÜNDE '22
 NAVIGATION-INDICATOR.JS
 Version 4.0
=====================================================
*/

/* ==========================================
   NAVIGATION INDICATOR
========================================== */

const navigationIndicator =
    document.getElementById(
        "navigationIndicator"
    );

/* ==========================================
   ELEMENTS
========================================== */

const footer =
    document.querySelector(
        ".footer"
    );

/* ==========================================
   CONFIG
========================================== */

const CONFIG = {

    defaultBottom: 24,

    parkBottom: 95

};

/* ==========================================
   STATE
========================================== */

let indicatorState = "start";

/* ==========================================
   INITIALIZATION
========================================== */

if (!navigationIndicator) {

    console.warn(
        "Navigation Indicator nicht gefunden."
    );

}

if (!footer) {

    console.warn(
        "Footer nicht gefunden."
    );

}

updateState();

/* ==========================================
   FUNCTIONS
========================================== */

function setState(state){

    if(!navigationIndicator){

        return;

    }

    indicatorState = state;

    navigationIndicator.classList.remove(

        "navigation-indicator--compact",
        "navigation-indicator--park",
        "navigation-indicator--up",
        "navigation-indicator--bounce"

    );

    switch(state){

        case "start":

            navigationIndicator.classList.add(

                "navigation-indicator--bounce"

            );

            navigationIndicator.setAttribute(

                "aria-label",

                "Nach unten scrollen"

            );

            break;

        case "scroll":

            navigationIndicator.classList.add(

                "navigation-indicator--compact"

            );

            navigationIndicator.setAttribute(

                "aria-label",

                "Nach unten scrollen"

            );

            break;

        case "park":

            navigationIndicator.classList.add(

                "navigation-indicator--compact",

                "navigation-indicator--park",

                "navigation-indicator--up"

            );

            navigationIndicator.setAttribute(

                "aria-label",

                "Nach oben scrollen"

            );

            break;

    }

}

setState("start");

/* ==========================================
   UPDATE STATE
========================================== */

function updateState(){

    if(window.scrollY === 0){

        setState("start");

        return;

    }

    setState("scroll");

}

/* ==========================================
   EVENTS
========================================== */

window.addEventListener(

    "scroll",

    updateNavigationIndicator

);

navigationIndicator?.addEventListener(

    "click",

    () => {

        if(indicatorState !== "park"){

            return;

        }

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }

);

/* ==========================================
   UPDATE POSITION
========================================== */

function updatePosition(){

    if(!navigationIndicator || !footer){

        return;

    }

    const footerTop =

        footer.getBoundingClientRect().top;

    const parkLine =

        window.innerHeight -

        CONFIG.parkBottom;

    if(footerTop <= parkLine){

        navigationIndicator.style.bottom =

            CONFIG.parkBottom + "px";

        setState("park");

        return;

    }

    navigationIndicator.style.bottom =

        CONFIG.defaultBottom + "px";

}

/* ==========================================
   UPDATE
========================================== */

function updateNavigationIndicator(){

    updatePosition();

    if(indicatorState !== "park"){

        updateState();

    }

}

/* ==========================================
   INITIALIZATION
========================================== */

if (!navigationIndicator) {

    console.warn(
        "Navigation Indicator nicht gefunden."
    );

}

if (!footer) {

    console.warn(
        "Footer nicht gefunden."
    );

}

updateNavigationIndicator();