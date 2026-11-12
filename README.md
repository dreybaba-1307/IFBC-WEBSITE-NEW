# Ifako First Baptist Church — Website

A complete redesign of [ifbclagos.org](https://www.ifbclagos.org) — a warm, cinematic church website with a built-in admin area for editing every word and image on the site.

**Design direction:** *Light Through the Arch* — ivory, ink, gold and clay; Fraunces display type, arch motifs, film grain, oversized editorial headlines and Supahero-style light/motion effects.

## Stack

- Next.js 16.4 (App Router, Turbopack) + React 19
- Tailwind CSS v4 (design tokens in `app/globals.css`)
- `motion` for reveals, split text and parallax; Lenis for smooth scrolling
- `lucide-react` icons
- **TiDB Cloud** (MySQL-compatible, `mysql2` driver) for content and messages, with a zero-setup JSON file store as the local fallback — both behind `lib/store.ts`

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

The dashboard covers: site identity & logos, hero, year theme, about & stats, vision/mission/values/Yoruba anthem, service times, leadership, ministries, events, sermons, testimonies, gallery, giving accounts, contact, visit info and the message inbox. Changes go live as soon as **Save changes** is pressed.

Uploaded images go wherever the active store puts them: `public/uploads/` for the local JSON backend, and the `media` table in TiDB when `DATABASE_URL` is set (Vercel's filesystem is read-only, so files cannot live on disk there). The upload endpoint returns a URL either way, so the dashboard does not care which backend is live.

### How content is stored

There are two interchangeable backends behind `lib/store.ts` — nothing else in the app knows which one is live.

**1. TiDB Cloud (used when `DATABASE_URL` is set)**

| Table | Contents |
| --- | --- |
| `site_content` | One row (`id = 1`) whose `doc` JSON column holds the whole site document |
| `messages` | Contact / testimony / visit submissions, indexed by date and read state |
| `media` | Uploaded images as `MEDIUMBLOB` with filename, MIME type and size, served by `GET /api/media/[id]` |

The site content is stored as a single JSON document because the admin saves the whole document at once; messages get a real table so the inbox can grow, be filtered and be trimmed to the newest 500. Uploaded images live in `media` so nothing is written to the filesystem in production. Tables are created automatically on first use.

```bash
npm run db:check   # verify the connection
npm run db:init    # create database + tables, seed from data/content.json
npm run db:seed    # re-upload data/content.json after local edits
```

**2. Local JSON file (used when `DATABASE_URL` is empty)**

- Defaults live in `lib/content.ts` and are always the fallback.
- Saved edits are merged over those defaults in `data/content.json`.
- Messages are stored inside that same document.
- Uploaded images are written to `public/uploads/`.
- Zero setup: `npm run dev` works with no database at all.

In both modes the public site reads content on every request (`force-dynamic`), so edits appear immediately, and a partial or missing document is deep-merged over the defaults so a page can never break.

Reads are served from a short in-process cache (5 seconds by default) so a burst of visitors shares one database round trip. Saving in `/admin` clears the cache on that instance, and the admin always reads fresh (`getContentFresh()`), so edits are visible as soon as you press **Save changes** — other server instances catch up within the cache window. Set `CONTENT_CACHE_TTL_MS=0` to disable the cache entirely.

> **Deployment note:** with `DATABASE_URL` set the app is fully stateless and can run on Vercel, Docker, or any Node host. Without it, writes go to the local filesystem, which needs a persistent host.

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
| `GET /api/media/[id]` | Serve an image stored in the `media` table (immutable cache) |

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
  content.ts         content types + defaults + normalizeContent()
  db.ts              TiDB connection pool, schema bootstrap
  store.ts           storage facade (picks a backend)
  store-db.ts         TiDB store (site_content + messages + media tables)
  store-file.ts       JSON file store (local fallback)
  auth.ts            password + signed session cookie
scripts/db.mjs       db:check / db:init / db:seed helpers
data/content.json    saved edits when no database is configured
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
