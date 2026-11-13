# Crop

Frame an X post, or an uploaded screenshot, and download a PNG.

Desktop is three columns (Source, preview, Frame). On a phone those are tabs: Preview, Source, Frame.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:8080.

## Stack

React 19, TanStack Start, Tailwind v4, Zustand.

## Source status

Core UI components and libs have been uploaded so Claude can work on the real project:
- `src/components/studio.tsx`
- `src/components/source-panel.tsx`
- `src/components/stage.tsx`
- `src/components/tweet-card.tsx`
- `src/components/export-bar.tsx`
- `src/components/crop-image.tsx`
- `src/components/icons.tsx`
- `src/components/ui/*`
- `src/lib/formats.ts`
- `src/lib/export-png.ts`

More files (frame-panel, studio-store, tweet parsing, routes, etc.) are being added in batches.

Built with Grok.
