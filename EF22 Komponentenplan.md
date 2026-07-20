# EF22 Komponentenplan

Version 4.0

—

# Ziel

Dieser Komponentenplan definiert alle wiederverwendbaren Bausteine
des EF22 Frameworks.

Framework-Komponenten dürfen auf jeder Seite verwendet werden.

Seitenkomponenten gehören ausschließlich zu einer bestimmten Seite.

Neue Komponenten werden grundsätzlich zuerst hier dokumentiert,
bevor sie in das Framework aufgenommen werden.

—

# Grundsatz

Framework-Komponenten kennen niemals eine einzelne Seite.

Eine Seite verwendet Komponenten.

Eine Komponente kennt keine Seite.

Beispiel

✔ hero hero—calendar

✘ calendar-hero

—

# Framework-Komponenten

## Header ⭐

Verantwortlich für:

- Logo
- Navigation
- Burger-Menü
- Kapitelanzeige
- Scroll-Verhalten
- Kompaktmodus

Dateien

header.css

header.js

—

## Hero ⭐

Standardaufbau

Hero

↓

Background

↓

Overlay

↓

Container

↓

Content

Varianten

hero

hero—home

hero—calendar

hero—about

hero—king

—

## Section ⭐

Standardaufbau

section

↓

container

↓

section-header

↓

section-content

—

## Section Header ⭐

Besteht aus

- Kicker
- Überschrift
- Beschreibung

—

## Card ⭐

Grundkomponente.

Varianten

card

calendar-card

story-card

member-card

gallery-card

—

## Badge ⭐

Grundkomponente.

Varianten

badge

hero-badge

modal-badge

card-badge

—

## Button ⭐

Varianten

btn

btn-outline

btn-icon

—

## Modal ⭐

Standardaufbau

Overlay

↓

Modal

↓

Header

↓

Content

↓

Footer

—

## Footer ⭐

Gemeinsamer Footer für alle Seiten.

—

## Scroll To Top ⭐

Globale Komponente.

—

## Animationen ⭐

Globale Animationen.

Werden ausschließlich zentral gepflegt.

—

# Seitenkomponenten

## Kalender

- FullCalendar
- Countdown
- Highlight Grid
- Highlight Card

—

## Über uns

- Story Block
- Polaroid
- Timeline (optional)

—

## Zugkönig

- Königskarte
- Orden
- Chronik
- Ehrentafel

—

## Startseite

- News
- Quick Links
- Feature Cards
- Highlights

—

# Namenskonventionen

## IDs

camelCase

Beispiele

calendarHero

heroBadge

modalTitle

scrollTop

—

## Klassen

kebab-case

Beispiele

hero-content

section-header

modal-overlay

calendar-card

story-card

—

## Varianten

BEM-ähnliche Schreibweise

hero

hero—calendar

hero—about

hero—king

—

# Komponentenstruktur

Jede Framework-Komponente besitzt

HTML

CSS

optional JavaScript

optional PHP

Eine Komponente darf niemals unnötige Abhängigkeiten besitzen.

—

# Erweiterungen

Neue Komponenten werden

1. hier dokumentiert

2. anschließend entwickelt

3. danach in den Framework Guide übernommen

—

# Grundsatz

Komponenten werden nicht für eine Seite entwickelt.

Seiten werden aus Komponenten zusammengesetzt.

=====================================================
AKTUALISIERUNG
EF22 KOMPONENTENPLAN
Meilenstein 1
=====================================================

## Status

🟢 Fertig
Komponente vollständig implementiert und freigegeben.

🟡 In Entwicklung
Komponente wird aktuell entwickelt.

⚪ Geplant
Komponente ist definiert, aber noch nicht begonnen.

——————————————————
FRAMEWORK-KOMPONENTEN
——————————————————

🟢 Header

Dateien

header.css
header.js

Aufgabe

Globaler Seitenkopf.

Enthält Logo, Navigation und Burger-Menü.

——————————————————

🟢 Hero

Dateien

hero.css

Aufgabe

Globaler Hero-Bereich.

Kann je nach Seite unterschiedliche Inhalte und Funktionen besitzen.

——————————————————

🟢 Footer

Dateien

footer.css

Aufgabe

Globaler Seitenabschluss.

Enthält Footer-Navigation und Copyright.

——————————————————

🟢 Navigation Indicator

Dateien

navigation-indicator.css
navigation-indicator.js

Aufgabe

Globale Orientierungshilfe.

Ersetzt

- Hero Scroll Indicator
- Scroll-To-Top Button

Zustände

Hero

Scroll

Footer

——————————————————
FRAMEWORK-SERVICES
——————————————————

🟡 Scroll Service

Dateien

scroll.js

Aufgabe

Stellt allgemeine Scrollfunktionen bereit.

Besitzt keine eigene Benutzeroberfläche.

Geplante Funktionen

scrollToElement()

scrollToTop()

getScrollPosition()

getDirection()

——————————————————
UI-KOMPONENTEN
——————————————————

🟡 Components

Datei

components.css

Status

Sammeldatei.

Wird schrittweise in eigenständige Komponenten zerlegt.

Geplante Komponenten

buttons.css

badges.css

cards.css

section-header.css

modal.css

——————————————————
SEITENKOMPONENTEN
——————————————————

Termine

calendar.css
calendar.js

Status

Referenzseite des Frameworks.

Neue Framework-Komponenten werden zuerst hier integriert und getestet.

——————————————————
REFERENZDATEI
——————————————————

🟢 termine.html

Status

Technische Referenzseite.

Alle neuen Framework-Komponenten werden zuerst auf dieser Seite entwickelt, integriert und getestet.

Erst nach erfolgreichem Browsertest werden sie auf die übrigen Seiten übernommen.