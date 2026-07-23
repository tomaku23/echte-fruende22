/* ==========================================
   INTERAKTION
========================================== */

onClick() {

    if (

        this.state.mode !== "park"

    ) {

        return;

    }

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

},