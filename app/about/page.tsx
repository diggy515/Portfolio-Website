import type { Metadata } from "next";
import Image from "next/image";
import Shell from "@/components/Shell";
import SectionHead from "@/components/SectionHead";
import { BIO_PARAGRAPHS, BIO_NOTE, SELECTED_WORKS, PORTRAIT_SRC, PORTRAIT_ALT } from "@/content/bio";
import { CONTACT } from "@/content/contact";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <Shell active="about">
      <SectionHead
        eyebrow="About"
        title="Tanmaya Wahal"
        note={BIO_NOTE}
      />

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 7fr) minmax(0, 4fr)",
          gap: "var(--space-10)",
          alignItems: "start",
        }}
      >
        {/* Running bio */}
        <div
          style={{
            maxWidth: "var(--measure-prose)",
            display: "grid",
            gap: "var(--space-5)",
          }}
        >
          {BIO_PARAGRAPHS.map((p, i) => (
            <p
              key={i}
              style={
                p.variant === "lead"
                  ? {
                      fontSize: "var(--text-lead)",
                      lineHeight: "var(--leading-snug)",
                      letterSpacing: "var(--tracking-tight)",
                      color: "var(--text-primary)",
                    }
                  : {
                      color: "var(--text-secondary)",
                      lineHeight: "var(--leading-body)",
                    }
              }
            >
              {p.text}
            </p>
          ))}
        </div>

        {/* Portrait + metadata sidebar */}
        <aside style={{ display: "grid", gap: "var(--space-7)", alignContent: "start" }}>
          {/* Portrait image or placeholder */}
          <div style={{ width: "100%", aspectRatio: "3 / 4", background: "var(--surface)", border: "1px solid var(--hairline)", position: "relative", overflow: "hidden" }}>
            {PORTRAIT_SRC ? (
              <Image
                src={PORTRAIT_SRC}
                alt={PORTRAIT_ALT}
                fill
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-meta)",
                  letterSpacing: "var(--tracking-label)",
                  textTransform: "uppercase",
                  color: "var(--text-meta-color)",
                }}
              >
                Portrait
              </div>
            )}
          </div>

          {/* Selected work list */}
          <div>
            <div
              className="ds-meta"
              style={{ marginBottom: "var(--space-3)" }}
            >
              Selected work
            </div>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "grid",
                gap: "var(--space-2)",
              }}
            >
              {SELECTED_WORKS.map((w) => (
                <li
                  key={w.title}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "var(--space-4)",
                    paddingBottom: "var(--space-2)",
                    borderBottom: "1px solid var(--hairline-faint)",
                  }}
                >
                  <span style={{ color: "var(--text-primary)" }}>{w.title}</span>
                  <span className="ds-meta" style={{ whiteSpace: "nowrap" }}>
                    {w.medium}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Elsewhere links */}
          <div>
            <div
              className="ds-meta"
              style={{ marginBottom: "var(--space-3)" }}
            >
              Elsewhere
            </div>
            <div style={{ display: "grid", gap: "var(--space-2)" }}>
              <a
                href={`mailto:${CONTACT.email}`}
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "var(--text-body)",
                  transition: "var(--transition-link)",
                }}
              >
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "var(--text-body)",
                  transition: "var(--transition-link)",
                }}
              >
                Instagram ↗
              </a>
              <a
                href={CONTACT.soundcloud.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "var(--text-body)",
                  transition: "var(--transition-link)",
                }}
              >
                SoundCloud ↗
              </a>
            </div>
          </div>
        </aside>
      </section>

      {/* Responsive stacking for the two-column layout */}
      <style>{`
        @media (max-width: 760px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Shell>
  );
}
