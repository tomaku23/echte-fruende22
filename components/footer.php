<?php
/*
=====================================================
 EF22 COMPONENT
 FOOTER
 Version 1.0
=====================================================
*/
?>

<footer class="footer">

    <style>

        .footer {

            margin-top: 60px;
            padding: 24px 20px;

            border-top: 1px solid rgba(255,255,255,.12);

            text-align: center;

            color: #9A9A9A;
            font-size: .9rem;
            line-height: 1.8;

        }

        .footer-links {

            display: flex;
            justify-content: center;
            align-items: center;
            gap: 24px;

            flex-wrap: wrap;

            margin-bottom: 16px;

        }

        .footer-links a {

            color: inherit;
            text-decoration: none;

            transition: opacity .2s ease;

        }

        .footer-links a:hover {

            opacity: .7;

        }

    </style>

    <div class="footer-links">

        <a href="./datenschutz.php">
            Datenschutz
        </a>

        <a href="./impressum.php">
            Impressum
        </a>

    </div>

    <div>

        © <?php echo date('Y'); ?> Echte Fründe '22

        <br>

        Alle Rechte vorbehalten.

    </div>

</footer>