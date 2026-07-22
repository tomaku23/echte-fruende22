<?php

declare(strict_types=1);

/*
=====================================================
EF22 FRAMEWORK
HERO
Version 1.0
=====================================================
*/

if (!function_exists("renderHero")) {

    function renderHero(array $config = []): void
    {

        $defaults = [

            "variant"     => "default",

            "badge"       => "",

            "title"       => "",

            "subtitle"    => "",

            "description" => "",

            "image"       => "",

            "buttonText"  => "",

            "buttonLink"  => "#"

        ];

        $hero = array_merge($defaults, $config);

?>

<section class="hero hero--<?= htmlspecialchars($hero["variant"]) ?>">

    <div
        class="hero-background"
        <?php if ($hero["image"] !== "") : ?>
            style="background-image:url('<?= htmlspecialchars($hero["image"]) ?>');"
        <?php endif; ?>>
    </div>

    <div class="hero-overlay"></div>

    <div class="container">

        <div class="hero-content">

            <?php if ($hero["badge"] !== "") : ?>

                <span class="hero-badge">

                    <?= htmlspecialchars($hero["badge"]) ?>

                </span>

            <?php endif; ?>

            <?php if ($hero["title"] !== "") : ?>

                <h1 class="hero-title">

                    <?= htmlspecialchars($hero["title"]) ?>

                </h1>

            <?php endif; ?>

            <?php if ($hero["subtitle"] !== "") : ?>

                <p class="hero-subtitle">

                    <?= htmlspecialchars($hero["subtitle"]) ?>

                </p>

            <?php endif; ?>

            <?php if ($hero["description"] !== "") : ?>

                <div class="hero-description">

                    <?= nl2br(htmlspecialchars($hero["description"])) ?>

                </div>

            <?php endif; ?>

            <?php if ($hero["buttonText"] !== "") : ?>

                <a
                    class="button hero-button"
                    href="<?= htmlspecialchars($hero["buttonLink"]) ?>">

                    <?= htmlspecialchars($hero["buttonText"]) ?>

                </a>

            <?php endif; ?>

        </div>

    </div>

</section>

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

                            <span id="heroTime"></span>

                        </div>

                        <div class="hero-item">

                            <span class="hero-icon">

                                📍

                            </span>

                            <span id="heroLocation"></span>

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


<?php

    }

}