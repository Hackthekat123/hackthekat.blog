# katsecurity-blog — Cloudflare Workers static site

Pure HTML/CSS/JS deployment van je Hugo blog naar Cloudflare Workers.

## Structuur

```
.
├── wrangler.toml          ← Workers config
├── public/                ← Alles hierin wordt geserveerd
│   ├── index.html         ← Homepage
│   ├── 404.html
│   ├── main.css           ← Gecompileerde stylesheet (uit theme SCSS)
│   ├── bundle.min.js      ← Gebundelde JS (prism + main + menu)
│   ├── static/
│   │   ├── fonts/         ← Inter font files
│   │   └── fontawesome/   ← Icons
│   ├── writeups/          ← Alle HTB writeups
│   │   ├── index.html     ← Overzicht
│   │   ├── writeup-cap/
│   │   ├── writeup-...
│   │   └── hackthebox-documentations/
│   ├── hackthebox/
│   │   └── index.html     ← HTB landing
│   └── posts/
│       └── index.html     ← Blog landing
```

## Deployen

### Eerste keer

```bash
# Installeer wrangler globaal (eenmalig)
npm install -g wrangler

# Login bij Cloudflare (opent browser)
wrangler login

# Deploy
wrangler deploy
```

Je site staat dan op `https://katsecurity-blog.<jouw-subdomain>.workers.dev`.

### Via Git (aanbevolen)

Push deze hele directory naar GitHub. Verbind in Cloudflare dashboard:

**Workers & Pages → Create → Workers → Connect to Git → selecteer repo**

Build settings:
- **Build command:** *(leeg laten — geen build nodig, alles is al HTML)*
- **Deploy command:** `npx wrangler deploy`
- **Path:** `/`

Elke `git push` triggert automatisch een nieuwe deploy.

## Custom domain (katsecurity.blog)

In Cloudflare dashboard:
**Workers & Pages → katsecurity-blog → Settings → Domains & Routes → Add → Custom Domain**

Voer `katsecurity.blog` in. DNS records worden automatisch aangemaakt als je domein bij Cloudflare beheerd wordt.

## Nieuwe writeup toevoegen

Maak een nieuwe map onder `public/writeups/`:

```bash
mkdir public/writeups/writeup-nieuwemachine
```

Kopieer een bestaande `index.html` als template (bv `writeup-cap/index.html`) en pas de content aan.

Daarna update je `public/writeups/index.html` om de nieuwe writeup in het overzicht te zetten.

```bash
git add .
git commit -m "Add nieuwe machine writeup"
git push
```

## Lokaal testen

```bash
# Optie 1: simpele python webserver
cd public && python3 -m http.server 8080
# open http://localhost:8080

# Optie 2: wrangler dev server (simuleert Workers exact)
wrangler dev
```

## Belangrijke noot — afbeeldingen ontbreken

De writeups verwijzen naar afbeeldingen zoals `50397185.png` (relatief, naast de index.html in elke writeup folder). Deze afbeeldingen zaten **niet** in de upload. Voor elke writeup waar je afbeeldingen wil tonen, kopieer de bijbehorende `.png` files naar de juiste `public/writeups/writeup-<naam>/` map.

Tip om snel te zien welke writeups missing images hebben:

```bash
grep -roh 'src=[^ >]*\.png' public/writeups/ | sort -u
```
