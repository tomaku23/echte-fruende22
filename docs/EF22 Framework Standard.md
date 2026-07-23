╔══════════════════════════════════════════════════════════════╗
║                  EF22 FRAMEWORK STANDARD                    ║
║                       Version 1.0                           ║
╚══════════════════════════════════════════════════════════════╝


──────────────────────────────────────────────────────────────
1. ZIEL
──────────────────────────────────────────────────────────────

• Komponentenbasiertes Frontend-Framework
• Klare Verantwortlichkeiten
• Hohe Wartbarkeit
• Erweiterbar ohne bestehende Komponenten anzupassen


──────────────────────────────────────────────────────────────
2. SINGLE RESPONSIBILITY
──────────────────────────────────────────────────────────────

Jede Datei besitzt genau eine Verantwortung.

✔ app.js        → Komponenten starten
✔ config.js     → Konfiguration
✔ dom.js        → DOM-Verwaltung
✔ calendar.js   → Eventverwaltung
✔ hero.js       → Hero darstellen
✔ modal.js      → Modal darstellen
✔ header.js     → Navigation

✘ Keine Mischformen.


──────────────────────────────────────────────────────────────
3. KOMPONENTENAUFBAU
──────────────────────────────────────────────────────────────

Standardreihenfolge:

state
elements
handlers (optional)

init()
refresh()
destroy()

private Methoden

Nicht benötigte Bereiche dürfen entfallen.


──────────────────────────────────────────────────────────────
4. STATE
──────────────────────────────────────────────────────────────

Enthält ausschließlich Laufzeitdaten.

✔ event
✔ loading
✔ calendar
✔ selectedItem

Nicht enthalten:

✘ DOM-Elemente
✘ Konfiguration
✘ Konstanten


──────────────────────────────────────────────────────────────
5. ELEMENTS
──────────────────────────────────────────────────────────────

Alle DOM-Referenzen werden zentral gespeichert.

DOM-Abfragen erfolgen ausschließlich in init().


──────────────────────────────────────────────────────────────
6. DOM
──────────────────────────────────────────────────────────────

Neue Komponenten verwenden grundsätzlich:

EF22.dom.register()

Direkte DOM-Abfragen nur wenn technisch notwendig.


──────────────────────────────────────────────────────────────
7. EVENT-HANDLER
──────────────────────────────────────────────────────────────

Keine anonymen Listener.

Stattdessen:

handlers

↓

createHandlers()

↓

registerEvents()

↓

destroy()


Alle Listener müssen wieder entfernt werden können.


──────────────────────────────────────────────────────────────
8. LIFECYCLE
──────────────────────────────────────────────────────────────

init()
→ Initialisierung

refresh()
→ UI aktualisieren

destroy()
→ Listener entfernen
→ State bereinigen
→ Instanzen zerstören


──────────────────────────────────────────────────────────────
9. VERANTWORTLICHKEITEN
──────────────────────────────────────────────────────────────

Komponenten kennen ausschließlich ihre Aufgabe.

Hero:

✔ Bild
✔ Titel
✔ Countdown

Nicht:

✘ API
✘ Kalender
✘ Eventauswahl


──────────────────────────────────────────────────────────────
10. KOMPONENTENKOMMUNIKATION
──────────────────────────────────────────────────────────────

Kommunikation ausschließlich über öffentliche Methoden.

✔ hero.refresh(event)

Nicht:

✘ hero.elements.title.textContent = ...


──────────────────────────────────────────────────────────────
11. RENDERING
──────────────────────────────────────────────────────────────

Große Komponenten werden aufgeteilt.

render()

↓

renderHeader()

↓

renderMeta()

↓

renderContent()

↓

renderActions()


Keine riesigen Renderfunktionen.


──────────────────────────────────────────────────────────────
12. HILFSMETHODEN
──────────────────────────────────────────────────────────────

Wiederkehrende UI-Aufgaben kapseln.

Beispiele:

✔ setText()
✔ toggle()
✔ clear()
✔ setBackground()


──────────────────────────────────────────────────────────────
13. UTILITIES
──────────────────────────────────────────────────────────────

Utilities enthalten ausschließlich allgemeine Funktionen.

✔ formatDate()
✔ formatTime()
✔ escapeHtml()

Nicht:

✘ Modal-Logik
✘ Hero-Logik
✘ Badge-Rendering


──────────────────────────────────────────────────────────────
14. CONFIG
──────────────────────────────────────────────────────────────

Alle Konfigurationswerte gehören nach config.js.

Beispiele:

✔ locale
✔ API
✔ Farben
✔ Animationen
✔ Fallbackbilder
✔ Debugmodus


──────────────────────────────────────────────────────────────
15. DEBUG
──────────────────────────────────────────────────────────────

Debug-Ausgaben ausschließlich über

EF22.config.debug

Im Produktivbetrieb keine Konsolenausgaben.


──────────────────────────────────────────────────────────────
16. FEHLERBEHANDLUNG
──────────────────────────────────────────────────────────────

Asynchrone Komponenten behandeln Fehler selbst.

Die App verhindert zusätzlich den Absturz des Frameworks.


──────────────────────────────────────────────────────────────
17. HTML
──────────────────────────────────────────────────────────────

Bevorzugt:

✔ textContent

Nur wenn notwendig:

✔ innerHTML

Bei HTML-Ausgabe:

• Inhalte escapen
• Keine ungeprüften Daten einsetzen


──────────────────────────────────────────────────────────────
18. CSS
──────────────────────────────────────────────────────────────

Jede Komponente besitzt ihre eigene CSS-Datei.

Keine gegenseitigen Abhängigkeiten.


──────────────────────────────────────────────────────────────
19. ARCHITEKTUR
──────────────────────────────────────────────────────────────

config
   │
   ▼
utilities
   │
   ▼
components
   │
   ▼
app

Abhängigkeiten verlaufen ausschließlich nach unten.


──────────────────────────────────────────────────────────────
20. ZIELARCHITEKTUR
──────────────────────────────────────────────────────────────

EF22

├── app.js
├── config.js
├── dom.js
├── utilities.js
├── icons.js
├── animations.js

components

├── header.js
├── hero.js
├── modal.js
├── highlights.js
├── calendar.js


Jede Komponente bleibt austauschbar.

──────────────────────────────────────────────
21. MOBILE FIRST
──────────────────────────────────────────────

Das EF22 Framework wird ausschließlich
für Smartphones entwickelt.

Desktop ist eine Erweiterung,
nicht die Referenz.

Jede neue Komponente wird zuerst
für ca. 390–430 px Breite entwickelt.

Erst danach wird geprüft,
ob sie auf Tablets oder Desktop
vernünftig dargestellt wird.

Es werden keine Desktop-Layouts
entwickelt und anschließend
für Mobilgeräte verkleinert.


══════════════════════════════════════════════════════════════
                     GOLDENE REGELN
══════════════════════════════════════════════════════════════

1. Eine Datei besitzt genau eine Verantwortung.

2. Komponenten verändern niemals intern andere Komponenten.

3. Kommunikation erfolgt ausschließlich über öffentliche
   Methoden.

4. DOM und Event-Handler werden zentral verwaltet.

5. Infrastruktur, Konfiguration und Darstellung bleiben
   strikt voneinander getrennt.

══════════════════════════════════════════════════════════════

