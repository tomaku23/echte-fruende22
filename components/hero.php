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

<?php

    }

}