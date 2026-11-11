# Ifako First Baptist Church — Website

A complete redesign of [ifbclagos.org](https://www.ifbclagos.org) — a warm, cinematic church website with a built-in admin area for editing every word and image on the site.

**Design direction:** *Light Through the Arch* — ivory, ink, gold and clay; Fraunces display type, arch motifs, film grain, oversized editorial headlines and Supahero-style light/motion effects.

## Stack

- Next.js 16.4 (App Router, Turbopack) + React 19
- Tailwind CSS v4 (design tokens in `app/globals.css`)
- `motion` for reveals, split text and parallax; Lenis for smooth scrolling
- `lucide-react` icons
- Content stored as JSON on disk (`data/content.json`), read/written by `lib/store.ts`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Admin area

- URL: `/admin` (redirects to `/admin/login`)
- Default password: `ifbc-admin`
- Override with environment variables:

```bash
ADMIN_PASSWORD="your-strong-password"
ADMIN_SECRET="a-long-random-string"   # signs the 12-hour session cookie
```

Copy `.env.example` to `.env.local` and change both before deploying.

The dashboard covers: site identity & logos, hero, year theme, about & stats, vision/mission/values/Yoruba anthem, service times, leadership, ministries, events, sermons, testimonies, gallery, giving accounts, contact, visit info and the message inbox. Changes go live as soon as **Save changes** is pressed. Uploaded images are written to `public/uploads/`.

### How content is stored

- Defaults live in `lib/content.ts` and are always the fallback.
- Saved edits are merged over those defaults in `data/content.json`.
- `data/content.json` and `public/uploads/` are created on first use.
- The public site reads content on every request (`force-dynamic`), so edits appear immediately.

> **Deployment note:** this setup writes to the local filesystem. It works on a VPS, Docker, or any persistent Node host. Serverless platforms with a read-only or ephemeral filesystem (e.g. Vercel) need the store swapped for a database or object storage — `lib/store.ts` is the only file to change.

## API

| Route | Purpose |
| --- | --- |
| `GET /api/content` | Public, read-only content |
| `POST /api/messages` | Contact / testimony / visit form submissions |
| `POST /api/admin/login` | Sign in |
| `POST /api/admin/logout` | Sign out |
| `GET /api/admin/content` | Full content (auth required) |
| `PUT /api/admin/content` | Save full content (auth required) |
| `PATCH /api/admin/messages` | Mark a message read/unread |
| `DELETE /api/admin/messages` | Delete a message |
| `POST /api/admin/upload` | Upload an image (max 8 MB, auth required) |

## Structure

```
app/
  (site)/            public pages (header, footer, smooth scroll, cursor)
  admin/             login + dashboard (no public chrome)
  api/               content, messages, admin endpoints
  not-found.tsx      global 404 with site chrome
components/
  home/              homepage sections
  site/              header, footer, forms, gallery, countdown
  admin/             dashboard and form fields
  motion.tsx         animation primitives
  ui.tsx             shared visual primitives
lib/
  content.ts         content types + defaults
  store.ts           JSON file store
  auth.ts            password + signed session cookie
data/content.json    saved edits (created on first save)
public/images/       curated photography and church logos
```

## Accessibility & performance

Lighthouse (desktop) on every public page: **100 accessibility, 100 best practices, 100 SEO**.

- Skip link, semantic landmarks, labelled form fields and focus styles
- All body text meets WCAG AA contrast (the scroll-lit paragraph darkens from a
  readable muted tone to ink, so words are never hidden)
- Closed mobile menus and overlays use `inert`, so hidden links are not focusable
- Gallery lightbox traps focus, closes on Escape and returns focus to its trigger
- `prefers-reduced-motion` disables animation, smooth scroll, preloader and custom cursor
- Responsive from 320px up; no horizontal overflow
- Next Image with AVIF/WebP; fonts loaded via `next/font` (no layout shift)
- Reduced-motion-safe marquees and countdown

## Credits

Photography combines original imagery from the existing church website with curated Unsplash photographs. Typography: Fraunces, Instrument Sans and JetBrains Mono (Google Fonts).
