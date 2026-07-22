<?php
/*
=====================================================
 EF22 FRAMEWORK
 FRAMEWORK.PHP
 Version 2.0
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
     EXTERNE CSS-BIBLIOTHEKEN
==========================================-->

<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

<!--=========================================
     FRAMEWORK CSS
==========================================-->

<link
    rel="stylesheet"
    href="../css/framework.css">
    
    <link
    rel="stylesheet"
    href="../css/variables.css">

<link
    rel="stylesheet"
    href="../css/header.css">

<link
    rel="stylesheet"
    href="../css/footer.css">

<link
    rel="stylesheet"
    href="../css/navigation-indicator.css">

<!--=========================================
     COMPONENT CSS
==========================================-->

<link
    rel="stylesheet"
    href="../css/hero.css">

<link
    rel="stylesheet"
    href="../css/calendar.css">

<link
    rel="stylesheet"
    href="../css/highlights.css">

<link
    rel="stylesheet"
    href="../css/modal.css">

</head>

<body>

<!--=========================================
     HEADER
==========================================-->

<?php

require_once "../components/header.php";

?>

<!--=========================================
     PAGE CONTENT
==========================================-->

<main class="page-content">

<?php

if (isset($pageContent)) {

    echo $pageContent;

}

?>

</main>

<!--=========================================
     NAVIGATION INDICATOR
==========================================-->

<button
    id="navigationIndicator"
    class="navigation-indicator"
    type="button"
    aria-label="Nach unten scrollen">

    <i class="fa-solid fa-chevron-down"></i>

</button>

<!--=========================================
     FRAMEWORK MARKER
==========================================-->

<div
    id="navigationIndicatorMarker"
    aria-hidden="true">

</div>

<!--=========================================
     FOOTER
==========================================-->

<?php

require_once "../components/footer.php";

?>

<!--=========================================
     EXTERNE JAVASCRIPT-BIBLIOTHEKEN
==========================================-->

<script
    src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.19/index.global.min.js">
</script>

<!--=========================================
     FRAMEWORK JAVASCRIPT
==========================================-->

<script src="../js/config.js"></script>

<script src="../js/utilities.js"></script>

<script src="../js/dom.js"></script>

<script src="../js/icons.js"></script>

<script src="../js/navigation-indicator.js"></script>

<script src="../js/animations.js"></script>

<!--=========================================
     COMPONENT JAVASCRIPT
==========================================-->

<script src="../js/header.js"></script>

<script src="../js/modal.js"></script>

<script src="../js/hero.js"></script>

<script src="../js/highlights.js"></script>

<script src="../js/calendar.js"></script>

<script>

window.onerror = function(message, source, line, column, error){

    alert(

        "JavaScript-Fehler\n\n" +

        message +

        "\n\nDatei:\n" +

        source +

        "\n\nZeile: " +

        line

    );

};

</script>

<script src="../js/app.js"></script>

</body>

</html>