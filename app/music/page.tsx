"use client";

import { useState, useEffect } from "react";
import Shell from "@/components/Shell";
import SectionHead from "@/components/SectionHead";
import WaveformPlayer from "@/components/WaveformPlayer";
import { FEATURED_TRACK, SPOTIFY_EMBEDS } from "@/content/music";

function FeaturedTrack() {
  const [peaks, setPeaks] = useState<number[] | undefined>(undefined);

  useEffect(() => {
    if (!FEATURED_TRACK.peaksUrl) return;
    let live = true;
    fetch(FEATURED_TRACK.peaksUrl)
      .then((r) => r.json())
      .then((d) => {
        if (live) {
          const arr = Array.isArray(d) ? d : d.peaks ?? [];
          if (arr.length > 0) setPeaks(arr);
        }
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  return (
    <WaveformPlayer
      id={FEATURED_TRACK.id}
      title={FEATURED_TRACK.title}
      audioUrl={FEATURED_TRACK.audioUrl || undefined}
      peaksUrl={FEATURED_TRACK.peaksUrl || undefined}
      height={64}
      bars={140}
      duration={FEATURED_TRACK.duration}
    />
  );
}

export default function MusicPage() {
  return (
    <Shell active="music">
      <SectionHead eyebrow="Music" title="Releases & productions" />

      {/* Featured — So Into You */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 5fr) minmax(0, 7fr)",
          gap: "var(--space-8)",
          alignItems: "end",
          marginBottom: "var(--space-10)",
        }}
      >
        {/* Cover art placeholder */}
        <div
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
            background: FEATURED_TRACK.coverArt ? "transparent" : "var(--surface)",
            border: "1px solid var(--hairline)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {FEATURED_TRACK.coverArt ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={FEATURED_TRACK.coverArt}
              alt={FEATURED_TRACK.coverAlt}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-meta)",
                letterSpacing: "var(--tracking-label)",
                textTransform: "uppercase",
                color: "var(--text-meta-color)",
              }}
            >
              Cover art
            </span>
          )}
        </div>

        <div>
          <div className="ds-meta" style={{ marginBottom: "var(--space-4)" }}>
            {FEATURED_TRACK.meta}
          </div>
          <h2
            style={{
              fontSize: "var(--text-title)",
              lineHeight: "var(--leading-tight)",
              letterSpacing: "var(--tracking-display)",
              fontWeight: "var(--weight-medium)",
              marginBottom: "var(--space-5)",
              color: "var(--text-primary)",
            }}
          >
            {FEATURED_TRACK.title}
          </h2>
          <FeaturedTrack />
        </div>
      </section>

      {/* Spotify embeds grid */}
      <div className="ds-meta" style={{ marginBottom: "var(--space-5)" }}>
        More music
      </div>
      <section className="embed-grid">
        {SPOTIFY_EMBEDS.map((t) => (
          <iframe
            key={t.id}
            title={t.title}
            src={`https://open.spotify.com/embed/track/${t.id}?utm_source=generator&si=${t.si}`}
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        ))}
      </section>
    </Shell>
  );
}
