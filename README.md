# ClarezAI_LW — Lockwood-inspired site

A standalone single-page website for **ClarezAI** modeled on the structure and visual treatment of [Lockwood Medical Communications](https://thelockwoodgrp.com/lockwood-medical-communications/).

## Folder contents

```
ClarezAI_LW/
├── index.html       ← main page (all 10 sections)
├── styles.css       ← teal-and-navy theme, modern serif/sans pairing
├── script.js        ← mobile nav toggle, scroll-reveal animation, smooth scroll
├── README.md        ← this file
└── images/
    ├── ClarezAI Logo_with text.png    (nav + footer brand)
    ├── ClarezAI2.png                  (hero background — iris/orb)
    ├── Retina Expertise.png           (strategic focus card)
    ├── Strategy.png                   (capabilities card)
    ├── KOL Network.png                (strategic focus card)
    ├── Data Analytics.png             (capabilities card)
    ├── Evidence.png                   (strategic focus card)
    └── Communications & Publications.png  (capabilities card)
```

## Page structure (sections, top to bottom)

| # | Section | Content |
|---|---|---|
| 1 | **Navigation** | Logo + About / Capabilities / Insights / Contact + "Join Us" CTA |
| 2 | **Hero** | "Driven by Strategic Intelligence, Powered by Real Expertise." + dark image overlay + 2 CTAs |
| 3 | **About / Value Prop** | "A trusted extension of your Medical Affairs team." + 3 stat callouts (100+ publications · MD·PharmD·PhD · End-to-end) |
| 4 | **Core Capabilities** | 3 cards: Strategic Medical Affairs · Medical Communications & Publications · Real-time Intelligence & Analytics |
| 5 | **Partners** | 5-logo trust strip ("Trusted by biotech and pharma teams who lead with science.") |
| 6 | **Why ClarezAI** | 6 pillars with line-icon SVGs on the dark navy panel (Strategic Depth · KOL Networks · Real-time Intelligence · End-to-End Strategy · Senior Expertise on Demand · Cost Efficient) |
| 7 | **Strategic Focus Areas** | 3 cards: Retina & Ophthalmology · Early-Stage Biotech · Established Pharma |
| 8 | **Testimonials** | 2 quoted endorsements with decorative quote marks |
| 9 | **CTA "Let's Work Together"** | Full-width teal section with email CTAs |
| 10 | **Careers "Join Us"** | Recruitment pitch + circular MD/PharmD/PhD badge |
| 11 | **Footer** | Brand + 3 nav columns + social icons + legal line |

## Design tokens

| Token | Value | Use |
|---|---|---|
| `--navy` | `#1a2c47` | Headlines, dark panels |
| `--navy-deep` | `#0e1c30` | Hero overlay, footer bg |
| `--teal` | `#2d9b9b` | Buttons, accents, links |
| `--teal-soft` | `#b9e0e0` | Hero kicker, dark-section accents |
| `--bg-2` | `#f3f4f6` | Alternating section background |
| `--text` | `#3b4a5e` | Body copy |
| `--muted` | `#7a8896` | Subtitles, stat labels |

## Typography

- **Headlines** — Source Serif Pro (700 weight)
- **Body / UI** — Inter (400–600)

## To view

Open `index.html` in any modern browser. No build step required.

## To activate the email CTAs

The "Start a Conversation" and "View Open Roles" buttons currently use `mailto:` links:
- `info@clarezai.com` — main contact
- `careers@clarezai.com` — recruiting

Update the address in `index.html` if your contact email differs.

## Notes

- The partner logos in section 5 are styled HTML text placeholders. Replace with real client/partner logos when available.
- The two testimonials are placeholder quotes. Swap for real client quotes when authorized.
- The hero image uses `ClarezAI2.png` as a full-bleed background with a dark navy gradient overlay so the headline reads cleanly.
