/*
=====================================================
 ECHTE FRÜNDE '22
 MODAL.JS
 Version 1.0
=====================================================
*/

const Modal = (() => {

    "use strict";

    /* ==========================================
       DOM
    ========================================== */

    const DOM = {

        modals: [],

        openButtons: [],

        closeButtons: []

    };


    /* ==========================================
       STATUS
    ========================================== */

    const STATE = {

        activeModal: null

    };


    /* ==========================================
       INITIALISIERUNG
    ========================================== */

    function init(){

        cacheDom();

        bindEvents();

    }


    /* ==========================================
       DOM EINLESEN
    ========================================== */

    function cacheDom(){

        DOM.modals = [

            ...document.querySelectorAll(".modal")

        ];

        DOM.openButtons = [

            ...document.querySelectorAll("[data-modal]")

        ];

        DOM.closeButtons = [

            ...document.querySelectorAll(".modal-close")

        ];

    }


    /* ==========================================
       EVENTS
    ========================================== */

    function bindEvents(){

        DOM.openButtons.forEach(button => {

            button.addEventListener(

                "click",

                onOpen

            );

        });

        DOM.closeButtons.forEach(button => {

            button.addEventListener(

                "click",

                onClose

            );

        });

        DOM.modals.forEach(modal => {

            modal.addEventListener(

                "click",

                onOverlayClick

            );

        });

        document.addEventListener(

            "keydown",

            onKeyDown

        );

    }
    
        /* ==========================================
       MODAL ÖFFNEN
    ========================================== */

    function onOpen(event){

        event.preventDefault();

        const id =
            event.currentTarget.dataset.modal;

        open(id);

    }


    function open(id){

        const modal =
            document.getElementById(id);

        if(!modal){

            return;

        }

        closeAll();

        modal.classList.add("open");

        document.body.classList.add("modal-open");

        STATE.activeModal = modal;

    }


    /* ==========================================
       MODAL SCHLIESSEN
    ========================================== */

    function onClose(){

        close();

    }


    function close(){

        if(!STATE.activeModal){

            return;

        }

        STATE.activeModal.classList.remove("open");

        document.body.classList.remove("modal-open");

        STATE.activeModal = null;

    }


    function closeAll(){

        DOM.modals.forEach(modal => {

            modal.classList.remove("open");

        });

    }


    /* ==========================================
       OVERLAY CLICK
    ========================================== */

    function onOverlayClick(event){

        if(event.target !== event.currentTarget){

            return;

        }

        close();

    }


    /* ==========================================
       ESC TASTE
    ========================================== */

    function onKeyDown(event){

        if(event.key !== "Escape"){

            return;

        }

        close();

    }
    
        /* ==========================================
       AKTUALISIEREN
    ========================================== */

    function refresh(){

        cacheDom();

        bindEvents();

    }


    /* ==========================================
       DESTROY
    ========================================== */

    function destroy(){

        DOM.openButtons.forEach(button => {

            button.removeEventListener(
                "click",
                onOpen
            );

        });

        DOM.closeButtons.forEach(button => {

            button.removeEventListener(
                "click",
                onClose
            );

        });

        DOM.modals.forEach(modal => {

            modal.removeEventListener(
                "click",
                onOverlayClick
            );

        });

        document.removeEventListener(
            "keydown",
            onKeyDown
        );

    }


    /* ==========================================
       PUBLIC API
    ========================================== */

    return{

        init,

        refresh,

        open,

        close,

        destroy

    };

})()