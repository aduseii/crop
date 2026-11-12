# Crop

Frame an X post, or an uploaded screenshot, and download a PNG. Desktop is three columns (Source, preview, Frame). On a phone those are tabs: Preview, Source, Frame.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:8080. `npm run dev` must go through `scripts/with-app-env.mjs` (the npm script already does). Do not start Vite by itself.

Check changes with `npm run typecheck` and `npm run build`.

## Where the product lives

- `src/components/studio.tsx` — page shell, mobile tabs
- `src/components/source-panel.tsx` — link, bulk zip, screenshot upload
- `src/components/stage.tsx` — the frame that gets exported
- `src/components/tweet-card.tsx` — the post itself (media grids, quotes, emoji)
- `src/components/frame-panel.tsx` — size, backdrop, logo, templates
- `src/lib/formats.ts` — sizes, including 2:3 and custom
- `src/lib/studio-store.ts` — settings and templates, saved in localStorage
- `src/lib/export-png.ts` — PNG capture
- `src/lib/tweet/` — fetch, parse, bulk download
- `public/backgrounds/sitcom-burst.png` — Sitcom 2:3 backdrop (optional, not the default)
- `public/logos/sitcomcrave.png` — logo placed at the bottom of that backdrop

## Do not break

- Default frame is Tight on a plain ink backdrop. Sitcom 2:3 is only applied when that backdrop is chosen.
- Choosing Sitcom 2:3 sets the 1080×1620 frame, the burst image, and the logo at the bottom center. The logo is its own layer. Do not paint it into the background image.
- Tweet photos stay fully visible, with one rounded outer clip and no gray frame around the cells.
- Quote posts use the same media grid as a normal post, including two-up photos.
- Emoji render as Apple emoji images. Do not let a previous post's emoji stick on the next one.
- Export is client-side. The node being captured must stay in the layout even on the phone tabs, or the PNG comes out empty.
- Preferences and templates stay in localStorage. There are no accounts.

## Stack

React 19, TanStack Start, Tailwind v4, Zustand. Node 22. Auth and the database are unused. Leave `public/__grok/`, `server/`, and the PWA scripts in place so the project still builds.
