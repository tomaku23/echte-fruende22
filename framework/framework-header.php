<?php
/*
=====================================================
 EF22 FRAMEWORK
 framework-header.php
 Version 6.0
=====================================================
*/
?>

<!DOCTYPE html>

<html lang="de">

<head>

<!--=========================================
     META
==========================================-->

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0">

<meta
    name="theme-color"
    content="#0A0A0A">

<meta
    name="format-detection"
    content="telephone=no, address=no, email=no">
    
<!--=========================================
    GOOGLE FONTS
==========================================-->

<link
    rel="preconnect"
    href="https://fonts.googleapis.com">

<link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin>

<link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
    rel="stylesheet">
    
<!--=========================================
     EXTERNE BIBLIOTHEKEN
==========================================-->

<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
    
<!--=========================================
     FRAMEWORK CSS
==========================================-->

<link
    rel="stylesheet"
    href="css/framework.css">

<link
    rel="stylesheet"
    href="css/header.css">

<link
    rel="stylesheet"
    href="css/hero.css">

<link
    rel="stylesheet"
    href="css/footer.css">

<link
    rel="stylesheet"
    href="css/navigation-indicator.css">
    
<!--=========================================
     KOMPONENTEN CSS
==========================================-->

<link
    rel="stylesheet"
    href="css/components.css">
    
<!--=========================================
     SEITEN CSS
==========================================-->

<script
    src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.19/index.global.min.js">
</script>

<?php

if (isset($pageCss)) {

    foreach ($pageCss as $css) {

        echo
            '<link rel="stylesheet" href="' .
            $css .
            '">' .
            PHP_EOL;

    }

}

?>

</head>

<body>

<!--=========================================
     HEADER
==========================================-->

<header class="header">

    <div class="header-inner">
    
<!--=========================================
     LOGO
==========================================-->

<div class="logo-track">

    <div class="logo-progress"></div>

    <div
        class="logo-slider"
        role="button"
        tabindex="0"
        aria-label="Startseite">

        <img
            src="images/logo.png"
            alt="Logo der Echten Fründe '22'">

    </div>

    <div class="chapter-indicator">

</div>

<!--=========================================
     NAVIGATION
==========================================-->

<nav
    id="navigation"
    class="nav-top"
    aria-label="Hauptnavigation">

    <a href="index.php">

        Startseite

    </a>

    <a href="ueber-uns.php">

        Über uns

    </a>

    <a href="zugkoenig.php">

        Zugkönig

    </a>

    <a
        href="termine.php"
        class="active"
        aria-current="page">

        Termine

    </a>

</nav>

<!--=========================================
     BURGER
==========================================-->

<button
    class="burger"
    type="button"
    aria-label="Navigation öffnen"
    aria-expanded="false"
    aria-controls="navigation">

    <span></span>

    <span></span>

    <span></span>

</button>

</div>

<!--=========================================
     OVERLAY
==========================================-->

    <div
        class="nav-overlay"
        aria-hidden="true">
    </div>

</header>

<!--=========================================
     PAGE CONTENT
==========================================-->

<div class="page-content">

<!--=========================================
     HERO
==========================================-->

<section
    id="hero"
    class="hero"
    data-hero="calendar"
    tabindex="0"
    aria-label="Hero">

    <div
        id="heroBackground"
        class="hero-background">

    </div>

    <div class="hero-overlay">

        <div class="container">

            <div class="hero-content">

                <span
                    id="heroBadge"
                    class="hero-badge">

                    Termin

                </span>

                <h1 id="heroTitle">

                    Termine werden geladen …

                </h1>

                <p
                    id="heroDate"
                    class="hero-date">

                    Bitte warten …

                </p>

                <div class="hero-info">

                    <div class="hero-item">

                        <span class="hero-icon">

                            🕒

                        </span>

                        <span id="heroTime">

                        </span>

                    </div>

                    <div class="hero-item">

                        <span class="hero-icon">

                            📍

                        </span>

                        <span id="heroLocation">

                        </span>

                    </div>

                </div>

                <div
                    id="heroCountdown"
                    class="hero-countdown">

                    --

                </div>

                <div
                    id="heroHint"
                    class="hero-hint">

                </div>

            </div>

        </div>

    </div>

    <div
        class="hero-scroll"
        aria-hidden="true">

        <span>

            ▼

        </span>

    </div>

</section>