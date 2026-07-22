<?php

declare(strict_types=1);

/*
=====================================================
EF22 FRAMEWORK
COMPONENT
HERO
Version 3.0
=====================================================
*/

$defaults = [

    "background" => "",

    "badge" => "",

    "title" => "",

    "subtitle" => "",

    "description" => "",

    "date" => "",

    "time" => "",

    "location" => "",

    "countdown" => "",

    "hint" => "",

    "button" => [

        "text" => "",

        "link" => "#"

    ]

];

$hero = array_replace_recursive(

    $defaults,

    $hero ?? []

);

?>

<section
    id="hero"
    class="hero">

    <div
        class="hero-background"
        data-hero="background">

    </div>

    <div class="hero-overlay">

        <div class="container">

            <div class="hero-content">

                <span
                    class="hero-badge"
                    data-hero="badge">

                    <?= htmlspecialchars($hero["badge"]) ?>

                </span>

                <h1
                    class="hero-title"
                    data-hero="title">

                    <?= htmlspecialchars($hero["title"]) ?>

                </h1>

                <p
                    class="hero-subtitle"
                    data-hero="subtitle">

                    <?= htmlspecialchars($hero["subtitle"]) ?>

                </p>

                <div
                    class="hero-description"
                    data-hero="description">

                    <?= nl2br(htmlspecialchars($hero["description"])) ?>

                </div>

                <div
                    class="hero-info"
                    data-hero="info">

                    <div class="hero-item">

                        <span class="hero-icon">

                            📅

                        </span>

                        <span
                            data-hero="date">

                            <?= htmlspecialchars($hero["date"]) ?>

                        </span>

                    </div>

                    <div class="hero-item">

                        <span class="hero-icon">

                            🕒

                        </span>

                        <span
                            data-hero="time">

                            <?= htmlspecialchars($hero["time"]) ?>

                        </span>

                    </div>

                    <div class="hero-item">

                        <span class="hero-icon">

                            📍

                        </span>

                        <span
                            data-hero="location">

                            <?= htmlspecialchars($hero["location"]) ?>

                        </span>

                    </div>

                </div>

                <div
                    class="hero-countdown"
                    data-hero="countdown">

                    <?= htmlspecialchars($hero["countdown"]) ?>

                </div>

                <div
                    class="hero-hint"
                    data-hero="hint">

                    <?= htmlspecialchars($hero["hint"]) ?>

                </div>

                <a
                    class="button hero-button"
                    data-hero="button"
                    href="<?= htmlspecialchars($hero["button"]["link"]) ?>">

                    <?= htmlspecialchars($hero["button"]["text"]) ?>

                </a>

            </div>

        </div>

    </div>

</section>