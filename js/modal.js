/*
=====================================================
 ECHTE FRÜNDE '22
 MODAL.JS
 Version 1.0
=====================================================
*\

window.EF22 ??= {};

EF22.modal = (() => {

    /* ==========================================================
       ELEMENTE
    ========================================================== */

    const modal = document.getElementById("modal");
    const overlay = modal.querySelector(".modal-overlay");

    const hero = document.getElementById("modalHero");
    const image = document.getElementById("modalImage");

    const badge = document.getElementById("modalBadge");
    const title = document.getElementById("modalTitle");
    const subtitle = document.getElementById("modalSubtitle");

    const meta = document.getElementById("modalMeta");
    const content = document.getElementById("modalContent");
    const actions = document.getElementById("modalActions");

    const closeButton = document.getElementById("closeModalButton");


    /* ==========================================================
       ÖFFNEN
    ========================================================== */

    function open(data = {}) {

        setData(data);

        modal.classList.remove("hidden");
        modal.classList.add("show");

        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
    }


    /* ==========================================================
       SCHLIESSEN
    ========================================================== */

    function close() {

        modal.classList.remove("show");
        modal.classList.add("hidden");

        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";
    }


    /* ==========================================================
       DATEN SETZEN
    ========================================================== */

    function setData(data = {}) {

        setHero(data.image);
        setBadge(data.badge);
        setTitle(data.title);
        setSubtitle(data.subtitle);

        setMeta(data.meta ?? []);

        content.innerHTML = data.content ?? "";

        setActions(data.actions ?? []);
    }


    return {
        open,
        close,
        setData
    };

})();

    /* ==========================================================
       HEADER-DATEN
    ========================================================== */

    function setHero(src) {

        if (!src) {

            hero.classList.add("hidden");
            image.removeAttribute("src");

            return;
        }

        image.src = src;

        hero.classList.remove("hidden");
    }


    function setBadge(text) {

        if (!text) {

            badge.textContent = "";
            badge.classList.add("hidden");

            return;
        }

        badge.textContent = text;

        badge.classList.remove("hidden");
    }


    function setTitle(text) {

        title.textContent = text ?? "";
    }


    function setSubtitle(text) {

        if (!text) {

            subtitle.textContent = "";
            subtitle.classList.add("hidden");

            return;
        }

        subtitle.textContent = text;

        subtitle.classList.remove("hidden");
    }
    
        /* ==========================================================
       METADATEN
    ========================================================== */

    function setMeta(items = []) {

        meta.innerHTML = "";

        if (!Array.isArray(items) || items.length === 0) {
            return;
        }

        items.forEach(item => {

            if (!item?.value) {
                return;
            }

            const metaItem = document.createElement("div");
            metaItem.className = "modal-meta-item";

            const icon = document.createElement("div");
            icon.className = "modal-meta-icon";
            icon.innerHTML = item.icon ?? "";

            const text = document.createElement("div");
            text.className = "modal-meta-text";

            const label = document.createElement("div");
            label.className = "modal-meta-label";
            label.textContent = item.label ?? "";

            const value = document.createElement("div");
            value.className = "modal-meta-value";
            value.textContent = item.value;

            text.append(label, value);
            metaItem.append(icon, text);

            meta.appendChild(metaItem);

        });

    }
    
        /* ==========================================================
       AKTIONEN
    ========================================================== */

    function setActions(items = []) {

        actions.innerHTML = "";

        if (!Array.isArray(items) || items.length === 0) {
            return;
        }

        items.forEach(item => {

            if (!item?.text || !item?.href) {
                return;
            }

            const button = document.createElement("a");

            button.className = "modal-action";
            button.href = item.href;
            button.textContent = item.text;

            if (item.target) {
                button.target = item.target;
            }

            if (item.rel) {
                button.rel = item.rel;
            }

            if (item.icon) {

                const icon = document.createElement("span");

                icon.className = "modal-action-icon";
                icon.innerHTML = item.icon;

                button.prepend(icon);
            }

            actions.appendChild(button);

        });

    }
    
        /* ==========================================================
       EVENTS
    ========================================================== */

    closeButton.addEventListener("click", close);

    overlay.addEventListener("click", close);

    document.addEventListener("keydown", event => {

        if (event.key === "Escape" && modal.classList.contains("show")) {
            close();
        }

    });