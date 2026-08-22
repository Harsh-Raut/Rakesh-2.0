# PROJECT R — Website Architecture & Setup Guide

---

## 1. What this site is for

One job: **turn a visitor into a WhatsApp message.** Every section either answers a pre-booking question or removes a reason to hesitate. There is no section that exists purely to look good.

Design reference points: the era-based colour storytelling of `karanaujla.com.au` (adapted into the four colour-coded service cards) and the geometric cyberpunk chrome of `roobinium.io` (bevelled corners, mono labels, hover-reactive panels). The aesthetic is borrowed; the structure is a service-business funnel.

## 2. Section map — and the job each one does

| # | Section | Question it answers | Conversion role |
|---|---|---|---|
| 00 | Door / preloader | — | Sets the nightlife tone, masks font load. Self-dismisses in 4.5s. |
| 01 | Hero | "Do they do my kind of event?" | Two CTAs: WhatsApp (primary) and packages (for the price-first visitor) |
| — | Ticker | — | Lists all event types + "same-day reply" |
| 02 | **Four Kinds of Night** | "Do they do *my* event?" | Four cards, each with its own pre-filled WhatsApp message |
| 03 | **How It Works** | "Is this going to be a hassle?" | Removes process anxiety — the #1 silent objection |
| 04 | **The Full Setup** | "What am I actually paying for?" | Turns a rate comparison into a value comparison |
| 05 | **Packages** | "What will this cost?" | Three bands, middle flagged "most booked" |
| 06 | The Music | "Will they play what my crowd wants?" | Genre meters + requests policy |
| 07 | Gallery | "Can they actually fill a floor?" | The proof. Weakest section until real photos land. |
| 08 | Reviews | "Can I trust them?" | Social proof |
| 09 | **Enquire** | "How do I reach them?" | WhatsApp card, call, email + form that opens WhatsApp pre-filled |
| 10 | FAQ | Everything else | Removes the back-and-forth before it starts |
| — | Footer | — | Final CTA + service links |
| — | **Floating WhatsApp button + sticky mobile bar** | — | Always-visible conversion path |

## 3. The WhatsApp system (the core mechanic)

Every green element on the site is a **click-to-chat link with its own pre-written message**. A visitor tapping "Get a Quote" on the wedding card arrives in your chat with *"Hi, I'm planning a wedding/sangeet and want a quote."* already typed.

Why this matters: it removes the blank-message hesitation, and it tells you which section they came from before they say a word.

Add it to any new element by giving it `class="wa"` and a `data-wa="..."` message:

```html
<a href="#" class="wa" data-wa="Hi, I saw your NYE availability.">Ask about NYE</a>
```

**The enquiry form has no backend.** It composes a formatted message from the fields and opens WhatsApp with it. Nothing is stored, nothing to host, nothing to break — and the lead lands where you'll actually see it.

## 4. Set your number first

Open `assets/js/main.js` — the first three lines:

```js
const WHATSAPP_NUMBER = '910000000000';   // country code + number, digits only, no + or spaces
const PHONE_DISPLAY   = '+91 XXXXX XXXXX'; // what visitors see
const PHONE_DIAL      = '+910000000000';   // what the call button dials
```

For 98765 43210 in India, `WHATSAPP_NUMBER` is `919876543210`. **Nothing on the site works until this is set.**

## 5. Everything else to replace before going live

| What | Where | Notes |
|---|---|---|
| WhatsApp number, phone, email | `main.js` top + booking section | **Do this first** |
| Package prices | `index.html` → `.pkg .price` | Currently `₹ __,___`. Show "starting from" bands. |
| Stats (`000`, `00`) | Hero `[data-count]` | Real figures only — the counter deliberately won't animate placeholders |
| Gallery photos | `.gal` tiles | Replace emoji tiles with real event photos, 1600px+ |
| Reviews | `#reviews` | Real reviews only. A WhatsApp/Google screenshot beats typed text. |
| City name | Footer, meta description, title | Put your city in the `<title>` — it's how local search finds you |
| Social links | Footer, music section | Instagram, YouTube, Google reviews |
| Setup/kit list | `#setup` | Adjust to the gear you actually own or hire |
| FAQ answers | `main.js` → `faqs[]` | Edit to your real terms (advance %, travel policy) |

## 6. Publishing

Static site, no build step, no dependencies. Drag the folder onto **Netlify Drop**, or connect it to Vercel or Cloudflare Pages — all free tiers handle this comfortably. Buy a domain (`projectr.in` or similar) and point it there.

Local preview:

```bash
python3 -m http.server 4321
```

## 7. Local SEO — the part that quietly brings leads

- Put the city in the `<title>`: *"Project R — Wedding & Club DJ in [City] | Book Now"*
- Add `LocalBusiness` JSON-LD schema with name, phone, service areas and price range
- Create the **Google Business Profile** and link it to the site (higher impact than any on-page SEO for a local service)
- Add a short paragraph naming the areas served — "[City], [nearby town], [nearby town] and across [state]"
- Compress every photo (WebP, under 200KB) — most leads open this on mobile data at a venue
- `sitemap.xml`, `robots.txt`, favicon, OG image (1200×630) showing a packed floor

## 8. Track what matters

Add Google Analytics or Plausible, then track four events:
`whatsapp_click` · `form_submit` · `call_click` · `package_view`

`whatsapp_click` is the only number that matters. If it isn't rising, nothing else on the site does.

## 9. Pre-launch checklist

- [ ] WhatsApp number set and **tested from a different phone**
- [ ] Every price filled in or the package section removed — no `__,___` shipped
- [ ] All `000` stats replaced with real numbers
- [ ] At least 7 real photos in the gallery
- [ ] At least 3 real reviews, with permission
- [ ] City in the title tag and footer
- [ ] Tested on a mid-range Android on mobile data
- [ ] Form tested end-to-end: fill → WhatsApp opens → message is readable
- [ ] Google Business Profile live and linked
- [ ] No `href="#"` links left anywhere

## 10. Later improvements

- Separate landing pages per event type (`/wedding-dj-[city]`) — much stronger local SEO
- Real availability calendar showing booked dates
- Embedded video showreel above the gallery
- Online advance payment link
- Automatic WhatsApp reply for messages received during events
