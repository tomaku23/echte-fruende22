=====================================================
AKTUALISIERUNG
EF22 DESIGN GUIDE
Meilenstein 1
=====================================================

——————————————————
GLOBALER AUFBAU
——————————————————

Jede Seite besteht aus denselben globalen Bereichen.

Header

Hero

Main

Footer

Navigation Indicator

Dadurch besitzen alle Seiten dieselbe Grundstruktur.

——————————————————
HEADER
——————————————————

Der Header ist auf jeder Seite identisch.

Verhalten

Großer Header beim Seitenstart.

Kompakter Header beim Scrollen.

Logo bleibt auf jeder Seite identisch.

——————————————————
HERO
——————————————————

Der Hero beginnt direkt unter dem Header.

Er füllt den sichtbaren Bereich des Displays.

Jede Seite besitzt einen Hero.

Der Inhalt des Heroes kann je nach Seite unterschiedlich sein.

Beispiele

Startseite
Repräsentatives Bild

Termine
Nächster Termin

Über uns
noch offen

Zugkönig
Jährlich individuell

——————————————————
FOOTER
——————————————————

Der Footer ist auf jeder Seite identisch.

Aufbau

Trennlinie

Datenschutz · Impressum

© Echte Fründe ‚22

——————————————————
NAVIGATION INDICATOR
——————————————————

Der Navigation Indicator ist eine globale Framework-Komponente.

Position

Mittig am unteren Bildschirmrand.

Darstellung

Dunkler Kreis.

Weißer Pfeil.

Dezenter Schatten.

Verhalten

Hero

Pfeil zeigt nach unten.

Langsame Float-Animation.

Scrollbereich

Pfeil wird kleiner.

Animation endet.

Footer Zone

Pfeil dreht sich einmal nach oben.

Bleibt anschließend nach oben gerichtet.

Klick

Hero

Scrollt zum Hauptinhalt.

Footer Zone

Scrollt sanft zum Seitenanfang.

Der Navigation Indicator ersetzt dauerhaft

- Hero Scroll Indicator
- Scroll-To-Top Button

——————————————————
ANIMATIONEN
——————————————————

Animationen dienen ausschließlich der Orientierung.

Sie dürfen niemals vom Inhalt ablenken.

Animationen werden nach ihrer Bewegung benannt.

Beispiele

navigationIndicatorFloat

fadeIn

slideUp

rotate180

Nicht nach ihrer Verwendung.

——————————————————
DESIGNPRINZIPIEN
——————————————————

Das Design folgt folgenden Grundsätzen.

Ruhe vor Effekten.

Konsistenz vor Individualität.

Orientierung vor Animation.

Wiederverwendbarkeit vor Einzellösungen.

Jede Komponente soll sich auf jeder Seite gleich verhalten.

=====================================================
HEADER
=====================================================

STATUS

✓ Final

—

Der Header besitzt zwei feste Zustände.

=====================================================
HERO MODE
=====================================================

Wird beim Seitenaufruf angezeigt.

Eigenschaften

• großes Logo
• horizontale Navigation
• kein Burger-Menü
• transparenter Hintergrund
• Header dient als Teil des Hero-Bereichs

Der Hero Mode soll den ersten Eindruck der Website
prägen und die Markenidentität von Echte Fründe ‚22
transportieren.

=====================================================
NAVIGATION MODE
=====================================================

Der Navigation Mode wird mit der ersten
Scrollbewegung aktiviert.

Eigenschaften

• kompakte Höhe
• kleines Logo links
• Burger-Menü rechts
• horizontale Navigation ausgeblendet
• dunkler Hintergrund zur besseren Lesbarkeit

Der Navigation Mode bleibt aktiv,
bis wieder der Seitenanfang erreicht wird.

=====================================================
BURGER-MENÜ
=====================================================

Das Burger-Menü steht ausschließlich
im Navigation Mode zur Verfügung.

Beim Öffnen

• Burger wird zum Schließen-Symbol
• Navigation öffnet sich unterhalb des Headers
• Navigation wird rechtsbündig dargestellt
• Logo bleibt jederzeit sichtbar
• Logo wird niemals überdeckt

Die Navigation schließt automatisch

• beim Scrollen
• nach Auswahl eines Menüpunktes

=====================================================
LOGO
=====================================================

Das Logo ist auf jeder Seite sichtbar.

Ein Klick auf das Logo öffnet immer

index.php

=====================================================
ABSTÄNDE
=====================================================

Der Seiteninhalt beginnt grundsätzlich
unterhalb des Headers.

Kein Seiteninhalt darf vom Header
überdeckt werden.

Die notwendigen Abstände werden
zentral durch das Framework definiert.

=====================================================
ANIMATIONEN
=====================================================

Animationen sind ruhig und zurückhaltend.

Beim Wechsel zwischen Hero Mode
und Navigation Mode werden ausschließlich

• Headerhöhe
• Logo
• Navigation
• Burger

animiert.

Unnötige oder dekorative Animationen
werden vermieden.

=====================================================
DESIGNSPRACHE
=====================================================

Der Header folgt der EF22 Designsprache.

Merkmale

• dunkle Farbgebung
• großzügige Freiräume
• reduzierte Gestaltung
• klare Typografie
• dezente grüne Akzente
• hochwertige Animationen

Inspiration

Moderne Produkt- und Markenwebsites
(z. B. Cupra)

=====================================================
NAVIGATION
=====================================================

...

Hover

Beim Überfahren eines Menüpunktes
färbt sich der Text nicht sofort.

Die grüne Akzentfarbe läuft
gleichmäßig von links nach rechts
über den gesamten Schriftzug.

Die Animation wirkt ruhig,
hochwertig und flüssig.

Eine klassische Farbänderung
ohne Animation wird nicht verwendet.

=====================================================
DESIGNPHILOSOPHIE
=====================================================

Ein konsistentes Design entsteht nicht durch möglichst
viele Gestaltungselemente, sondern durch wenige,
bewusst eingesetzte Entscheidungen.

Die Aufmerksamkeit des Nutzers entsteht im EF22
Framework nicht durch kräftige Farben oder Effekte,
sondern durch klare Typografie, großzügige Abstände
und eine eindeutige Informationshierarchie.

Farben dienen ausschließlich der Orientierung und
unterstützen die Struktur der Benutzeroberfläche.
Jede Farbe besitzt eine klare Bedeutung und wird
gezielt eingesetzt.

Grün   → Kategorie, Interaktion und Hervorhebung
Weiß   → Hauptinformation
Grau   → Zusatzinformation

Weniger Gestaltung erzeugt mehr Wirkung.