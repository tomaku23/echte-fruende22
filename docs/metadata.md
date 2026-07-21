=====================================================
 ECHTE FRÜNDE ‚22
 METADATA
 Version 1.0
=====================================================

Die folgenden Metadaten können am Ende der
Beschreibung eines Google-Kalender-Termins
eingetragen werden.

Alle Zeilen, die mit „@„ beginnen, werden
nicht auf der Website angezeigt, sondern
von der calendar.php ausgewertet.

=====================================================
 GRUNDREGEL
=====================================================

Beschreibungstext

@metadata=wert

@metadata=wert

@metadata=wert

=====================================================
 VERFÜGBARE METADATEN
=====================================================

@type=
-————————————

Legt den Typ des Termins fest.

Mögliche Werte:

intern
versammlung
schuetzenfest
ausflug
oeffentlich
extern
sonstiges

Beispiel:

@type=intern

=====================================================

@highlight=
-————————————

Legt fest, ob der Termin zusätzlich
unter „Highlights“ angezeigt wird.

Mögliche Werte:

true
false

Standard:

false

Beispiel:

@highlight=true

=====================================================

@hero=
-————————————

Legt fest, ob der Termin im Hero
erscheinen darf.

Mögliche Werte:

true
false

Standard:

true

Beispiel:

@hero=false

=====================================================

@image=
-————————————

Bild für Hero und Highlights.

Unterstützt:

relative Pfade

oder

vollständige URLs

Beispiele:

@image=images/events/zugkoenig.webp

oder

@image=https://www.echtefruende22.de/images/events/zugkoenig.webp

=====================================================

@dresscode=
-————————————

Dresscode des Termins.

Beispiel:

@dresscode=Große Uniform

=====================================================

@meeting=
-————————————

Treffpunkt.

Beispiel:

@meeting=Marktplatz Dormagen

=====================================================

@contact=
-————————————

Ansprechpartner.

Beispiel:

@contact=Thomas Kühl

=====================================================

@ticket=
-————————————

Link zum Ticketverkauf.

Beispiel:

@ticket=https://…

=====================================================
 KOMPLETTES BEISPIEL
=====================================================

Treffen um 13:30 Uhr am Schützenhaus.

Bitte große Uniform tragen.

Nach dem Schießen gemeinsames Essen.

@type=intern
@highlight=true
@hero=true
@image=https://www.echtefruende22.de/images/events/zugkoenig2026.webp
@dresscode=Große Uniform
@meeting=Schützenhaus Dormagen
@contact=Thomas Kühl

=====================================================
 HINWEIS
=====================================================

Die Metadaten werden ausschließlich von
der Website ausgewertet.

Im Google Kalender bleiben sie Teil der
Beschreibung, werden auf der Website
jedoch automatisch entfernt.

=====================================================
 ERWEITERBARKEIT
=====================================================

Das Metadatensystem ist bewusst offen
gestaltet.

Neue Metadaten können jederzeit ergänzt
werden, ohne bestehende Termine ändern
zu müssen.

Nicht erkannte Metadaten werden von der
Website ignoriert.

=====================================================
 NAMENSREGELN
=====================================================

• Metadaten beginnen immer mit „@„

• Schlüssel werden ausschließlich
  klein geschrieben.

• Leerzeichen im Schlüssel sind
  nicht erlaubt.

• Werte dürfen Leerzeichen enthalten.

Beispiel:

@meeting=Schützenhaus Dormagen