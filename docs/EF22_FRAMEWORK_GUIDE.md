# EF22 Framework Guide

Version 4.0

—

# Ziel

Das EF22 Framework definiert den technischen Standard
für alle Seiten der Website.

Jede HTML-, CSS-, JavaScript- und PHP-Datei orientiert
sich an diesem Dokument.

Das Ziel ist eine wartbare, einheitliche und moderne
Projektstruktur.

—

# Projektphilosophie

Wir programmieren nicht zuerst.

Wir modellieren zuerst.

Jede Funktion beantwortet mindestens eine dieser Fragen:

• Spart sie Zeit?
• Verbessert sie die Qualität?
• Erhöht sie die Benutzerfreundlichkeit?
• Vereinfacht sie die Wartung?

Wenn keine dieser Fragen mit „Ja“ beantwortet werden kann,
wird die Funktion nicht umgesetzt.

—

# Referenzdateien

HTML
calendar.html

CSS
framework.css
components.css
calendar.css

JavaScript
calendar.js

PHP
calendar.php

Diese Dateien gelten als Referenz für alle weiteren Seiten.

—

# HTML Standard

Jede Seite besitzt folgenden Aufbau:

DOCTYPE

Dateikopf

HTML

HEAD

META

TITLE

FONTS

LIBRARIES

CSS

BODY

HEADER

HERO

MAIN

FOOTER

JAVASCRIPT

—

# Kommentarstil

Alle Dateien verwenden denselben Kommentarstil.

HTML

<!— ==========================================
     HEADER
========================================== —>

CSS

/* ==========================================
   HEADER
========================================== */

JavaScript

/* ==========================================
   INITIALISIERUNG
========================================== */

PHP

/* ==========================================
   KONFIGURATION
========================================== */

—

# Komponenten

Das Framework besteht aus wiederverwendbaren Komponenten.

Header

Hero

Navigation

Section

Card

Button

Badge

Modal

Footer

Scroll To Top

Timeline

Gallery

Highlight

—

# CSS

framework.css

Globale Regeln

Farben

Container

Abstände

Typografie

Grid

Animationen

Responsive

components.css

Alle wiederverwendbaren Komponenten

calendar.css

Nur kalenderbezogene Komponenten

—

# JavaScript

Jedes Modul besitzt denselben Aufbau.

Konfiguration

Status

DOM

Initialisierung

Events

Render

Hilfsfunktionen

Destroy

Public API

—

# PHP

Jede Datei besitzt denselben Aufbau.

Konfiguration

Hilfsfunktionen

Daten laden

Daten aufbereiten

Ausgabe

—

# Farben

(kommt später)

—

# Icons

Grundsätzlich Font Awesome.

Emojis nur, wenn sie bewusst als Gestaltungselement
eingesetzt werden.

—

# Animationen

Animationen sollen ruhig wirken.

Keine Animation darf vom Inhalt ablenken.

—

# Responsives Design

Mobile First.

Desktop erweitert lediglich den verfügbaren Platz.

—

# Namenskonventionen

IDs

camelCase

calendarHero

modalTitle

heroBadge

Klassen

kebab-case

hero-content

calendar-card

modal-overlay

JavaScript

camelCase

PHP

camelCase

CSS-Dateien

kebab-case

HTML-Dateien

kebab-case

—

# Projektgrundsatz

Code muss nicht möglichst kurz sein.

Code muss möglichst verständlich sein.

Lesbarkeit ist wichtiger als Kürze.

—

# Entwicklungsworkflow

## Grundsatz

Wir entwickeln nicht spontan.

Wir entwickeln nach einem definierten Workflow.

Jede Änderung folgt demselben Ablauf.

Dadurch bleiben Architektur, Design und Code dauerhaft
einheitlich und wartbar.

—

# Projektphilosophie

Wir programmieren nicht zuerst.

Wir modellieren zuerst.

Wir überlegen zuerst, wie etwas funktionieren soll.

Erst danach wird die technische Umsetzung entwickelt.

—

# Architektur vor Design

Die technische Architektur besitzt immer Priorität.

Reihenfolge

1. Architektur
2. Komponenten
3. Funktion
4. Design
5. Optimierung

Das Design kann jederzeit verändert werden.

Die Architektur soll möglichst dauerhaft bestehen bleiben.

—

# Referenzdateien

Für jede Programmiersprache existiert mindestens eine Referenzdatei.

Neue Dateien orientieren sich ausschließlich an diesen Referenzen.

Die aktuelle HTML-Referenz ist

calendar.html

Weitere Referenzdateien

calendar.css

calendar.js

calendar.php

—

