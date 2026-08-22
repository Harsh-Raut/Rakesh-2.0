# PROJECT R — Booking Website

A cyberpunk-styled, single-page booking site for a working DJ. Built to do one thing: **turn visitors into WhatsApp enquiries** for weddings, club nights, corporate events and private parties.

No frameworks, no build step, no backend.

---

## ⚠️ Set this first

Open `assets/js/main.js` and edit the first three lines:

```js
const WHATSAPP_NUMBER = '910000000000';   // country code + number, digits only
const PHONE_DISPLAY   = '+91 XXXXX XXXXX';
const PHONE_DIAL      = '+910000000000';
```

Nothing on the site works until the number is real.

## Run locally

```bash
python3 -m http.server 4321
```

Open http://localhost:4321

## How the lead capture works

Every green button is a WhatsApp click-to-chat link carrying its **own pre-filled message**, so you know which section the lead came from. The enquiry form has no backend — it formats your answers into a message and opens WhatsApp with it ready to send.

## Sections

Hero → Event types (4) → How it works → What's included → Packages → Music → Gallery → Reviews → Enquiry form → FAQ, plus a floating WhatsApp button on desktop and a sticky WhatsApp/enquire bar on mobile.

## Files

```
index.html              the whole site
assets/css/style.css    design system
assets/js/main.js       WhatsApp wiring, form, interactions
docs/                   strategy and marketing
```

## Documentation

| Doc | What's in it |
|---|---|
| [**Project Status**](docs/00-project-status.md) | **Start here** — everything built so far, in one page |
| [Brand & Positioning](docs/01-brand-strategy.md) | What the business sells, the four buyer types, differentiators, voice, visual system |
| [Marketing & Lead Gen](docs/02-marketing-plan.md) | Where DJ bookings really come from, priority actions, seasonality, pricing, the enquiry-closing script |
| [Content Plan](docs/03-content-calendar.md) | What to shoot at every event, weekly rhythm, 10 Reel formats, first 30 days |
| [Website Guide](docs/04-website-architecture.md) | Section-by-section rationale, WhatsApp system, what to replace, local SEO, launch checklist |

## Before you launch

Prices, stats, photos and reviews are all **placeholders**. The full list of what to swap is in the [website guide](docs/04-website-architecture.md#5-everything-else-to-replace-before-going-live). Don't ship the fake numbers — wedding clients check.
