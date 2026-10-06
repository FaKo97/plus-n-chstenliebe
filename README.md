# +nächstenliebe – Das persönliche Budget

Kleine Informationswebsite rund um das persönliche Budget für Menschen mit
Behinderung. Reines HTML/CSS/JavaScript, ohne Build-Prozess, gehostet über GitHub Pages.

## Ordnerstruktur

```
├── index.html            Die komplette Seite (alle Abschnitte)
├── robots.txt            Sperrt Suchmaschinen aus
├── .nojekyll             Sagt GitHub Pages: Dateien unverändert ausliefern
├── README.md
├── assets/
│   ├── css/style.css     Design (Farben oben in :root)
│   ├── js/main.js        Navigation, Menü, Schriftgröße, Formular
│   └── img/              Platzhalterbilder (*.svg)
└── public/
    └── logo.jpeg         Logo
```

## Lokal ansehen

**Einfach:** `index.html` doppelklicken. Die Seite öffnet sich im Browser.

**Besser** (verhält sich genauso wie später online):
- In VS Code die Erweiterung **Live Server** installieren, dann Rechtsklick auf
  `index.html` → „Open with Live Server“.
- Oder im Terminal im Projektordner: `npx serve .` (braucht Node.js) und die
  angezeigte Adresse öffnen.

## Auf GitHub Pages veröffentlichen

1. Auf GitHub ein neues Repository anlegen, z. B. `plus-naechstenliebe`
   (keine Umlaute im Repo-Namen, die landen in der URL).
2. Alle Dateien dieses Ordners hochladen, entweder über „Add file → Upload files“
   im Browser oder per Git:
   ```bash
   git init
   git add .
   git commit -m "Erste Version"
   git branch -M main
   git remote add origin https://github.com/DEIN-NAME/plus-naechstenliebe.git
   git push -u origin main
   ```
3. Im Repository: **Settings → Pages → Build and deployment**
   → Source: „Deploy from a branch“, Branch: `main`, Ordner: `/ (root)` → **Save**.
4. Nach 1–2 Minuten ist die Seite erreichbar unter
   `https://DEIN-NAME.github.io/plus-naechstenliebe/`.

> **Hinweis zur Sichtbarkeit:** `robots.txt` und `<meta name="robots" content="noindex, nofollow">`
> halten Suchmaschinen fern. Das ist **kein Zugriffsschutz**: Wer den Link hat, kann die
> Seite öffnen. Bei einem **öffentlichen** Repository ist außerdem der Quellcode auf
> GitHub für alle sichtbar. GitHub Pages aus einem privaten Repository geht nur mit einem
> kostenpflichtigen Konto. Schreiben Sie deshalb nichts in die Dateien, was niemand
> sehen soll.
>
> Eine `robots.txt` wertet GitHub Pages nur im Stammverzeichnis der Domain aus. Bei einer
> Projektseite (`…github.io/plus-naechstenliebe/`) übernimmt deshalb das Meta-Tag in
> `index.html` die eigentliche Arbeit. Es ist bereits eingebaut.

## Wo trage ich was ein?

Alle Stellen, die noch ersetzt werden müssen, sind mit **`[Platzhalter]`** (im Text)
oder **`PLATZHALTER`** (in HTML-Kommentaren) markiert. In VS Code mit `Strg+Shift+F`
nach „Platzhalter“ suchen.

### Kontaktformular (Formspree)
1. Kostenloses Konto auf <https://formspree.io> anlegen.
2. „New Form“ anlegen und die **Ziel-E-Mail-Adresse** angeben, an die Nachrichten
   gehen sollen. Die Adresse wird bei Formspree hinterlegt, nicht im Code.
3. Die angezeigte Form-ID (z. B. `xyzabcde`) in `index.html` eintragen:
   ```html
   action="https://formspree.io/f/DEINE_FORM_ID"
   ```
4. Beim allerersten Absenden schickt Formspree eine Bestätigungs-Mail, die bestätigt werden muss.

Solange die ID fehlt, zeigt das Formular einen freundlichen Hinweis an und verschickt nichts.

### „Schreib mir“-Button (mailto)
In `index.html` im Abschnitt `kontakt` **zweimal** `deine-adresse@example.com`
ersetzen: im `href="mailto:…"` und in der angezeigten Zeile darunter.

### Texte
Alle Inhalte stehen in `index.html`, jeder Abschnitt ist eine
`<section id="…" class="panel">`, gut erkennbar an den Kommentaren
`<!-- ===== 1. WILLKOMMEN ===== -->` usw.
Die Punktwerte bei den Pflegegraden vor der Veröffentlichung bitte noch einmal prüfen.

### Bilder
1. Eigene Fotos in `assets/img/` ablegen (am besten `.jpg`, ca. 1200 px breit,
   damit die Seite schnell lädt).
2. In `index.html` beim jeweiligen `<img>` den `src` anpassen, z. B.
   `src="assets/img/papa-garten.jpg"`.
3. **Den `alt`-Text anpassen.** Er beschreibt in einem Satz, was auf dem Bild zu sehen
   ist, damit blinde Menschen mit Screenreader es auch „sehen“. Rein dekorative Bilder
   bekommen `alt=""`.
4. Die Angaben `width`/`height` grob auf das Seitenverhältnis des neuen Bildes setzen
   (z. B. `1200`/`800`). Sie verhindern, dass die Seite beim Laden springt.

### Abschnitt hinzufügen oder umbenennen
1. Neue `<section id="mein-abschnitt" class="panel" …>` mit einer `<h1 tabindex="-1">` in `index.html` einfügen.
2. In der Navigation einen Link `<a href="#mein-abschnitt">…</a>` ergänzen.

Mehr ist nicht nötig, das JavaScript erkennt neue Abschnitte automatisch.

### Farben
Ganz oben in `assets/css/style.css` (`:root`). Das helle Logo-Blau (`#02A1FF`) hat auf
Weiß zu wenig Kontrast für Text und wird deshalb nur für Flächen und Akzente verwendet.

## Barrierefreiheit (bereits eingebaut)
- „Zum Inhalt springen“-Link (erscheint beim ersten Druck auf die Tab-Taste)
- Vollständig per Tastatur bedienbar, deutlich sichtbarer Fokusrahmen
- Kontraste nach WCAG AA (Fließtext deutlich darüber)
- Grundschrift 18 px, per Button „Größere Schrift“ auf 22 px umschaltbar (wird gemerkt)
- Abschnittswechsel werden Screenreadern angesagt (Fokus springt zur Überschrift)
- Formular mit Beschriftungen und verständlichen Fehlermeldungen
- Bewegungen werden reduziert, wenn das im Betriebssystem eingestellt ist
- Funktioniert auch ohne JavaScript: Dann stehen alle Abschnitte untereinander

## Rechtliches (Hinweis, keine Rechtsberatung)
Für Websites in Deutschland können **Impressum** und **Datenschutzerklärung** nötig
sein, besonders wegen des Kontaktformulars (Daten gehen an Formspree, USA).
Im Fußbereich und unter dem Formular ist dafür jeweils eine Stelle mit `PLATZHALTER` markiert.
Die Seite lädt bewusst keine externen Schriften (z. B. Google Fonts), um keine Daten
ungefragt an Dritte zu senden.