# Arbeitsmodi

## Neuaufbau

Beim Neuaufbau einer Datei wird grundsätzlich die komplette
Datei neu erstellt.

Es werden keine Teilbereiche übernommen.

Die vorhandene Datei wird vollständig ersetzt.

—

## Wartung

Bei Änderungen an bestehenden Dateien werden ausschließlich
vollständige Blöcke ersetzt.

Es werden niemals einzelne Zeilen geändert.

Dadurch wird verhindert, dass alter Code versehentlich
erhalten bleibt.

—

# Entwicklungsschritte

Neue Funktionen entstehen immer in derselben Reihenfolge.

1. Idee

2. Ablauf definieren

3. Komponenten festlegen

4. Framework Guide prüfen

5. Komponentenplan prüfen

6. Design (optional)

7. Entwicklung

8. Test

9. Dokumentation

—

# Dokumentation

Die Dokumentation besitzt denselben Stellenwert wie der Code.

Änderungen an Architektur oder Komponenten werden zuerst
dokumentiert.

Anschließend wird der Code angepasst.

—

# Komponenten

Es werden keine Seiten entwickelt.

Es werden Komponenten entwickelt.

Seiten bestehen ausschließlich aus Komponenten.

Framework-Komponenten dürfen auf jeder Seite verwendet werden.

Seitenkomponenten gehören ausschließlich zu einer einzelnen Seite.

—

# Design

Design wird bewusst von der Architektur getrennt.

Während der Entwicklung darf sich das Design jederzeit ändern.

Erst wenn eine Komponente als fertig betrachtet wird,
wird sie im Design Guide dokumentiert.

—

# Design Freeze

Eine Komponente wird erst in den Design Guide übernommen,
wenn

• wir beide mit dem Design zufrieden sind

• sie responsive getestet wurde

• aktuell keine weiteren Änderungen geplant sind

Vorher gilt die Komponente als

Design in Entwicklung

—

# Framework Guide

Der Framework Guide beschreibt

• Arbeitsweise

• Architektur

• Standards

• Regeln

Er verändert sich nur selten.

—

# Komponentenplan

Der Komponentenplan beschreibt

• vorhandene Komponenten

• Verantwortlichkeiten

• Struktur

Neue Komponenten werden zuerst hier aufgenommen.

—

# Design Guide

Der Design Guide dokumentiert ausschließlich
fertige Designs.

Während der Entwicklung wird dieses Dokument
bewusst nicht gepflegt.

—

# Codequalität

Lesbarkeit besitzt Vorrang vor Kürze.

Verständlicher Code ist wichtiger als möglichst
kompakter Code.

—

# Tests

Nach jedem abgeschlossenen Entwicklungsschritt
wird getestet.

Erst danach beginnt der nächste Schritt.

—

# Versionierung

Große Architekturänderungen erhöhen die Hauptversion.

Beispiel

4.0

4.1

4.2

5.0

Kleine Änderungen verändern ausschließlich
die Nebenversion.

—

# Entscheidungen

Architekturentscheidungen werden bewusst getroffen.

Sie werden nicht spontan während der Entwicklung geändert.

—

# EF22 Grundsatz

Qualität vor Geschwindigkeit.

Ein sauber entwickeltes Fundament spart später
mehr Zeit als eine schnelle Umsetzung.

—

# Unser gemeinsamer Leitsatz

Wir entwickeln keine Webseiten.

Wir entwickeln ein Framework,
auf dessen Grundlage Webseiten entstehen.

# Entscheidungen

Vor jeder größeren Entwicklung wird geprüft,
ob eine bestehende Komponente erweitert werden kann.

Neue Komponenten werden nur entwickelt,
wenn vorhandene Komponenten die Aufgabe
nicht sinnvoll erfüllen können.

# Definition of Done

Eine Datei gilt erst dann als abgeschlossen, wenn alle folgenden Kriterien erfüllt sind.

## Architektur

- Entspricht dem EF22 Framework Guide.
- Entspricht dem EF22 Komponentenplan.
- Verwendet ausschließlich definierte Komponenten.
- Besitzt eine saubere und nachvollziehbare Struktur.

—

## Codequalität

- Der gesamte Code wurde überprüft.
- Kommentare entsprechen dem Projektstandard.
- Namenskonventionen wurden eingehalten.
- Der Code ist verständlich und wartbar.
- Lesbarkeit besitzt Vorrang vor Kürze.

—

## Funktion

- Alle Funktionen arbeiten fehlerfrei.
- Es existieren keine bekannten Fehler.
- Browserkonsole und Web Inspector sind fehlerfrei.

—

