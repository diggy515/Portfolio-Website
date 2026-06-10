# Brief: Build my music portfolio in Next.js

Build a personal music and sound design portfolio at `tanmayawahal.com`. I have a finished design from Claude Design (I'll paste/attach the code). Your job is to rebuild it in Next.js, set it up so I can maintain it long-term by editing data files (not code), and deploy it to Vercel via GitHub.

## Tech stack

- **Next.js** (App Router, latest stable version)
- **Plain CSS or CSS modules** for styling, no Tailwind, no UI framework. The design is a strict monochrome system and I want full control over the tokens.
- **No CMS, no database.** Content lives in data files in the repo.

## Animations

The Claude Design output I'm handing you already includes all the animations I want. Preserve them as-is when porting to Next.js. Do not add new animations, do not "improve" the motion, do not introduce GSAP or any other animation library unless the existing code already uses it. If the design uses CSS transitions or a specific library, keep that. If you need to convert markup to React components, port the animations along with the structure, don't strip them and don't replace them.

## The single most important architectural rule

All content (works, bio text, contact links, image paths, audio URLs) must live in **data files**, not embedded in components. I will be updating the site myself by editing these data files through GitHub's web editor. If you find yourself hardcoding a track title, an image path, or a URL inside a `.tsx` component, stop and move it to data.

Concretely, create:

- `/content/works.ts` — exports an array of work objects (see schema below)
- `/content/bio.md` or `/content/bio.ts` — my bio text
- `/content/contact.ts` — email and social links
- `/content/site.ts` — site title, meta description, anything site-wide

Components import from these and render. Adding a new track means adding one object to `works.ts`. That's it.

### Work schema

```ts
type Work = {
  id: string;               // slug, e.g. "dead-weight"
  title: string;
  medium: string;           // e.g. "short film · post-sound"
  year: string;
  span: number;             // 1-12, grid column span
  kind: "audio" | "image";
  // audio works:
  audioUrl?: string;        // https://media.tanmayawahal.com/<id>.mp3
  peaksUrl?: string;        // https://media.tanmayawahal.com/<id>.peaks.json
  duration?: number;        // seconds, optional, also in peaks JSON
  // image works:
  imageUrl?: string;        // /images/<id>.jpg in /public or external URL
  imageAlt?: string;
  // optional:
  featured?: boolean;       // larger waveform/image
  description?: string;     // small mono-font caption under the work
};
```

For now, populate `works.ts` with three placeholder entries so I can see the grid render. I'll fill in real tracks after.

## Design system

Use these tokens verbatim. Put them in a single CSS file (`/styles/tokens.css`) imported globally.

```css
:root {
  --bg: #0A0A0A;
  --bg-true: #000000;
  --fg: #F2F2F2;
  --fg-dim: #8A8A8A;
  --fg-faint: #3A3A3A;
  --hover: #FFFFFF;

  --font-grotesque: "Neue Haas Grotesk Display", "Helvetica Now Display", Inter, system-ui, sans-serif;
  --font-mono: "Söhne Mono", "Berkeley Mono", "JetBrains Mono", ui-monospace, monospace;

  --unit: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 40px;
  --space-6: 80px;
  --space-8: 120px;
  --space-12: 200px;
  --margin-page: clamp(24px, 6vw, 120px);
  --radius: 0;
  --hair: 1px;
}
```

Load Inter and JetBrains Mono via `next/font` (Google Fonts) as the actual rendered fonts; the licensed ones in the stack are fallbacks for if I license them later.

### Type scale

- Display (page titles): `clamp(3rem, 9vw, 8.5rem)`, weight 600, line-height 0.92, letter-spacing -0.03em
- Large (section heads): `clamp(1.5rem, 3vw, 2.5rem)`, line-height 1.05
- Body: 15px, line-height 1.55
- Small: 13px (nav, work titles)
- Mono: 11px, uppercase, letter-spacing 0.08em (metadata, timestamps)

### Hard rules

- No accent color, no gradients, no shadows, no border-radius (everything is `border-radius: 0`)
- No buttons with backgrounds. Links are text that goes from `--fg` to `--hover` on hover.
- Images never sit in cards and never have borders.
- Max two type sizes per viewport.
- Each page uses a visibly different grid. Only the contact page may center content.

## Pages

- `/` (works) — 12-column asymmetric editorial grid. Pieces vary span. Audio works show waveforms, image works show images. Titles in 13px, medium/year in 11px mono.
- `/bio` — single narrow column (~620px wide), pushed to the LEFT third of the page. Right two-thirds empty except optionally one portrait image floated to the far right, vertically offset. Display name spans full width at top.
- `/contact` — near-empty. 3-4 text links centered (the one page where centering is allowed). Large type, white on hover. Nothing else.

Top nav on every page: name on the left (links to `/`), three text links on the right (bio, works, contact). Hairline rule beneath in `--fg-faint`.

## The waveform player

This is the signature element. I'll paste the reference implementation separately (HTML file). Port it to a React component that:

- Takes `audioUrl`, `peaksUrl`, and `height` as props
- Fetches `peaksUrl` (a small JSON: `{peaks: number[], duration: number}`), draws bars sized by the peak values
- Uses ONE shared audio element across all waveforms on the page so only one track ever sounds at once
- Bars are `--fg-dim`; played portion is `--hover` (true white). The fill IS the scrubber, no separate UI.
- Plain click = play/pause. Shift-click = scrub to point. Space/Enter when focused = play/pause. Arrow keys = ±5 seconds.
- Uses `preload="none"` on the audio so files only download on play.
- Shows current time and total duration in 11px mono beneath the waveform.

The peaks JSON is hosted on Cloudflare R2 at `https://media.tanmayawahal.com/<id>.peaks.json` (same domain as audio).

## Performance and accessibility

- Use `next/image` for all images (the image works in the grid)
- Use `next/font` for fonts
- All interactive elements (waveform, links) must be keyboard accessible with visible focus states (1px outline in `--fg-faint`, 6px offset)
- All images need `alt` text from the data file
- The waveform component must have `role="button"` and an `aria-label` that updates ("Play X" / "Pause X")
- Lighthouse target: 95+ across the board

## Deployment

- Initialize as a git repo, push to a new GitHub repo (I'll authorize this or create it myself, whichever you can do)
- Set up for Vercel deployment (no Vercel config file needed unless something requires it)
- Add `.gitignore` for Next.js standard ignores

## README

Write a README in the repo that includes:

1. **How to add a new track** — exact steps: generate peaks locally with `generate_peaks.py`, upload mp3 and peaks json to R2 bucket, add a new entry to `/content/works.ts` with the schema, commit. Include the schema as a code block in the README.
2. **How to edit the bio** — edit `/content/bio.md` (or wherever you put it), commit.
3. **How to edit contact links** — edit `/content/contact.ts`, commit.
4. **Local development** — `npm install`, `npm run dev`.
5. **Where the audio lives** — Cloudflare R2 bucket, custom domain `media.tanmayawahal.com`.

Assume future-me reading this has forgotten everything. Be explicit, no jargon, no assumptions.

## What to do first

1. Scaffold the Next.js project
2. Set up tokens.css and font loading
3. Build the data files with placeholder content (3 works)
4. Build the works grid page with the waveform component
5. Build bio and contact pages
6. Write the README
7. Initialize git, push to GitHub
8. Tell me the repo URL so I can connect it to Vercel

If anything in this brief is ambiguous or you'd make a different decision, say so before implementing — I'd rather discuss tradeoffs than discover them later. Don't add features I didn't ask for (no analytics, no contact form backend, no dark mode toggle — it's already dark).

---

[After this brief, paste the contents of `waveform-player.html` as the reference implementation, then paste/attach the Claude Design output.]
