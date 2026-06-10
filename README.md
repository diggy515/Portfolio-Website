# tanmayawahal.com

Personal portfolio for Tanmaya Wahal — Music Producer, Sound Designer, Guitarist.

Built with Next.js 16 (App Router, TypeScript). No CMS, no database. All content lives in data files you edit directly.

---

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## How to add a new track to the Music page

### Step 1 — Generate a peaks file locally

You need Python and `ffmpeg` installed.

```bash
# Install the peaks generator (one time)
pip install ffmpeg-python numpy

# Run it against your .wav or .mp3
python3 generate_peaks.py my-track.wav
```

This creates two files: `my-track.mp3` (compressed for web) and `my-track.peaks.json`.

The peaks JSON format is:
```json
{ "peaks": [0.12, 0.45, 0.78, ...], "duration": 213.4 }
```

Where `peaks` is an array of 0–1 values and `duration` is the total seconds.

### Step 2 — Upload to Cloudflare R2

Audio lives in the Cloudflare R2 bucket at the custom domain `media.tanmayawahal.com`.

Upload both files:
- `my-track.mp3` → `https://media.tanmayawahal.com/my-track.mp3`
- `my-track.peaks.json` → `https://media.tanmayawahal.com/my-track.peaks.json`

Make sure both objects are set to **public read**.

### Step 3 — Add the track to works data

Open `content/music.ts` in GitHub's web editor (pencil icon) and update `FEATURED_TRACK`:

```ts
export const FEATURED_TRACK = {
  id: "my-track",
  title: "My Track Title",
  meta: "Featured · Single",
  audioUrl: "https://media.tanmayawahal.com/my-track.mp3",
  peaksUrl: "https://media.tanmayawahal.com/my-track.peaks.json",
  coverArt: "/assets/my-track-cover.jpg", // put the cover in /public/assets/
  coverAlt: "My Track — cover art",
  duration: 213,
};
```

Or add a Spotify embed by appending to `SPOTIFY_EMBEDS`:
```ts
{ title: "My Track", id: "SPOTIFY_TRACK_ID", si: "SPOTIFY_SI_PARAM" },
```

You get the embed code from Spotify → Share → Embed → copy the `src` URL — the track ID is between `/track/` and `?`.

### Step 4 — Commit

Commit the file. Vercel redeploys automatically.

---

## How to edit the bio

Open `content/bio.ts` and edit the `BIO_PARAGRAPHS` array. Each paragraph has a `variant` (`"lead"` for the large opening paragraph, `"body"` for the rest) and `text`.

Update `SELECTED_WORKS` to change the sidebar list.

Update `PORTRAIT_SRC` to the path of a portrait image you've placed in `/public/assets/`.

---

## How to edit contact links

Open `content/contact.ts`. Change `email`, `instagram.href`, or `soundcloud.href`.

---

## How to add a sound design project

Open `content/sound-design.ts` and add an entry to `PROJECTS`:

```ts
{
  title: "Project Name",
  kind: "Short Film",           // or "Game", "Installation", etc.
  img: "/assets/project.jpg",   // put the image in /public/assets/
  credits: "Credits: Composer, Sound Designer",
  href: "https://link-to-project.com",  // leave "" if no link
},
```

Add a YouTube reel to `REELS` by appending:
```ts
{ id: "YOUTUBE_VIDEO_ID", label: "Reel label" },
```

The YouTube video ID is the part after `v=` in the URL (e.g. `dQw4w9WgXcQ`).

---

## Where the audio lives

Audio files and peaks JSON are hosted on **Cloudflare R2** under the custom domain `media.tanmayawahal.com`. You manage this in the Cloudflare dashboard — the bucket is called `tanmaya-media` (or whatever you named it).

- Keep all files **public** so the browser can fetch them.
- Use the exact URL format: `https://media.tanmayawahal.com/<filename>`.
- The WaveformPlayer uses `preload="none"` — files only download when the user presses play.

---

## Pages

| Route | File |
|---|---|
| `/` | `app/page.tsx` |
| `/about` | `app/about/page.tsx` |
| `/music` | `app/music/page.tsx` |
| `/sound-design` | `app/sound-design/page.tsx` |
| `/limbo` | `app/limbo/page.tsx` |
| `/contact` | `app/contact/page.tsx` |

---

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → New Project → import your GitHub repo.
3. Vercel will detect Next.js automatically — no extra config needed.
4. Set your custom domain (`tanmayawahal.com`) in Project Settings → Domains.

Every `git push` to `main` triggers a redeploy automatically.
