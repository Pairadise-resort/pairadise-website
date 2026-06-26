# Pairadise Resort Website

A clean, static website for **Pairadise Resort** in Pai, Mae Hong Son, Thailand.
Warm, earthy, bohemian-boutique design. No frameworks, just HTML, CSS, and vanilla JavaScript.

## Structure

```
index.html              Homepage (hero, rooms, amenities, sauna, reviews, location, FAQ, footer)
styles.css              All styling (CSS variables for the earthy palette)
script.js               Mobile menu + FAQ accordion
register-interest.html  Retreat interest signup form
assets/                 Logo and room/feature photos
```

## Run locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Rooms & booking

The 15 room cards mirror the live Lodgify inventory (units 01–16, no 13), grouped as
Pond View Superior, Garden View Superior, Garden View Superior LUX, Pond View Superior LUX,
and Family Studio Superior LUX. Each card's **Check Availability & Book** button links
directly to that unit's Lodgify booking page.

Room photos in `assets/` (`room-01.jpg` … `room-16.jpg`) are copies of the Lodgify
listing photos; replace any file to use your own image.

## Editing notes

Search the HTML for `REPLACE:` comments — they mark every image path and external link
(booking, WhatsApp, maps) you may want to update.

## Deploy (GitHub Pages)

Settings → Pages → Build from branch → `main` / root. The site is served from `index.html`.
