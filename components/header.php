<?php

/*
=====================================================
 EF22 FRAMEWORK
 HEADER.PHP
 Version 2.2
=====================================================
*/

/* ==========================================
   NAVIGATION
========================================== */

$navigation = [

    "./index.php" => [

        "title" => "Startseite"

    ],

    "./ueber-uns.php" => [

        "title" => "Über uns"

    ],

    "./zugkoenig.php" => [

        "title" => "Zugkönig"

    ],

    "./termine.php" => [

        "title" => "Termine"

    ]

];

$currentPage = basename(

    $_SERVER["PHP_SELF"]

);

?>

<header
    class="header"
    data-header="root">

    <div class="header-inner">

        <a
            class="header-logo"
            data-header="logo"
            href="./index.php"
            aria-label="Zur Startseite">

            <img
                src="../images/logo.png"
                alt="Echte Fründe '22">

        </a>

        <nav
            class="header-navigation"
            data-header="navigation"
            aria-label="Hauptnavigation"
            aria-hidden="false">

            <ul>

                <?php foreach (

                    $navigation as $href => $item

                ): ?>

                    <li>

                        <a
                            href="<?= htmlspecialchars($href) ?>"
                            class="<?= basename($href) === $currentPage ? "active" : "" ?>">

                            <?= htmlspecialchars($item["title"]) ?>

                        </a>

                    </li>

                <?php endforeach; ?>

            </ul>

        </nav>

        <button
            class="header-burger"
            data-header="burger"
            type="button"
            aria-label="Navigation öffnen"
            aria-expanded="false">

            <span></span>

            <span></span>

            <span></span>

        </button>

    </div>

    <div
        class="header-overlay"
        data-header="overlay">

    </div>

</header>