## Design

- Das Design entspricht dem aktuellen Projektstand.
- Responsive Darstellung wurde geprüft.
- Die Benutzerführung ist nachvollziehbar.

—

## Test

Nach Fertigstellung erfolgt ein vollständiger Browsertest.

Gefundene Fehler werden unmittelbar behoben.

Anschließend erfolgt ein erneuter vollständiger Test.


# Browsertest

Nach jedem vollständigen Neuaufbau einer Datei
erfolgt ein Browsertest.

Der Browsertest ist Bestandteil der
Definition of Done.

—

# Allgemein

☐ Seite lädt ohne Fehler

☐ Keine PHP-Fehler

☐ Keine JavaScript-Fehler

☐ Browserkonsole fehlerfrei

☐ Web Inspector fehlerfrei

—

# Header

☐ Header wird korrekt angezeigt

☐ Header schrumpft beim Scrollen

☐ Header vergrößert sich wieder

☐ Logo funktioniert

☐ Navigation funktioniert

☐ Aktive Seite wird markiert

☐ Burger-Menü funktioniert

☐ Navigation schließt wieder

—

# Hero

☐ Hero wird vollständig dargestellt

☐ Hintergrundbild wird korrekt geladen

☐ Hintergrundbild skaliert richtig

☐ Overlay stimmt

☐ Hero Badge stimmt

☐ Titel wird geladen

☐ Datum wird geladen

☐ Uhrzeit wird geladen

☐ Ort wird geladen

☐ Countdown funktioniert

☐ Hinweis wird angezeigt

☐ Hero öffnet Modal

—

# Kalender

☐ Kalender lädt

☐ Termine werden angezeigt

☐ Farben stimmen

☐ Monatswechsel funktioniert

☐ Termin anklickbar

—

# Highlights

☐ Highlight Cards werden geladen

☐ Bilder stimmen

☐ Typen stimmen

☐ Highlight öffnet Modal

—

# Modal

☐ Öffnet

☐ Schließt

☐ Titel stimmt

☐ Badge stimmt

☐ Datum stimmt

☐ Uhrzeit stimmt

☐ Ort stimmt

☐ Beschreibung stimmt

☐ Dresscode stimmt

☐ Treffpunkt stimmt

☐ Ansprechpartner stimmt

☐ Maps funktioniert

☐ Tickets funktioniert

☐ Scroll funktioniert

—

# Footer

☐ Copyright stimmt

☐ Datenschutz vorhanden

☐ Impressum vorhanden

☐ Alle Links funktionieren

—

# Scroll To Top

☐ Button erscheint

☐ Button funktioniert

—

# Responsive

☐ iPhone

☐ iPad

☐ Desktop

☐ Safari

☐ Chrome

—

# Animationen

☐ Fade-In

☐ Hero

☐ Modal

☐ Scroll

—

# Abschluss

☐ Keine bekannten Fehler

☐ Design entspricht dem Projektstand

☐ Architektur entspricht dem Framework Guide

☐ Datei kann veröffentlicht werden
—

## Abschluss

Eine Datei gilt erst dann als abgeschlossen, wenn

- alle Tests erfolgreich waren,
- keine offenen Fehler mehr vorhanden sind,
- wir beide mit dem Ergebnis zufrieden sind.

Erst danach erhält die Datei den Status



**Veröffentlichungsbereit**

Migration von Komponenten

Beim Auslagern einer Komponente wird zunächst eine identische Kopie in einer neuen Datei erstellt. Anschließend wird die neue Datei eingebunden und getestet. Erst nach erfolgreichem Browsertest wird der ursprüngliche Code entfernt und erneut getestet. Erst danach gilt die Migration als abgeschlossen.

=====================================================
AKTUALISIERUNG
FRAMEWORK GUIDE
Meilenstein 1
=====================================================

## Komponenten

Framework-Komponenten und Seitenkomponenten werden strikt getrennt.

Framework-Komponenten können auf jeder Seite verwendet werden.

Seitenkomponenten gehören ausschließlich zu einer bestimmten Seite.

Neue Komponenten werden grundsätzlich zuerst als Framework-Komponente geprüft.

——————————————————

## Framework-Komponenten

Framework-Komponenten bilden den globalen Rahmen der Website.

Beispiele:

- Header
- Hero
- Footer
- Navigation Indicator

Framework-Komponenten werden in eigenen HTML-, CSS- und JS-Dateien entwickelt.

——————————————————

## Framework-Services

Services besitzen keine eigene Oberfläche.

Sie stellen wiederverwendbare Funktionen für mehrere Komponenten bereit.

Beispiele:

