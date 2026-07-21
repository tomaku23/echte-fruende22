    <?php
    /*
    =====================================================
     EF22 FRAMEWORK
     FRAMEWORK-FOOTER.PHP
     Version 1.0
    =====================================================
    */
    ?>

        <!-- ==========================================
         NAVIGATION INDICATOR
    ========================================== -->

    <button
        
         id="navigationIndicator"
        class="navigation-indicator"
        type="button"
        aria-label="Nach unten scrollen">

        <i class="fa-solid fa-chevron-down"></i>

    </button>

    <!-- ==========================================
         FRAMEWORK MARKER
    ========================================== -->

    <div
        id="navigationIndicatorMarker"
        aria-hidden="true">

    </div>

    <!-- ==========================================
     FOOTER
========================================== -->

</div>

<footer class="footer">

        <div class="container">

            <nav
                class="footer-navigation"
                aria-label="Footer Navigation">

                <a href="datenschutz.php">

                    Datenschutz

                </a>

                <a href="impressum.php">

                    Impressum

                </a>

            </nav>

            <p id="footerCopyright">

        <span class="footer-copyright">

            © 2026 Echte Fründe '22

        </span>

        <br>

        <span class="footer-rights">

            Alle Rechte vorbehalten.

        </span>

    </p>

   </div>
     
</footer>

    <!-- ==========================================
     FRAMEWORK JAVASCRIPT
========================================== -->

<script src="js/config.js"></script>

<script src="js/icons.js"></script>

<script src="js/modal.js"></script>

<script src="js/header.js"></script>

<script src="js/navigation.js"></script>

<script src="js/navigation-indicator.js"></script>

<script src="js/hero.js"></script>

<script src="js/animations.js"></script>

    <!-- ==========================================
     SEITEN JAVASCRIPT
========================================== -->

<?php

if (!empty($pageJs)) {

    foreach ($pageJs as $js) {

        echo '<script src="' .
            htmlspecialchars($js, ENT_QUOTES) .
            '"></script>' .
            PHP_EOL;

    }

}

?>