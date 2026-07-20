/*
=====================================================
 ECHTE FRÜNDE '22
 ANIMATIONS.JS
 Version 1.0
=====================================================
*/

const Animations = (() => {

    "use strict";

    /* ==========================================
       KONFIGURATION
    ========================================== */

    const CONFIG = {

        threshold: 0.15,

        rootMargin: "0px 0px -10% 0px"

    };


    /* ==========================================
       DOM
    ========================================== */

    const DOM = {

        animatedElements: []

    };


    /* ==========================================
       OBSERVER
    ========================================== */

    let observer = null;


    /* ==========================================
       INITIALISIERUNG
    ========================================== */

    function init(){

        cacheDom();

        if(DOM.animatedElements.length === 0){

            return;

        }

        createObserver();

        observeElements();

    }


    /* ==========================================
       DOM EINLESEN
    ========================================== */

    function cacheDom(){

        DOM.animatedElements = [

            ...document.querySelectorAll(

                ".fade-in, .fade-left, .fade-right, .scale-in"

            )

        ];

    }
    
        /* ==========================================
       OBSERVER ERSTELLEN
    ========================================== */

    function createObserver(){

        observer = new IntersectionObserver(

            handleIntersection,

            {

                threshold: CONFIG.threshold,

                rootMargin: CONFIG.rootMargin

            }

        );

    }


    /* ==========================================
       ELEMENTE BEOBACHTEN
    ========================================== */

    function observeElements(){

        DOM.animatedElements.forEach(element => {

            observer.observe(element);

        });

    }


    /* ==========================================
       OBSERVER CALLBACK
    ========================================== */

    function handleIntersection(entries){

        entries.forEach(entry => {

            if(entry.isIntersecting){

                showElement(entry.target);

            }

        });

    }


    /* ==========================================
       ELEMENT EINBLENDEN
    ========================================== */

    function showElement(element){

        element.classList.add("visible");

        if(observer){

            observer.unobserve(element);

        }

    }


    /* ==========================================
       ELEMENT AUSBLENDEN
    ========================================== */

    function hideElement(element){

        element.classList.remove("visible");

    }
    
        /* ==========================================
       AKTUALISIEREN
    ========================================== */

    function refresh(){

        if(observer){

            observer.disconnect();

        }

        cacheDom();

        createObserver();

        observeElements();

    }


    /* ==========================================
       DESTROY
    ========================================== */

    function destroy(){

        if(observer){

            observer.disconnect();

        }

        observer = null;

    }


    /* ==========================================
       PUBLIC API
    ========================================== */

    return{

        init,

        refresh,

        destroy

    };

})();