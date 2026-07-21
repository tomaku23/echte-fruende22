=====================================================
EF22 FRAMEWORK
ARCHITEKTURREGELN
Version 1.0
=====================================================


1. FRAMEWORK VOR SEITEN

Das Framework stellt Funktionen bereit.

Seiten verwenden ausschließlich diese Funktionen.

Nie umgekehrt.


——————————————————


2. SEITEN ENTHALTEN MÖGLICHST WENIG LOGIK

Eine Seite soll hauptsächlich:

- Komponenten laden
- Daten bereitstellen

Keine Framework-Funktionen implementieren.


——————————————————


3. KOMPONENTEN SIND WIEDERVERWENDBAR

Komponenten kennen niemals eine Seite.

Beispiel:

❌ calendar.js kennt termine.php

✅ calendar.js arbeitet ausschließlich mit EF22.modal


——————————————————


4. FRAMEWORK KENNT KEINE INHALTE

Framework-Komponenten kennen keine Begriffe wie:

- Termine
- News
- Galerie
- Vorstand

Sie kennen ausschließlich Strukturen.


——————————————————


5. EINE AUFGABE – EINE KOMPONENTE

Jede Datei besitzt genau eine Aufgabe.

Beispiele:

modal.js
→ Öffnen und Schließen von Modalen

icons.js
→ Verwaltung aller Icons

config.js
→ Projektweite Konfiguration


——————————————————


6. KEINE DOPPELTEN ZUSTÄNDIGKEITEN

Jede Funktion existiert genau einmal.

Beispiele:

Icons
→ icons.js

Modal
→ modal.js

Konfiguration
→ config.js


——————————————————


7. EINHEITLICHER DATEIKOPF

Jede Datei beginnt mit:

/*
=====================================================
 ECHTE FRÜNDE ‚22
 DATEINAME
 Version x.x
=====================================================
*/


——————————————————


8. DATEIEN SIND STRUKTURIERT

Jede Datei ist in logisch getrennte Abschnitte gegliedert.

Beispiele:

INITIALISIERUNG

EVENTS

METHODEN

HILFSFUNKTIONEN

Keine langen Dateien ohne Struktur.


——————————————————


9. EINHEITLICHE BENENNUNG

IDs:

modalTitle
modalContent
modalMeta

CSS:

modal-content
modal-meta
modal-action

JavaScript:

open()

close()

setData()


——————————————————


10. KEINE MAGIC NUMBERS

Feste Werte gehören nicht in den Code.

Beispiele:

250

768

16

Diese Werte werden zentral in config.js verwaltet.


——————————————————


11. ÄNDERUNGEN BEGINNEN IM FRAMEWORK

Neue Funktion?

↓

Framework erweitern.

↓

Komponenten anpassen.

↓

Seiten verwenden die neue Funktion.


——————————————————


12. RÜCKWÄRTSKOMPATIBILITÄT

Änderungen am Framework sollen bestehende Komponenten
möglichst nicht beeinträchtigen.

API-Änderungen erfolgen bewusst und nachvollziehbar.


——————————————————


13. AUSWIRKUNGEN PRÜFEN

Vor jeder Änderung an bestehendem Code wird geprüft:

Welche Komponenten nutzen diese Funktion?

Welche Seiten sind betroffen?

Welche Abhängigkeiten entstehen?


——————————————————


14. FRAMEWORK VOR KOMPONENTEN VOR SEITEN

Ladereihenfolge:

Framework

↓

Framework-Komponenten

↓

Seiten-Komponenten

↓

Seitenspezifische Logik

Diese Reihenfolge ist verbindlich.


——————————————————


15. GEMEINSAMER STANDARD

Neue Dateien, Komponenten und Erweiterungen orientieren
sich immer an diesen Architekturregeln.

Bestehender Code wird bei Überarbeitungen schrittweise
an diesen Standard angepasst.

=====================================================