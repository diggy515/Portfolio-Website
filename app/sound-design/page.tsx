import type { Metadata } from "next";
import Shell from "@/components/Shell";
import SectionHead from "@/components/SectionHead";
import { PROJECTS, REELS } from "@/content/sound-design";

export const metadata: Metadata = { title: "Sound Design" };

export default function SoundDesignPage() {
  return (
    <Shell active="sound-design">
      <SectionHead eyebrow="Sound Design" title="Sound for picture & space" />

      {/* Featured projects */}
      <section className="proj-row">
        {PROJECTS.map((p) => {
          const media = (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.img} alt={p.title} />
          );
          return (
            <figure key={p.title} className="proj" style={{ margin: 0 }}>
              {p.href ? (
                <a href={p.href} target="_blank" rel="noopener noreferrer">
                  {media}
                </a>
              ) : (
                media
              )}
              <figcaption style={{ marginTop: "var(--space-4)" }}>
                <div className="ds-meta" style={{ marginBottom: "var(--space-2)" }}>
                  {p.kind}
                </div>
                <h2
                  style={{
                    fontSize: "var(--text-lead)",
                    lineHeight: "var(--leading-snug)",
                    letterSpacing: "var(--tracking-tight)",
                    fontWeight: "var(--weight-medium)",
                    color: "var(--text-primary)",
                    margin: "0 0 var(--space-3)",
                  }}
                >
                  {p.title}
                </h2>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-meta)",
                    letterSpacing: "0",
                    textTransform: "none",
                    color: "var(--text-meta-color)",
                    lineHeight: "var(--leading-snug)",
                  }}
                >
                  {p.credits}
                </div>
              </figcaption>
            </figure>
          );
        })}
      </section>

      {/* Reels & redesigns */}
      <div className="ds-meta" style={{ marginBottom: "var(--space-5)" }}>
        Reels &amp; redesigns
      </div>
      <section className="tube-grid">
        {REELS.map((r) => (
          <figure key={r.id} style={{ margin: 0 }}>
            <div className="tube-frame">
              <iframe
                src={`https://www.youtube.com/embed/${r.id}`}
                title={r.label}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <figcaption style={{ marginTop: "var(--space-3)" }}>
              <div className="ds-meta">{r.label}</div>
            </figcaption>
          </figure>
        ))}
      </section>
    </Shell>
  );
}
