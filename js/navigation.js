/*
=====================================================
 ECHTE FRÜNDE '22
 NAVIGATION.JS
 Version 1.0
=====================================================
*/

const Navigation = (() => {

    "use strict";

    /* ==========================================
       DOM
    ========================================== */

    const DOM = {

        links: [],

        navigation: null

    };


    /* ==========================================
       INITIALISIERUNG
    ========================================== */

    function init(){

        cacheDom();

        if(!DOM.navigation){

            return;

        }

        setActiveLink();

        bindEvents();

    }


    /* ==========================================
       DOM EINLESEN
    ========================================== */

    function cacheDom(){

        DOM.navigation = document.querySelector(".nav-top");

        DOM.links = [
            ...document.querySelectorAll(".nav-top a")
        ];

    }


    /* ==========================================
       EVENTS
    ========================================== */

    function bindEvents(){

        DOM.links.forEach(link => {

            link.addEventListener(

                "click",

                onLinkClick

            );

        });

    }
    
        /* ==========================================
       LINK CLICK
    ========================================== */

    function onLinkClick(event){

        const link = event.currentTarget;

        const href = link.getAttribute("href");

        /*
            Interne Sprungmarken
        */

        if(href && href.startsWith("#")){

            event.preventDefault();

            const target =
                document.querySelector(href);

            if(target){

                target.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            }

        }

        /*
            Kompakte Navigation schließen.
        */

        if(
            typeof Header !== "undefined" &&
            typeof Header.closeNavigation === "function"
        ){

            Header.closeNavigation();

        }

    }


    /* ==========================================
       AKTIVE SEITE
    ========================================== */

    function setActiveLink(){

        const currentPage =
            window.location.pathname
                .split("/")
                .pop() || "index.php";

        DOM.links.forEach(link => {

            const href = link.getAttribute("href");

            link.classList.remove("highlight");

            if(href === currentPage){

                link.classList.add("highlight");

            }

        });

    }


    /* ==========================================
       AKTIVE SEITE AKTUALISIEREN
    ========================================== */

    function refresh(){

        setActiveLink();

    }
    
        /* ==========================================
       DESTROY
    ========================================== */

    function destroy(){

        DOM.links.forEach(link => {

            link.removeEventListener(

                "click",

                onLinkClick

            );

        });

    }


        /* ==========================================
   PUBLIC API
========================================== */

return{

    init,

    destroy,

    refresh

};

})();