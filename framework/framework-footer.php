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
         SEITEN JAVASCRIPT
    ========================================== -->

    <?php

    if (isset($pageJs)) {

        foreach ($pageJs as $js) {

            echo '<script src="' .
                $js .
                '"></script>' .
                PHP_EOL;

        }

    }

    ?>

    <!-- ==========================================
         FRAMEWORK JAVASCRIPT
    ========================================== -->

    <script src="js/header.js"></script>

    <script src="js/navigation.js"></script>

    <script src="js/navigation-indicator.js"></script>

    </body>

    </html>

