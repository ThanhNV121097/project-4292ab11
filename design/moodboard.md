# Moodboard — Green Lotus Golf Club tee-time booking

## References watched

| Site | Technique taken | How adapted |
|---|---|---|
| golfnow.com (owner's reference) | A location/date/time search bar sitting right under the hero, then a grid of tee-time cards each showing time, price and a "book" action | A single course, not a marketplace, so the search bar becomes a date strip + today's open times grid on the home page itself — no destination search needed |
| streamsongresort.com | Full-bleed landscape photography, a thin serif-free eyebrow label over a confident headline, generous vertical whitespace between sections, warm late-day colour grade | Same large-photo-first rhythm, but the palette shifts to fairway green + cream + a warm clay-red accent that reads as "Vietnam golf club" rather than "Florida resort" |
| cal.com | Clean booking UI: a left rail of controls (date, duration), a right panel with a running total, Framer-driven reveal on scroll, real UI screenshots used as hero art | The tee-time detail page borrows this exact shape — pickers on the left, live total on the right — for the 9/18 holes + player count + pay flow |
| land-book (gallery) | Big single type scale, label-above-headline eyebrow pattern, asymmetric two-column hero (text left, image bleeding right) | Used for the home hero: eyebrow "18-HOLE CHAMPIONSHIP COURSE", headline left, course photo bleeding to the page edge on the right |
| awwwards (gallery) | Confirms moderate motion is still "awarded" in 2024/25 — fade-and-rise reveals, no scroll-jacking, on the winning sites sampled | Validates the house-style motion budget instead of pushing for WebGL/pinning, which would fight the booking-flow usability |

## Direction

**Palette** — a fairway green (`#1F3D2B`) and warm cream ground (`#F6F1E4`) carry the site, with a clay-red accent (`#B8502E`, echoing red-clay bunker sand and Vietnamese roof tile) for CTAs and prices; near-black ink (`#17201A`) for text. Dark mode deepens the green into near-black-green grounds with the same cream ink and a brighter coral accent for contrast.

**Type** — Inter throughout (the references' own sans is Nunito Sans/Poppins on GolfNow and Outfit on Streamsong — neither is a free-enough match worth chasing — Inter is the closest free, clean sans and keeps the house style's weight/size ceiling). Display weight 500, tight tracking, h1 ≤76px/h2 ≤52px at 1440px.

**Grid** — asymmetric two-column hero (headline + CTA left, course photo bleeding right), then a left-aligned content grid throughout; the tee-time list is a right-aligned numeric table (time, holes toggle implied by price pair, price) so prices and times line up like a scoreboard — golf's own visual language.

**Pictures** — real golf course photography stands in for the course until the owner supplies their own, borrowed from streamsongresort.com/golf via `save_reference_image` into `public/images/ref/` (tracked in `SOURCES.json`, outlined and counted in the Studio until replaced): large in the hero, at the course section break, and behind the promise band.

**Motion** — a short load fade-rise on the hero text and photo (framer-motion), light stagger on the tee-time rows as they enter view, a gentle hover-lift on cards and the booking summary updating with a soft cross-fade on the total. No pinning, no scroll-jacking, no marquee — matches both the house style and what the 2024/25 awarded sites actually do.