- Scroll Service

Services dürfen keine UI steuern.

——————————————————

## Migration

Bestehende Komponenten werden nach folgendem Ablauf migriert:

1. Neue Datei erstellen.
2. Vorhandenen Code unverändert übernehmen.
3. Neue Datei einbinden.
4. Browsertest durchführen.
5. Ursprünglichen Code entfernen.
6. Erneuter Browsertest.
7. Code Review.
8. Komponente freigeben.

——————————————————

## Neuentwicklung

Neue Komponenten werden nach folgendem Ablauf entwickelt:

1. Architektur definieren.
2. Aufgabe definieren.
3. Verhalten definieren.
4. HTML erstellen.
5. CSS erstellen.
6. JavaScript erstellen.
7. Code Review.
8. Browsertest.
9. Optimierungen.
10. Freigabe.

——————————————————

## JavaScript

Alle JavaScript-Dateien folgen derselben Struktur.

Dateikopf

ELEMENTS

STATE

FUNCTIONS

EVENTS

INITIALIZATION

Die logische Struktur bleibt immer erhalten.

——————————————————

## Verantwortlichkeiten

Jede Funktion besitzt genau eine Verantwortung.

Eine Funktion

- verändert einen Zustand

oder

- reagiert auf ein Ereignis.

Niemals beides gleichzeitig.

——————————————————

## HTML

Die Reihenfolge der eingebundenen Dateien bildet die Architektur des Frameworks ab.

Framework-Dateien werden getrennt von Seiten-Dateien eingebunden.

——————————————————

## CSS

Eine Datei besitzt genau eine Verantwortung.

Framework-Komponenten erhalten eigene CSS-Dateien.

components.css dient nur als Sammeldatei, bis Komponenten ausgelagert werden.

——————————————————

## Browsertests

Jede neue oder migrierte Komponente erhält einen Browsertest.

Checklisten werden grundsätzlich als kopierbarer Codeblock erstellt.

Unter jedem Prüfschritt bleibt eine Leerzeile für Kommentare.

——————————————————

## Testergebnisse

Testergebnisse werden unterschieden in:

🟢 Bestanden

Die Spezifikation wurde erfüllt.

🟡 Optimierung

Die Spezifikation wurde erfüllt.
Das Ergebnis kann verbessert werden.

🔵 Neue Erkenntnis

Das tatsächliche Verhalten ist besser als die ursprüngliche Spezifikation.

Die Spezifikation wird angepasst.

🔴 Bug

Die Spezifikation wurde nicht erfüllt.

——————————————————

## Spezifikation

Nicht jede Abweichung ist automatisch ein Bug.

Während des Browsertests kann die Spezifikation angepasst werden, wenn das tatsächliche Verhalten die Benutzerführung verbessert.

——————————————————

## Definition of Done

Eine Komponente gilt als abgeschlossen, wenn

- Architektur definiert wurde.
- HTML fertig ist.
- CSS fertig ist.
- JavaScript fertig ist.
- Code Review bestanden wurde.
- Browsertest bestanden wurde.
- Dokumentation aktualisiert wurde.
- Komponentenplan aktualisiert wurde.
- 
 =====================================================
ÄNDERUNGEN
=====================================================

Bestehender Code wird niemals zeilenweise geändert.

Bei Reparaturen, Optimierungen oder Refactorings wird immer der vollständige Block unter einer Überschrift ersetzt.

Dadurch

- bleiben keine alten Zeilen zurück,
- Änderungen sind sofort nachvollziehbar,
- der Code bleibt konsistent,
- Copy & Paste Fehler werden minimiert.
- 
  =====================================================
EF22 ENTWICKLUNGSABLAUF
=====================================================

1. Datei in Working Copy öffnen.

2. Gewünschte Überschrift suchen.

3. Den kompletten Block unter der Überschrift ersetzen.

4. Weitere Blöcke ersetzen, bis alle Änderungen der Datei umgesetzt sind.

5. Die vollständige Datei an ChatGPT senden.

6. Gemeinsames Code Review.

7. Eventuelle Korrekturen erneut blockweise einarbeiten.

8. Datei auf den Server hochladen.

9. Browsertest durchführen.

10. Ergebnisse dokumentieren.

11. Erst danach beginnt die nächste Aufgabe


=====================================================
FRAMEWORK MARKER
=====================================================

Framework Marker besitzen keine sichtbare Darstellung.

Sie definieren logische Positionen innerhalb einer Seite.

Marker dürfen von Komponenten und Services verwendet werden.

Beispiele

Hero End

Navigation Indicator Park

Animation Trigger

Lazy Load Marker